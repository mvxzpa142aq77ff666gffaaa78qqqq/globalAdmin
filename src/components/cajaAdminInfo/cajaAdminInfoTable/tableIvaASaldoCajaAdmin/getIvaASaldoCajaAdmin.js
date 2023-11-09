import axios from "axios"
import axiosConfigs from "../../../axiosConfig"



export const GetIvaASaldoCajaAdmin = async (AxiosConfigsToken) => {
    const res = await AxiosConfigsToken.get('/iva_a_saldo_caja_admin')
    const data = res.data.data.docs
    return data
}