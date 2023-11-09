import axios from "axios"
import axiosConfigs from "../axiosConfig"



export const GetMasters = async (AxiosConfigsToken) => {
    const res = await AxiosConfigsToken.get('/obtener_masters')
    const data = res.data.data.docs
    return data
}

export const GetMastersId = async (id,AxiosConfigsToken) => {
    const res = await AxiosConfigsToken.get(`/obtener_info_master/${id}`)
    const data = [res.data.data]
    return data
}