import { AxiosResponse } from "axios";
import { httpCliente } from "../http/index.ts";
const resourceURL: string = `/cep`;

export const useCEPService = () => {
    const token = localStorage.getItem("token");
 
    const searchCEP = async (cep:string) => {
        const url:string = `${resourceURL}/${cep}`
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
        searchCEP
    };
};
