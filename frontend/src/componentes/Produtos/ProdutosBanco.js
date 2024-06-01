import { Tbody, Td, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuth } from "../../utils/AuthContext";

export const ProdutosBanco = () =>
{
    const[produtos,setProdutos] = useState([])
    const{token} = useAuth();
    
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
    return(
        <Tbody>
            {produtos.map(produto => (
                <Tr key={produto.id}>
                    <Td>{produto.nome}</Td>
                    <Td>{produto.quantidade}</Td>
                    <Td>{produto.preco}</Td>
                </Tr>
            ))}
        </Tbody>

    )
}