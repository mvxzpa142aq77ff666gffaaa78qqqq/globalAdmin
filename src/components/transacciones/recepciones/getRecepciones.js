import axios from "axios"
import axiosConfigs from "../../axiosConfig"



export const GetRecepcionTodos = async () => {
    const res = await axiosConfigs.get('/recepciones_todas')
    const data = res.data.data.docs
    console.log(data)
    return data
}
export const GetRecepcionMaster = async (userId) => {
    const res = await axiosConfigs.get(`/rece_master/${userId}`)
    const data = res.data.data.docs
    return data
}