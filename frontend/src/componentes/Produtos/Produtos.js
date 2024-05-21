import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Nav } from "../../utils/BarraNavegação/Nav";

export const Produtos = () =>
{
    const[nome,setNome] = useState("");
    const[preco,setPreco] = useState("");
    const[quantidade,setQuantidade] = useState("");
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
    const handleCadastrarProduto = () =>
    {

    }
    return(
        <>
            <Nav/>
        <Flex minH="100vh" width="100%" align="center" justify="center">
                <Flex direction="column">
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