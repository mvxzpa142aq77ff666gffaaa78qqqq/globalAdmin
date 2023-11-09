import axios from "axios"
import axiosConfigs from "../../axiosConfig"



export const GetRecargasCajaAdmin = async () => {
    const res = await axiosConfigs.get('/obtener_recargar_caja_admin')
    const data = res.data.data.docs
    return data
}