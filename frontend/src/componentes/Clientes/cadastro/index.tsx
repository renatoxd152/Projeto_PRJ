import React from "react";
import { Layout } from "../../layout";

export const CadastroCliente:React.FC = ()=>
{
    return(
        <Layout titulo="Clientes" mensagem="">
            Cadastre os seus clientes!
            <ClienteFormCadastro></ClienteFormCadastro>
        </Layout>
    )
}