import { Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";
import { Nav } from "../../utils/BarraNavegação/Nav";
export const ListarClientes = ()=>
{
    return(
        <>
            <Nav/>

            <TableContainer>
                    <Table>
                        <TableCaption placement="top">Clientes cadastrados</TableCaption>
                        <Thead>
                            <Th>Nome</Th>
                            <Th>Email</Th>
                            <Th>CPF</Th>
                            <Th>Endereço</Th>
                            <Th>Telefone</Th>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>João</Td>
                                <Td>joao@gmail.com</Td>
                                <Td>1231231231232</Td>
                                <Td>Rua Augusto Ferreira</Td>
                                <Td>1641314422</Td>
                            </Tr>
                        </Tbody>
                    </Table>
            </TableContainer>
        </>
    )
}