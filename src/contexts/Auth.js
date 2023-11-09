import React, { useReducer, useState } from "react"
import AppContext from "./ServiceContext";
import { InitialState } from './InitialState';
import AppReducer from "./AppReducer";
import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";
import { ACCIONES, CODE_USER, ERROR_USER, ID_USER, LOGIN_SPINNER, NAME_USER, PHONE_USER, RESP_ERROR_LOGIN, TOKEN, TYPE_USER, URL_SERVER, VALIDE_USER } from "./constantesVar";
import axiosConfigs from "../components/axiosConfig";

export default (props) => {



    const [state, dispatch] = useReducer(AppReducer, InitialState);




    /***************** LOGIN PARA INICIO DE SESION *******************************/
    const Logins = async (userName, passw, navigate) => {
        if (userName !== "" && passw !== "") {

            dispatch({
                type: LOGIN_SPINNER,
                payload: true
            })

            dispatch({
                type: ERROR_USER,
                payload: false
            })
            dispatch({
                type: RESP_ERROR_LOGIN,
                payload: ""
            })

            try {

                const logearse = await axiosConfigs({ url: `/iniciarAdmin`, method: "post", data: { "userName": userName, "passw": passw } })

                if (logearse.data.verificar) {
                    dispatch({
                        type: VALIDE_USER,
                        payload: logearse.data.userData.activeAdmin
                    })
                    dispatch({
                        type: NAME_USER,
                        payload: logearse.data.userData.userName
                    })

                    dispatch({
                        type: ID_USER,
                        payload: logearse.data.userData._id
                    })

                    if (/*logearse.data.userData.idCSMaster*/false) {
                        dispatch({
                            type: TYPE_USER,
                            payload: logearse.data.userData.userMaster[0].typeUser
                        })
                    } else {
                        dispatch({
                            type: TYPE_USER,
                            payload: logearse.data.userData.typeUser
                        })
                    }
                    dispatch({
                        type: PHONE_USER,
                        payload: logearse.data.userData.phone
                    })

                    dispatch({
                        type: CODE_USER,
                        payload: logearse.data.userData.codeVeriry
                    })
                    dispatch({
                        type: SALDO,
                        payload: logearse.data.userData.quantSolde
                    })
                    dispatch({
                        type: SALDO_EFECTIVO,
                        payload: logearse.data.userData.quantSoldeEfec
                    })
                    dispatch({
                        type: INTERES_G,
                        payload: logearse.data.userData.interesGlobal
                    })
                    dispatch({
                        type: INTERES_S,
                        payload: logearse.data.userData.interesSocio
                    })
                    dispatch({
                        type: IVA,
                        payload: logearse.data.userData.iva
                    })
                    window.localStorage.setItem("token", logearse.data.token)
                    //const elem = document.querySelector(".modal-form")
                    //var instance = M.Modal.getInstance(elem);
                    //instance.close()

                    navigate("/home")
                } else {
                    dispatch({
                        type: LOGIN_SPINNER,
                        payload: false
                    })
                    dispatch({
                        type: ERROR_USER,
                        payload: true
                    })
                    dispatch({
                        type: RESP_ERROR_LOGIN,
                        payload: logearse.data.mens
                    })

                    dispatch({
                        type: VALIDE_USER,
                        payload: false
                    })
                    dispatch({
                        type: NAME_USER,
                        payload: ""
                    })
                    dispatch({
                        type: ID_USER,
                        payload: ""
                    })

                }

            } catch (error) {
                dispatch({
                    type: LOGIN_SPINNER,
                    payload: false
                })
                dispatch({
                    type: ERROR_USER,
                    payload: true
                })
                dispatch({
                    type: RESP_ERROR_LOGIN,
                    payload: "Comprueba tu coneccion a internet"
                })
            }
        } else {
            dispatch({
                type: ERROR_USER,
                payload: true
            })
            dispatch({
                type: RESP_ERROR_LOGIN,
                payload: "Todos los campos son importantes"
            })
        }

    }

    /****************************** FIN DEL LOGIN ************************************************** */



    /**** LOGIN PARA REGISTRO DE USUARIOS */
    const Registers = async (email, contrasena, nombre) => {
        if (email !== "" && contrasena !== "" && nombre !== "") {
            //console.log(email, contrasena, nombre, paiz, genero)

            dispatch({
                type: LOGIN_SPINNER,
                payload: true
            })
            dispatch({
                type: ERROR_USER,
                payload: false
            })
            dispatch({
                type: RESP_ERROR_LOGIN,
                payload: ""
            })

            try {
                const user = await axiosConfigs({
                    method: "post",
                    data: {
                        "email": email,
                        "contrasena": contrasena,
                        "nombre": nombre,
                    },
                    url: `/registro_post`
                })
                if (user.data) {
                    dispatch({
                        type: LOGIN_SPINNER,
                        payload: false
                    })
                    dispatch({
                        type: ERROR_USER,
                        payload: true
                    })
                    dispatch({
                        type: RESP_ERROR_LOGIN,
                        payload: user.data
                    })
                    dispatch({
                        type: VALIDE_USER,
                        payload: false
                    })
                    dispatch({
                        type: TYPE_USER,
                        payload: logearse.data.userData.typeUser
                    })
                    //histo.push("/profil")
                } else {
                    dispatch({
                        type: LOGIN_SPINNER,
                        payload: false
                    })
                    dispatch({
                        type: ERROR_USER,
                        payload: true
                    })
                    dispatch({
                        type: RESP_ERROR_LOGIN,
                        payload: user.data
                    })
                }

            } catch (error) {
                dispatch({
                    type: LOGIN_SPINNER,
                    payload: false
                })
                dispatch({
                    type: ERROR_USER,
                    payload: true
                })
                dispatch({
                    type: RESP_ERROR_LOGIN,
                    payload: "Comprueba tu coneccion a internet"
                })
            }
        } else {
            dispatch({
                type: ERROR_USER,
                payload: true
            })
            dispatch({
                type: RESP_ERROR_LOGIN,
                payload: "Todos los campos deben ser rellenados"
            })
        }
    }
    /************************** */



    /*********** VERIFICAR TOKEN ********/


    /********* Axios config que contiene el token en el header */
    const AxiosConfigsToken = axios.create({
        baseURL: URL_SERVER,
        headers: {
            "x-access-token": state.token
        },
    });

    const RenoverToken = async () => {
        const renovar_token = await axios({ url: `${URL_SERVER}/renover_token`, method: "post", data: { token: state.token } })
        //console.log(renovar_token,"ddddd")
        if (renovar_token.data.verify) {
            window.localStorage.setItem("enableTCaja", JSON.stringify({
                valor: renovar_token.data.validarLogin,
                valorI: renovar_token.data.userData._id,
                nameI: renovar_token.data.userData.name,
                typeI: renovar_token.data.userData.typeUser,
                phoneI: renovar_token.data.userData.phone,
                //porceI: renovar_token.data.porcentage,
                accI: renovar_token.data.userData.acciones,
                tokI: renovar_token.data.token,
            }))

        
            dispatch({
                type: VALIDE_USER,
                payload: renovar_token.data.validarLogin
            })
            dispatch({
                type: TOKEN,
                payload: renovar_token.data.token
            })
            dispatch({
                type: NAME_USER,
                payload: renovar_token.data.userData.name
            })

            dispatch({
                type: ID_USER,
                payload: renovar_token.data.userData._id
            })


            dispatch({
                type: TYPE_USER,
                payload: renovar_token.data.userData.typeUser
            })
            dispatch({
                type: PHONE_USER,
                payload: renovar_token.data.userData.phone
            })

            dispatch({
                type: ACCIONES,
                payload: renovar_token.data.userData.acciones
            })


        } else {


        }


    }

    AxiosConfigsToken.interceptors.response.use(

        response => {

            if (response.data.verificarToken) {
                window.localStorage.setItem("enableTCaja", JSON.stringify({ valor: false, valorI: "", nameI: '', typeI: '', phoneI: '', accI: [] }))

                dispatch({
                    type: VALIDE_USER,
                    payload: false
                })
                dispatch({
                    type: NAME_USER,
                    payload: ""
                })

                dispatch({
                    type: ID_USER,
                    payload: ""
                })


                dispatch({
                    type: TYPE_USER,
                    payload: ""
                })
                dispatch({
                    type: PHONE_USER,
                    payload: ""
                })
            } else {
                RenoverToken()
            }


            return response
        }
    )
    /********* fin de axios config que contiene el token en el header */


    /*********** FIN DE  VERIFICAR TOKEN ********/


    return (
        <AppContext.Provider value={{
            dispatch,
            acciones: state.acciones,
            userId: state.userId,
            userName: state.userName,
            userPhone: state.userPhone,
            userCode: state.userCode,
            typeUser: state.typeUser,
            valideLogin: state.valideLogin,//validar si el usuario ya inicio sesion
            Logins,//funcion para login del usuario
            Registers,//funcion para resgistrarse
            loginSpinner: state.loginSpinner,//para activar el spinner durante el inicio de sesion
            errorResponseLogin: state.errorResponseLogin,//el error al inicio de sesion
            userError: state.userError,//login error boolean
            AxiosConfigsToken,
            token: state.token,

        }}>
            {props.children}
        </AppContext.Provider>
    )
};

