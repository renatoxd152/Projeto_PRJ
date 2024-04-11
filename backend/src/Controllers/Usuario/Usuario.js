import express from 'express'
const usuario = express()
usuario.use(express.json())

const usuarios = [{id:"1",cpf:"13282132813",senha:"3212312321",tipo:1}]


usuario.get("/usuarios",(req,res)=>
{
    res.status(200).send(usuarios)
})

usuario.post("/usuarios",(req,res)=>
{
    const {cpf,senha,tipo} = req.body;

    const novoUsuario = {cpf,senha,tipo};

    usuarios.push(novoUsuario)
    res.status(200).json({mensagem:"O usuário foi cadastrado com sucesso"})
})

usuario.put("/usuarios/:id",(req,res)=>
{
    let index = buscarIndexCompra(req.params.id)
    usuarios[index].cpf = req.body.cpf
    usuarios[index].senha = req.body.senha
    usuarios[index].tipo = req.body.tipo
    res.status(200).json(usuarios)
})

usuario.delete("/usuarios/:id",(req,res)=>
{
    let index = buscarIndexUsuario(req.params.id)
    usuarios.splice(index,1)
    res.status(201).json({mensagem:`Usuario com id ${req.params.id} excluído com sucesso!`})
})


function buscarIndexUsuario(id)
{
    return usuarios.findIndex(usuario => usuario.id == id)
}
export default usuario