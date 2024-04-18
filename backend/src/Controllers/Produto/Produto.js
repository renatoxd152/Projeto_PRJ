import express from 'express';
import Produto from '../../model/Produto/ProdutoModel.js';
const produto = express()

produto.use(express.json());

produto.get("/produtos",async (req,res)=>
{
    const produtosdoBanco = await Produto.findAll();

    const mensagem = produtosdoBanco.map(produto =>({
        nome:produto.nome,
        preco:produto.preco,
        quantidade:produto.quantidade
    }))


    res.status(200).json(mensagem)
})

produto.post("/produtos", async (req, res) => {
    try {
        const { nome, preco, quantidade } = req.body;

        const novoProduto = await Produto.create({
            nome,
            preco,
            quantidade
        });

        res.status(200).json({ mensagem: `O produto ${novoProduto.nome} foi adicionado com sucesso!` });
    } catch (error) {
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
});

produto.put("/produtos/:id", async (req, res) => {
    try {
        let id = req.params.id;
         
        const { nome, preco, quantidade } = req.body;

        let produtoParaAtualizar = await Produto.findByPk(id);
        
        if (!produtoParaAtualizar) {
            return res.status(404).json({ erro: 'Produto não encontrado' });
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

produto.delete("/produtos/:id",async (req,res)=>
{
    try{
        let index = req.params.id
        
        let produtoparaDeletar = await Produto.findByPk(index)
    
        if (!produtoparaDeletar) {
            return res.status(404).json({ erro: 'O produto não encontrado' });
        }
        produtoparaDeletar.destroy()
        
        res.status(201).json({mensagem:`Produto com id ${req.params.id} excluído com sucesso!`})
    }
    catch(erro)
    {
        console.log(error);
        res.status(500).json({ erro: 'Erro interno do servidor' });
    }
    
})


export default produto