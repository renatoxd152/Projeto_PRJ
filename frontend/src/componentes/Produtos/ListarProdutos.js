import { Table, TableCaption, TableContainer, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";
import { Nav } from "../../utils/BarraNavegação/Nav";
import { ProdutosBanco } from "./ProdutosBanco";

export const ListarProdutos = () =>
{
    return(
        <>
            <Nav/>
            <TableContainer>
                <Table>
                    <TableCaption placement="top">Produtos cadastrados</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Nome</Th>
                            <Th>Quantidade</Th>
                            <Th>Preço</Th>
                        </Tr>
                    </Thead>
                    <ProdutosBanco/>
                </Table>
            </TableContainer>
        </>
    )
}