import { ChevronDownIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Link, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React from "react";

export const Nav = () =>
{
    return(
        <Flex>
            <Box bg="#0f75fa" w="100%" minH="5vh" color="black" >
                <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>Compras</MenuButton>
                    <MenuList>
                        <MenuItem><Link href='/cadastrarCompras'>Cadastrar Compras</Link></MenuItem>
                        <MenuItem><Link href='/compras'>Compras cadastradas</Link></MenuItem>
                    </MenuList>
                </Menu>
            </Box>
        </Flex>
    )
}