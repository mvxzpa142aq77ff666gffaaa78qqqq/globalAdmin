import axios from "axios"
import axiosConfigs from "../../components/axiosConfig"



export const GetDataHome = async (AxiosConfigsToken) => {
    const res = await AxiosConfigsToken.get('/get_info_home')
    const data = res.data.data
    return data
}


export const GetDataHomeMaster = async (id,AxiosConfigsToken) => {
    const res = await AxiosConfigsToken.get(`/get_info_home_master/${id}`)
    const data = res.data.data
    return data
}