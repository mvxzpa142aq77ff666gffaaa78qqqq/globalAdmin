import axios from "axios"
import axiosConfigs from "../../../axiosConfig"



export const GetCajaMasterRecargas = async (id,AxiosConfigsToken) => {
    const res = await AxiosConfigsToken.get(`/obtener_recargas_por_id_caja/${id}`)
    const data = res.data.data.docs

    console.log(data,'ssss')
    return data
}