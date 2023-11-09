import React, { useEffect, useState, useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../../contexts/ServiceContext'
import { PulseLoader } from "react-spinners"
import { useNavigate } from 'react-router-dom'
import { ACCIONES, CODE_USER, ID_USER, LOGIN_SPINNER, NAME_USER, PHONE_USER, RESP_ERROR_LOGIN, SALDO, SALDO_EFECTIVO, TOKEN, TYPE_USER, URL_SERVER, VALIDE_USER, arrayAdminView, arrayMaster } from "../../contexts/constantesVar";
import 'animate.css';
import toast, { Toaster } from 'react-hot-toast';
import "./loginn.css"
import axios from 'axios'
import ReCAPTCHA from "react-google-recaptcha";
import axiosConfigs from '../../components/axiosConfig'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Alert, Avatar, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material'
import MenuAppBars from '../../components/appBar/appBarr'
import { Box, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import { AccountCircle, Grid3x3Rounded, Password, PhoneAndroid, PhoneCallback, Send, SendRounded, Visibility, VisibilityOff } from '@mui/icons-material'
import LoadingButton from '@mui/lab/LoadingButton';
import { deepPurple } from '@mui/material/colors'
import { useForm } from 'react-hook-form';
import KeyIcon from '@mui/icons-material/Key';




function Loginn() {

    const navigate = useNavigate();

    const { Logins, dispatch, errorResponseLogin, userError, Registers, userName, typeUser } = useContext(AppContext)

    const [load, setLoad] = useState(false)//estado para activar el spinner del boton submit
    const [errorInit, setErrorInit] = useState(false)
    const [errorInitMessage, setErrorInitMessage] = useState('')

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };




    //el useForm de react form hook
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors }
    } = useForm();

    //Funcion que se llama despues dpulsar el boton submit
    const onSubmit = async (data) => {
        setErrorInit(false)
        //console.log(data)

        try {
            setLoad(true)
            const logearse = await axios({ url: `${URL_SERVER}/iniciarSesion`, method: "post", data })

            if (logearse.data.verify) {
                window.localStorage.setItem("enableTCaja", JSON.stringify({
                    valor: logearse.data.validarLogin,
                    valorI: logearse.data.userData._id,
                    nameI: logearse.data.userData.name,
                    typeI: logearse.data.userData.typeUser,
                    phoneI: logearse.data.userData.phone,
                    //porceI: logearse.data.porcentage,
                    accI: logearse.data.userData.acciones,
                    tokI: logearse.data.token,
                }))

                //console.log(logearse)

                setLoad(false)
                dispatch({
                    type: VALIDE_USER,
                    payload: logearse.data.validarLogin
                })
                dispatch({
                    type: TOKEN,
                    payload: logearse.data.token
                })
                dispatch({
                    type: NAME_USER,
                    payload: logearse.data.userData.name
                })

                dispatch({
                    type: ID_USER,
                    payload: logearse.data.userData._id
                })


                dispatch({
                    type: TYPE_USER,
                    payload: logearse.data.userData.typeUser
                })
                dispatch({
                    type: PHONE_USER,
                    payload: logearse.data.userData.phone
                })

                dispatch({
                    type: ACCIONES,
                    payload: logearse.data.userData.acciones
                })



                navigate("/")


            } else {
                setLoad(false)
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

                setErrorInitMessage(logearse.data.mens)
                setErrorInit(true)

            }

        } catch (error) {
            console.log(error)
            setLoad(false)
            setErrorInitMessage('Verifica tu conexion')
            setErrorInit(true)
        }

    }


    useEffect(() => {
        if (JSON.parse(window.localStorage.getItem("enableTCaja"))) {
        } else {
            window.localStorage.setItem("enableTCaja", JSON.stringify({ valor: false, valorI: "", nameI: '', typeI: '', phoneI: '' }))
        }
    }, [])

    return (

        <Grid
            bgcolor="backgroundColorPage"
            sx={{ display: "flex", minHeight: "100vh", justifyContent: "center", alignItems: "center" }}
        >
            <Box sx={{
                height: "500px",
                width: {
                    xs: "95%",
                    sm: 400,
                    md: 400,
                    lg: 400,
                    xl: 400
                },
                bgcolor: "#fff",
                borderRadius: 1,
                display: 'flex',
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"
            }}>
                <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", width: "100%" }}>

                    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", width: "100%", marginBottom: 10 }}>
                        <div style={{ display: "flex", justifyContent: "center", width: "100%", marginBottom: 5 }}>
                            {/*<Avatar sx={{ width: 60, height: 60, bgcolor: "principalColor", color: "textColorTitle2", fontSize: 14 }}>G-NOB</Avatar>*/}
                            <img
                                src={'https://res.cloudinary.com/mumbex/image/upload/v1690124154/logo_llkugd.png'}
                                alt={"gnob"}
                                loading="lazy"
                                width={250}
                            />
                        </div>
                        {/*<Typography variant='h5' sx={{ textAlign: "center", color: "textColorTitle" }}>Inicia sesion</Typography>*/}
                    </div>

                    <div style={{ width: '95%', marginTop: 10 }}>
                        <TextField
                            label="Usuario"
                            id="outlined-size-small"
                            size="medium"
                            sx={{ width: "100%" }}
                            {...register("username", { required: "Campo requerido", minLength: 1 })}
                            error={!!errors?.username}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>

                    <div style={{ width: '95%', marginTop: 20 }}>
                        <TextField
                            label="Contraseña"
                            id="outlined-size-small"
                            defaultValue=""
                            size="medium"
                            type={showPassword ? 'text' : 'password'}
                            sx={{ width: "100%" }}
                            {...register("passw", { required: "Campo requerido", minLength: 1 })}
                            error={!!errors?.passw}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <KeyIcon />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )

                            }}
                        />
                    </div>

                    <div style={{ width: '95%', marginTop: 20 }}>
                        {
                            errorInit ?
                                <Alert severity="error">{errorInitMessage}</Alert>
                                :
                                <></>
                        }
                    </div>
                    <div style={{ width: '95%', marginTop: 20 }}>
                        <LoadingButton
                            //onClick={handleClick}
                            loading={load}
                            variant="contained"
                            color="primary"
                            type="submit"
                            sx={{ width: "100%" }}
                            size="large"
                        >
                            <span>Iniciar</span>
                        </LoadingButton>

                    </div>

                    {/*                    
                    <div style={{ width: '95%', marginTop: 20, display: "flex" }}>
                        <Link to=''>Olvide la contraseña !</Link>
                    </div>
                    */}
                </form>

            </Box>
        </Grid>

    )
}

export default Loginn
