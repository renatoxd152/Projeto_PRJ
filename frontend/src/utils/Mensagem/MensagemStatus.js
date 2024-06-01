import { Alert, AlertIcon, AlertTitle, Flex } from "@chakra-ui/react"

export const Mensagem = ({erro,mensagem}) =>
{
    return(
        <Flex direction="column">
            {
                        erro &&
                        <Alert status='error' width="100%" mb="4">
                            <AlertIcon />
                            <AlertTitle>{erro}</AlertTitle>
                        </Alert>
                    }
                    {
                        mensagem &&
                        <Alert status='success' width="100%" mb="4">
                            <AlertIcon />
                            <AlertTitle>{mensagem}</AlertTitle>
                        </Alert>
                    }
        </Flex>
    )
}