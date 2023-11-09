import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box, Button, Grid, IconButton, Modal, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useForm } from 'react-hook-form';
import axiosConfigs from './axiosConfig';
import toast, { Toaster } from 'react-hot-toast';
import { useSWRConfig } from 'swr';
import { Add, Edit } from '@mui/icons-material';
import AppContext from '../contexts/ServiceContext';






export default function ActiveDesactiveMasterAdmin({ dataUser }) {

    const { userId ,AxiosConfigsToken} = React.useContext(AppContext)
    const [load, setLoad] = React.useState(false)//estado para activar el spinner del boton submit
    const [ids, setIds] = React.useState('')
    const [etat, setEtat] = React.useState('')
    const [etatBool, setEtatBool] = React.useState(true)


    const { mutate } = useSWRConfig()


    const ActivarDesactivar = async () => {
        try {
            if (userId) {
                setLoad(true)
                const activarDesactivar = await AxiosConfigsToken({
                    method: "POST",
                    data: {
                        "id": ids,
                        "actionT": etatBool ? "desactivar" : "activar",
                        "userId": userId
                    },
                    url: `/activar_desactivar_master_admin`
                })

                if (activarDesactivar.data.verificar) {
                    //mutate(["ObtenerMastersId", userId])
                    mutate("ObtenerMasterss")
                    mutate("ObtenerAdminis")
                    setEtatBool(activarDesactivar.data.etat)
                    setLoad(false)
                    toast.success(`${activarDesactivar.data.mens}`)
                } else {
                    setLoad(false)
                    toast.error(activarDesactivar.data.mens)
                }
            }
        } catch (error) {
            toast.error('Hay un problema')
            setLoad(false)

        }
    }



    React.useEffect(() => {
        setIds(dataUser._id)
        setEtatBool(dataUser.activeCount)
    }, [])

    return (
        <>

                <FormControl >
                    <LoadingButton
                        onClick={() => { ActivarDesactivar() }}
                        loading={load}
                        variant="contained"
                        color="primary"
                        type="submit"
                        sx={{ marginRight:'1px' }}
                        size="small"
                    >
                        <span>{dataUser.activeCount ? "Desactivar" : "Activar"}</span>
                    </LoadingButton>

                </FormControl>


        </>
    );
}