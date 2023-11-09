import axios from "axios";
import { URL_SERVER } from "../contexts/constantesVar";

const axiosConfigs = axios.create({
    baseURL:URL_SERVER,
    headers: {
        "x-access-token":JSON.parse(window.localStorage.getItem("enableTCaja"))?JSON.parse(window.localStorage.getItem("enableTCaja")).tokI:""
    },
});


export default axiosConfigs