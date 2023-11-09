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
import axiosConfigs from '../../axiosConfig';
import toast, { Toaster } from 'react-hot-toast';
import { useSWRConfig } from 'swr';
import { Add, Done, Edit } from '@mui/icons-material';
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



export default function FormValidarRecompensa({ dataUser, GetRecompAdmin }) {

    const { userId, acciones ,AxiosConfigsToken} = React.useContext(AppContext)


    const { mutate } = useSWRConfig()

    //habrir y cerrar el modal
    const [openM, setOpenM] = React.useState(false);
    const handleOpenM = () => setOpenM(true);
    const handleCloseM = () => setOpenM(false);
    /*********************************** */

    const [personName, setPersonName] = React.useState([]);
    const [load, setLoad] = React.useState(false)//estado para activar el spinner del boton submit



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

        data.userId = userId
        data.idMaster = dataUser.idAdmin
        data.idRembolso = dataUser._id

        try {
            setLoad(true)
            const sendData = await AxiosConfigsToken({ url: `/recompensar_a_un_master`, method: "post", data })
            if (sendData.data.verificar) {
                toast.success(`${sendData.data.mens}`)
                GetRecompAdmin()
                setLoad(false)
                handleCloseM()

            } else {
                toast.error(`${sendData.data.mens}`)
                setLoad(false)
            }
        } catch (error) {
            //console.log(error)
            toast.error(`Hay un problema qq!`)
            setLoad(false)
        }


    }



    return (
        <>
            {acciones.includes('recompensar_master') ?
                <>
                    <Button sx={{ backgroundColor: '#2962ff' }} size='small' onClick={() => setOpenM(true)} variant="contained" >
                        Validar
                    </Button>
                    <Modal
                        open={openM}
                        onClose={handleCloseM}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography variant='h6' sx={{ textAlign: "center", marginBottom: 2, color: "textColorTitle" }}>Validar rembolso</Typography>
                            <Grid sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
                                    <Box sx={{ width: "100%", display: "flex", justifyContent: "center", flexDirection: "column" }}>

                                        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                            <FormControl sx={{ mb: 1, width: "95%" }}>
                                                <TextField
                                                    id="outlined-basic"
                                                    label="Codigo de rembolso"
                                                    variant="outlined"
                                                    {...register("codigo", { required: "Campo requerido", minLength: 1 })}
                                                    error={!!errors?.codigo}
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
                                                    <span>Validar</span>
                                                </LoadingButton>

                                            </FormControl>
                                        </div>

                                    </Box>
                                </form>

                            </Grid>
                        </Box>
                    </Modal>
                </>
                :
                <>
                </>
            }


        </>
    );
}