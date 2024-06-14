import express from 'express'
import ItensCompra from '../../model/Compras/ItensComprasModel.js'
import Produto from '../../model/Produto/ProdutoModel.js'
import verifyToken from '../../utils/jwt.js'
const itens_compra = express()
itens_compra.use(express.json())

const itens = [{id:"1",id_compra:1,id_produto:1},{id:"12",id_compra:1,id_produto:2}]


itens_compra.get("/itensCompras/:id",verifyToken ,async (req, res) => {
    try {
        let id_compra = req.params.id;
        let itensdaCompra = await ItensCompra.findAll({
            where: { id_compra: id_compra },
            include: {
                model: Produto,
                attributes: ['nome', 'preco']
            }
        });
        res.status(200).json(itensdaCompra);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro interno no servidor!" });
    }
});

itens_compra.get("/itensCompras/",verifyToken,async(req,res)=>{
    try {
        let itensdaCompra = await ItensCompra.findAll()
        res.status(200).json(itensdaCompra)
    } catch (error) {
        res.send(500).json({mensagem:"Erro interno no servidor!"})
    }
})



itens_compra.put("/itensCompras/:id",verifyToken,async(req,res)=>{
    let index = buscarIndexItensCompra(req.params.id)
    itens[index].id_compra = req.body.id_compra
    itens[index].id_produto = req.body.id_produto

    res.status(200).json(itens)
})

itens_compra.delete("/itensCompras/:id",verifyToken,async(req,res)=>
{
    let index = buscarIndexItensCompra(req.params.id)
    itens.splice(index,1)
    res.status(201).json({mensagem:`O item da compra com id ${req.params.id} excluído com sucesso!`})
})

function buscarIndexItensCompra(id)
{
    return compras.findIndex(item_compra => item_compra.id == id)
}

async function buscarNomeProduto(id)
{
    const produtodoBanco = await Produto.findByPk(id);
    return produtodoBanco.nome;
}
async function buscarPrecoProduto(id)
{
    const precoprodutodoBanco = await Produto.findByPk(id);
    return precoprodutodoBanco.preco;
}

export default itens_compra
