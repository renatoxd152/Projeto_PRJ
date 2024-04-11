import express  from 'express'
const compra = express()
compra.use(express.json())

const compras = [{id:"1",valor_compra:25.50,data_compra:"10/04/2024",id_cliente:1}]

compra.get("/compras",(req,res)=>{
    res.status(200).send(compras)
})

compra.post("/compras",(req,res)=>
{
    const{valor_compra,data_compra,id_cliente} = req.body

    const novaCompra = {valor_compra,data_compra,id_cliente}

    compras.push(novaCompra)
    res.status(200).json({mensagem:"A compra foi cadastrada com sucesso!"})
})

compra.put("/compras/:id",(req,res)=>{
    let index = buscarIndexCompra(req.params.id)
    compras[index].valor_compra = req.body.valor_compra
    compras[index].data_compra = req.body.data_compra
    compras[index].id_cliente = req.body.id_cliente
    res.status(200).json(compras)
})

compra.delete("/compras/:id",(req,res)=>
{
    let index = buscarIndexCompra(req.params.id)
    compras.splice(index,1)
    res.status(201).json({mensagem:`Compra com id ${req.params.id} excluído com sucesso!`})
})

function buscarIndexCompra(id)
{
    return compras.findIndex(compra => compra.id == id)
}

export default compra