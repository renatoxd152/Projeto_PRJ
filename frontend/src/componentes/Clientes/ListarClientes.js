import { Table, TableCaption, TableContainer, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";
import { Nav } from "../../utils/BarraNavegação/Nav";
import { ClientesBanco } from "./ClientesBanco";
export const ListarClientes = ()=>
{
    return(
        <>
            <Nav/>

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
                            </Tr>
                        </Thead>
                       <ClientesBanco/>
                    </Table>
            </TableContainer>
        </>
    )
}