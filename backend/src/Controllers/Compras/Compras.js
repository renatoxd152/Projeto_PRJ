import { format } from 'date-fns'
import express from 'express'
import Cliente from '../../model/Cliente/ClienteModel.js'
import Compra from '../../model/Compras/ComprasModel.js'
import ItensCompra from '../../model/Compras/ItensComprasModel.js'
import Usuario from '../../model/Usuario/UsuarioModel.js'
const compra = express()
compra.use(express.json())


compra.get("/compras",async(req,res)=>{
    try{
        let comprasdoBanco = await Compra.findAll()

        let mensagem = comprasdoBanco.map(async (compra) => {
            
            return {
                id:compra.id,
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

compra.get("/compras/:idCliente",async(req,res)=>{
    try{

        let idCliente = req.params.idCliente;

        let comprasdoClienteBanco = await Compra.findAll({
            where:{id_cliente:idCliente}
        })

        if(!comprasdoClienteBanco)
        {
            return res.status(404).json({ erro: 'O cliente não possui compras!'});
        }

        let mensagem = comprasdoClienteBanco.map(async compras=>{
            
            return{
                nome:await buscarNomeCliente(compras.id_cliente),
                valor:compras.valor,
                data:format(compra.data, 'yyyy-MM-dd HH:mm:ss')
            }
        })
        mensagem = await Promise.all(mensagem);
        res.status(200).json(mensagem)
    }
    catch(erro)
    {
        res.status(500).json({mensagem:"Erro interno no servidor!"})
    }
})

compra.post("/compras",async(req,res)=>
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

        const data = new Date();
        const data_compra = format(data, 'yyyy-MM-dd HH:mm:ss');
        let novaCompra = await Compra.create({valor:valor_compra,id_cliente,id_admin,data:data_compra})

        
        await Promise.all(
            produtos.map(async(produto)=>{
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

compra.put("/compras/:id",async(req,res)=>{
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

compra.delete("/compras/:id",async(req,res)=>
{
    try {
        
        let index = req.params.id;
        let compraparaDeletar = await Compra.findByPk(index);

        if(!compraparaDeletar){
            return res.status(404).json({mensagem:"A compra não foi encontrado!"})
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
        res.send(500).json({mensagem:"Erro interno no servidor"})
    }
})


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