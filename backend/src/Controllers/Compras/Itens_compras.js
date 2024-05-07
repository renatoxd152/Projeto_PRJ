import express from 'express'
import ItensCompra from '../../model/Compras/ItensComprasModel.js'
const itens_compra = express()
itens_compra.use(express.json())

const itens = [{id:"1",id_compra:1,id_produto:1},{id:"12",id_compra:1,id_produto:2}]


itens_compra.get("/itensCompras/:id",async(req,res)=>{
    try {
        let id_compra = req.params.id;
        let itensdaCompra = await ItensCompra.findAll(
        {
            where: {id_compra: id_compra}
        }
        )
        res.status(200).json(itensdaCompra)
    } catch (error) {
        res.send(500).json({mensagem:"Erro interno no servidor!"})
    }
})

itens_compra.get("/itensCompras/",async(req,res)=>{
    try {
        let itensdaCompra = await ItensCompra.findAll()
        res.status(200).json(itensdaCompra)
    } catch (error) {
        res.send(500).json({mensagem:"Erro interno no servidor!"})
    }
})



itens_compra.put("/itensCompras/:id",(req,res)=>{
    let index = buscarIndexItensCompra(req.params.id)
    itens[index].id_compra = req.body.id_compra
    itens[index].id_produto = req.body.id_produto

    res.status(200).json(itens)
})

itens_compra.delete("/itensCompras/:id",(req,res)=>
{
    let index = buscarIndexItensCompra(req.params.id)
    itens.splice(index,1)
    res.status(201).json({mensagem:`O item da compra com id ${req.params.id} excluído com sucesso!`})
})

function buscarIndexItensCompra(id)
{
    return compras.findIndex(item_compra => item_compra.id == id)
}

export default itens_compra
