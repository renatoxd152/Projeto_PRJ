import { Button, Flex, Grid, Input, Select, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import validator from 'validator';
import { Nav } from "../../utils/BarraNavegação/Nav";
import { Mensagem } from "../../utils/Mensagem/MensagemStatus";
export const CadastrarCliente = () => {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCPF] = useState("");
    const [telefone, setTelefone] = useState("");
    const [rua, setRua] = useState("");
    const [bairro, setBairro] = useState("");
    const[estado,setEstado] = useState("");
    const [cidade, setCidade] = useState("");
    const [numero, setNumero] = useState("");
    const [cep, setCep] = useState("");
    const[estados,setEstados] = useState([])
    const[cidades,setCidades] = useState([])
    const[erro,setErro] = useState("");
    const[mensagem,setMensagem] = useState("");

    const handleNome = (event) => {
        setNome(event.target.value);
    };
    const handleEmail = (event) => {
        setEmail(event.target.value);
    };
    const handleCPF = (event) => {
        setCPF(event.target.value);
    };
    
    const handleTelefone = (event) => {
        setTelefone(event.target.value);
    };
    const handleRua = (event) => {
        setRua(event.target.value);
    };
    const handleBairro = (event) => {
        setBairro(event.target.value);
    };
    const handleCidade = (event) => {
        setCidade(event.target.value);
    };
    const handleEstado = (event) =>
    {
        setEstado(event.target.value);
    }
    const handleNumero = (event) => {
        setNumero(event.target.value);
    };
    const handleCep = (event) => {
        setCep(event.target.value);
    };

    const handleCadastrarCliente = async () => {
        if (!nome || !email || !cpf || !telefone || !cep || !rua || !bairro || !estado || !cidade || !numero) {
            setErro("Campos obrigatórios não preenchidos");
            setMensagem("")
            return;
        }
        else if (!validator.isEmail(email)) {
            setErro("Digite um email válido!");
            setMensagem("");
        }
        else{

            try {
                const response = await fetch('http://localhost:3000/clientes',
                {
                    method:'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({nome:nome,email:email,cpf:cpf,telefone:telefone,
                        cep:cep,rua:rua,bairro:bairro,estado:estado,cidade:cidade,numero:numero})
                }
                
                )
                const data = await response.json();
                setMensagem(data.mensagem);
                setErro("");
                
            } catch (error) {
                console.log(error)
            }
        }
    };
    
    useEffect(() => {
        const fetchCEP = async () => {
            if (cep.length === 8) {
                try {
                    const response = await fetch(`http://localhost:3000/cep/${cep}`);
                    
                    const data = await response.json();
                    
                    if (data) {
                        setRua(data.logradouro);
                        setBairro(data.bairro);
                        setCidade(data.localidade);
                        setEstado(data.uf);
                    } else {
                        console.error("CEP não encontrado");
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        };
        fetchCEP();
    }, [cep]);

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
                const response = await fetch(`http://localhost:3000/cidades/${estado}`);
                const data = await response.json();
                setCidades(data); 
            } catch (error) {
                console.log(error);
            }
        };
        fetchCidades();
    }, [estado]);

    
    return (
        <>
            <Nav />

            <Flex minH="100vh" width="100%" align="center" justify="center">
                <Flex direction="column">
                    <Mensagem erro={erro} mensagem={mensagem}/>
                    <Text color="black" fontSize="2xl">Cadastre seus clientes!</Text>
                    <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                        <Flex direction="column">
                            <Text>Digite o nome do cliente</Text>
                            <Input type="text" value={nome} onChange={handleNome}></Input>
                        </Flex>
                        <Flex direction="column">
                            <Text>Digite o email do cliente</Text>
                            <Input type="text" value={email} onChange={handleEmail}></Input>
                        </Flex>
                        <Flex direction="column">
                            <Text>Digite o cpf do cliente</Text>
                            <Input type="number" value={cpf} onChange={handleCPF}></Input>
                        </Flex>
                        <Flex direction="column">
                            <Text>Digite o telefone do cliente</Text>
                            <Input type="number" value={telefone} onChange={handleTelefone}></Input>
                        </Flex>
        
                        <Flex direction="column">
                            <Text>Digite o CEP do cliente</Text>
                            <Input type="text" value={cep} maxLength={8} onChange={handleCep}></Input>
                        </Flex>
                        
                        <Flex direction="column">
                            <Text>Digite a rua do cliente</Text>
                            <Input type="text" value={rua} onChange={handleRua}></Input>
                        </Flex>
                        <Flex direction="column">
                            <Text>Digite o bairro do cliente</Text>
                            <Input type="text" value={bairro} onChange={handleBairro}></Input>
                        </Flex>
                        <Flex direction="column">
                            <Text>Escolha o estado do cliente</Text>
                            <Select placeholder='Selecione um estado' value={estado} onChange={handleEstado}>
                                {estados.map(estado=>
                                (
                                    <option key={estado.id} value={estado.sigla}>{estado.nome}</option>
                                ))}
                            </Select>
                        </Flex>
                        <Flex direction="column">
                            <Text>Escolha a cidade do cliente</Text>
                            <Select placeholder="Selecione uma cidade" value={cidade} onChange={handleCidade}>
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
                            <Input type="number" value={numero} onChange={handleNumero}></Input>
                        </Flex>
                        
                    </Grid>
                    <Button colorScheme="blue" onClick={handleCadastrarCliente} m="4">Cadastrar Cliente</Button>
                </Flex>
            </Flex>
        </>
    );
};
