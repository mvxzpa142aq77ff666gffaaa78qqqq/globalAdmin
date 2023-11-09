import axios from "axios"
import axiosConfigs from "../../axiosConfig"



export const GetInfoGeneralCajaAdmin = async (AxiosConfigsToken) => {
    const res = await AxiosConfigsToken.get('/obtener_info_caja_admins')
    const data = res.data.data
    return data
}