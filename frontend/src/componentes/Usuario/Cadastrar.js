import { Alert, AlertIcon, AlertTitle, Button, Flex, Input, Radio, RadioGroup, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
export const Cadastrar = () =>
{
    const[nome,setNome] = useState("")
    const[cpf,setCPF] = useState("");
    const[senha,setSenha] = useState("");
    const[senhaConfirmar,setSenhaConfirmar] = useState("");
    const[userType,setUserType] = useState("COMUM");
    const[isloged,setLogin] = useState(false);
    const {login} = useAuth();
    const navigate = useNavigate();
    const[erro,setErro] = useState("")
    const[mensagem,setMensagem] = useState("")
    
    const handleCPF = (event) =>
    {
        setCPF(event.target.value);
    }

    const handleNome = (event) =>
    {
        setNome(event.target.value)
    }

    const handleSenha = (event) =>{
        setSenha(event.target.value);
    }
    const handleSenhaConfirmar = (event) =>{
        setSenhaConfirmar(event.target.value);
    }
    const handleLogin = () => {
        setCPF("");
        setNome("");
        setSenha("");
        setSenhaConfirmar("");
        setMensagem("");
        setErro("");
        setLogin(prevState => !prevState);
    }

    const handleLogar = async () =>
    {
        if(!cpf || !senha)
        {
            setErro("Preencha os campos corretamente!");
            return;
        }
        if(isloged)
        {
            try
            {
                const response = await fetch('http://localhost:3000/login',
                    {
                        method:'POST',
                        headers:
                        {
                            'Content-Type': 'application/json'
                        },
                        body:JSON.stringify({cpf:cpf,senha:senha})

                    }
                )

                const data = await response.json();
                if (data.token) {
                    login(data.token);
                    navigate("/compras")
                    setMensagem("");
                    setErro("");
                } else {
                    setErro(data.mensagem);
                    setMensagem("");
                }
            }
            catch(error)
            {
                console.error(error);
            }
            
        }
        else
        {
            if (senha !== senhaConfirmar) {
                setErro("As senhas não correspondem!");
                return;
            }
            if(!senhaConfirmar || !nome)
            {
                setErro("Preencha os campos corretamente!");
                setMensagem("")
                return;
            }
            try
            {
                const response = await fetch('http://localhost:3000/usuarios',
                    {
                        method:'POST',
                        headers:
                        {
                            'Content-Type': 'application/json'
                        },
                        body:JSON.stringify({cpf:cpf,senha:senha,tipo:userType,nome:nome})

                    }
                )

                const data = await response.json();
                if (response.ok) {
                    setMensagem(data.mensagem);
                    setErro("");
                } else {
                    setErro(data.mensagem);
                    setMensagem("");
                }
            }
            catch(error)
            {
                console.error(error);
            }
        }
    }
    return (
        <Flex w="100%" minH="100vh" p="0" m="0">
            <Flex w="30%" minH="100vh" bg="blue" direction={"column"} align={"center"} justify={"center"}>
                <Text fontSize='3xl' color="white">{isloged ? 'Cadastre-se agora mesmo!' : 'Acesse sua conta agora mesmo!'}</Text>
                <Button onClick={handleLogin}>
                    {isloged ? 'Cadastrar' : 'Entrar'}
                </Button>
            </Flex>
            <Flex w="70%" minH="100vh" bg="white" align="center" justify="center" direction="column">
                <Flex direction="column" align="center" justify="center" width="100%" maxW="500px" p="4" boxShadow="md" borderRadius="md">
                    {
                        erro &&
                        <Alert status='error' width="100%" mb="4">
                            <AlertIcon />
                            <AlertTitle>{erro}</AlertTitle>
                        </Alert>
                    }
                    {
                        mensagem &&
                        <Alert status='success' width="100%" mb="4">
                            <AlertIcon />
                            <AlertTitle>{mensagem}</AlertTitle>
                        </Alert>
                    }
                    <Text fontSize='4xl' color="blue" mb="4">{isloged ? "Faça seu login" : "Faça seu cadastro"}</Text>
                    <Flex direction="column" width="100%" mb="4">
                        <Text>Digite seu CPF</Text>
                        <Input type='number' value={cpf} onChange={handleCPF}></Input>
                    </Flex>
                    {
                        !isloged &&
                        <Flex direction="column" width="100%" mb="4">
                            <Text>Digite o nome</Text>
                            <Input type='text' value={nome} onChange={handleNome}></Input>
                        </Flex>

                    }
                    
                    <Flex direction="column" width="100%" mb="4">
                        <Text>Digite a senha</Text>
                        <Input type='password' value={senha} onChange={handleSenha}></Input>
                    </Flex>
                    
                    {
                        !isloged &&
                        <Flex direction="column" width="100%" mb="4">
    
                            <Flex direction="column" width="100%" mb="4">
                                <Text>Digite a senha novamente</Text>
                                <Input type='password' value={senhaConfirmar} onChange={handleSenhaConfirmar}></Input>
                            </Flex>

                            <Flex direction="column" width="100%" mb="4">
                                <Text>Escolha o tipo de usuário</Text>
                                <RadioGroup value={userType} onChange={setUserType}>
                                    <Radio value='COMUM'>Comum</Radio>
                                    <Radio value='ADMIN'>Admin</Radio>
                                </RadioGroup>
                            </Flex>
                        </Flex>
                       
                    }
                    <Button colorScheme='blue' onClick={handleLogar} width="100%">{isloged ? "Login" : "Cadastrar"}</Button>
                </Flex>
            </Flex>
        </Flex>
    );
}