import { Table, TableCaption, TableContainer, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useState } from "react";
import { Nav } from "../../utils/BarraNavegação/Nav";
import { Mensagem } from "../../utils/Mensagem/MensagemStatus";
import { ClientesBanco } from "./ClientesBanco";
export const ListarClientes = ()=>
{
    const [erro, setErro] = useState("");
    const [mensagem, setMensagem] = useState("");
    
    return(
        <>
            <Nav/>
            <Mensagem erro={erro} mensagem={mensagem}/>
            <TableContainer>
                    <Table>
                        <TableCaption placement="top">Clientes cadastrados</TableCaption>
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
                       <ClientesBanco setErro={setErro} setMensagem={setMensagem}/>
                    </Table>
            </TableContainer>
        </>
    )
}