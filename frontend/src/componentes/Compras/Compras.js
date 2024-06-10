import { Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../utils/AuthContext";
import { Nav } from "../../utils/BarraNavegação/Nav";
export const Compras = () => {
    const [selectedCompra, setSelectedCompra] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [compras,setCompras] = useState([]);
    const[produtos,setProdutos] = useState([]);
    const{token} = useAuth();

    const openModal =  async(compra) => {
        setSelectedCompra(compra);
        setIsOpen(true);
        console.log(compra)
        try {
            const response = await fetch(`http://localhost:3000/itensCompras/${compra.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                },
            });
            const data = await response.json();
            
            setProdutos(data);     
        } catch (error) {
            console.log(error);
        }
    };

    const closeModal = () => {
        setSelectedCompra(null);
        setIsOpen(false);
    };
    
    useEffect(()=>
        {
            const fetchData = async () =>
            {
                try {
                    const response = await fetch('http://localhost:3000/compras',
                    {
                        method:'GET',
                        headers:{
                            'Content-Type': 'application/json',
                            'Authorization': `${token}`,
                        }, 
                    }
                )
        
                const data = await response.json();
            
                setCompras(data)
    
                } catch (error) {
                    console.log(error)
                }
            }
            
    
            fetchData();
            
        },[token])



    return (
        <>
            <Nav />
            <TableContainer>
                <Table>
                    <TableCaption placement="top">Compras cadastradas</TableCaption>
                    <Thead>
                    <Tr>
                        <Th>Vendedor</Th>
                        <Th>Cliente</Th>
                        <Th>Valor da compra</Th>
                        <Th>Data da Compra</Th>
                    </Tr>
                        
                    </Thead>
                    <Tbody>
                        {compras.map((compra, index) => (
                            <Tr key={index} onClick={() => openModal(compra)} cursor="pointer">
                                <Td>{compra.nome_vendedor}</Td>
                                <Td>{compra.nome_cliente}</Td>
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
                            <Text>{selectedCompra && selectedCompra.nome_vendedor}</Text>
                        </Flex>
                        <Flex alignItems="center">
                            <Text fontWeight="bold" color="teal.500" mr="2">Cliente:</Text>
                            <Text>{selectedCompra && selectedCompra.nome_cliente}</Text>
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
                                    <Tr>
                                        <Th>Produto</Th>
                                        <Th>Preço</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                {produtos.map((produto, index) => (
                                    <Tr key={index}>
                                        <Td>{produto.produto.nome}</Td>
                                        <Td>{produto.produto.preco}</Td>
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
