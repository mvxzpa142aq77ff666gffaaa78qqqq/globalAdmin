import axios from "axios"
import axiosConfigs from "../../axiosConfig"



export const GetEnviosTodos = async () => {
    const res = await axiosConfigs.get('/envios_todos')
    const data = res.data.data.docs
    console.log(data)
    return data
}
export const GetEnviosMaster = async (userId) => {
    const res = await axiosConfigs.get(`/envios_master/${userId}`)
    const data = res.data.data.docs
    return data
}