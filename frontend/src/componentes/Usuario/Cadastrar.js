import { Button, Flex, Input, Radio, RadioGroup, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export const Cadastrar = () =>
{
    const[cpf,setCPF] = useState("");
    const[senha,setSenha] = useState("");
    const[userType,setUserType] = useState("comum");
    const[isloged,setLogin] = useState(false);
    const navigate = useNavigate();
   
    const handleCPF = (event) =>
    {
        setCPF(event.target.value);
    }


    const handleSenha = (event) =>{
        setSenha(event.target.value);
    }
    const handleLogin = () => {
        setLogin(prevState => !prevState);
    }

    const handleCadastrar = async () =>
    {
        
    }

    const handleLogar = () =>
    {
        if(isloged)
        {
            navigate("/compras")
        }
    }
    return(
        <Flex w="100%" minH="100vh" p="0" m="0">
            <Flex w="30%" minH="100vh" bg="blue" direction={"column"} align={"center"} justify={"center"}>
                <Text fontSize='3xl' color="white">{isloged ? 'Cadastre-se agora mesmo!' : 'Acesse sua conta agora mesmo!'}
                </Text>
                 <Button onClick={handleLogin}>
                    {isloged ? 'Cadastrar' : 'Entrar'}
                </Button>
            </Flex>
            <Flex w="70%" minH="100vh" bg="white" align="center" justify="center" direction="column">
                    <Text fontSize='4xl' color="blue">{isloged? "Faça seu login": "Faça seu cadastro"}</Text>
                    <Flex>
                        <Text direction="column">Digite seu CPF</Text>
                        <Input type='number' value={cpf} onChange={handleCPF}></Input>
                    </Flex>
                    <Flex>
                        <Text>Digite a senha</Text>
                        <Input type='password' value={senha} onChange={handleSenha}></Input>
                    </Flex>

                    {
                        !isloged && 
                    <Flex direction="column">
                        <Text>Escolha o tipo de usuário</Text>
                        <RadioGroup value={userType} onChange={setUserType}>
                            <Radio value='COMUM'>Comum</Radio>
                            <Radio value='ADMIN'>Admin</Radio>
                        </RadioGroup>
                    </Flex>
                    }
                    
                    <Button colorScheme='blue' onClick={handleLogar}>{isloged ? "Login" : "Cadastrar"}</Button>
                
            </Flex>
        </Flex>
    );
}