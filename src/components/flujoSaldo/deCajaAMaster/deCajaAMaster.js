import axios from "axios"
import axiosConfigs from "../../axiosConfig"



export const GetDeCajaAMasterTodo = async () => {
    const res = await axiosConfigs.get('/obtener_de_caja_a_master_todo')
    const data = res.data.data.docs
    return data
}
export const GetDeCajaAMasterId = async (userId) => {
    const res = await axiosConfigs.get(`/obtener_de_caja_a_master_id_master/${userId}`)
    const data = res.data.data.docs
    return data
}