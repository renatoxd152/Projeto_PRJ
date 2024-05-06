import bcrypt from "bcrypt";
import express from 'express';
import Usuario from '../../model/Usuario/UsuarioModel.js';
const usuario = express()
usuario.use(express.json())

usuario.post("/usuarios",async(req,res)=>
{
    try{
        const {cpf,senha,tipo} = req.body;

        const usuario = await Usuario.findOne(
            {
                where:{
                    cpf:cpf
                }
            }
        )

        if(usuario)
        {
            return res.status(400).json({mensagem:"Usuário já existe"})
        }

        const hashedPassword = await bcrypt.hash(senha, 10);

        await Usuario.create({
            cpf:cpf,senha:hashedPassword,tipo:tipo
        }) 
        


        res.status(200).json({mensagem:"O usuário foi cadastrado com sucesso"})
    }
    catch(erro)
    {
        console.log(erro)
        res.status(500).json({mensagem:"Erro interno no servidor!"})
    }
    
})

usuario.get("/usuarios",async(req,res)=>
{
    try{
        const usuariodoBanco = await Usuario.findAll();

        const mensagem = usuariodoBanco.map(usuarios=>({
            id:usuarios.id,
            tipo:usuarios.tipo
        }))
        res.status(200).send(mensagem)
    }
    catch(erro)
    {
        res.status(500).json({mensagem:"Erro interno no servidor!"})
    }

})
usuario.put("/usuarios/:id",async(req,res)=>
{
    try
    {
        let index = req.params.id;
        let{cpf,senha,tipo} = req.body;

        let usuarioparaAtualizar = await Usuario.findByPk(index);

        if(!usuarioparaAtualizar)
        {
            return res.status(404).json({mensagem:"Esse usuário não foi encontrado!"})
        }
        
        const hashedPassword = await bcrypt.hash(senha, 10);

        usuarioparaAtualizar.cpf = cpf
        usuarioparaAtualizar.senha = hashedPassword
        usuarioparaAtualizar.tipo = tipo
    
    
        await usuarioparaAtualizar.save()
    
        res.status(200).json(usuarioparaAtualizar)

    }
    catch(erro){
        res.status(500).json({mensagem:"Erro interno no servidor!"})
    }
})

usuario.delete("/usuarios/:id",async(req,res)=>
{
    try{
        let index = req.params.id
        let usuarioparaDeletar = await Usuario.findByPk(index)
    
    
        if(!usuarioparaDeletar){
            return res.status(404).json({mensagem:"O usuário não foi encontrado!"})
        }
    
        await usuarioparaDeletar.destroy()
    
        res.status(201).json({mensagem:`Usuario com id ${req.params.id} excluído com sucesso!`})
    }
    catch(erro)
    {
        res.status(500).json({mensagem:"Erro interno no servidor!"})
    }
})

export default usuario