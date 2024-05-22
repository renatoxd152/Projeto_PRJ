import { Button, Flex, Select, Text } from "@chakra-ui/react";
import React from "react";
import { Nav } from "../../utils/BarraNavegação/Nav";

export const CadastrarCompra = () =>
{
    const handleCadastrarCompra = () =>
    {

    }
    return(
        <>
        <Nav/>
            <Flex minH="100vh" width="100%" align="center" justify="center">
                <Flex direction="column">
                    <Text color="black" fontSize="2xl">Cadastro de compras</Text>
                    <Flex>
                        <Text>Selecione um vendedor</Text>
                        <Select>
                            <option></option>
                            <option value='1'>João</option>
                            <option value='2'>Augusto</option>
                            <option value='3'>Pedro</option>
                        </Select>
                    </Flex>

                    <Flex>
                        <Text>Selecione um cliente</Text>
                        <Select>
                            <option></option>
                            <option value='1'>Letícia</option>
                            <option value='2'>Nicole</option>
                            <option value='3'>Sandra</option>
                        </Select>
                    </Flex>
                    

                    <Button colorScheme="blue" onClick={handleCadastrarCompra} m="4">Cadastrar Compra</Button>
                </Flex>
                
            </Flex>
        </>
    )
}