import { Search2Icon } from "@chakra-ui/icons";
import { Button, Flex, Input, InputGroup, InputLeftElement, Select, Table, TableCaption, TableContainer, Text, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useState } from "react";
import { Nav } from "../../utils/BarraNavegação/Nav";

export const CadastrarCompra = () =>
{
    const[busca,setBusca] = useState("");
    const handleBusca = (event) =>
    {
        setBusca(event.target.value);
    }
    const handleCadastrarCompra = () =>
    {   

    }
    return (
        <>
            <Nav />
            <Flex minH="100vh" width="100%" align="center" justify="flex-start" direction="column">
                <Flex width="100%" flex="1" direction="row">
                    <Flex direction="column" width="50%" justify="flex-start" align="center" bg="#e1f274" p={4}>
                        <Text color="black" fontSize="2xl" mb={4} textAlign="center" width="100%">Cadastro de compras</Text>
                        <Flex direction="column" align="flex-start" width="100%">
                            <Flex direction="column" mb={4} width="100%">
                                <Text>Selecione um vendedor</Text>
                                <Select placeholder="Selecione um vendedor">
                                    <option value='1'>João</option>
                                    <option value='2'>Augusto</option>
                                    <option value='3'>Pedro</option>
                                </Select>
                            </Flex>

                            <Flex direction="column" mb={4} width="100%">
                                <Text>Selecione um cliente</Text>
                                <Select placeholder="Selecione um cliente">
                                    <option value='1'>Letícia</option>
                                    <option value='2'>Nicole</option>
                                    <option value='3'>Sandra</option>
                                </Select>
                            </Flex>

                            <Flex mb={4} width="100%">
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents="none"
                                        children={<Search2Icon color="gray.300" />}
                                    />
                                    <Input type="text" value={busca} onChange={handleBusca} placeholder="Buscar código do produto..." />
                                </InputGroup>
                            </Flex>
                        </Flex>
                    </Flex>

                    <Flex direction="column" width="50%" p={4} flex="1" justify="flex-start">
                        <Flex flex="1" overflowY="auto">
                            <TableContainer width="100%">
                                <Table variant="simple">
                                    <TableCaption placement="top">Produtos adicionados</TableCaption>
                                    <Thead>
                                        <Tr>
                                            <Th>Nome</Th>
                                            <Th>Preço</Th>
                                            <Th>Quantidade</Th>
                                        </Tr>
                                    </Thead>
                                    {/* Aqui você adicionaria o corpo da tabela (tbody) com os dados dos produtos */}
                                </Table>
                            </TableContainer>
                        </Flex>
                        <Button colorScheme="blue" onClick={handleCadastrarCompra} m="4">Finalizar Compra</Button>
                    </Flex>
                </Flex>
            </Flex>
        </>
    );
}