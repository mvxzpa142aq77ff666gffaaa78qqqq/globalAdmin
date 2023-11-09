import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import useSWR, { useSWRConfig } from 'swr'
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Modal, Snackbar, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useForm } from 'react-hook-form';
import axiosConfigs from '../axiosConfig';
import { Delete, Edit } from '@mui/icons-material';
import toast, { Toaster } from 'react-hot-toast';
import AppContext from '../../contexts/ServiceContext';





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



export default function FormDeleteUser({ dataUser }) {
    const { userId, acciones ,AxiosConfigsToken } = React.useContext(AppContext)

    const theme = useTheme();
    const { mutate } = useSWRConfig()

    const [role, setRole] = React.useState("")
    //habrir y cerrar el modal
    const [openM, setOpenM] = React.useState(false);
    const handleOpenM = () => setOpenM(true);
    const handleCloseM = () => setOpenM(false);
    /*********************************** */

    /*activar el spinner del botton submit******/
    const [load, setLoad] = React.useState(false)//estado para activar el spinner del boton submit
    /*********************************** */


    /* abrir , cerrar y mensage de alerta *****/
    const [snackMessage, setsnackMessage] = React.useState("")//mensage del alerta
    const [open, setOpen] = React.useState(false);//abrir el alerta
    const [alertType, setAlertType] = React.useState(false)
    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    /********************************** */

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
        control,
        formState: { errors }
    } = useForm();

    //para enviar datos en el servidor
    const onDelete = async () => {
        let data = {}
        data.id = dataUser._id
        data.userId = userId

        try {
            setLoad(true)
            const sendData = await AxiosConfigsToken({ url: `/delete_users_admin`, method: "post", data })
            if (sendData.data.verificar) {
                setLoad(false)
                mutate("ObtenerAdminis")
                toast.success(`${sendData.data.mens}`)
                setAlertType(true)
                handleClick()

            } else {
                setLoad(false)
                toast.error(`${sendData.data.mens}`)
                setAlertType(false)
                handleClick()

            }
        } catch (error) {
            setLoad(false)
            toast.error("Hay un problema")
            setAlertType(false)
            handleClick()
        }
    }

    React.useEffect(() => {
        setRole(dataUser.name)
    }, [])

    return (
        <>
            {acciones.includes('eliminar_admin') ?
                <>
                    <Button color='error' sx={{ marginLeft: '1px' }} size='small' onClick={() => setOpenM(true)} variant="contained" endIcon={<Delete />}>
                        Elim..
                    </Button>

                    <div>

                        <Dialog
                            open={openM}
                            onClose={handleCloseM}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >

                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Seguro que deseas eliminar a {dataUser.name}
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseM}>Cancelar</Button>

                                <LoadingButton
                                    loading={load}
                                    variant="outlined"
                                    color="primary"
                                    //sx={{ width: "100%" }}
                                    size="large"
                                    onClick={() => onDelete()}

                                >
                                    <span>Acentar</span>
                                </LoadingButton>

                            </DialogActions>
                        </Dialog>
                    </div>
                </>
                :
                <></>
            }






        </>
    );
}