import express from 'express';
const cliente = express()
cliente.use(express.json())

const clientes = [{id:"1",nome_completo:"Renato Porto Morillo",email:"renatomorillo@gmail.com",cpf:"46544167819",endereco:"Rua Armando Pisani 111",telefone:"16997410581"}];

cliente.get("/clientes",(req,res)=>{
    res.status(200).send(clientes);

})

cliente.post("/clientes",(req,res)=>
{
    
    const{nome_completo,email,cpf,endereco,telefone} = req.body;

    const novoCliente = {
        nome_completo,
        email,
        cpf,
        endereco,
        telefone
    };

    clientes.push(novoCliente)
    res.status(201).json({mensagem:"Cliente cadastrado com sucesso!"})
})


cliente.put("/clientes/:id",(req,res)=>
{
    let index = buscarIndexCliente(req.params.id)
    clientes[index].nome_completo = req.body.nome_completo
    clientes[index].email = req.body.email
    clientes[index].cpf = req.body.cpf
    clientes[index].endereco = req.body.endereco
    clientes[index].telefone= req.body.telefone

    res.status(200).json(clientes)
})


cliente.delete("/clientes/:id",(req,res)=>
{
    let index = buscarIndexCliente(req.params.id)
    clientes.splice(index,1)
    res.status(201).json({mensagem:`Cliente com id ${req.params.id} excluído com sucesso!`})
})

function buscarClienteId(id)
{
    return clientes.filter(cliente => cliente.id == id)
}

function buscarIndexCliente(id)
{
    return clientes.findIndex(cliente => cliente.id == id)
}
export default cliente