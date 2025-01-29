import * as Yup from 'yup';
import { isValidCPF } from '../../../utils/ValidaçãoCPF/index.ts';
const campoObrigatorioMensagem = "Campo Obrigatório";
const campoObrigatorioValidation = Yup.string().trim().required(campoObrigatorioMensagem);
const campoNumberValidation = Yup.number();
export const validationSchema = Yup.object().shape({
    nome:campoObrigatorioValidation,
    email:campoObrigatorioValidation.email("Email inválido"),
    cpf: Yup.string()
    .required("O CPF é obrigatório")
    .test("is-cpf-valid", "CPF inválido", (value) => value ? isValidCPF(value) : false),
    telefone:campoObrigatorioValidation,
    cep:campoObrigatorioValidation.length(8,"É necessário que tenha 8 digítos o CEP"),
    rua:campoObrigatorioValidation,
    bairo:campoObrigatorioValidation,
    estado:campoNumberValidation.required("É necessário escolher o estado"),
    cidade:campoNumberValidation.required("É necessário escolher a cidade"),
    numero:Yup.number().required(campoObrigatorioMensagem)
    
})