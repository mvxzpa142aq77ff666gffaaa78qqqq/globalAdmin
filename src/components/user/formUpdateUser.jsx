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
    'recargas_caja_master',
    'editar_admin',
    'editar_master',
    'eliminar_admin',
    'editar_caja_master',
    'hacer_envios',
    'hacer_recepciones',
    'editar_factura',
    'ver_factura',
    'ver_saldo_total_cajas',
    'ver_saldo_op_pending',
    'anular_envios',
    'ver_flujo_de_dinero',
    'ver_transacciones',
    'ver_codigo_recepcion',
    'ver_info_caja_master',
    'ver_info_master',
    'ver_info_admin',
    'ver_info_caja_admin',
    'interes_a_saldo_admin',
    'ver_info_home',
    'ver_iva',
    'ver_saldo_rest',
    'ver_saldo_repart',
    'ver_interes',
    'ver_cant_master',
    'ver_cant_cajas',
    'cambiar_password',
    'ver_saldo_total_master',
    'ver_envios_pending'

];

const gestor = [
    'ver_info',
    'crear_admin',
    'crear_master',
    'recargar_master',
    'recompensar_master',
    'recargar_caja_admin',
    'recompensar_caja_admin',
    'activar_desactivar_master',
    'activar_desactivar_admin',
    'activar_desactivar_caja_master',
    'iva_a_saldo_caja_admin',
    'editar_admin',
    'editar_master',
    'editar_caja_master',
    'eliminar_admin',
    'ver_flujo_de_dinero',
    'ver_transacciones',
    'ver_info_caja_master',
    'ver_info_master',
    'ver_info_caja_admin',
    'ver_info_admin',
    'editar_caja_master',
    'interes_a_saldo_caja_admin',
    'ver_facturas',
    'cambiar_password',
    'ver_saldo_total_cajas',
    'ver_saldo_op_pending',
    'ver_iva',
    'ver_saldo_rest',
    'ver_saldo_repart',
    'ver_interes',
    'ver_cant_master',
    'ver_cant_cajas',
    'editar_factura',
    'ver_saldo_total_master',
    'ver_envios_pending',

];

const cajero = [
    'ver_total_saldo_restante',
    'ver_total_saldo_repartido',
    'ver_total_iva',
    'ver_total_interes',
    'iva_a_saldo_caja_admin',
    'recargar_caja_admin',
    'recompensar_caja_admin',
    'ver_info',
    'crear_admin',
    'crear_master',
    'recargar_master',
    'recompensar_master',
    'activar_desactivar_master',
    'activar_desactivar_admin',
    'activar_desactivar_caja_master',
    'editar_admin',
    'editar_master',
    'eliminar_admin',
    'ver_flujo_de_dinero',
    'ver_transacciones',
    'ver_info_caja_master',
    'ver_info_master',
    'editar_caja_master',
    'ver_info_caja_admin',
    'ver_info_admin',
    'interes_a_saldo_caja_admin',
    'ver_facturas',
    'cambiar_password',
    'ver_saldo_total_cajas',
    'ver_saldo_op_pending',
    'ver_iva',
    'ver_saldo_rest',
    'ver_saldo_repart',
    'ver_interes',
    'ver_cant_master',
    'ver_cant_cajas',
    'editar_factura',
    'ver_saldo_total_master',
    'ver_envios_pending',
    //total saldo vendido
];
const atencion_al_cliente = [
    'ver_info',
    'crear_admin',
    'crear_master',
    'interes_a_saldo_caja_admin',
    'iva_a_saldo_caja_admin',
    'recargar_caja_admin',
    'recompensar_caja_admin',
    'recargar_master',
    'recompensar_master',
    'activar_desactivar_master',
    'activar_desactivar_admin',
    'activar_desactivar_caja_master',
    'editar_admin',
    'ver_saldo_total_cajas',
    'ver_saldo_op_pending',
    'editar_master',
    'editar_caja_master',
    'eliminar_admin',
    'ver_flujo_de_dinero',
    'ver_transacciones',
    'ver_info_caja_master',
    'ver_info_master',
    'ver_info_caja_admin',
    'ver_info_admin',
    'ver_facturas',
    'cambiar_password',
    'ver_iva',
    'ver_saldo_rest',
    'ver_saldo_repart',
    'ver_interes',
    'ver_cant_master',
    'ver_cant_cajas',
    'editar_factura',
    'ver_saldo_total_master',
    'ver_envios_pending',
];

const supers = [
    'ver_info',
    'crear_admin',
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
    'editar_admin',
    'eliminar_admin',
    'editar_master',
    'editar_caja_master',
    'editar_factura',
    'ver_factura',
    'anular_envios',
    'ver_flujo_de_dinero',
    'ver_transacciones',
    'ver_codigo_recepcion',
    'ver_info_caja_master',
    'ver_info_master',
    'ver_info_admin',
    'ver_info_caja_admin',
    'interes_a_saldo_admin',
    'ver_info_home',
    'ver_facturas',
    'cambiar_password',
    'ver_iva',
    'ver_saldo_rest',
    'ver_saldo_repart',
    'ver_interes',
    'ver_cant_master',
    'ver_cant_cajas',
    'ver_saldo_total_cajas',
    'ver_saldo_total_master',
    'ver_saldo_op_pending',
    'ver_envios_pending',
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



export default function FormUpdateUser({ dataUser }) {

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
            const sendData = await AxiosConfigsToken({ url: `/actualizar_users_admin`, method: "post", data })
            if (sendData.data.verificar) {
                toast.success(`${sendData.data.mens}`)
                mutate("ObtenerAdminis")
                setLoad(false)
                handleCloseM()

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
        if (dataUser) {
            setPersonName(dataUser.acciones)
            setTipo(dataUser.typeUser)
        }

    }, [])

    return (
        <>
            {acciones.includes('editar_admin') ?
                <>
                    <Button sx={{ backgroundColor: '#2962ff' }} size='small' onClick={() => setOpenM(true)} variant="contained" endIcon={<Edit />}>
                        Editar
                    </Button>
                    <Modal
                        open={openM}
                        onClose={handleCloseM}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography variant='h6' sx={{ textAlign: "center", marginBottom: 2, color: "textColorTitle" }}>Registrar nuevo admin</Typography>
                            <Grid sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
                                    <Box sx={{ width: "100%", display: "flex", justifyContent: "center", flexDirection: "column" }}>

                                        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                            <FormControl sx={{ mb: 1, width: "95%" }}>
                                                <InputLabel id="demo-simple-select-label">Tipo de admin</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    label="Tipo de admin"
                                                    {...register("typeUser", { required: true })}
                                                    defaultValue={dataUser.typeUser ? dataUser.typeUser : ""}
                                                    onChange={handleChangeTipo}

                                                >
                                                    <MenuItem value="Gestor">Gestor</MenuItem>
                                                    <MenuItem value="Cajero">Cajero</MenuItem>
                                                    <MenuItem value="Atencion_al_cliente">Atencion_al_cliente</MenuItem>
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
                                                    defaultValue={dataUser.acciones ? dataUser.acciones : ""}
                                                    input={
                                                        <OutlinedInput
                                                            {...register("acciones", { required: true })}
                                                            label="Elige acciones permitidas" />
                                                    }
                                                    MenuProps={MenuProps}
                                                >
                                                    {names.map((name) => {

                                                        if (tipo === "Gestor" && gestor.includes(name)) {
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

                                                        if (tipo === "Cajero" && cajero.includes(name)) {
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


                                                        if (tipo === "super_admin" && supers.includes(name)) {
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


                                                        if (tipo === "Atencion_al_cliente" && atencion_al_cliente.includes(name)) {
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
                                                    defaultValue={dataUser.username ? dataUser.username : ""}
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
                                                    defaultValue={dataUser.name ? dataUser.name : ""}
                                                    {...register("name", { required: "Campo requerido", minLength: 1 })}
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
                                                    defaultValue={dataUser.phone ? dataUser.phone : ""}
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
                                                <LoadingButton
                                                    loading={load}
                                                    variant="contained"
                                                    color="primary"
                                                    type="submit"
                                                    sx={{ width: "100%" }}
                                                    size="large"

                                                >
                                                    <span>Registrar</span>
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