import Axios, { AxiosInstance } from 'axios'

export const httpCliente:AxiosInstance = Axios.create(
    {
        baseURL:"http://localhost:3000"
    }
)