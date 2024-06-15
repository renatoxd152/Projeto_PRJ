import { Flex, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import { useAuth } from '../../utils/AuthContext';
import { Nav } from '../../utils/BarraNavegação/Nav';
import { Mensagem } from '../../utils/Mensagem/MensagemStatus';

const RelatorioProdutosVendidos = () => {
  const [dadosRelatorio, setDadosRelatorio] = useState([]);
  const[erro,setErro] = useState("")
    const{token} = useAuth()

  useEffect(() => {
    const fetchDadosRelatorio = async () => {
      try {
        const response = await fetch('http://localhost:3000/relatorio/produtos-vendidos', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
          },
        });
        
        if (!response.ok) {
            setErro('Erro ao buscar dados do servidor');
        }
        const data = await response.json();
        setDadosRelatorio(data);
      } catch (error) {
        console.log(error)
        setErro("Erro interno no servidor!")
      }
    };

    fetchDadosRelatorio();
  }, [token]);

  const options = {
    title: 'Quantidade de produtos vendidos',
    is3D: true,
  }
  const data = [
    ['Produto', 'Quantidade Vendida'],
    ...dadosRelatorio.map((item) => [item.nome_produto, item.total_vendido])
  ];
  
  
  return (
    <>
        <Nav/>
        <Flex direction="column" alignItems="center" padding="2rem">
            <Text fontSize="xl" marginBottom="1rem">Relatório de Produtos Vendidos</Text>
            {dadosRelatorio.length > 0 ? (
                <Chart
                width={'100%'}
                height={'400px'}
                chartType="PieChart"
                loader={<Text>Carregando gráfico...</Text>}
                data={data}
                options={options}
                />
            ) : (
                <Mensagem erro={erro}/>
            )}
        </Flex>
    </>
  );
};

export default RelatorioProdutosVendidos;
