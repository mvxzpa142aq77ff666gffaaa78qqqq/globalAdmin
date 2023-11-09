import axios from "axios"
import axiosConfigs from "../../axiosConfig"



export const GetRecompensasTodos = async () => {
    const res = await axiosConfigs.get('/obtener_recompensas_todas')
    const data = res.data.data.docs
    return data
}
export const GetRecompensasMaster = async (userId) => {
    const res = await axiosConfigs.get(`/obtener_recompensas_master/${userId}`)
    const data = res.data.data.docs
    return data
}