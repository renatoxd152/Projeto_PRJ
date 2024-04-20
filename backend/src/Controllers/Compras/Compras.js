import express from 'express'
import Cliente from '../../model/Cliente/ClienteModel'
import Compra from '../../model/Compras/ComprasModel'
const compra = express()
compra.use(express.json())


compra.get("/compras",async(req,res)=>{
    try{
        let comprasdoBanco = await Compra.findAll()

        let mensagem = comprasdoBanco.map(compras=>
        ({
            cliente:buscarNomeCliente(compras.id_cliente),
            valor_compra:compras.valor,
            data:compras.data
        }))

        res.status(200).json(mensagem)
    }
    catch(erro)
    {
        res.status(500).json({mensagem:"Erro interno no servidor!"})
    }
    res.status(200).send(compras)
})

compra.post("/compras",async(req,res)=>
{
    try{
        const{valor_compra,data_compra,id_cliente,id_admin} = req.body

        await Compra.create({valor_compra,data_compra,id_cliente,id_admin})
    
        res.status(200).json({mensagem:"A compra foi cadastrada com sucesso!"})

    }
    catch(error)
    {
        res.status(500).json({mensagem:"Erro interno no servidor"})
    }
})

compra.put("/compras/:id",async(req,res)=>{
    try{
        let index = req.params.id

        let {valor,data,id_cliente,id_admin} = req.body
        let compraparaAtualizar = await Compra.findByPk(index)

        if(!compraparaAtualizar)
        {
            return res.status(404).json({mensagem:"Essa compra não foi encontrada!"})
        }
        compraparaAtualizar.valor = valor
        compraparaAtualizar.data = data
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
export default compra