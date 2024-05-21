import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Nav } from "../../utils/BarraNavegação/Nav";

export const CadastrarCliente = () =>
{
    const[nome,setNome] = useState("");
    const[email,setEmail] = useState("");
    const[cpf,setCPF] = useState("");
    const[endereco,setEndereco] = useState("");
    const[telefone,setTelefone] = useState("");

    const handleNome = (event) =>
    {
        setNome(event.target.value)
    }
    const handleEmail = (event) =>
    {
        setEmail(event.target.value);
    }
    const handleCPF = (event) =>
    {
        setCPF(event.target.value);
    }
    const handleEndereco = (event) =>
    {
        setEndereco(event.target.value);
    }

    const handleTelefone = (event) =>
    {
        setTelefone(event.target.value);
    }
    const handleCadastrarCliente = (event) =>
    {
        
    }
    return(
        <>
        <Nav/>

        <Flex minH="100vh" width="100%" align="center" justify="center">
                <Flex direction="column">
                    <Text color="black" fontSize="2xl">Cadastre seus clientes!</Text>
                    <Flex direction="column">
                        <Text>Digite o nome do cliente</Text>
                        <Input type="text" value={nome} onChange={handleNome}></Input>
                    </Flex>
                    <Flex direction="column">
                        <Text>Digite o email do cliente</Text>
                        <Input type="text" value={email} onChange={handleEmail}></Input>
                    </Flex>

                    <Flex direction="column">
                        <Text>Digite o cpf do cliente</Text>
                        <Input type="number" value={cpf} onChange={handleCPF}></Input>
                    </Flex>

                    <Flex direction="column">
                        <Text>Digite o endereço do cliente</Text>
                        <Input type="text" value={endereco} onChange={handleEndereco}></Input>
                    </Flex>

                    <Flex direction="column">
                        <Text>Digite o telefone do cliente</Text>
                        <Input type="number" value={telefone} onChange={handleTelefone}></Input>
                    </Flex>

                    <Button colorScheme="blue" onClick={handleCadastrarCliente} m="4">Cadastrar Cliente</Button>
                </Flex>
                
            </Flex>
        </>
    )
}