import express from 'express'
import Cliente from '../../model/Cliente/ClienteModel.js'
const cliente = express()
cliente.use(express.json())

cliente.get("/clientes",async(req,res)=>{
    const clientesdoBanco = await Cliente.findAll();
    const mensagem = clientesdoBanco.map(cliente =>({
        nome:cliente.nome,
        email:cliente.email,
        cpf:cliente.cpf,
        endereco:cliente.endereco,
        telefone:cliente.telefone
    }))
    res.status(200).json(mensagem);

})

cliente.post("/clientes",async(req,res)=>
{
    
    const{nome_completo,email,cpf,endereco,telefone} = req.body;
    const clienteNovo = await Cliente.create({
        nome_completo,
        email,
        cpf,
        endereco,
        telefone
    })

    res.status(201).json({mensagem:`O Cliente ${clienteNovo.nome_completo} cadastrado com sucesso!`})
})


cliente.put("/clientes/:id",async(req,res)=>
{
    try{

        let index = req.params.id;
        let {nome,email,cpf,endereco,telefone} = req.body;

        let clienteparaAtualizar = await Cliente.findByPk(index);

        if(!clienteparaAtualizar)
        {
            return res.status(404).json({mensagem:"Esse cliente não foi encontrado!"})
        }
        clienteparaAtualizar.nome = nome
        clienteparaAtualizar.email = email
        clienteparaAtualizar = cpf
        clienteparaAtualizar.endereco = endereco
        clienteparaAtualizar.telefone= telefone

        await clienteparaAtualizar.save();

        res.status(200).json(clienteparaAtualizar)
    }
    catch(error)
    {
        res.status(500).json({mensagem:"Erro interno no servidor!"})
    }
})


cliente.delete("/clientes/:id",async(req,res)=>
{
    let index = req.params.id;

    let clienteparaDeletar = await Cliente.findByPk(index);

    if(!clienteparaDeletar){
        return res.status(404).json({mensagem:"O cliente não foi encontrado!"})
    }
    clienteparaDeletar.destroy()

    res.status(201).json({mensagem:`Cliente com id ${req.params.id} excluído com sucesso!`})
})

export default cliente