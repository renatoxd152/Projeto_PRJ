import { Flex, Select, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Chart } from 'react-google-charts';
import { Nav } from '../../utils/BarraNavegação/Nav';

export const ComprasMes = () => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [reportData, setReportData] = useState(null);

const handleMonthSelect = (event) => {
    const selectedMonth = event.target.value;
    setSelectedMonth(selectedMonth);

    const mockData = [
        ['Dia', 'Vendas'],
        ['11/02/2024', 100],
        ['11/02/2024', 150],
        ['11/03/2024', 150],
        ['11/03/2024', 30],
        ['11/03/2024', 150],
        ['11/03/2024', 40],
      ];
    
      const filteredData = mockData.filter(item => {
        const month = parseInt(item[0].split('/')[1], 10);
        return month === parseInt(selectedMonth, 10);
      });
    
      if (filteredData.length === 0) {
        setReportData(null);
      } else {
        setReportData([['Dia', 'Vendas'], ...filteredData]);
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
        {
            console.log(reportData)
        }
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
          <Text>Nenhum dado disponível para exibição.</Text>
        )}
      </Flex>
    </>
  );
};

export default ComprasMes;
