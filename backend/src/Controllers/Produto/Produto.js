import express from 'express';
import ItensCompra from '../../model/Compras/ItensComprasModel.js';
import Produto from '../../model/Produto/ProdutoModel.js';
import verifyToken from '../../utils/jwt.js';
const produto = express()

produto.use(express.json());

produto.get("/produtos",verifyToken,async (req,res)=>
{
    try{
        const produtosdoBanco = await Produto.findAll();

        const mensagem = produtosdoBanco.map(produto =>({
            id:produto.id,
            nome:produto.nome,
            preco:produto.preco,
            quantidade:produto.quantidade,
            codigo:produto.codigo
        }))


        res.status(200).json(mensagem)
    }
    catch(erro){
        res.status(500).json({mensagem:"Erro interno no servidor!"})
    }
    
})

produto.post("/produtos",verifyToken,async (req, res) => {
    try {
        const { nome, preco, quantidade, codigo } = req.body;
        let encontrarCodigo = await Produto.findOne(
            {
                where:{
                    codigo:codigo
                }
            }
        )
        if(encontrarCodigo)
        {
            return res.status(404).json({ erro: 'Esse produto já está cadastrado!' });
        }
        const novoProduto = await Produto.create({
            nome,
            preco,
            quantidade,
            codigo
        });

        res.status(200).json({ mensagem: `O produto ${novoProduto.nome} foi adicionado com sucesso!` });
    } catch (error) {
        console.log(error)
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});

produto.put("/produtos/:id",verifyToken,async (req, res) => {
    try {
        let id = req.params.id;
         
        const { nome, preco, quantidade } = req.body;

        let produtoParaAtualizar = await Produto.findByPk(id);
        
        if (!produtoParaAtualizar) {
            return res.status(400).json({ erro: 'Produto não encontrado' });
        }

        produtoParaAtualizar.nome = nome;
        produtoParaAtualizar.preco = preco;
        produtoParaAtualizar.quantidade = quantidade;

        await produtoParaAtualizar.save();

        res.status(200).json(produtoParaAtualizar);
    } catch (error) {
        console.log(error);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});

produto.delete("/produtos/:id",verifyToken,async (req,res)=>
{
    try{
        let index = req.params.id
        
        let itensDeCompra = await ItensCompra.findAll({ where: { id_produto: index } });

        if (itensDeCompra.length > 0) {
            return res.status(400).json({ erro: 'Este produto não pode ser excluído porque está associado a itens de compra.' });
        }

        let produtoparaDeletar = await Produto.findByPk(index)
    
        if (!produtoparaDeletar) {
            return res.status(404).json({ erro: 'O produto não encontrado' });
        }
        await produtoparaDeletar.destroy()
        
        res.status(201).json({mensagem:`Produto com id ${req.params.id} excluído com sucesso!`})
    }
    catch(erro)
    {
        console.log(erro);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
    
})


export default produto