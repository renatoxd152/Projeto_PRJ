import { Tbody, Td, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuth } from "../../utils/AuthContext";

export const ClientesBanco = () =>
{
    const[clientes,setClientes] = useState([])
    const{token} = useAuth();


    
    
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

   
    
    return(
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
                        </Tr>
                )
                )
            }
        </Tbody>
    )
}