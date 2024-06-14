import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useAuth } from "../../utils/AuthContext";
import { Nav } from "../../utils/BarraNavegação/Nav";
import { Mensagem } from "../../utils/Mensagem/MensagemStatus";

export const Produtos = () =>
{
    const[nome,setNome] = useState("");
    const[preco,setPreco] = useState("");
    const[codigo,setCodigo] = useState("")
    const[quantidade,setQuantidade] = useState("");
    const[mensagem,setMensagem] = useState("");
    const[erro,setErro] = useState("");
    const{token} = useAuth()
    const handleNome = (event) =>
    {
        setNome(event.target.value);
    }
    const handleCodigo = (event) =>
    {
        setCodigo(event.target.value)
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
        if(!nome || !preco || !quantidade || !codigo) 
            setErro("Preencha todos os campos corretamente!");
        else
        {
            try {
                const response = await fetch('http://localhost:3000/produtos',
                    {
                        method:'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `${token}`,
                        }
                        ,body:JSON.stringify({nome:nome,preco:preco,quantidade:quantidade,codigo:codigo})
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
        
        
    }
    return(
        <>
        <Flex minH="100vh" width="100%" align="center" justify="flex-start" direction="column">
            <Nav />
            <Flex direction="column" align="center" justify="center" flex="1">
                <Mensagem erro={erro} mensagem={mensagem} />
                <Text color="black" fontSize="2xl" mb="4">Cadastre os seus produtos!</Text>
                <Flex direction="column" mb="4">
                    <Text>Digite o nome do produto</Text>
                    <Input type="text" value={nome} onChange={handleNome} />
                </Flex>
                <Flex direction="column" mb="4">
                    <Text>Digite o código do produto</Text>
                    <Input type="text" value={codigo} onChange={handleCodigo} />
                </Flex>
                <Flex direction="column" mb="4">
                    <Text>Digite o preço do produto</Text>
                    <Input type="number" value={preco} onChange={handlePreco} />
                </Flex>
                <Flex direction="column" mb="4">
                    <Text>Digite a quantidade do produto</Text>
                    <Input type="number" value={quantidade} onChange={handleQuantidade} />
                </Flex>
                <Button colorScheme="blue" onClick={handleCadastrarProduto}>Cadastrar Produto</Button>
            </Flex>
        </Flex>
    </>
    )
}