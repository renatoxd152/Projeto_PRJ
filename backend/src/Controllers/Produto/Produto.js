import express from 'express'
const produto = express()
produto.use(express.json())

const produtos = [{id:"1",nome:"Lápis",preco:3.5,quantidade:20}]

produto.get("/produtos",(req,res)=>
{
    res.status(200).send(produtos)
})

produto.post("/produtos",(req,res)=>
{
    const{nome,preco,quantidade} = req.body

    const novoProduto = {
        nome,preco,quantidade
    }

    produtos.push(novoProduto)
    res.status(200).json({mensagem:"O produto foi adicionado com sucesso!"})
})

produto.put("/produtos/:id",(req,res)=>{

    let index = buscarIndexProduto(req.params.id)
    produtos[index].nome = req.body.nome
    produtos[index].preco = req.body.preco
    produtos[index].quantidade = req.body.quantidade

    res.status(200).json(produtos)
})

produto.delete("/produtos/:id",(req,res)=>
{
    let index = buscarIndexProduto(req.params.id)
    produtos.splice(index,1)
    res.status(201).json({mensagem:`Produto com id ${req.params.id} excluído com sucesso!`})
})

function buscarIndexProduto(id)
{
    return produtos.findIndex(produto => produto.id == id)
}

export default produto