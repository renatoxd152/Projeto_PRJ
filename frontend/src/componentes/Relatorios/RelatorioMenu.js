import { Box, Image, SimpleGrid, Text } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { Nav } from "../../utils/BarraNavegação/Nav";

export const MenuRelatorio = () => {
    const navigate = useNavigate();

    const handleRelatoriosComprasClientes = () => {
        navigate('/compras/clientes');
    };

    const handleRelatoriosVendasMes = () => {
        navigate('/compras/mes');
    };
    const handleRelatoriosProdutosVendidos = () => {
        navigate('/relatorios/produtos-vendidos');
    };

    return (
        <Box display="flex" flexDirection="column" height="100vh">
            <Nav />
            <Box flex="1" display="flex" alignItems="center" justifyContent="center">
                <SimpleGrid columns={3} spacing={4} width="80%">
                    <Box
                        bg="gray.200"
                        height="300px"
                        display="flex"
                        flexDirection="column" 
                        alignItems="center"
                        justifyContent="center"
                        cursor={"pointer"}
                        onClick={handleRelatoriosVendasMes}
                        _hover={{backgroundColor:'#7ee0df'}}
                    >
                        <Text textAlign="center" mt={2} fontSize="xl" fontWeight="semibold">Relatório de Vendas Mensais</Text>
                        <Image
                            src={process.env.PUBLIC_URL + "/imagens/carrinho.png"}
                            alt="Exemplo Imagem 1"
                            borderRadius="md"
                            boxSize="150px"
                            objectFit="cover"
                        />
                    </Box>
                    <Box
                        bg="gray.200"
                        height="300px"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        cursor={"pointer"}
                        _hover={{backgroundColor:'#7ee0df'}}
                        onClick={handleRelatoriosComprasClientes}
                    >
                        <Text textAlign="center" mt={2} fontSize="xl" fontWeight="semibold">Relatório de Compras por Clientes</Text>
                        <Image
                            src={process.env.PUBLIC_URL + "/imagens/vendas.png"}
                            alt="Exemplo Imagem 2"
                            borderRadius="md"
                            boxSize="150px"
                            objectFit="cover"
                        />
                    </Box>
                    <Box
                        bg="gray.200"
                        height="300px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        flexDirection="column"
                        cursor={"pointer"}
                        _hover={{backgroundColor:'#7ee0df'}}
                        onClick={handleRelatoriosProdutosVendidos}
                    >
                        <Text textAlign="center" mt={2} fontSize="xl" fontWeight="semibold">Relatório de Produtos mais Vendidos</Text>
                        <Image
                            src={process.env.PUBLIC_URL + "/imagens/produtos.png"}
                            alt="Exemplo Imagem 3"
                            borderRadius="md"
                            boxSize="150px"
                            objectFit="cover"
                        />
                    </Box>
                </SimpleGrid>
            </Box>
        </Box>
    );
};
