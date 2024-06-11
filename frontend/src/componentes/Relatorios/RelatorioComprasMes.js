import { Flex, Select, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Chart } from 'react-google-charts';
import { useAuth } from '../../utils/AuthContext';
import { Nav } from '../../utils/BarraNavegação/Nav';
import { Mensagem } from '../../utils/Mensagem/MensagemStatus';

export const ComprasMes = () => {
    const [selectedMonth, setSelectedMonth] = useState('');
    const [reportData, setReportData] = useState(null);
    const [mensagem,setMensagem] = useState("");
    const [erro,setErro] = useState("");
    const{token} = useAuth();



    const handleMonthSelect = async(event) => {
        const selectedMonth = event.target.value;
        setSelectedMonth(selectedMonth);
      
        try {
            const response = await fetch(`http://localhost:3000/relatorio/meses/${selectedMonth}`,
                {
                    method:'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`,
                    }
                }
            );
            
            const data = await response.json();
            if (data.erro) {
                setReportData(null);
                setErro(data.erro)
                setMensagem("")
            } else {
            const formattedData = [['Dia', 'Vendas'], ...data.map(item => [item.data, item.valor])];
            setReportData(formattedData);
            }
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            setReportData(null);
        }
  };
  

  return (
    <>
      <Nav />
      <Flex direction="column" alignItems="center" padding="2rem">
        <Text fontSize="xl" marginBottom="1rem">Relatório de Compras por Mês</Text>
            <Select
            placeholder="Selecione o Mês"
            value={selectedMonth}
            onChange={handleMonthSelect}
            width="300px"
            marginBottom="1rem"
            >
            <option value="01">Janeiro</option>
            <option value="02">Fevereiro</option>
            <option value="03">Março</option>
            <option value="04">Abril</option>
            <option value="05">Maio</option>
            <option value="06">Junho</option>
            <option value="07">Julho</option>
            <option value="08">Agosto</option>
            <option value="09">Setembro</option>
            <option value="10">Outubro</option>
            <option value="11">Novembro</option>
            <option value="12">Dezembro</option>
        </Select>
        {reportData ? (
          <Chart
            chartType="LineChart"
            width="100%"
            height="400px"
            data={reportData}
            options={{
              title: 'Vendas por Dia',
              hAxis: { title: 'Dia' },
              vAxis: { title: 'Vendas' },
            }}
          />
        ) : (
            <>
            <Mensagem erro={erro} mensagem={mensagem}/>
          </>
        )}
      </Flex>
    </>
  );
};

export default ComprasMes;
