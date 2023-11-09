import React from 'react'
import TextField from '@mui/material/TextField';
import { Avatar, InputAdornment, Typography } from '@mui/material'
import MenuAppBars from '../../components/appBar/appBarr'
import { Box, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import { AccountCircle, Grid3x3Rounded, Password, PhoneAndroid, PhoneCallback, Send, SendRounded } from '@mui/icons-material'
import LoadingButton from '@mui/lab/LoadingButton';
import { useForm } from 'react-hook-form';



function TextFielComponent({color,label,size,name}) {

    //el useForm de react form hook
    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm();

    return (
        <TextField
            color='colorSuccesTextFiel'
            label="Usuario"
            id="outlined-size-small"
            size="medium"
            sx={{ width: "100%" }}
            {...register("userName", { required: "Campo requerido", minLength: 1 })}
            error={!!errors?.userName}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <AccountCircle />
                    </InputAdornment>
                ),
            }}
        />
    )
}

export default TextFielComponent