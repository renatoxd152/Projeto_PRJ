import { Button, Flex, Grid, Input, Text } from "@chakra-ui/react";
import { useFormik } from 'formik';
import { AutoComplete, AutoCompleteCompleteEvent } from 'primereact/autocomplete';
import React, { useEffect, useState } from "react";
import { Cidade } from "../../../app/models/cidades/index.ts";
import { Cliente } from "../../../app/models/clientes";
import { Estado } from "../../../app/models/estados";
import { useCidadeService } from "../../../app/services/cidades.service.ts";
import { useEstadoService } from "../../../app/services/estados.service.ts";

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
    const[listaEstados,setListaEstados] = useState<Estado[]>([])
    const[listaEstadoFiltrado,setListaEstadoFiltrado] = useState<Estado[]>([])
    const[estado,setEstado] = useState<Estado>();
    const[cidade,setCidade] = useState<Cidade>();
    const[listaCidades,setListaCidades] = useState<Cidade[]>([]);
    const[listaCidadesFiltradas,setListaCidadesFiltradas] = useState<Cidade[]>([]);
    const estadoService = useEstadoService();
    const cidadeService = useCidadeService();
    const formik = useFormik<Cliente>(
        {
            initialValues:{...formScheme},
            onSubmit,
        }
    );
    console.log(estado)
    const handleEstadoAutoComplete = async (e:AutoCompleteCompleteEvent)=>
    {
        if(!listaEstados.length)
        {
            const estadosEncontrados = await estadoService.listEstados();
            setListaEstados(estadosEncontrados);
        }

        const estadosEncontradosFiltrados = listaEstados.filter((estado:Estado)=>
        {
            return estado.nome?.toUpperCase().includes(e.query.toUpperCase())
        })

        setListaEstadoFiltrado(estadosEncontradosFiltrados)
    }
    useEffect(() => {
        const fetchCidades = async () => {
            if (estado?.id) {
                const cidadesEncontradas = await cidadeService.listCidades(estado.id);
                setListaCidades(cidadesEncontradas);
            }
        };
        fetchCidades();
    }, [estado,cidadeService]);

    const handleCidadeAutoComplete = (e: AutoCompleteCompleteEvent) => {
        const cidadesEncontradasFiltradas = listaCidades.filter((cidade: Cidade) =>
            cidade.nome.toUpperCase().includes(e.query.toUpperCase())
        );

        setListaCidadesFiltradas(cidadesEncontradasFiltradas);
    };
    return(
        <Flex direction="column" align="center" justify="center" flex="1">
                <form onSubmit={formik.handleSubmit}>
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <Flex direction="column">
                        <Text>Digite o nome do cliente</Text>
                        <Input type="text" value={formik.values.nome} name="nome" onChange={formik.handleChange}></Input>
                    </Flex>
                    <Flex direction="column">
                        <Text>Digite o email do cliente</Text>
                        <Input type="text" value={formik.values.email} name="email" onChange={formik.handleChange}></Input>
                    </Flex>
                    <Flex direction="column">
                        <Text>Digite o cpf do cliente</Text>
                        <Input type="number" value={formik.values.cpf} name="cpf" onChange={formik.handleChange}></Input>
                    </Flex>
                    <Flex direction="column">
                        <Text>Digite o telefone do cliente</Text>
                        <Input type="number" value={formik.values.telefone} name="telefone" onChange={formik.handleChange}></Input>
                    </Flex>
    
                    <Flex direction="column">
                        <Text>Digite o CEP do cliente</Text>
                        <Input type="text" value={formik.values.cep} name="cep" maxLength={8} onChange={formik.handleChange}></Input>
                    </Flex>
                    
                    <Flex direction="column">
                        <Text>Digite a rua do cliente</Text>
                        <Input type="text" value={formik.values.rua} name="rua" onChange={formik.handleChange}></Input>
                    </Flex>
                    <Flex direction="column">
                        <Text>Digite o bairro do cliente</Text>
                        <Input type="text" value={formik.values.bairro} name="bairro" onChange={formik.handleChange}></Input>
                    </Flex>
                    <Flex direction="column">
                        <Text>Escolha o estado do cliente</Text>
                        <AutoComplete 
                        suggestions={listaEstadoFiltrado}
                        id="estado"
                        name="estado"
                        completeMethod={handleEstadoAutoComplete}
                        value={estado}
                        field="nome"
                        onChange={e=>{
                            setEstado(e.value);
                            formik.setFieldValue("estado", e.value.id);
                        }} dropdown/>
                        {/* <Select placeholder='Selecione um estado' value={formik.values.estado} onChange={formik.handleChange}>
                            {estados.map(estado=>
                            (
                                <option key={estado.id} value={estado.sigla}>{estado.nome}</option>
                            ))}
                        </Select> */}
                    </Flex>
                    <Flex direction="column">
                        <Text>Escolha a cidade do cliente</Text>
                        <AutoComplete 
                        suggestions={listaCidadesFiltradas}
                        id="cidade"
                        name="cidade"
                        completeMethod={handleCidadeAutoComplete}
                        value={cidade}
                        field="nome"
                        onChange={e=>setCidade(e.value)} dropdown/>
                        {/* <Select placeholder="Selecione uma cidade" value={formik.values.cidade} onChange={formik.handleChange}>
                            {
                                cidades.map(cidade=>
                                    (
                                        <option key={cidade.id} value={cidade.id}>{cidade.nome}</option>
                                    )
                                )
                            }
                        </Select> */}
                            
                    </Flex>
                    <Flex direction="column">
                        <Text>Digite o número do cliente</Text>
                        <Input type="number" name="numero" value={formik.values.numero} onChange={formik.handleChange}></Input>
                    </Flex>
                    
                </Grid>
                <Button colorScheme="blue" type="submit" m="4">Cadastrar Cliente</Button>
                </form>
                    
        </Flex>
    )
}