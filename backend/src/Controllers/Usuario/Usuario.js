import bcrypt from "bcrypt";
import express from 'express';
import Usuario from '../../model/Usuario/UsuarioModel.js';
import generateToken from "../../utils/GenerateToken.js";
import verifyToken from '../../utils/jwt.js';
const usuario = express()
usuario.use(express.json())

usuario.post("/usuarios",async(req,res)=>
{
    try{
        const {nome,cpf,senha,tipo} = req.body;

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
            cpf:cpf,senha:hashedPassword,tipo:tipo,nome:nome
        }) 
        


        res.status(200).json({mensagem:"O usuário foi cadastrado com sucesso"})
    }
    catch(erro)
    {
        console.log(erro)
        res.status(500).json({mensagem:"Erro interno no servidor!"})
    }
    
})

usuario.get("/usuarios",verifyToken,async(req,res)=>
{
    try{
        const usuariodoBanco = await Usuario.findAll();

        const mensagem = usuariodoBanco.map(usuarios=>({
            id:usuarios.id,
            nome:usuarios.nome,
            tipo:usuarios.tipo
        }))
        res.status(200).send(mensagem)
    }
    catch(erro)
    {
        res.status(500).json({mensagem:"Erro interno no servidor!"})
    }

})

usuario.get("/usuarios/vendedores",verifyToken,async(req,res)=>
    {
        try{
            const usuariodoBanco = await Usuario.findAll({
                where: {
                    tipo: 'ADMIN'
                }
            });
    
            const mensagem = usuariodoBanco.map(usuarios=>({
                id:usuarios.id,
                nome:usuarios.nome,
                tipo:usuarios.tipo
            }))
            res.status(200).send(mensagem)
        }
        catch(erro)
        {
            res.status(500).json({mensagem:"Erro interno no servidor!"})
        }
    
    })

usuario.put("/usuarios/:id",verifyToken,async(req,res)=>
{
    try
    {
        let index = req.params.id;
        let{cpf,senha,tipo,nome} = req.body;

        let usuarioparaAtualizar = await Usuario.findByPk(index);

        if(!usuarioparaAtualizar)
        {
            return res.status(404).json({mensagem:"Esse usuário não foi encontrado!"})
        }
        
        const hashedPassword = await bcrypt.hash(senha, 10);

        usuarioparaAtualizar.cpf = cpf
        usuarioparaAtualizar.senha = hashedPassword
        usuarioparaAtualizar.tipo = tipo
        usuarioparaAtualizar.nome = nome
    
    
        await usuarioparaAtualizar.save()
    
        res.status(200).json(usuarioparaAtualizar)

    }
    catch(erro){
        res.status(500).json({mensagem:"Erro interno no servidor!"})
    }
})

usuario.delete("/usuarios/:id",verifyToken,async(req,res)=>
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


usuario.post('/login', async (req, res) => {
    const { cpf, senha } = req.body;

    try {
      
      const user = await Usuario.findOne({
          where: { cpf: cpf},
        });
  
      if (!user) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado' });
      }
  
      
      const passwordMatch = await bcrypt.compare(senha, user.senha);
      if (!passwordMatch) {
        return res.status(401).json({ mensagem: 'Credenciais inválidas' });
      }
      const token = generateToken(user);
      res.json({token});
    } catch (error) {
      console.error(error);
      res.status(500).json({ mensagem: 'Erro ao fazer login' });
    }
  });

export default usuario