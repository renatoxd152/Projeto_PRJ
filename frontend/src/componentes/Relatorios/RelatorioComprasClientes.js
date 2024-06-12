import { Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { useAuth } from "../../utils/AuthContext";
import { Nav } from "../../utils/BarraNavegação/Nav";

export const ComprasClientes = () =>
{
    const [comprasPorCliente, setComprasPorCliente] = useState([]);
    const [erro,setErro] = useState("")
    const{token} = useAuth()

    
    useEffect(()=>
    {
        const fetchData = async() =>
        {
            try {
                const response = await fetch("http://localhost:3000/relatorio/compras/clientes",
                    {
                        method:'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `${token}`,
                        }
                    }
                );
                const data = await response.json();
                
                if(data.erro)
                {
                    setErro(data.erro)
                }
                
                setComprasPorCliente(data)
            } catch (error) {
                setErro("Erro interno na requisição do servidor!")
            }
        }
        fetchData();
        
    },[token])
    console.log(comprasPorCliente);
    const data = [
        ['Cliente', 'Quantidade de Compras'],
        ...comprasPorCliente.map(cliente => [cliente.nome_cliente, cliente.total_compras])
    ];
      const options = {
        title: 'Clientes que mais fizeram compras',
        chartArea: { width: '30%' },
        hAxis: {
          title: 'Quantidade de Compras',
          minValue: 0,
        },
        vAxis: {
          title: 'Cliente',
        },
      };
    return(
        <>
            <Nav/>
            <Flex direction="column" alignItems="center" padding="2rem">
                <Text fontSize="xl" marginBottom="1rem">Relatório de Compras por Mês</Text>
                <Chart chartType="ColumnChart" width="100%" height="400px" data={data} options={options}/>
            </Flex>
            
        </>
    )
}