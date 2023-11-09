import axios from "axios"
import axiosConfigs from "../../axiosConfig"



export const GetInteresesTodos = async () => {
    const res = await axiosConfigs.get('/todos_los_intereses_a_saldo')
    const data = res.data.data.docs
    return data
}
export const GetInteresesMaster = async (userId) => {
    const res = await axiosConfigs.get(`/obtener_interes_a_saldo_master/${userId}`)
    const data = res.data.data.docs
    return data
}