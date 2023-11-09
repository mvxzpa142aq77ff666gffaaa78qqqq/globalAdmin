import React, { useEffect, useState, useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../../contexts/ServiceContext'
import { PulseLoader } from "react-spinners"
import { useNavigate } from 'react-router-dom'
import { ACCIONES, CODE_USER, ID_USER, LOGIN_SPINNER, NAME_USER, PHONE_USER, RESP_ERROR_LOGIN, SALDO, SALDO_EFECTIVO, TYPE_USER, URL_SERVER, VALIDE_USER, arrayAdminView, arrayMaster } from "../../contexts/constantesVar";
import 'animate.css';
import toast, { Toaster } from 'react-hot-toast';
import { Alert, Avatar, InputAdornment, Typography } from '@mui/material'
import MenuAppBars from '../../components/appBar/appBarr'
import { Box, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import { AccountCircle, Grid3x3Rounded, Password, PhoneAndroid, PhoneCallback, Send, SendRounded } from '@mui/icons-material'
import LoadingButton from '@mui/lab/LoadingButton';
import { useForm } from 'react-hook-form';
import KeyIcon from '@mui/icons-material/Key';


import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axiosConfigs from '../../components/axiosConfig'





function CambiarPasswords() {

    const navigate = useNavigate();

    const { Logins, dispatch, userId, errorResponseLogin, userError, Registers, userName, typeUser, acciones,AxiosConfigsToken } = useContext(AppContext)

    const [load, setLoad] = useState(false)//estado para activar el spinner del boton submit
    const [loadM, setLoadM] = useState(false)//estado para activar el spinner del boton submit
    const [loadC, setLoadC] = useState(false)//estado para activar el spinner del boton submit
    const [errorInit, setErrorInit] = useState(false)
    const [errorInitMessage, setErrorInitMessage] = useState('')
    const [open, setOpen] = useState(false);
    const [code, setCode] = useState('');
    const [confirmCode, setConfirmCode] = useState('');
    const [datos, setDatos] = useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
        setLoadM(false)
        data.userId = userId

        if (data.passw === data.passwConfirm) {
            setDatos(data)
            try {
                setLoad(true)
                const confirmarNumero = await AxiosConfigsToken({ url: `/confirmNumber`, method: "post", data })

                if (confirmarNumero.data.verificar) {
                    setCode(confirmarNumero.data.clave)
                    setLoad(false)
                    handleClickOpen()
                } else {
                    setLoad(false)
                    toast.error(`${confirmarNumero.data.mens}`)
                }

            } catch (error) {
                setLoad(false)
                toast.error(`Hay un problema ss`)

            }
        } else {
            setLoad(false)
            toast.error(`Las contrasenas no coinsiden`)

        }

    }


    const RecetearPassword = async () => {
        if (datos.passw === datos.passwConfirm) {

            if (confirmCode == code) {

                try {
                    setLoadM(true)
                    if (arrayMaster.includes(typeUser)) {
                        const recetPost = await axiosConfigs({ url: `/recetPasswordMaster`, method: "post", data: datos })
                        if (recetPost.data.verificar) {
                            reset({
                                passwConfirm: "",
                                passw: "",
                                username: ""
                            })
                            setLoadM(false)
                            toast.success(`${recetPost.data.mens}`)
                            handleClose()

                        } else {
                            setLoad(false)
                            toast.error(`${recetPost.data.mens}`)
                        }
                    } else {
                        const recetPost = await axiosConfigs({ url: `/recetPass`, method: "post", data: datos })

                        if (recetPost.data.verificar) {
                            reset({
                                passwConfirm: "",
                                passw: "",
                                username: ""
                            })
                            setLoadM(false)
                            toast.success(`${recetPost.data.mens}`)
                            handleClose()

                        } else {
                            setLoad(false)
                            toast.error(`${recetPost.data.mens}`)
                        }
                    }


                } catch (error) {
                    setLoadM(false)
                    toast.error(`Hay un problema ss`)
                }
            } else {
                toast.error(`La clave incorrecta`)
                setLoadM(false)
            }
        } else {
            setLoadM(false)
            toast.error(`Las contrasenas no coinsiden`)

        }
    }


    useEffect(() => {
        if (JSON.parse(window.localStorage.getItem("enableTCaja"))) {
        } else {
            window.localStorage.setItem("enableTCaja", JSON.stringify({ valor: false, valorI: "", nameI: '', typeI: '', phoneI: '' }))
        }
    }, [])

    return (
        <>
            {acciones.includes('cambiar_password') || arrayMaster.includes(typeUser) ?
                <>

                    <div >

                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >

                            <DialogContent sx={{ paddingInline: 1, paddingTop: 4 }}>
                                <DialogContentText sx={{
                                    width: {
                                        xs: "95%",
                                        sm: "95%",
                                        md: 400,
                                        lg: 400,
                                        xl: 400,
                                    },
                                    paddingBlock: 2,
                                }} id="alert-dialog-description">
                                    Porfavor introduce el codigo que te acamos de enviar por sms para continuar !
                                </DialogContentText>
                                <TextField
                                    label="Introduce el codigo"
                                    id="outlined-size-small"
                                    size="small"
                                    onChange={(e) => setConfirmCode(e.target.value)}
                                    sx={{
                                        width: {
                                            xs: "95%",
                                            sm: "95%",
                                            md: 400,
                                            lg: 400,
                                            xl: 400,
                                        },
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <KeyIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                <DialogContentText sx={{
                                    width: {
                                        xs: "95%",
                                        sm: "95%",
                                        md: 400,
                                        lg: 400,
                                        xl: 400,
                                    },
                                    paddingBlock: 2,
                                }} id="alert-dialog-description">

                                </DialogContentText>
                            </DialogContent>

                            <DialogActions>

                                <LoadingButton
                                    loading={loadM}
                                    variant="outlined"
                                    color="primary"
                                    //sx={{ width: "100%" }}
                                    size="large"
                                    onClick={() => { RecetearPassword() }}

                                >
                                    <span>Continuar</span>
                                </LoadingButton>

                            </DialogActions>

                        </Dialog>
                    </div>
                    <Grid
                        bgcolor="backgroundColorPage"
                        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                    >
                        <Box sx={{
                            height: "500px",
                            width: {
                                xs: "95%",
                                sm: 400,
                                md: 400,
                                lg: 400,
                                xl: 400,
                            },
                            bgcolor: "#fff",
                            borderRadius: 1,
                            display: 'flex',
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column"
                        }}>
                            <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", width: "100%" }}>



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
                                        label="La nueva contraseña"
                                        id="outlined-size-small"
                                        defaultValue=""
                                        size="medium"
                                        type="text"
                                        sx={{ width: "100%" }}
                                        {...register("passw", { required: "Campo requerido", minLength: 8 })}
                                        error={!!errors?.passw}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <KeyIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>
                                <div style={{ width: '95%', marginTop: 20 }}>
                                    <TextField
                                        label="Repite la contraseña"
                                        id="outlined-size-small"
                                        defaultValue=""
                                        size="medium"
                                        type="text"
                                        sx={{ width: "100%" }}
                                        {...register("passwConfirm", { required: "Campo requerido", minLength: 8 })}
                                        error={!!errors?.passwConfirm}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <KeyIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
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
                                        <span>Cambiar</span>
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
                </>
                :
                <></>
            }

        </ >
    )
}

export default CambiarPasswords