import React, { useContext, useState } from 'react'
import {
    CODE_USER, ID_USER,
    NAME_USER, PHONE_USER, RESP_ERROR_LOGIN, LOGIN_SPINNER,
    TYPE_USER, VALIDE_USER, ERROR_USER, ACCIONES, TOKEN
} from "./constantesVar";





const AppReducer = (state, action) => {

    const { payload, type } = action;

    switch (type) {
        
        case TOKEN:
            return {
                ...state,
                token: payload
            };
        //spinner para inicio de sesion
        case LOGIN_SPINNER:
            return {
                ...state,
                loginSpinner: payload
            };
        //respuesta del servicio si hay un error al querer inicia la sesion
        case RESP_ERROR_LOGIN:
            return {
                ...state,
                errorResponseLogin: payload
            };

        //tipo de usuario
        case TYPE_USER:
            return {
                ...state,
                typeUser: payload
            };
        //tipo de usuario
        case ACCIONES:
            return {
                ...state,
                acciones: payload
            };

        //ver si el usuario ya iniciado la sesion
        case VALIDE_USER:
            return {
                ...state,
                valideLogin: payload
            };
        //Nombre del usuario
        case NAME_USER:
            return {
                ...state,
                userName: payload
            };
        //Id de usuario
        case ID_USER:
            return {
                ...state,
                userId: payload
            };

        //Numero de telefono del usuario
        case PHONE_USER:
            return {
                ...state,
                userPhone: payload
            };
        //Codigo de verificacion del usuario
        case CODE_USER:
            return {
                ...state,
                userCode: payload
            };

        //Si hay un error al querer iniciar la sesion
        case ERROR_USER:
            return {
                ...state,
                userError: payload
            };
        default:
            return state;
    }

}

export default AppReducer