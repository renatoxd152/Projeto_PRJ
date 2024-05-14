import React, { useState } from 'react';

const Cadastrar = () =>
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
        <div>
            <h1>
                Faça o seu cadastro!
            </h1>
            <form>
                <div>
                    <label>Digite seu CPF</label>
                    <input type='text' value={cpf} onChange={handleCPF}></input>
                </div>
                <div>
                    <label>Digite a senha</label>
                    <input type='text' value={senha} onChange={handleSenha}></input>
                </div>
                <div>
                    <label>Escolha o tipo</label>
                    <label>
                        <input type='radio' value="comum" checked={userType === "comum"} onChange={handleUserTypeChange}>
                        Comum
                        </input>
                    </label>
                    <label>
                        <input type='radio' value="admin" checked={userType === "admin"} onChange={handleUserTypeChange}>
                            Admin
                        </input>
                    </label>
                </div>

                <button type='submit' onClick={handleCadastrar}>Cadastrar</button>
            </form>
        </div>
    );
}

export default Cadastrar;