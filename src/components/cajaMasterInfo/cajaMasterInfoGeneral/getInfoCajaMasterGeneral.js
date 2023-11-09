import axios from "axios"
import axiosConfigs from "../../axiosConfig"



export const GetInfoCajaMasterGeneral = async (id,AxiosConfigsToken) => {
    const res = await AxiosConfigsToken.get(`/obtener_cajas_id/${id}`)
    const data = res.data.data
    console.log(data,'ssss')
    return data
}