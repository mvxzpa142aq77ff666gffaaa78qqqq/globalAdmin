
export const InitialState = {
    valideLogin: JSON.parse(window.localStorage.getItem("enableTCaja"))?JSON.parse(window.localStorage.getItem("enableTCaja")).valor:false,
    userId :JSON.parse(window.localStorage.getItem("enableTCaja"))?JSON.parse(window.localStorage.getItem("enableTCaja")).valorI:'',
    token :JSON.parse(window.localStorage.getItem("enableTCaja"))?JSON.parse(window.localStorage.getItem("enableTCaja")).tokI:'',
    userName:JSON.parse(window.localStorage.getItem("enableTCaja"))?JSON.parse(window.localStorage.getItem("enableTCaja")).nameI:'',
    userCode:"",
    userPhone:JSON.parse(window.localStorage.getItem("enableTCaja"))?JSON.parse(window.localStorage.getItem("enableTCaja")).phoneI:'',
    loginSpinner:false,
    errorResponseLogin:"",
    userError:false,
    typeUser:JSON.parse(window.localStorage.getItem("enableTCaja"))?JSON.parse(window.localStorage.getItem("enableTCaja")).typeI:'',
    titlePage:"",
    //porcentage:JSON.parse(window.localStorage.getItem("enableTCaja"))?JSON.parse(window.localStorage.getItem("enableTCaja")).porceI:null,
    acciones:JSON.parse(window.localStorage.getItem("enableTCaja"))?JSON.parse(window.localStorage.getItem("enableTCaja")).accI:[]
}

/*
export const InitialState = {
    valideLogin:false,
    userId :"",
    userName:"",
    userCode:"",
    userPhone:"",
    loginSpinner:false,
    errorResponseLogin:"",
    userError:false,
    typeUser:"",
    acciones:[]
}

*/