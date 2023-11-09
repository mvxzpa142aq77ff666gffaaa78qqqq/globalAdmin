import axios from "axios"
import axiosConfigs from "../../../axiosConfig"



export const getRecompensasCajaAdmin = async () => {
    const res = await axiosConfigs.get('/get_recomp_caja_admin')
    const data = res.data.data.docs
    return data
}