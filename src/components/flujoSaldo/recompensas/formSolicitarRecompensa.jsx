import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Alert, Box, Button, Grid, Modal, Snackbar, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useForm } from 'react-hook-form';
import axiosConfigs from '../../axiosConfig';
import { Add } from '@mui/icons-material';
import { useSWRConfig } from 'swr';
import toast, { Toaster } from 'react-hot-toast';
import AppContext from '../../../contexts/ServiceContext';


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




export default function FormSolicitarRecompensa({ GetEnviosMaster }) {
  const { userId, typeUser, acciones,AxiosConfigsToken } = React.useContext(AppContext)

  const { mutate } = useSWRConfig()

  //var userAgent = navigator.userAgent || navigator.vendor || window.opera;


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

  //el useForm de react form hook
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm();

  //para enviar datos en el servidor
  const onSubmit = async (data) => {
    data.idMaster = userId

    if (data.cantidad === data.cantidadConfirm) {
      try {
        setLoad(true)
        const sendData = await AxiosConfigsToken({ url: `/solicitud_recompensar_a_un_master`, method: "post", data })
        if (sendData.data.verificar) {
          setLoad(false)
          GetEnviosMaster(userId)
          toast.success(`${sendData.data.mens}`)
          setAlertType(true)
          handleClick()
          handleCloseM()
  
        } else {
          setLoad(false)
          toast.error(`${sendData.data.mens}`)
          setAlertType(false)
          handleClick()
  
        }
      } catch (error) {
        setLoad(false)
        toast.error('Hay un problema !')
        setAlertType(false)
        handleClick()
      }
    } else {
      toast.error('Las cantidades no coinsiden')

    }


  }

  return (
    <>
      <Box sx={{ height: "auto", width: '100%', marginBottom: "10px", display: "flex", justifyContent: "end" }}>
        {/* botton para abrir el modal */}
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleOpenM}
          size='small'
        >
          Solicitar
        </Button>
        {/* modal que contiene el formulario */}
        <Modal
          open={openM}
          onClose={handleCloseM}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography variant='h6' sx={{ textAlign: "center", marginBottom: 2, color: "textColorTitle" }}>Solicitud de recompensa</Typography>
            <Grid sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
              <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
                <Box sx={{ width: "100%", display: "flex", justifyContent: "center", flexDirection: "column" }}>

                  <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                    <FormControl sx={{ mb: 1, width: "95%" }}>
                      <TextField
                        id="outlined-basic"
                        label="Cantidad"
                        variant="outlined"
                        {...register("cantidad", { required: "Campo requerido", minLength: 1 })}
                        error={!!errors?.cantidad}
                      />
                    </FormControl>
                  </div>
                  <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                    <FormControl sx={{ mb: 1, width: "95%" }}>
                      <TextField
                        id="outlined-basic"
                        label="Confirma la cantidad"
                        variant="outlined"
                        {...register("cantidadConfirm", { required: "Campo requerido", minLength: 1 })}
                        error={!!errors?.cantidadConfirm}

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
                        <span>Enviar solicitud</span>
                      </LoadingButton>

                    </FormControl>
                  </div>

                </Box>
              </form>
            </Grid>
          </Box>
        </Modal>
      </Box>

    </>

  );
}