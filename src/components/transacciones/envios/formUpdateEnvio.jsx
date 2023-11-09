import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box, Button, Grid, Modal, TextField, Typography, IconButton, Autocomplete } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useForm } from 'react-hook-form';
import axiosConfigs from '../../axiosConfig';
import toast, { Toaster } from 'react-hot-toast';
import { useSWRConfig } from 'swr';
import { Add, Edit } from '@mui/icons-material';
import AppContext from '../../../contexts/ServiceContext';
import { arrayMaster } from '../../../contexts/constantesVar';
import { GetEnviosDeUnMaster } from '../../masterInfo/masterInfoTable/tableEnvios/getEnviosMaster';
import { GetEnviosTodos } from './getEnvios';


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
  'crear_master',
  'recargar_socio',
  'recompensar_socio',
  'activar_desactivar_socio',
  'recargar_caja_admin',
  'editar_admin',
  'editar_socio',

  'hacer_envios',
  'hacer_recepciones',
  'editar_factura',


  "crear_caja",
  "activar_caja",
  "desactivar_caja",
  "actualizar_caja",
  "recargar_caja",
  "retirar_caja_caja",
  "retirar_caja_master",
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

const caja = [
  'ver_info',
  'hacer_envios',
  'hacer_recepciones',
  'editar_factura',
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
  width: { xs: "90%", sm: "70%", md: "800px" },
  bgcolor: 'background.paper',
  boxShadow: 24,
  pb: 4,
  pt: 4,
  overflow: "scroll",
  height: '500px'
};



export default function FormUpdateEnvio({ dataUser, GetEnviosAdmin ,GetEnviosMaster }) {

  const { userId, userPhone, userName, typeUser } = React.useContext(AppContext)


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
  const [loadE, setLoadE] = React.useState(false);
  const [nameSend, setNameSend] = React.useState('');
  const [phoneSend, setPhoneSend] = React.useState('');
  const [quantSend, setQuantSend] = React.useState('');
  const [dipSend, setDipSend] = React.useState('');
  const [phoneRecep, setPhoneRecep] = React.useState('');
  const [adressRecep, setAdressRecep] = React.useState('');
  const [nameRecep, setNameRecep] = React.useState('');

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
  const HacerEnvio = async () => {
    let data = {}

    data.idAdmin = userId
    data.phoneAdmin = userPhone
    data.nameAdmin = userName
    data.adressRecep = adressRecep
    data.nameSend = nameSend
    data.phoneSend = phoneSend
    data.dipSend = dipSend
    data.quantSend = quantSend
    data.phoneRecep = phoneRecep
    data.nameRecep = nameRecep
    data.idEnvio = dataUser._id
    data.cantidadAnterior = dataUser.quantSend
    data.phoneAnteriorS = dataUser.phoneSend
    data.phoneAnteriorR = dataUser.phoneRecep

    const validar = data.nameRecep && data.phoneRecep && data.quantSend && data.dipSend && data.phoneSend && data.nameSend && data.adressRecep && data.nameAdmin && data.phoneAdmin && data.idAdmin

    if (validar) {

      try {
        setLoad(true)
        const envio = await axiosConfigs({ url:arrayMaster.includes(typeUser)? `/actualizarEnviarMaster`:'/actualizarEnviarAdmin', method: "post", data })

        if (envio.data.verificar) {
          setLoad(false)
          if (arrayMaster.includes(typeUser)) {
            GetEnviosMaster(userId)
            console.log("master")
          } else {
            GetEnviosAdmin()
            console.log("admin sda")

          }
          mutate(["obtenerEnviosMaster", userId])
          toast.success(`${envio.data.mens}`)
          handleCloseM()

        } else {
          setLoad(false)
          toast.error(`${envio.data.mens}`)

        }

      } catch (error) {
        setLoad(false)
        toast.error(`Hay un problema`)

      }

    } else {

    }


  }

  React.useEffect(() => {
    setAdressRecep(dataUser.adressRecep)
    setNameSend(dataUser.nameSend)
    setPhoneSend(dataUser.phoneSend)
    setDipSend(dataUser.dipSend)
    setQuantSend(dataUser.quantSend)
    setPhoneRecep(dataUser.phoneRecep)
    setNameRecep(dataUser.nameRecep)

  }, [])

  return (
    < >
      <Button  sx={{ marginRight: '1px', backgroundColor: '#2962ff'}} size='small' variant="contained" onClick={() => setOpenM(true)} endIcon={<Edit />}>
        Editar
      </Button>
      <Modal
        open={openM}
        onClose={handleCloseM}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableScrollLock={true}
      >
        <Box sx={style}>
          <Typography variant='h6' sx={{ textAlign: "center", marginBottom: 2, color: "textColorTitle" }}>Editar envio</Typography>
          <Grid sx={{ width: "99%", display: "flex", justifyContent: "center" }}>
            <form  >
              <Grid
                spacing={1}

                container
              >

                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}  >
                  <Box>
                    <Typography sx={{ color: "textColorTitle", textAlign: "center" }} variant='h5'>
                      Datos del remitente
                    </Typography>
                  </Box>

                  <div style={{ width: '100%', marginTop: 15 }}>
                    <TextField
                      label="Nombre del remitente"
                      id="outlined-size-small-name-s"
                      size="medium"
                      sx={{ width: "100%" }}
                      value={nameSend}
                      onChange={(e) => { setNameSend(e.target.value) }}

                      //{...register("nameSend", { required: "Campo requerido", minLength: 4 })}
                      //error = {!!errors?.nameSend}
                      error={nameSend ? false : true}


                    />
                  </div>
                  <div style={{ width: '100%', marginTop: 15 }}>
                    <TextField
                      label="Telefono del remitente"
                      id="outlined-size-small"
                      size="medium"
                      value={phoneSend}
                      onChange={(e) => { setPhoneSend(e.target.value) }}
                      sx={{ width: "100%" }}
                      //{...register("phoneSend", { required: "Campo requerido", minLength: 9, maxLength: 9 })}
                      //error={!!errors?.phoneSend}
                      error={phoneSend ? false : true}


                    />
                  </div>
                  <div style={{ width: '100%', marginTop: 15 }}>
                    <TextField
                      label="El DIP/Pasaporte del remitente"
                      id="outlined-size-small"
                      size="medium"
                      value={dipSend}
                      onChange={(e) => { setDipSend(e.target.value) }}
                      sx={{ width: "100%" }}
                      //{...register("dipSend", { required: "Campo requerido", minLength: 4 })}
                      //error={!!errors?.dipSend}
                      error={dipSend ? false : true}


                    />
                  </div>

                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}  >
                  <Box>
                    <Typography sx={{ color: "textColorTitle", textAlign: "center" }} variant='h5'>
                      Datos del beneficiario
                    </Typography>
                  </Box>
                  <div style={{ width: '100%', marginTop: 15 }}>
                    <TextField
                      label="Nombre del remitente"
                      id="outlined-size-small"
                      onChange={(e) => { setNameRecep(e.target.value) }}
                      value={nameRecep}
                      size="medium"
                      sx={{ width: "100%" }}
                      //{...register("nameRecep", { required: "Campo requerido", minLength: 4 })}
                      //error={!!errors?.nameRecep}
                      error={nameRecep ? false : true}


                    />
                  </div>
                  <div style={{ width: '100%', marginTop: 15 }}>
                    <TextField
                      label="Telefono del remitente"
                      id="outlined-size-small"
                      size="medium"
                      value={phoneRecep}
                      onChange={(e) => { setPhoneRecep(e.target.value) }}
                      sx={{ width: "100%" }}
                      //{...register("phoneRecep", { required: "Campo requerido", minLength: 9, maxLength: 9 })}
                      error={phoneRecep ? false : true}

                    />
                  </div>
                  <div style={{ width: '100%', marginTop: 15 }}>
                    <FormControl sx={{ width: "100%" }}>
                      <InputLabel id="demo-simple-select-label">Ciudad del beneficiario</InputLabel>
                      <Select
                        id="demo-simple-select-adress-r"
                        label="Ciudad del beneficiario"
                        //{...register("adressRecep", { required: true })}
                        //error={!!errors?.adressRecep}
                        onChange={(e) => { setAdressRecep(e.target.value) }}
                        value={adressRecep}
                        error={adressRecep ? false : true}


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
                </Grid>
                <Grid item xs={12} sm={12} >
                  <div style={{ width: '100%', marginTop: 20 }}>
                    <LoadingButton
                      onClick={() => HacerEnvio()}
                      loading={load}
                      variant="contained"
                      color="primary"
                      sx={{ width: "100%" }}
                      size="large"
                    >
                      <span>Editar</span>
                    </LoadingButton>

                  </div>
                </Grid>
              </Grid>
            </form>

          </Grid>
        </Box>
      </Modal>
    </>
  );
}