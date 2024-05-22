import { Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useState } from "react";
import { Nav } from "../../utils/BarraNavegação/Nav";

export const Compras = () => {
    const [selectedCompra, setSelectedCompra] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const openModal = (compra) => {
        setSelectedCompra(compra);
        setIsOpen(true);
    };

    const closeModal = () => {
        setSelectedCompra(null);
        setIsOpen(false);
    };

    const compras = [
        { vendedor: "João", cliente: "Sandra", valor: 100.50, data: "21/05/2024" },
        { vendedor: "João", cliente: "Pedro", valor: 124.50, data: "21/05/2024" }
    ];

    const produtos = [
        { nome: "Caneta", preco: 2.50 },
        { nome: "Lápis", preco: 1.00 },
        { nome: "Borracha", preco: 0.50 },
        { nome: "Caderno", preco: 10.00 },
        { nome: "Régua", preco: 1.50 },
        { nome: "Tesoura", preco: 3.00 },
        { nome: "Papel A4", preco: 5.00 },
        { nome: "Almofada", preco: 15.00 },
        { nome: "Copo", preco: 3.50 },
        { nome: "Toalha de mesa", preco: 8.00 },
        { nome: "Computador", preco: 800.00 },
        { nome: "Mouse", preco: 20.00 },
        { nome: "Teclado", preco: 30.00 },
        { nome: "Monitor", preco: 150.00 },
        { nome: "Impressora", preco: 100.00 },
        { nome: "Fones de ouvido", preco: 50.00 },
        { nome: "Mochila", preco: 40.00 },
        { nome: "Carregador de celular", preco: 15.00 },
        { nome: "Livro", preco: 12.00 },
        { nome: "Cadeira", preco: 70.00 },
        { nome: "Mesa", preco: 90.00 },
        { nome: "Sofá", preco: 300.00 },
        { nome: "Tapete", preco: 25.00 },
        { nome: "TV", preco: 400.00 },
        { nome: "DVD Player", preco: 50.00 },
        { nome: "Vaso de flores", preco: 10.00 },
        { nome: "Abajur", preco: 20.00 },
        { nome: "Quadro decorativo", preco: 35.00 },
        { nome: "Panela", preco: 18.00 },
        { nome: "Frigideira", preco: 15.00 },
        { nome: "Faca de cozinha", preco: 8.00 },
    ];
    
    

    return (
        <>
            <Nav />
            <TableContainer>
                <Table>
                    <TableCaption placement="top">Compras cadastradas</TableCaption>
                    <Thead>
                        <Th>Vendedor</Th>
                        <Th>Cliente</Th>
                        <Th>Valor da compra</Th>
                        <Th>Data da Compra</Th>
                    </Thead>
                    <Tbody>
                        {compras.map((compra, index) => (
                            <Tr key={index} onClick={() => openModal(compra)} cursor="pointer">
                                <Td>{compra.vendedor}</Td>
                                <Td>{compra.cliente}</Td>
                                <Td>{compra.valor}</Td>
                                <Td>{compra.data}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
            <Modal isOpen={isOpen} onClose={closeModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Detalhes da Compra</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex alignItems="center">
                            <Text fontWeight="bold" color="teal.500" mr="2">Vendedor:</Text>
                            <Text>{selectedCompra && selectedCompra.vendedor}</Text>
                        </Flex>
                        <Flex alignItems="center">
                            <Text fontWeight="bold" color="teal.500" mr="2">Cliente:</Text>
                            <Text>{selectedCompra && selectedCompra.cliente}</Text>
                        </Flex>
                        <Flex alignItems="center">
                            <Text fontWeight="bold" color="teal.500" mr="2">Valor da Compra:</Text>
                            <Text>{selectedCompra && selectedCompra.valor}</Text>
                        </Flex>
                        <Flex alignItems="center">
                            <Text fontWeight="bold" color="teal.500" mr="2">Data da Compra:</Text>
                            <Text>{selectedCompra && selectedCompra.data}</Text>
                        </Flex>

                        <TableContainer maxHeight="300px" overflowY="auto">
                            <Table>
                                <TableCaption placement="top">Produtos da compra</TableCaption>
                                <Thead>
                                    <Th>Produto</Th>
                                    <Th>Preço</Th>
                                </Thead>
                                <Tbody>
                                {produtos.map((produto, index) => (
                                    <Tr key={index}>
                                        <Td>{produto.nome}</Td>
                                        <Td>{produto.preco}</Td>
                                    </Tr>
                                ))}
                                </Tbody>
                            </Table>
                        </TableContainer>

                    </ModalBody>

                    <ModalFooter>
                        
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
