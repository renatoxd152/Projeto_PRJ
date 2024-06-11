import { ChevronDownIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Link, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React from "react";

export const Nav = () => {
    return (
        <Flex>
            <Box bg="#0f75fa" w="100%" minH="5vh" color="black" p={4} alignItems="center">
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />} mr={4}>
                        Compras
                    </MenuButton>
                    <MenuList>
                        <MenuItem>
                            <Link href='/cadastrarCompras'>Cadastrar compras</Link>
                        </MenuItem>
                        <MenuItem>
                            <Link href='/compras'>Compras cadastradas</Link>
                        </MenuItem>
                    </MenuList>
                </Menu>

                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />} mr={4}>
                        Produtos
                    </MenuButton>
                    <MenuList>
                        <MenuItem>
                            <Link href='/cadastrarProduto'>Cadastrar produto</Link>
                        </MenuItem>
                        <MenuItem>
                        <Link href='/listarProdutos'>Produtos cadastrados</Link>
                        </MenuItem>
                    </MenuList>
                </Menu>

                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />} mr={4}>
                        Clientes
                    </MenuButton>
                    <MenuList>
                        <MenuItem>
                        <Link href='/cadastrarCliente'>Cadastrar cliente</Link>
                        </MenuItem>
                        <MenuItem>
                            <Link href='/listarClientes'>Clientes cadastrados</Link>
                            
                        </MenuItem>
                    </MenuList>
                </Menu>

                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                        Relatórios
                    </MenuButton>
                    <MenuList>
                        <MenuItem>
                            <Link href='/compras/mes'>Relatório de compras por mês</Link>
                        </MenuItem>
                        <MenuItem>
                            Relatório de clientes com mais compras por mês
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Box>
        </Flex>
    );
}
