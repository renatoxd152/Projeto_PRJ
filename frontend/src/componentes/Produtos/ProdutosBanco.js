import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Button, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Tbody, Td, Text, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuth } from "../../utils/AuthContext";

export const ProdutosBanco = ({setErro,setMensagem}) =>
{
    const[produtos,setProdutos] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const{token} = useAuth();
    const [selectedProduto, setSelectedProduto] = useState(null);

    const closeModal = () => {
        setSelectedProduto(null);
        setIsOpen(false);
    };

    const openModal = (produto) => {
        setSelectedProduto(produto);
        setIsOpen(true);
        setMensagem("");
        setErro("");
    };

    useEffect(()=>
    {
        const fetchData = async () =>
        {
            try {
                const response = await fetch('http://localhost:3000/produtos',
                {
                    method:'GET',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`,
                    }, 
                }
            )
    
            const data = await response.json();
    
            setProdutos(data);

            } catch (error) {
                console.log(error)
            }
        }
        

        fetchData();
        
    },[token])

    const handleDelete = async (id) => {
        try {

            const response = await fetch(`http://localhost:3000/produtos/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                },
            });

            const data = await response.json();
            if (data.erro) {
                setErro(data.erro);
                setMensagem("");
            } else {
                setProdutos(produtos.filter(produto => produto.id !== id));
                setMensagem("Produto deletado com sucesso.");
                setErro("");
            }
        } catch (error) {
            console.log(error);
            setErro("Erro ao deletar produto.");
            setMensagem("");
        }
    };
   

    const handleSubmitEdit = async (produto) => {

        if (!produto.nome || !produto.quantidade || !produto.preco) {
            setErro("Todos os campos devem ser preenchidos.");
            setMensagem("");
            closeModal()
            return;
        }

        try {

            const response = await fetch(`http://localhost:3000/produtos/${produto.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                },
                body:JSON.stringify({nome:produto.nome,quantidade:produto.quantidade,preco:produto.preco})
            });

            const data = await response.json();
            if (data.erro) {
                setErro(data.erro);
                setMensagem("");
            } else {
                setProdutos(produtos.map(p => p.id === produto.id ? produto : p));
                setMensagem("Produto editado com sucesso.");
                setErro("");
                closeModal()
            }
        } catch (error) {
            console.log(error);
            setErro("Erro ao editar o produto.");
            setMensagem("");
            closeModal()
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedProduto((prevProduto) => ({
            ...prevProduto,
            [name]: value,
        }));
    };
    
    return(
        <>
            <Tbody>
            {produtos.map(produto => (
                <Tr key={produto.id}>
                    <Td>{produto.nome}</Td>
                    <Td>{produto.quantidade}</Td>
                    <Td>{produto.preco}</Td>
                    <Td>
                        <IconButton
                            icon={<EditIcon />}
                            colorScheme="blue"
                            variant="ghost"
                            onClick={() => openModal(produto)}
                        />
                    </Td>
                    <Td>
                        <IconButton
                            icon={<DeleteIcon />}
                            colorScheme="red"
                            variant="ghost"
                            onClick={() => handleDelete(produto.id)}
                        />
                    </Td>
                </Tr>
            ))}
            </Tbody>  
           
             {selectedProduto &&
               (
                <Modal isOpen={isOpen} onClose={closeModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Editar produto
                        
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                       
                    <Text fontWeight="bold" color="teal.500" mr="2">Nome:</Text>
                    <Input type="text" value={selectedProduto.nome} name="nome" onChange={handleChange} />
                
                
                    <Text fontWeight="bold" color="teal.500" mr="2">Quantidade:</Text>
                    <Input type="text" value={selectedProduto.quantidade} name="quantidade" onChange={handleChange} />
                
                
                    <Text fontWeight="bold" color="teal.500" mr="2">Preço:</Text>
                    <Input type="text" value={selectedProduto.preco} name="preco" onChange={handleChange} />
                        
                    </ModalBody>

                    <ModalFooter>
                    
                        <Button colorScheme="blue" mr={3} onClick={() => handleSubmitEdit(selectedProduto)}>
                            Salvar
                        </Button>
                        <Button onClick={closeModal}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
             )}
            
        </>
    )
}