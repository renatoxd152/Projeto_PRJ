import { Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";
import { Nav } from "../../utils/BarraNavegação/Nav";

export const ListarProdutos = () =>
{
    return(
        <>
            <Nav/>
            <TableContainer>
                <Table>
                    <TableCaption>Produtos cadastrados</TableCaption>
                    <Thead>
                        <Th>Nome</Th>
                        <Th>Quantidade</Th>
                        <Th>Preço</Th>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>Uva</Td>
                            <Td>20</Td>
                            <Td>3.5</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    )
}