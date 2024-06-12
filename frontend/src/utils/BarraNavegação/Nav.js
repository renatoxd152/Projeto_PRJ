import { ChevronDownIcon, CloseIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, IconButton, Link, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export const Nav = () => {
    const {logout} = useAuth()
    const navigate = useNavigate();

    const handleDeslogar = ()=>
    {
        logout();
        return navigate("/");
    }
    return (
        <Flex bg="#0f75fa" w="100%" minH="5vh" color="black" p={4} alignItems="center">
            <Box display="flex" alignItems="center" flex="1">
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
                            <Link href='/compras/clientes'>Relatório de clientes com mais compras por mês</Link>
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Box>
            <IconButton
                icon={<CloseIcon />}
                aria-label="Close"
                ml="auto"
                _hover={{ bg: 'red', color: 'white' }}
                onClick={handleDeslogar}
            />
        </Flex>
    );
}
