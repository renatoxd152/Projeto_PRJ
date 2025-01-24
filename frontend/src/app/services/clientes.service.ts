import { AxiosResponse } from "axios"
import { httpCliente } from "../http"
const resourceURL :string  = "/estados"
export const useClienteService = () =>
{
    const list = async()=>
    {
        const response:AxiosResponse = await httpCliente.get(resourceURL);
        return response.data;
    }

    return{
        list
    }
}