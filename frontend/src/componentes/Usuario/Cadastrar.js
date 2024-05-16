import { Button, Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
export const Cadastrar = () =>
{
    const[cpf,setCPF] = useState("");
    const[senha,setSenha] = useState("");
    const[userType,setUserType] = useState("comum");
    const handleUserTypeChange = (event)=>
    {
        setUserType(event.target.value);
    }
    const handleCPF = (event) =>
    {
        setCPF(event.target.value);
    }


    const handleSenha = (event) =>{
        setSenha(event.target.value);
    }

    const handleCadastrar = async () =>
    {
        
    }
    
    return(
        // <div>
        //     <div>
        //         <form>
        //             <h1>Acesse sua conta agora mesmo</h1>
        //             <button type='submit'>Entrar</button>
        //         </form>
        //     </div>
        //     <div>
        //     <h1>
        //         Faça o seu cadastro!
        //     </h1>
        //     <form>
        //         <div>
        //             <label>Digite seu CPF</label>
        //             <input type='text' value={cpf} onChange={handleCPF}></input>
        //         </div>
        //         <div>
        //             <label>Digite a senha</label>
        //             <input type='password' value={senha} onChange={handleSenha}></input>
        //         </div>
                
        //         <div>
        //             <label>Escolha o tipo</label>
        //             <label>
        //                 <input type='radio' value="comum" checked={userType === "comum"} onChange={handleUserTypeChange}/>
        //                 Comum
        //             </label>
        //             <label>
        //                 <input type='radio' value="admin" checked={userType === "admin"} onChange={handleUserTypeChange}/>
        //                 Admin
        //             </label>
        //         </div>

        //         <button type='submit' onClick={handleCadastrar}>Cadastrar</button>
        //     </form>
        //     </div>
        // </div>
        <Flex w="100%" minH="100vh" p="0" m="0">
            <Flex w="30%" minH="100vh" bg="blue" direction={"column"} align={"center"} justify={"center"}>
                <Text>Acesse sua conta agora mesmo</Text>
                <Button>Entrar</Button>
            </Flex>
            <Flex w="70%" minH="100vh" bg="yellow">
                <Button>Cadastrar</Button>
            </Flex>
        </Flex>
    );
}