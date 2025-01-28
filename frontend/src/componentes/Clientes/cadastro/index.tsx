import React from "react";
import { Layout } from "../../layout/index.tsx";
import { ClienteFormCadastro } from './form.tsx';
export const CadastroCliente:React.FC = ()=>
{
    const handleSubmit = ()=>
    {
        console.log("oi")
    }
    return(
        <Layout titulo="Clientes" mensagem="">
            Cadastre os seus clientes!
            <ClienteFormCadastro onSubmit={handleSubmit}></ClienteFormCadastro>
        </Layout>
    )
}