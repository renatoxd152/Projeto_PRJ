import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Nav } from "../../utils/BarraNavegação/Nav";
import { Mensagem } from "../../utils/Mensagem/MensagemStatus";

export const Produtos = () =>
{
    const[nome,setNome] = useState("");
    const[preco,setPreco] = useState("");
    const[quantidade,setQuantidade] = useState("");
    const[mensagem,setMensagem] = useState("");
    const[erro,setErro] = useState("");
    const handleNome = (event) =>
    {
        setNome(event.target.value);
    }
    const handlePreco = (event) =>
    {
        setPreco(event.target.value)
    }
    const handleQuantidade = (event) =>
    {
        setQuantidade(event.target.value);
    }
    const handleCadastrarProduto = async () =>
    {
        if(!nome || !preco || !quantidade) 
            setErro("Preencha todos os campos corretamente!");
        try {
            const response = await fetch('http://localhost:3000/produtos',
                {
                    method:'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    }
                    ,body:JSON.stringify({nome:nome,preco:preco,quantidade:quantidade})
                }
            )

            const data = await response.json();
            if (response.ok) {
                setMensagem(data.mensagem);
                setErro("");
            } else {
                setErro(data.erro);
                setMensagem("");
            }
            
        } catch (error) {
            
        }
        
    }
    return(
        <>
            <Nav/>
        <Flex minH="100vh" width="100%" align="center" justify="center">
                
                <Flex direction="column">
                    <Mensagem erro={erro} mensagem={mensagem}/>
                    <Text color="black" fontSize="2xl">Cadastre os seus produtos!</Text>
                    <Flex direction="column">
                        <Text>Digite o nome do produto</Text>
                        <Input type="text" value={nome} onChange={handleNome}></Input>
                    </Flex>
                    <Flex direction="column">
                        <Text>Digite o preço do produto</Text>
                        <Input type="number" value={preco} onChange={handlePreco}></Input>
                    </Flex>

                    <Flex direction="column">
                        <Text>Digite a quantidade do produto</Text>
                        <Input type="number" value={quantidade} onChange={handleQuantidade}></Input>
                    </Flex>

                    <Button colorScheme="blue" onClick={handleCadastrarProduto} m="4">Cadastrar Produto</Button>
                </Flex>
                
            </Flex>
        </>
    )
}