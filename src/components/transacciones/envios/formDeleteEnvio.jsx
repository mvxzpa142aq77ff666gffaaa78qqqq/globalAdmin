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
import { Add, Delete, Edit, HighlightOffOutlined } from '@mui/icons-material';
import AppContext from '../../../contexts/ServiceContext';
import { arrayMaster } from '../../../contexts/constantesVar';


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
  width: { xs: "97%", sm: "50%", md: "520px" },
  scrollY: 'none',
  bgcolor: 'background.paper',
  boxShadow: 24,
  pb: 4,
  pt: 4,
  overflow: "auto",
};



export default function FormDeleteEnvio({ dataUser,GetData }) {

  const { userId, userPhone, userName,typeUser } = React.useContext(AppContext)


  const { mutate } = useSWRConfig()

  //habrir y cerrar el modal
  const [openM, setOpenM] = React.useState(false);
  const handleOpenM = () => setOpenM(true);
  const handleCloseM = () => setOpenM(false);
  /*********************************** */


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


    data.idAdmin = userId
    data.userName = userName
    data.id = dataUser._id


    console.log(data, "probando")

    if (userId && userName) {

      try {
        setLoad(true)
        const envio = await axiosConfigs({ url: `/cancelarEnviar`, method: "post", data })

        if (envio.data.verificar) {
          setLoad(false)
          if (arrayMaster.includes(typeUser)) {
            GetEnviosMaster(userId)
            console.log("master")
          } else {
            GetEnviosAdmin()
            console.log("admin sda")

          }
          //mutate(["obtenerEnviosMaster", userId])
          toast.success(`${envio.data.mens}`)
          handleCloseM()

        } else {
          setLoad(false)
          toast.error(`${envio.data.mens}`)

        }

      } catch (error) {
        setLoad(false)
        toast.error(`Hay un problema hfhh`)

      }

    } else {

    }


  }

  React.useEffect(() => {


  }, [])

  return (
    < >
      <Button color='error' size='small' onClick={() => setOpenM(true)} variant="contained" endIcon={<HighlightOffOutlined />}>
        Cancelar
      </Button>
      <Modal
        open={openM}
        onClose={handleCloseM}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableScrollLock={true}
      >
        <Box sx={style}>
          <Typography variant='h6' sx={{ textAlign: "center", marginBottom: 2, color: "textColorTitle" }}>Cancelar un envio</Typography>
          <Grid sx={{ width: "99%", display: "flex", justifyContent: "center" }}>
            <form onSubmit={handleSubmit(onSubmit)} >
              <Grid

                container
              >

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}  >
                  <div style={{ width: '100%', marginTop: 15 }}>
                    <TextField
                      label="Codigo de referencia del envio"
                      id="outlined-size-small-name-s"
                      size="medium"
                      sx={{ width: "100%" }}
                      {...register("codeRecp", { required: "Campo requerido", minLength: 1 })}
                      error={!!errors?.codeRecp}

                    />
                  </div>

                  <div style={{ width: '100%', marginTop: 15 }}>
                    <TextField
                      label="Motivo de la cancelacion"
                      id="outlined-size-small-name-s"
                      size="medium"
                      sx={{ width: "100%" }}
                      {...register("motivo", { required: "Campo requerido", minLength: 4 })}
                      error={!!errors?.motivo}

                    />
                  </div>

                </Grid>

                <Grid item xs={12} sm={12} >
                  <div style={{ width: '100%', marginTop: 20 }}>
                    <LoadingButton
                      type='submit'
                      loading={load}
                      variant="contained"
                      color="error"
                      sx={{ width: "100%" }}
                      size="large"
                    >
                      <span>Cancelar envio</span>
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