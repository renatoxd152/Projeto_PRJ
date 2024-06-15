import { endOfMonth, format, parseISO, startOfMonth } from 'date-fns';
import express from 'express';
import { Op, Sequelize } from 'sequelize';
import Cliente from '../../model/Cliente/ClienteModel.js';
import Compra from '../../model/Compras/ComprasModel.js';
import ItensCompra from '../../model/Compras/ItensComprasModel.js';
import Produto from '../../model/Produto/ProdutoModel.js';
import Usuario from '../../model/Usuario/UsuarioModel.js';
import verifyToken from '../../utils/jwt.js';
const compra = express()
compra.use(express.json())


compra.get("/compras",verifyToken,async(req,res)=>{
    try{
        let comprasdoBanco = await Compra.findAll()

        let mensagem = comprasdoBanco.map(async (compra) => {
            
            return {
                id:compra.id,
                id_admin:compra.id_admin,
                nome_cliente: await buscarNomeCliente(compra.id_cliente),
                nome_vendedor: await buscarNomeVendedor(compra.id_admin),
                valor: compra.valor,
                data:format(compra.data, 'dd/MM/yyyy HH:mm:ss')
            };
        });
        mensagem = await Promise.all(mensagem);
        res.status(200).json(mensagem)
    }
    catch(erro)
    {
        res.status(500).json({mensagem:"Erro interno no servidor!"})
    }
})

compra.get("/compras/:idCliente",verifyToken,async (req, res) => {
    try {
        let idCliente = req.params.idCliente;

        let comprasdoClienteBanco = await Compra.findAll({
            where: { id_cliente: idCliente }
        });

        if (comprasdoClienteBanco.length === 0) {
            return res.status(404).json({ erro: 'O cliente não possui compras!' });
        }

        let mensagem = comprasdoClienteBanco.map(compras => {
            return {
                id:compras.id,
                valor: compras.valor,
                data: format(compras.data, 'dd/MM/yyyy HH:mm:ss')
            };
        });

        res.status(200).json(mensagem);
    } catch (erro) {
        res.status(500).json({ erro: "Erro interno no servidor!" });
    }
});


compra.post("/compras",verifyToken,async(req,res)=>
{
    try{
       
        const{valor_compra,id_cliente,id_admin,produtos} = req.body

        const admin = await Usuario.findOne({
            where:
            {
                id:id_admin,
                tipo:"ADMIN"
            }
        })
        const cliente = await Cliente.findByPk(id_cliente)

        if(!cliente)
            return res.status(404).json({erro:"Esse cliente não foi encontrado!"})
        if(!admin)
            return res.status(404).json({erro:"Esse admin não foi encontrado!"})


        for (const item of produtos) {
            const produto = await Produto.findByPk(item.id);
            if (!produto) {
                return res.status(404).json({ erro: `Produto com ID ${item.id} não encontrado` });
            }
            if (produto.quantidade < item.quantidade) {
                return res.status(400).json({ erro: `Produto ${produto.nome} não possui quantidade suficiente em estoque` });
            }
        }

        const data = new Date();
        const data_compra = format(data, 'yyyy-MM-dd HH:mm:ss');
        let novaCompra = await Compra.create({valor:valor_compra,id_cliente,id_admin,data:data_compra})

        
        await Promise.all(
            produtos.map(async(produto)=>{

                const produtoAtualizado = await Produto.findByPk(produto.id);
                produtoAtualizado.quantidade -= produto.quantidade;
                await produtoAtualizado.save();

                await ItensCompra.create(
                    {
                        id_compra:novaCompra.id,
                        id_produto:produto.id,
                        quantidade:produto.quantidade,
                        valor_total:produto.valor_total
                    }
                )
            })
        )

        res.status(200).json({mensagem:"A compra foi cadastrada com sucesso!"})

    }
    catch(error)
    {
        console.log(error)
        res.status(500).json({erro:"Erro interno no servidor"})
    }
})

compra.put("/compras/:id",verifyToken,async(req,res)=>{
    try{
        let index = req.params.id

        let {valor,id_cliente,id_admin} = req.body
        let compraparaAtualizar = await Compra.findByPk(index)

        if(!cliente)
            return res.status(404).json({mensagem:"Esse cliente não foi encontrado!"})
        if(!admin)
            return res.status(404).json({mensagem:"Esse admin não foi encontrado!"})

        if(!compraparaAtualizar)
        {
            return res.status(404).json({mensagem:"Essa compra não foi encontrada!"})
        }
        
        compraparaAtualizar.valor = valor
        compraparaAtualizar.id_cliente = id_cliente
        compraparaAtualizar.id_admin = id_admin

        await compraparaAtualizar.save()
        res.status(200).json(compraparaAtualizar)
    }
    catch(erro)
    {
        res.status(500).json({mensagem:"Erro interno no servidor!"})
    }
})

compra.delete("/compras/:id",verifyToken,async(req,res)=>
{
    try {
        
        let index = req.params.id;
        let compraparaDeletar = await Compra.findByPk(index);
       
        if(!compraparaDeletar){
            return res.status(404).json({erro:"A compra não foi encontrado!"})
        }

        await ItensCompra.destroy({
            where:
            {
                id_compra:compraparaDeletar.id
            }
        })

        await compraparaDeletar.destroy()

        res.status(201).json({mensagem:`Compra com id ${req.params.id} excluído com sucesso!`})
    } catch (error) {
        res.send(500).json({erro:"Erro interno no servidor"})
    }
})

compra.get("/relatorio/meses/:mes",verifyToken,async (req, res) => {
    try {
        const mes = parseInt(req.params.mes, 10);
        const ano = new Date().getFullYear();

        const inicioMes = startOfMonth(new Date(ano, mes - 1, 1));
        const fimMes = endOfMonth(inicioMes);

        const comprasDoMes = await Compra.findAll({
            where: {
                data: {
                    [Op.between]: [inicioMes, fimMes]
                }
            }
        });

        if (comprasDoMes.length === 0) {
            return res.status(404).json({ erro: 'Não há compras neste mês!' });
        }

        const totalPorDia = {};

        comprasDoMes.forEach(compra => {
            const dia = format(parseISO(compra.data.toISOString()), 'dd/MM/yyyy');
            if (!totalPorDia[dia]) {
                totalPorDia[dia] = 0;
            }
            totalPorDia[dia] += compra.valor;
        });

        const resultado = Object.keys(totalPorDia).map(dia => ({
            data: dia,
            valor: totalPorDia[dia]
        }));

        res.status(200).json(resultado);
    } catch (erro) {
        console.log(erro)
        res.status(500).json({ erro: "Erro interno no servidor!"});
    }
});

compra.get("/relatorio/compras/clientes",verifyToken,async (req, res) => {
    try {
        const clientesCompras = await Compra.findAll({
            attributes: [
                'id_cliente', 
                [Sequelize.fn('count', Sequelize.col('id_cliente')), 'total_compras']
            ],
            include: [{
                model: Cliente,
                attributes: ['nome']
            }],
            group: ['id_cliente', 'Cliente.id']
        });

        if (clientesCompras.length === 0) {
            return res.status(404).json({ erro: 'Nenhuma compra encontrada!' });
        }
        console.log(clientesCompras)
        const resultado = clientesCompras.map(compra => ({
            id_cliente: compra.id_cliente,
            nome_cliente: compra.cliente.nome,
            total_compras: compra.dataValues.total_compras 
        }));

        res.status(200).json(resultado);
    } catch (error) {
        console.log(error);
        res.status(500).json({ erro: "Erro interno no servidor!" });
    }
});


compra.get("/relatorio/produtos-vendidos",verifyToken ,async (req, res) => {
    try {
        const produtosVendidos = await ItensCompra.findAll({
            attributes: [
                'id_produto',
                [Sequelize.fn('sum', Sequelize.col('itensPedido.quantidade')), 'total_vendido']
            ],
            include: [{
                model: Produto,
                attributes: ['nome']
            }],
            group: ['id_produto', 'Produto.id']
        });

        if (produtosVendidos.length === 0) {
            return res.status(404).json({ erro: 'Nenhum produto vendido encontrado!' });
        }

        const resultado = produtosVendidos.map(item => ({
            id_produto: item.id_produto,
            nome_produto: item.produto.nome,
            total_vendido: item.dataValues.total_vendido
        }));

        res.status(200).json(resultado);
    } catch (error) {
        console.log(error);
        res.status(500).json({ erro: "Erro interno no servidor!" });
    }
});






async function buscarNomeCliente(id)
{
    const clientedoBanco = await Cliente.findByPk(id);
    return clientedoBanco.nome;
}

async function buscarNomeVendedor(id)
{
    const vendedordoBanco = await Usuario.findByPk(id);
    return vendedordoBanco.nome;
}
export default compra