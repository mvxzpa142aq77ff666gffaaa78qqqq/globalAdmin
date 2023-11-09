import axios from "axios"
import axiosConfigs from "../../../axiosConfig"



export const GetMasterInteresASaldo = async (id,AxiosConfigsToken) => {
    const res = await AxiosConfigsToken.get(`/obtener_interes_a_saldo_master/${id}`)
    const data = res.data.data.docs

    console.log(data,'ssss')
    return data
}