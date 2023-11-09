import axios from "axios"
import axiosConfigs from "../../../axiosConfig"



export const GetSaldoDeCajaAMaster = async (id,AxiosConfigsToken) => {
    const res = await AxiosConfigsToken.get(`/obtener_de_caja_a_master_id_master/${id}`)
    const data = res.data.data.docs

    console.log(data,'ssss')
    return data
}