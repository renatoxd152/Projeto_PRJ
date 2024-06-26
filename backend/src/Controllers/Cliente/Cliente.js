import express from 'express';
import Cliente from '../../model/Cliente/ClienteModel.js';
import Compra from '../../model/Compras/ComprasModel.js';
import verifyToken from '../../utils/jwt.js';
const cliente = express()
cliente.use(express.json())

cliente.get("/clientes",verifyToken,async(req,res)=>{

    try{
        const clientesdoBanco = await Cliente.findAll();
        const mensagem = clientesdoBanco.map(cliente =>({
            id:cliente.id,
            nome:cliente.nome,
            email:cliente.email,
            cpf:cliente.cpf,
            telefone:cliente.telefone,
            rua:cliente.rua,
            bairro:cliente.bairro,
            cidade:cliente.cidade,
            estado:cliente.estado,
            numero:cliente.numero,
            cep:cliente.cep
        }))
        res.status(200).json(mensagem);
    }
    catch(erro)
    {
        res.status(500).json({mensagem:"Erro interno no servidor!"})
    }
    

})

cliente.post("/clientes",verifyToken,async(req,res)=>
{
    try
    {
        const{nome,email,cpf,telefone,rua,bairro,cidade,estado,numero,cep} = req.body;
        const existeEmail = await Cliente.findOne(
            {
                where:{
                    email:email
                }
            }
        )
        if(existeEmail)
            return res.status(400).json({mensagem:"Esse email já está cadastrado!"})
        const clienteNovo = await Cliente.create({
            nome,
            email,
            cpf,
            telefone,
            rua,
            bairro,
            cidade,
            estado,
            numero,
            cep
        })
        
        
        res.status(201).json({mensagem:`O Cliente ${clienteNovo.nome} cadastrado com sucesso!`})
    }
    catch(erro)
    {
        console.error(erro);
        res.status(500).json({mensagem:"Erro interno no servidor!"})
    }
    
})


cliente.put("/clientes/:id",verifyToken,async(req,res)=>
{
    try{

        let index = req.params.id;
        let {nome,email,cpf,rua,bairro,cidade,estado,numero,cep,telefone} = req.body;

        let clienteparaAtualizar = await Cliente.findByPk(index);

        if(!clienteparaAtualizar)
        {
            return res.status(404).json({erro:"Esse cliente não foi encontrado!"})
        }
        clienteparaAtualizar.nome = nome
        clienteparaAtualizar.email = email
        clienteparaAtualizar.cpf = cpf
        clienteparaAtualizar.telefone= telefone
        clienteparaAtualizar.rua = rua
        clienteparaAtualizar.bairro = bairro
        clienteparaAtualizar.cidade = cidade
        clienteparaAtualizar.numero = numero
        clienteparaAtualizar.cep = cep
        clienteparaAtualizar.estado = estado

        await clienteparaAtualizar.save();

        res.status(200).json(clienteparaAtualizar)
    }
    catch(error)
    {
        res.status(500).json({erro:"Erro interno no servidor!"})
    }
})


cliente.delete("/clientes/:id",verifyToken,async(req,res)=>
{
    try {
        let index = req.params.id;
        let clienteCompra = await Compra.findAll(
            {
                where:
                {
                    id_cliente:index
                }
            }
        )
        if(clienteCompra.length > 0)
        {
            return res.status(400).json({erro:"Não é possível excluir esse cliente, pois está relacionado a uma ou mais compras!"})
        }
        let clienteparaDeletar = await Cliente.findByPk(index);
    
        if(!clienteparaDeletar){
            return res.status(404).json({erro:"O cliente não foi encontrado!"})
        }
        clienteparaDeletar.destroy()
    
        res.status(201).json({mensagem:`Cliente com id ${req.params.id} excluído com sucesso!`})
    } catch (error) {
        res.status(500).json({erro:"Erro interno no servidor!"})
    }
   
})

export default cliente