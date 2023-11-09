import axios from "axios"
import axiosConfigs from "../../../axiosConfig"



export const GetRecepcionesDeUnMaster = async (id,AxiosConfigsToken) => {
    const res = await AxiosConfigsToken.get(`/obtener_recepciones_master/${id}`)
    const data = res.data.data.docs
    console.log(data,'ssss')
    return data
}