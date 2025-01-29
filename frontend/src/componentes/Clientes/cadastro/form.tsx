import { Button, Flex, Grid, Text } from "@chakra-ui/react";
import { useFormik } from 'formik';
import { AutoComplete, AutoCompleteCompleteEvent } from 'primereact/autocomplete';
import React, { useEffect, useState } from "react";
import { Cidade } from "../../../app/models/cidades/index.ts";
import { Cliente } from "../../../app/models/clientes";
import { Estado } from "../../../app/models/estados";
import { useCEPService } from "../../../app/services/cep.service.ts";
import { useCidadeService } from "../../../app/services/cidades.service.ts";
import { useEstadoService } from "../../../app/services/estados.service.ts";
import { InputPersonalizado } from "../../../common/input/index.tsx";
import { validationSchema } from "./validationSchemaCliente.ts";

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
    const cepService = useCEPService();
    const formik = useFormik<Cliente>(
        {
            initialValues:{...formScheme},
            onSubmit,
            validationSchema:validationSchema
        }
    );
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
    const handleEstadoChange = async (e: { value: Estado }) => {
        setListaCidades([]);
        const estadoSelecionado = e.value;
        setEstado(estadoSelecionado);
        formik.setFieldValue("estado", estadoSelecionado?.id);
    
        if (estadoSelecionado?.id) {
            const cidadesEncontradas = await cidadeService.listCidades(estadoSelecionado.id);
            setListaCidades(cidadesEncontradas);
        }
    };

    const handleCidadeAutoComplete = (e: AutoCompleteCompleteEvent) => {
        const cidadesEncontradasFiltradas = listaCidades.filter((cidade: Cidade) =>
            cidade.nome.toUpperCase().includes(e.query.toUpperCase())
        );

        setListaCidadesFiltradas(cidadesEncontradasFiltradas);
    };


    useEffect(() => {
        const fetchCEP = async () => {
            if (formik.values.cep?.length === 8) {
                try {
                    const data = await cepService.searchCEP(formik.values.cep);
                    formik.setFieldValue("rua", data.logradouro);
                    formik.setFieldValue("bairro", data.bairro);
                    formik.setFieldValue("estado",data.estado);
                } catch (error) {
                    console.error("Erro ao buscar CEP:", error);
                }
            }
        };
        fetchCEP();
    }, [formik.values.cep]);
    console.log(formik.values)
    return(
        <Flex direction="column" align="center" justify="center" flex="1">
                <form onSubmit={formik.handleSubmit}>
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                     <Flex direction="column"><InputPersonalizado label="Digite o nome do cliente" type="text" value={formik.values.nome} name="nome" onChange={formik.handleChange} error={formik.errors.nome}/></Flex>
                     <Flex direction="column"><InputPersonalizado label="Digite o email do cliente" type="text" value={formik.values.email} name="email" onChange={formik.handleChange} error={formik.errors.email}/></Flex>
                     <Flex direction="column"><InputPersonalizado label="Digite o cpf do cliente" type="text" value={formik.values.cpf} name="cpf" onChange={formik.handleChange} error={formik.errors.cpf}/></Flex>
                     <Flex direction="column"><InputPersonalizado label="Digite o telefone do cliente" type="text" value={formik.values.telefone} name="telefone" onChange={formik.handleChange} error={formik.errors.telefone}/></Flex>
                     <Flex direction="column"><InputPersonalizado label="Digite o CEP do cliente" type="text" value={formik.values.cep} name="cep" onChange={formik.handleChange} error={formik.errors.cep} comprimento={8}/></Flex>
                     <Flex direction="column"><InputPersonalizado label="Digite a rua do cliente" type="text" value={formik.values.rua} name="rua" onChange={formik.handleChange} error={formik.errors.rua}/></Flex>
                     <Flex direction="column"><InputPersonalizado label="Digite o bairro do cliente" type="text" value={formik.values.bairro} name="bairro" onChange={formik.handleChange} error={formik.errors.bairro}/></Flex>
                
                    <Flex direction="column" fontWeight="bold" mb="1">
                        <Text>Escolha o estado do cliente</Text>
                        <AutoComplete 
                        suggestions={listaEstadoFiltrado}
                        id="estado"
                        name="estado"
                        completeMethod={handleEstadoAutoComplete}
                        value={estado}
                        field="nome"
                        onChange={handleEstadoChange} dropdown/>
                    </Flex>
                    <Flex direction="column" fontWeight="bold" mb="1">
                        <Text>Escolha a cidade do cliente</Text>
                        <AutoComplete 
                        suggestions={listaCidadesFiltradas}
                        id="cidade"
                        name="cidade"
                        completeMethod={handleCidadeAutoComplete}
                        value={cidade}
                        field="nome"
                         onChange={e => {
                            setCidade(e.value);
                            formik.setFieldValue("cidade", e.value?.id);
                        }}  dropdown/>
                       
                            
                    </Flex>
                    <Flex direction="column"><InputPersonalizado label="Digite o número do cliente" type="text" value={formik.values.numero} name="numero" onChange={formik.handleChange} error={formik.errors.numero}/></Flex>
                    
                </Grid>
                <Button colorScheme="blue" type="submit" m="4">Cadastrar Cliente</Button>
                </form>
                    
        </Flex>
    )
}