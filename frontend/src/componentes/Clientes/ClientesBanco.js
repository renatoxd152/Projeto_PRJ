import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Button, Flex, Grid, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Tbody, Td, Text, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import validator from 'validator';
import { useAuth } from "../../utils/AuthContext";
export const ClientesBanco = ({setErro,setMensagem}) =>
{
    const[clientes,setClientes] = useState([])
    const{token} = useAuth();
    const[clienteSelecionado,setSelecionarCliente] = useState(null);
    const[modal,setModal] = useState(false);
    const[cidades,setCidades] = useState([])
    const[estados,setEstados] = useState([])


    useEffect(()=>
        {
            const fetchEstados = async () =>
            {
                try {
                    const response = await fetch("http://localhost:3000/estados");
                    const data = await response.json();
                    setEstados(data) 
                } catch (error) {
                    console.log(error)
                }
            }
            fetchEstados()
        },[])
    
       
        useEffect(() => {
            const fetchCidades = async () => {
                try {
                    const response = await fetch(`http://localhost:3000/cidades/${clienteSelecionado.estado}`);
                    const data = await response.json();
                    setCidades(data); 
                } catch (error) {
                    console.log(error);
                }
            };
            fetchCidades();
        }, [clienteSelecionado]);

        
    const openModal = (cliente)=>
    {
        setModal(true)
        setSelecionarCliente(cliente)
    }

    const closeModal = () =>
    {
        setSelecionarCliente(null)
        setModal(false)
    }

    const handleDelete = async(cliente)=>
    {
        
        try {
            const response = await fetch(`http://localhost:3000/clientes/${cliente.id}`,
                {
                    method:'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`,
                    }
                }
            )

            const data = await response.json();
            if(data.erro)
            {
                setErro(data.erro)
                setMensagem("")
                closeModal()
            }
            else
            {
                setMensagem(data.mensagem)
                setErro("")
                setClientes(clientes.filter(c=>c.id !== cliente.id))
                closeModal()
            }

        } catch (error) {
            setErro("Erro interno no servidor!")
            setMensagem("")
        }
    }

    const handleSubmitEdit = async(cliente) =>
    {
        if (!cliente.nome || !cliente.email || !cliente.cpf || 
            !cliente.telefone || !cliente.cep || !cliente.rua || 
            !cliente.bairro || !cliente.estado || !cliente.cidade || !cliente.numero) {
            setErro("Campos obrigatórios não preenchidos");
            setMensagem("")
            closeModal()
            return;
        }
        else if (!validator.isEmail(cliente.email)) {
            setErro("Digite um email válido!");
            setMensagem("");
            closeModal()
        }
        else
        {
            try {
                const response = await fetch(`http://localhost:3000/clientes/${cliente.id}`,
                    {
                        method:'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `${token}`,
                        },
                        body:JSON.stringify({
                            nome:cliente.nome,
                            email:cliente.email,
                            cpf:cliente.cpf,
                            telefone:cliente.telefone,
                            cep: cliente.cep,
                            rua:cliente.rua,
                            bairro:cliente.bairro,
                            estado:cliente.estado,
                            cidade:cliente.cidade,
                            numero:cliente.numero})
                    }
                )
                const data = await response.json()
                if(data.erro)
                {
                    setErro(data.erro)
                    setMensagem("")
                    closeModal()
                }
                else
                {
                    setMensagem("O cliente foi atualizado com sucesso!")
                    setErro("")
                    setClientes(clientes.map(c=>c.id === cliente.id ? cliente: c))
                    closeModal()
                }

            } catch (error) {
                setErro(error)
                setMensagem("")
                closeModal()
            }
        }
    }
    
    useEffect(()=>
    {
        const fetchCidadeById = async(id)=>{
            try {
                const response = await fetch(`http://localhost:3000/cidade/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`,
                    }
                });
                const data = await response.json();
                return data.nome; 
            } catch (error) {
                console.error('Erro ao buscar cidade:', error);
                return null;
            }
        };

        const fetchData = async() =>
        {
            try {
                const response = await fetch('http://localhost:3000/clientes',
                    {
                        method:'GET',
                        headers:
                        {
                            'Content-Type': 'application/json',
                            'Authorization': `${token}`,
                        }
                    }
                )
                const data = await response.json()
                const clientesFormatados = await Promise.all(
                    data.map(async(cliente)=>
                    {
                        const nomeCidade = await fetchCidadeById(cliente.cidade);
                        return{
                            ...cliente,
                            nome_cidade:nomeCidade
                        }
                    })
                )
                setClientes(clientesFormatados);
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    },[token])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelecionarCliente((prevCliente) => ({
            ...prevCliente,
            [name]: value
        }));
    };
        
    return(
        <>
        <Tbody>
            {
                clientes.map(cliente =>
                (
                        <Tr key={cliente.id}>
                            <Td>{cliente.nome}</Td>
                            <Td>{cliente.email}</Td>
                            <Td>{cliente.cpf}</Td>
                            <Td>{cliente.telefone}</Td>
                            <Td>{cliente.rua}</Td>
                            <Td>{cliente.bairro}</Td>
                            <Td>{cliente.estado}</Td>
                            <Td>{cliente.nome_cidade}</Td>
                            <Td>{cliente.numero}</Td>
                            <Td>{cliente.cep}</Td>
                            <Td>
                                <IconButton
                                    icon={<EditIcon />}
                                    colorScheme="blue"
                                    variant="ghost"
                                    onClick={() => openModal(cliente)}
                                />
                            </Td>
                            <Td>
                                <IconButton
                                    icon={<DeleteIcon />}
                                    colorScheme="red"
                                    variant="ghost"
                                    onClick={() => handleDelete(cliente)}
                                />
                            </Td>
                        </Tr>
                )
                )
            }
        </Tbody>
        {
            clienteSelecionado &&
            (
                <Modal isOpen={modal} onClose={closeModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Editar cliente
                        
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                       
                    <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                        <Flex direction="column">
                            <Text>Digite o nome do cliente</Text>
                            <Input type="text" value={clienteSelecionado.nome} name="nome" onChange={handleChange}></Input>
                        </Flex>
                        <Flex direction="column">
                            <Text>Digite o email do cliente</Text>
                            <Input type="text" value={clienteSelecionado.email} name="email" onChange={handleChange}></Input>
                        </Flex>
                        <Flex direction="column">
                            <Text>Digite o cpf do cliente</Text>
                            <Input type="number" value={clienteSelecionado.cpf} name="cpf" onChange={handleChange}></Input>
                        </Flex>
                        <Flex direction="column">
                            <Text>Digite o telefone do cliente</Text>
                            <Input type="number" value={clienteSelecionado.telefone} name="telefone" onChange={handleChange}></Input>
                        </Flex>
        
                        <Flex direction="column">
                            <Text>Digite o CEP do cliente</Text>
                            <Input type="text" value={clienteSelecionado.cep} name="cep" maxLength={8} onChange={handleChange}></Input>
                        </Flex>
                        
                        <Flex direction="column">
                            <Text>Digite a rua do cliente</Text>
                            <Input type="text" value={clienteSelecionado.rua} name="rua" onChange={handleChange}></Input>
                        </Flex>
                        <Flex direction="column">
                            <Text>Digite o bairro do cliente</Text>
                            <Input type="text" value={clienteSelecionado.bairro} name="bairro" onChange={handleChange}></Input>
                        </Flex>
                        <Flex direction="column">
                            <Text>Escolha o estado do cliente</Text>
                            <Select placeholder='Selecione um estado' name="estado" value={clienteSelecionado.estado} onChange={handleChange}>
                                {estados.map(estado=>
                                (
                                    <option key={estado.id} value={estado.sigla}>{estado.nome}</option>
                                ))}
                            </Select>
                        </Flex>
                        <Flex direction="column">
                            <Text>Escolha a cidade do cliente</Text>
                            <Select placeholder="Selecione uma cidade" name="cidade" value={clienteSelecionado.cidade} onChange={handleChange}>
                                {
                                    cidades.map(cidade=>
                                        (
                                            <option key={cidade.id} value={cidade.id}>{cidade.nome}</option>
                                        )
                                    )
                                }
                            </Select>
                                
                        </Flex>
                        <Flex direction="column">
                            <Text>Digite o número do cliente</Text>
                            <Input type="number" name="numero" value={clienteSelecionado.numero} onChange={handleChange}></Input>
                        </Flex>
                        
                    </Grid>
                            
                    </ModalBody>

                    <ModalFooter>
                    
                        <Button colorScheme="blue" mr={3} onClick={() => handleSubmitEdit(clienteSelecionado)}>
                            Salvar
                        </Button>
                        <Button onClick={closeModal}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            )
        }
        </>
        
    )
}