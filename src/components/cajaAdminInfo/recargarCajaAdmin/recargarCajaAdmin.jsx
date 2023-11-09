import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useForm } from 'react-hook-form';
import axiosConfigs from '../../axiosConfig';
import toast, { Toaster } from 'react-hot-toast';
import { useSWRConfig } from 'swr';
import { Add } from '@mui/icons-material';
import AppContext from '../../../contexts/ServiceContext';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'ver_info',
    'crear_admin',
    'recargar_master',
    'recompensar_master',
    'recargar_caja_admin',
    'editar_admin',
    'activar_desactivar_master',
    'activar_desactivar_caja',
    'editar_master',
    'crear_master',
];

const gestor = [
    'ver_info',
    'crear_master',
    'activar_desactivar_master',
    'activar_desactivar_caja',
    'editar_master',
];

const cajero = [
    'ver_info',
    'recargar_master',
    'recompensar_master',
];
const atencion_al_cliente = [
    'ver_info',
];

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: "90%", sm: "70%", md: "500px" },
    bgcolor: 'background.paper',
    boxShadow: 24,
    pb: 4,
    pt: 4,
};



export default function RecargarCajaAdmin() {

    const { userId,AxiosConfigsToken } = React.useContext(AppContext)


    const { mutate } = useSWRConfig()

    //habrir y cerrar el modal
    const [openM, setOpenM] = React.useState(false);
    const handleOpenM = () => setOpenM(true);
    const handleCloseM = () => setOpenM(false);
    /*********************************** */

    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);
    const [tipo, setTipo] = React.useState('');
    const [load, setLoad] = React.useState(false)//estado para activar el spinner del boton submit


    //para obtener el array de acciones permitidas
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            typeof value === 'string' ? value.split(',') : value,
        );
        console.log(personName)
    };


    //para obtener el tipo de admin que se registra
    const handleChangeTipo = (event) => {
        setPersonName([])
        setTipo(event.target.value);
        console.log(event.target.value)
    };



    //el useForm de react form hook
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors }
    } = useForm();

    //para enviar datos en el servidor
    const onSubmit = async (data) => {

        if (data.cantidad === data.cantidadConfirmacion) {
            data.userId = userId
            try {
                setLoad(true)
                const sendData = await AxiosConfigsToken({ url: `/recargar_caja_admin`, method: "post", data })
                if (sendData.data.verificar) {
                    toast.success(`${sendData.data.mens}`)
                    mutate('obtenerRecargasCajaAdmin')
                    mutate("obtenerInfoCajaAdmin")
                    reset({
                        cantidad: "",
                        cantidadConfirmacion: "",
                    })
                    setLoad(false)
                    handleCloseM()
    
                } else {
                    toast.error(`${sendData.data.mens}`)
                    setLoad(false)
                }
            } catch (error) {
                toast.error(`Hay un problema qq!`)
                setLoad(false)
            }
        } else {
            toast.error(`Las cantidades no coinciden`)
        }


    }

    return (
        <Box sx={{ height: "auto", width: '100%', marginBottom: "10px", display: "flex", justifyContent: "end" }}>
            <Button
                variant="outlined"
                //startIcon={<Add />}
                onClick={handleOpenM}
                size='medium'
                sx={{ width: "100%"}}
                //color='inherit'
            >
                Recargar
            </Button>
            <Modal
                open={openM}
                onClose={handleCloseM}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant='h6' sx={{ textAlign: "center", marginBottom: 2, color: "textColorTitle" }}>Formulario para recargar</Typography>
                    <Grid sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
                            <Box sx={{ width: "100%", display: "flex", justifyContent: "center", flexDirection: "column" }}>

                                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                    <FormControl sx={{ mb: 1, width: "95%" }}>
                                        <TextField
                                            id="outlined-basic"
                                            label="Introduce la cantidad"
                                            variant="outlined"
                                            type="number"
                                            {...register("cantidad", {
                                                required: "Campo requerido",
                                                minLength: 1,
                    
                                            })}
                                        />
                                    </FormControl>
                                </div>
                                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                    <FormControl sx={{ mb: 1, width: "95%" }}>
                                        <TextField
                                            id="outlined-basic"
                                            label="Confirma la cantidad"
                                            variant="outlined"
                                            type="number"
                                            {...register("cantidadConfirmacion", {
                                                required: "Campo requerido",
                                                minLength: 1,
                                            })}
                                        />
                                    </FormControl>
                                </div>
                                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                    <FormControl sx={{ mb: 1, width: "95%" }}>
                                        <LoadingButton
                                            loading={load}
                                            variant="contained"
                                            color="primary"
                                            type="submit"
                                            sx={{ width: "100%" }}
                                            size="large"

                                        >
                                            <span>Recargar</span>
                                        </LoadingButton>

                                    </FormControl>
                                </div>

                            </Box>
                        </form>

                    </Grid>
                </Box>
            </Modal>
        </Box>
    );
}