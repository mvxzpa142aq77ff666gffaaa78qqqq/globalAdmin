import React,{useContext} from "react"
import axios from "axios"
import axiosConfigs from "../axiosConfig"
import { useQuery } from "@tanstack/react-query"

const id = window.localStorage.getItem("qsaw")


//const arrayMaster = ['Master_GNOB']
export const GetTodasCajas = async (AxiosConfigsToken) => {
    //console.log(userId,'dddd')
    
        const res = await AxiosConfigsToken.get(`/obtener_todas_cajas`)
        const data = res.data.data.docs
        console.log(data)
        return data 
}

export const GetMasterCajas = async (id,AxiosConfigsToken) => {

    const res = await AxiosConfigsToken.get(`/obtener_cajas_master/${id}`)
    const data = res.data.data.docs
    console.log(data)
    return data 

}




