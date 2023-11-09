import axios from "axios"
import axiosConfigs from "../../axiosConfig"



export const GetInfoMasterGeneral = async (id,AxiosConfigsToken) => {
    const res = await AxiosConfigsToken.get(`/obtener_info_master/${id}`)
    const data = res.data.data

    console.log(data,'ssss')
    return data
}