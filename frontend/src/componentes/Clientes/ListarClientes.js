import { Search2Icon } from "@chakra-ui/icons";
import { Box, Flex, Input, InputGroup, InputLeftElement, Table, TableCaption, TableContainer, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useState } from "react";
import { Nav } from "../../utils/BarraNavegação/Nav";
import { Mensagem } from "../../utils/Mensagem/MensagemStatus";
import { ClientesBanco } from "./ClientesBanco";
export const ListarClientes = ()=>
{
    const [erro, setErro] = useState("");
    const [mensagem, setMensagem] = useState("");
    const[busca,setBusca] = useState("");
    const handleBusca = (event) =>
    {
        setBusca(event.target.value);
    } 

    return(
        <>
            <Nav/>
            <Mensagem erro={erro} mensagem={mensagem}/>
            <TableContainer>
                    <Table>
                    <TableCaption placement="top">
                    <Flex justify="center" align="center" position="relative">
                            Clientes cadastrados
                            <Box position="absolute" right="0">
                                <InputGroup w="auto">
                                    <InputLeftElement pointerEvents="none" children={<Search2Icon color="gray.300" />} />
                                    <Input type="text" value={busca} onChange={handleBusca} placeholder="Pesquisar" />
                                </InputGroup>
                            </Box>
                        </Flex>
                    </TableCaption>
                       
                        <Thead>
                            <Tr>
                                <Th>Nome</Th>
                                <Th>Email</Th>
                                <Th>CPF</Th>
                                <Th>Telefone</Th>
                                <Th>Rua</Th>
                                <Th>Bairro</Th>
                                <Th>Estado</Th>
                                <Th>Cidade</Th>
                                <Th>Número</Th>
                                <Th>CEP</Th>
                                <Th>Editar</Th>
                                <Th>Deletar</Th>
                            </Tr>
                        </Thead>
                       <ClientesBanco busca={busca} setErro={setErro} setMensagem={setMensagem}/>
                    </Table>
            </TableContainer>
        </>
    )
}