import { AxiosResponse } from "axios";
import { httpCliente } from "../http/index.ts";
const resourceURL: string = `/cidades`;

export const useCidadeService = () => {
    const token = localStorage.getItem("token");
 
    const listCidades = async (idEstado:any) => {
        const url:string = `${resourceURL}/${idEstado}`
        const response: AxiosResponse = await httpCliente.get(url,
            {
                headers:{
                    Authorization:`${token}`,
                }
            }
        );
        return response.data;
    };

    return {
        listCidades
    };
};
