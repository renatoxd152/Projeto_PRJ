import { AxiosResponse } from "axios";
import { httpCliente } from "../http/index.ts";
const resourceURL: string = "/estados";

export const useEstadoService = () => {
    const token = localStorage.getItem("token");
 
    const listEstados = async () => {
        const response: AxiosResponse = await httpCliente.get(resourceURL,
            {
                headers:{
                    Authorization:`${token}`,
                }
            }
        );
        return response.data;
    };

    return {
        listEstados
    };
};
