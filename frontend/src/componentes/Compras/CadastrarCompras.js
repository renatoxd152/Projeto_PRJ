import { Search2Icon, SmallCloseIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, IconButton, Input, InputGroup, InputLeftElement, Select, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../utils/AuthContext";
import { Nav } from "../../utils/BarraNavegação/Nav";
import { Mensagem } from "../../utils/Mensagem/MensagemStatus";

export const CadastrarCompra = () => {
    const [busca, setBusca] = useState("");
    const [vendedores, setVendedores] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [vendedor, setVendedor] = useState("");
    const [cliente,setCliente] = useState("");
    const [produtos, setProdutos] = useState([]);
    const [resultadosBusca, setResultadosBusca] = useState([]);
    const [produtosAdicionados,setAdicionarProduto] = useState([]);
    const[erro,setErro] = useState("");
    const[mensagem,setMensagem] = useState("");
    const{token} = useAuth()

    const handleBusca = (event) => {
        let valorBusca = event.target.value;
        setBusca(valorBusca);
        if (event.target.value) {
            const resultados = produtos.filter(produto => 
                produto.nome.toLowerCase().includes(valorBusca.toLowerCase()) ||
                produto.codigo.toLowerCase().includes(valorBusca.toLowerCase())
            );
    
            if (resultados.length === 1 && resultados[0].codigo.toLowerCase() ===  valorBusca.toLowerCase()) {
                handleAdicionarProduto(resultados[0])
                setBusca("");
                setResultadosBusca([]);
            }
            else
            {
                setResultadosBusca(resultados);
            }

           
        } else {
            setResultadosBusca([]);
        }
    };

    useEffect(() => {
        const fetchVendedores = async () => {
            try {
                const response = await fetch('http://localhost:3000/usuarios/vendedores',
                    {
                        method:'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `${token}`,
                        },
                    }
                );
                const data = await response.json();
                setVendedores(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchVendedores();
    }, [token]);

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await fetch('http://localhost:3000/clientes',
                    {
                        method:'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `${token}`,
                        },
                    }
                );
                const data = await response.json();
                setClientes(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchClientes();
    }, [token]);

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await fetch('http://localhost:3000/produtos',
                    {
                        method:'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `${token}`,
                        },
                    }
                );
                const data = await response.json();
                setProdutos(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProdutos();
    }, [token]);

    const handleVendedor = (event) => {
        setVendedor(event.target.value);
    };

    const handleCliente = (event) =>
    {
        setCliente(event.target.value);
    }

    const handleCadastrarCompra = async() => {
        let quantidadesInvalidas = produtosAdicionados.some(produto => produto.quantidade <= 0);
        if(!vendedor || !cliente)
        {
            setErro("Preencha os campos corretamente!")
        }
        else if(produtosAdicionados.length === 0)
        {
            setErro("É necessário escolher algum produto para cadastrar a compra!")
        }
        else if (quantidadesInvalidas) {
            setErro("Todas as quantidades devem ser maiores que 0!");
            return;
        }
        else
        {
            try {
                const response = await fetch("http://localhost:3000/compras",
                    {
                        method:'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `${token}`,
                        },
                        body:JSON.stringify({valor_compra:calcularTotalCompra(),
                            id_cliente:cliente,
                            id_admin:vendedor,
                            produtos: produtosAdicionados.map(produto => ({
                                id: produto.id,
                                quantidade: produto.quantidade,
                                valor_total: calcularTotalProduto(produto)
                            }))})
                    }
                )
                const data = await response.json();
                setMensagem(data.mensagem);
                setErro(data.erro)
            } catch (error) {
              console.log(error)  
            }
        }



    };

    const handleAdicionarProduto = (produto) => {
        let produtoExistente = produtosAdicionados.find(p => p.id === produto.id);
        if (produtoExistente) {
            return;
        }
    
        setAdicionarProduto(prevProdutos => [
            ...prevProdutos, 
            { ...produto, quantidade: 0 }
        ]);
    };

    const handleQuantidadeChange = (id, quantidade) => {
        setAdicionarProduto(prevProdutos => prevProdutos.map(produto => 
            produto.id === id ? { ...produto, quantidade } : produto
        ));
    };

    const calcularTotalProduto = (produto) => {
        return produto.preco * produto.quantidade;
    };

    const calcularTotalCompra = () => {
        return produtosAdicionados.reduce((total, produto) => total + calcularTotalProduto(produto), 0);
    };

    const removerProduto = (produto) =>
    {
        setAdicionarProduto(produtosAdicionados.filter(p=> p.id !== produto.id))
    }

    return (
        <>
            <Flex minH="100vh" width="100%" align="center" justify="flex-start" direction="column">
            <Nav/>
                <Flex width="100%" flex="1" direction="row">
                    <Flex direction="column" width="50%" justify="flex-start" align="center" bg="#e1f274" p={4}>
                    
                        <Text color="black" fontSize="2xl" mb={4} textAlign="center" width="100%">Cadastro de compras</Text>
                        <Flex direction="column" align="flex-start" width="100%">
                        
                            <Flex direction="column" mb={4} width="100%">
                                <Text>Selecione um vendedor</Text>
                                <Select placeholder="Selecione um vendedor" value={vendedor} onChange={handleVendedor} >
                                    {vendedores.map(vendedor => (
                                        <option key={vendedor.id} value={vendedor.id}>{vendedor.nome}</option>
                                    ))}
                                </Select>
                            </Flex>

                            <Flex direction="column" mb={4} width="100%">
                                <Text>Selecione um cliente</Text>
                                <Select placeholder="Selecione um cliente" value={cliente} onChange={handleCliente}>
                                    {clientes.map(cliente => (
                                        <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
                                    ))}
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

                            {resultadosBusca.length > 0 && (
                                <Box mt={2} width="100%">
                                    <VStack spacing={2} align="start">
                                        {resultadosBusca.map(produto => (
                                            <Box key={produto.id} p={2} border="1px solid #ccc" borderRadius="md" width="100%" bg="white">
                                                <Text onClick={() =>handleAdicionarProduto(produto)} style={{cursor:'pointer'}}>{produto.nome} - {produto.codigo}</Text>
                                            </Box>
                                        ))}
                                    </VStack>
                                </Box>
                            )}
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
                                            <Th>Preço total</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>

                                        {produtosAdicionados.map(produto=>
                                            (
                                                <Tr key={produto.id}>
                                                    <Td>{produto.nome}</Td>
                                                    <Td>{produto.preco}</Td>
                                                    <Td>
                                                    <Input 
                                                        type="number" 
                                                        value={produto.quantidade} 
                                                        onChange={(e) => handleQuantidadeChange(produto.id, e.target.value)} 
                                                        placeholder="Quantidade" 
                                                    /></Td>
                                                
                                                <Td>{calcularTotalProduto(produto)}</Td>
                                                <Td><IconButton icon={<SmallCloseIcon/>} colorScheme="red"
                                                    variant="ghost" onClick={() => removerProduto(produto)}/></Td>
                                                </Tr>
                                            )
                                        )}
                                        <Tr>
                                            <Td colSpan={2}></Td>
                                            <Td fontWeight="bold">Total</Td>
                                            <Td fontWeight="bold">{calcularTotalCompra()}</Td>
                                        </Tr>
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </Flex>
                        <Mensagem mensagem={mensagem} erro={erro}/>
                        <Button colorScheme="blue" onClick={handleCadastrarCompra} m="4">Finalizar Compra</Button>
                    </Flex>
                </Flex>
            </Flex>
        </>
    );
};
