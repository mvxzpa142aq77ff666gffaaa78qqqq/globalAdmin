import axios from "axios"
import axiosConfigs from "../axiosConfig"



export const GetRoles = async (AxiosConfigsToken) => {
    const res = await AxiosConfigsToken.get('/obtener_roles')
    const data = res.data.data.docs
    //console.log(res,'sssssssss')
    return data
}