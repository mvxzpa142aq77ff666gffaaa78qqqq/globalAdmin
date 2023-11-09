import axios from "axios"
import axiosConfigs from "../axiosConfig"



export const GetUsers = async (AxiosConfigsToken) => {
    const res = await AxiosConfigsToken.get('/obtener_users_admin')
    const data = res.data.data.docs
    console.log(data)
    return data
}