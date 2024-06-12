import { DeleteIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../utils/AuthContext";
import { Nav } from "../../utils/BarraNavegação/Nav";
import { Mensagem } from "../../utils/Mensagem/MensagemStatus";
export const Compras = () => {
    const [selectedCompra, setSelectedCompra] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [compras,setCompras] = useState([]);
    const[produtos,setProdutos] = useState([]);
    const[mensagem,setMensagem] = useState("");
    const[erro,setErro] = useState("")
    const{token} = useAuth();
   
    const openModal =  async(compra) => {
        setSelectedCompra(compra);
        setIsOpen(true);
        
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

    const handleDelete = async (compra,e) =>
    {
        e.stopPropagation();
        try {
            const response = await fetch(`http://localhost:3000/compras/${compra.id}`,
                {
                    method:'DELETE',
                    headers:
                    {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`,
                    }
                }
            )
            const data = await response.json();
            if(data.erro)
            {
                setErro(data.erro);
                setMensagem("");
            }
            else
            {
                setMensagem(data.mensagem);
                setErro("");
                setCompras(compras.filter(c => c.id !== compra.id))
            }

        } catch (error) {
            setErro(error)
        }
    }

    return (
        <>
            <Nav />
            <Mensagem erro={erro} mensagem={mensagem}/>
            <TableContainer>
                <Table>
                    <TableCaption placement="top">Compras cadastradas</TableCaption>
                    <Thead>
                    <Tr>
                        <Th>Vendedor</Th>
                        <Th>Cliente</Th>
                        <Th>Valor da compra</Th>
                        <Th>Data da Compra</Th>
                        <Th>Deletar</Th>
                    </Tr>
                        
                    </Thead>
                    <Tbody>
                        {compras.map((compra, index) => (
                            <Tr key={index} onClick={() => openModal(compra)} cursor="pointer">
                                <Td>{compra.nome_vendedor}</Td>
                                <Td>{compra.nome_cliente}</Td>
                                <Td>{compra.valor}</Td>
                                <Td>{compra.data}</Td>
                                <Td> 
                                    <IconButton
                                    icon={<DeleteIcon />}
                                    colorScheme="red"
                                    variant="ghost"
                                    onClick={(e) => handleDelete(compra,e)}/>
                                </Td>
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
