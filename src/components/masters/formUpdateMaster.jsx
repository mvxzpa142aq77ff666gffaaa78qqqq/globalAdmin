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
import axiosConfigs from '../axiosConfig';
import toast, { Toaster } from 'react-hot-toast';
import { useSWRConfig } from 'swr';
import { Add, Edit } from '@mui/icons-material';
import AppContext from '../../contexts/ServiceContext';
import { arrayMaster } from '../../contexts/constantesVar';


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
    'crear_caja',
    'crear_master',
    'recargar_master',
    'recompensar_master',
    'activar_desactivar_master',
    'activar_desactivar_admin',
    'activar_desactivar_caja_master',
    'recargar_caja_admin',
    'recompensar_caja_admin',
    'interes_a_saldo_caja_admin',
    'iva_a_saldo_caja_admin',
    'interes_a_saldo_master',
    'saldo_de_caja_a_master',
    'recargar_caja_master',
    'editar_admin',
    'eliminar_admin',
    'editar_master',
    'editar_caja_master',
    'ver_info_caja_master',
    'ver_flujo_de_dinero',
    'ver_transacciones',
    'ver_info_master',
    'solicitar_recompensa',

];

const gestor = [
    'ver_info',
    'crear_socio',
    'activar_desactivar_socio',
    'editar_socio',
];

const cajero = [
    'ver_info',
    'recargar_socio',
    'recompensar_socio',
];
const atencion_al_cliente = [
    'ver_info',
];

const master_gnob = [
    'ver_info_caja_master',
    'crear_caja',
    'activar_desactivar_caja_master',
    'interes_a_saldo_master',
    'saldo_de_caja_a_master',
    'recargar_caja_master',
    'editar_master',
    'editar_caja_master',
    'ver_flujo_de_dinero',
    'ver_transacciones',
    'ver_info_master',
    'editar_factura',
    'ver_factura',
    'solicitar_recompensa',
]

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
    overflow: "scroll",
    height: '500px'
};



export default function FormUpdateMasters({ dataUser }) {

    const { userId, acciones ,AxiosConfigsToken} = React.useContext(AppContext)


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

        data.userId = userId
        data.usernameAntiguo = dataUser.username
        data.phoneAntiguo = dataUser.phone
        data.id = dataUser._id

        console.log(data)

        try {
            setLoad(true)
            const sendData = await AxiosConfigsToken({ url: `/actualizar_masters`, method: "post", data })
            if (sendData.data.verificar) {
                toast.success(`${sendData.data.mens}`)
                setLoad(false)
                handleCloseM()
                mutate("ObtenerMasterss")
                mutate(["ObtenerMastersId", userId])

            } else {
                toast.error(`${sendData.data.mens}`)
                setLoad(false)
            }
        } catch (error) {
            console.log(error)
            toast.error(`Hay un problema qq!`)
            setLoad(false)
        }
    }

    React.useEffect(() => {
        setTipo(dataUser.typeUser)
        setPersonName(dataUser.acciones)

    }, [])

    return (
        <>

            {acciones.includes('editar_master') ?
                <>

                    <Button sx={{ backgroundColor: '#2962ff' }} size='small' onClick={() => setOpenM(true)} variant="contained" endIcon={<Edit />}>
                        Editar
                    </Button>

                    <Modal
                        open={openM}
                        onClose={handleCloseM}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        //sx={{position:"absolute",overflow:"scroll",height:'400px'}}
                        disableScrollLock={true}
                    >
                        <Box sx={style}>
                            <Typography variant='h6' sx={{ textAlign: "center", marginBottom: 2, color: "textColorTitle" }}>Registrar nuevo Masters</Typography>
                            <Grid sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
                                    <Box sx={{ width: "100%", display: "flex", justifyContent: "center", flexDirection: "column" }}>

                                        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                            <FormControl sx={{ mb: 1, width: "95%" }}>
                                                <InputLabel id="demo-simple-select-label">Tipo de master</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    label="Tipo de master"
                                                    {...register("typeUser", { required: true })}
                                                    defaultValue={dataUser.typeUser}
                                                    onChange={handleChangeTipo}

                                                >
                                                    <MenuItem value="Master_GNOB">Master GNOB</MenuItem>
                                                    <MenuItem value="Master_FINANCIADO">Master FINANCIADO</MenuItem>
                                                    <MenuItem value="Master_PREFINANCIADO">Master PREFINANCIADO</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </div>
                                        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                            <FormControl sx={{ mb: 1, width: "95%" }}>
                                                <InputLabel id="demo-multiple-name-label">Elige acciones permitidas</InputLabel>
                                                <Select
                                                    labelId="demo-multiple-name-label"
                                                    id="demo-multiple-name"
                                                    multiple
                                                    value={personName}
                                                    onChange={handleChange}
                                                    defaultValue={dataUser.acciones}
                                                    input={
                                                        <OutlinedInput
                                                            {...register("acciones", { required: true })}
                                                            label="Elige acciones permitidas" />
                                                    }
                                                    MenuProps={MenuProps}
                                                >
                                                    {names.map((name) => {

                                                        if (arrayMaster.includes(tipo) && master_gnob.includes(name)) {
                                                            return (
                                                                <MenuItem
                                                                    key={name}
                                                                    value={name}
                                                                    style={getStyles(name, personName, theme)}
                                                                >
                                                                    {name}
                                                                </MenuItem>
                                                            )
                                                        }

                                                    }
                                                    )}
                                                </Select>
                                            </FormControl>
                                        </div>

                                        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                            <FormControl sx={{ mb: 1, width: "95%" }}>
                                                <TextField
                                                    id="outlined-basic"
                                                    label="Nombre de usuario"
                                                    variant="outlined"
                                                    defaultValue={dataUser.username}
                                                    {...register("username", { required: "Campo requerido", minLength: 1 })}
                                                />
                                            </FormControl>
                                        </div>

                                        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                            <FormControl sx={{ mb: 1, width: "95%" }}>
                                                <TextField
                                                    id="outlined-basic"
                                                    label="Nombre completo"
                                                    variant="outlined"
                                                    defaultValue={dataUser.name}
                                                    {...register("name", { required: "Campo requerido", minLength: 1 })}
                                                />
                                            </FormControl>
                                        </div>

                                        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                            <FormControl sx={{ mb: 1, width: "95%" }}>
                                                <TextField
                                                    id="outlined-basic"
                                                    label="Nombre de la empresa"
                                                    variant="outlined"
                                                    defaultValue={dataUser.nameBussnes}
                                                    {...register("nameBussnes", { required: "Campo requerido", minLength: 1 })}
                                                />
                                            </FormControl>
                                        </div>

                                        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                            <FormControl sx={{ mb: 1, width: "95%" }}>
                                                <TextField
                                                    id="outlined-basic"
                                                    label="Nif de la empresa"
                                                    variant="outlined"
                                                    defaultValue={dataUser.nif}
                                                    {...register("nif", {})}
                                                />
                                            </FormControl>
                                        </div>

                                        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                            <FormControl sx={{ mb: 1, width: "95%" }}>
                                                <TextField
                                                    id="outlined-basic"
                                                    label="dip o pasaporte"
                                                    variant="outlined"
                                                    defaultValue={dataUser.dip}
                                                    {...register("dip", { required: "Campo requerido" })}
                                                />
                                            </FormControl>
                                        </div>

                                        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                            <FormControl sx={{ mb: 1, width: "95%" }}>
                                                <TextField
                                                    id="outlined-basic"
                                                    label="Telefono"
                                                    variant="outlined"
                                                    type="number"
                                                    defaultValue={dataUser.phone}
                                                    {...register("phone", {
                                                        required: "Campo requerido",
                                                        minLength: 9,
                                                        maxLength: 9,
                                                    })}
                                                />
                                            </FormControl>
                                        </div>



                                        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                            <FormControl sx={{ mb: 1, width: "95%" }}>
                                                <TextField
                                                    id="outlined-basic"
                                                    label="Email"
                                                    variant="outlined"
                                                    defaultValue={dataUser.email}
                                                    {...register("email", { required: "Campo requerido" })}
                                                />
                                            </FormControl>
                                        </div>


                                        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                            <FormControl sx={{ mb: 1, width: "95%" }}>
                                                <InputLabel id="demo-simple-select-label">Elige la ciudad</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    label="Elige la ciudad"
                                                    defaultValue={dataUser.adress1}
                                                    {...register("adress1", { required: true })}
                                                //onChange={handleChangeTipo}

                                                >

                                                    <MenuItem value="Malabo" >Malabo</MenuItem>
                                                    <MenuItem value="Bata" >Bata</MenuItem>
                                                    <MenuItem value="Mongomo" >Mongomo</MenuItem>
                                                    <MenuItem value="Ebibeyin" >Ebibeyin</MenuItem>
                                                    <MenuItem value="Annobon" >Annobon</MenuItem>
                                                    <MenuItem value="Riaba" >Riaba</MenuItem>
                                                    <MenuItem value="Luba" >Luba</MenuItem>
                                                    <MenuItem value="Moka" >Moka</MenuItem>
                                                    <MenuItem value="Mbini" >Mbini</MenuItem>
                                                    <MenuItem value="Cogo" >Cogo</MenuItem>
                                                    <MenuItem value="Niefang" >Niefang</MenuItem>
                                                    <MenuItem value="Akurenam" >Akurenam</MenuItem>
                                                    <MenuItem value="Evinayong" >Evinayong</MenuItem>


                                                    <MenuItem value="Mongomeyeng" >Mongomeyeng</MenuItem>

                                                    <MenuItem value="Micomiseng" >Micomiseng</MenuItem>
                                                    <MenuItem value="Anisok" >Anisok</MenuItem>
                                                    <MenuItem value="Oyala" >Oyala</MenuItem>
                                                    <MenuItem value="Nsork" >Nsork</MenuItem>
                                                    <MenuItem value="Akonibe" >Akonibe</MenuItem>
                                                    <MenuItem value="Nsok-Nzomo" >Nsok-Nzomo</MenuItem>
                                                    <MenuItem value="Nkue" >Nkue</MenuItem>

                                                </Select>
                                            </FormControl>
                                        </div>
                                        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                            <FormControl sx={{ mb: 1, width: "95%" }}>
                                                <TextField
                                                    id="outlined-basic"
                                                    label="Barrio o localizacion"
                                                    variant="outlined"
                                                    defaultValue={dataUser.gettoFriend}
                                                    {...register("gettoFriend", { required: "Campo requerido" })}
                                                />
                                            </FormControl>
                                        </div>
                                        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                            <FormControl sx={{ mb: 1, width: "95%" }}>
                                                <TextField
                                                    id="outlined-basic"
                                                    label="Numero de cajas"
                                                    variant="outlined"
                                                    defaultValue={dataUser.cashQuand}
                                                    {...register("cashQuand", { required: "Campo requerido" })}
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
                                                    <span>Actualizar Masters</span>
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
                <></>

            }


        </>
    );
}