import { Table, TableCaption, TableContainer, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useState } from "react";
import { Nav } from "../../utils/BarraNavegação/Nav";
import { Mensagem } from "../../utils/Mensagem/MensagemStatus";
import { ProdutosBanco } from "./ProdutosBanco";
export const ListarProdutos = () =>
{
    const [erro, setErro] = useState("");
    const [mensagem, setMensagem] = useState("");
    
    return(
        <>
            <Nav/>
            <Mensagem erro={erro} mensagem={mensagem}/>
            <TableContainer>
                <Table>
                    <TableCaption placement="top">Produtos cadastrados</TableCaption>
                    
                    <Thead>
                        <Tr>
                            <Th>Nome</Th>
                            <Th>Quantidade</Th>
                            <Th>Preço</Th>
                            <Th>Editar</Th>
                            <Th>Deletar</Th>
                        </Tr>
                    </Thead>
                    <ProdutosBanco setErro={setErro} setMensagem={setMensagem} />
                </Table>
            </TableContainer>
        </>
    )
}