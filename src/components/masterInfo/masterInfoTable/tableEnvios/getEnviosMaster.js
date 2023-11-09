import axios from "axios"
import axiosConfigs from "../../../axiosConfig"



export const GetEnviosDeUnMaster = async (id,AxiosConfigsToken) => {
    const res = await AxiosConfigsToken.get(`/obtener_envios_master/${id}`)
    const data = res.data.data.docs
    console.log(data,'ssss')
    return data
}