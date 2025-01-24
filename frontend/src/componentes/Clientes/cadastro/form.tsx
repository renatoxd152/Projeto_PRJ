import { Button, Flex, Grid, Input, Select, Text } from "@chakra-ui/react";
import { useFormik } from 'formik';
import React from "react";
import { Cliente } from "../../../app/models/clientes";
interface ClienteFormProps{
    onSubmit:(cliente:Cliente)=>void;
}

const formScheme: Cliente = 
{
    nome:"",
    email:"",
    cpf:"",
    telefone:"",
    cep:"",
    rua:"",
    bairro:"",
    estado:0,
    cidade:0,
    numero:0
}

export const ClienteFormCadastro:React.FC<ClienteFormProps> = (
    {
        onSubmit
    }
) =>
{
    const formik = useFormik<Cliente>(
        {
            initialValues:{...formScheme},
            onSubmit,
        }
    );
    return(
        <Flex direction="column" align="center" justify="center" flex="1">
                <form onSubmit={formik.handleSubmit}>
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <Flex direction="column">
                        <Text>Digite o nome do cliente</Text>
                        <Input type="text" value={formik.values.nome} onChange={formik.handleChange}></Input>
                    </Flex>
                    <Flex direction="column">
                        <Text>Digite o email do cliente</Text>
                        <Input type="text" value={formik.values.email} onChange={formik.handleChange}></Input>
                    </Flex>
                    <Flex direction="column">
                        <Text>Digite o cpf do cliente</Text>
                        <Input type="number" value={formik.values.cpf} onChange={formik.handleChange}></Input>
                    </Flex>
                    <Flex direction="column">
                        <Text>Digite o telefone do cliente</Text>
                        <Input type="number" value={formik.values.telefone} onChange={formik.handleChange}></Input>
                    </Flex>
    
                    <Flex direction="column">
                        <Text>Digite o CEP do cliente</Text>
                        <Input type="text" value={formik.values.cep} maxLength={8} onChange={formik.handleChange}></Input>
                    </Flex>
                    
                    <Flex direction="column">
                        <Text>Digite a rua do cliente</Text>
                        <Input type="text" value={formik.values.rua} onChange={formik.handleChange}></Input>
                    </Flex>
                    <Flex direction="column">
                        <Text>Digite o bairro do cliente</Text>
                        <Input type="text" value={formik.values.bairro} onChange={formik.handleChange}></Input>
                    </Flex>
                    <Flex direction="column">
                        <Text>Escolha o estado do cliente</Text>
                        <Select placeholder='Selecione um estado' value={formik.values.estado} onChange={formik.handleChange}>
                            {estados.map(estado=>
                            (
                                <option key={estado.id} value={estado.sigla}>{estado.nome}</option>
                            ))}
                        </Select>
                    </Flex>
                    <Flex direction="column">
                        <Text>Escolha a cidade do cliente</Text>
                        <Select placeholder="Selecione uma cidade" value={formik.values.cidade} onChange={formik.handleChange}>
                            {
                                cidades.map(cidade=>
                                    (
                                        <option key={cidade.id} value={cidade.id}>{cidade.nome}</option>
                                    )
                                )
                            }
                        </Select>
                            
                    </Flex>
                    <Flex direction="column">
                        <Text>Digite o número do cliente</Text>
                        <Input type="number" value={formik.values.numero} onChange={formik.handleChange}></Input>
                    </Flex>
                    
                </Grid>
                <Button colorScheme="blue" type="submit" m="4">Cadastrar Cliente</Button>
                </form>
                    
        </Flex>
    )
}