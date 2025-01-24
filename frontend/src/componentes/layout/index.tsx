import { Flex, Text } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { Mensagem } from "../../utils/Mensagem/MensagemStatus.js";
import { MenuNav } from "./menu/index.tsx";
interface LayoutProps{
    titulo?:string;
    children?:ReactNode;
    mensagem?:string;
    erro?:string;
}
export const Layout: React.FC<LayoutProps> = (props:LayoutProps) =>
{
    return(
        <Flex minH="100vh" width="100%" align="center" justify="flex-start" direction="column">
            <MenuNav />
                <Flex direction="column" align="center" justify="center" flex="1">
                    <Mensagem erro={props.erro} mensagem={props.mensagem}/>
                    <Text color="black" fontSize="2xl">{props.titulo}</Text>
                    {props.children}
                </Flex>
        </Flex>
    )
}