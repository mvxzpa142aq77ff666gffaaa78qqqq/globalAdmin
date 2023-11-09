import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import useSWR, { useSWRConfig } from 'swr'
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Alert, Box, Button, Grid, IconButton, Modal, Snackbar, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useForm } from 'react-hook-form';
import axiosConfigs from '../axiosConfig';
import { Edit } from '@mui/icons-material';
import toast, { Toaster } from 'react-hot-toast';
import AppContext from '../../contexts/ServiceContext';
const arrayMaster = ['Master_GNOB', 'Master_FINANCIADO', 'Master_PREFINANCIADO']





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



export default function FormUpdateRoles({ dataUser }) {
  const { userId ,AxiosConfigsToken} = React.useContext(AppContext)

  const theme = useTheme();
  const { mutate } = useSWRConfig()

  const [role, setRole] = React.useState("")
  const [porcentajje, setPorcentajje] = React.useState("")
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
  const onSubmit = async (data) => {
    data.id = dataUser._id
    data.idSuper = userId
    data.role = dataUser.name

    try {
      setLoad(true)
      const sendData = await AxiosConfigsToken({ url: `/update_role`, method: "post", data })
      if (sendData.data.verificar) {
        setLoad(false)
        mutate('getRoles')
        setsnackMessage(sendData.data.mens)
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
      toast.error("Hay un problema")
      setAlertType(false)
      handleClick()
    }
  }

  React.useEffect(() => {
    setPorcentajje(dataUser.porcentage)
    setRole(dataUser.name)
  }, [])

  return (
    <>

      <Button sx={{ backgroundColor: '#2962ff' }} size='small' onClick={() => setOpenM(true)} variant="contained" endIcon={<Edit />} >
        Editar
      </Button>

      <Modal
        open={openM}
        onClose={handleCloseM}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant='h6' sx={{ textAlign: "center", marginBottom: 2, color: "textColorTitle" }}>Registrar nuevo admin </Typography>
          <Grid sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
              <Box sx={{ width: "100%", display: "flex", justifyContent: "center", flexDirection: "column" }}>



                <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                  <FormControl sx={{ mb: 1, width: "95%" }}>
                    <TextField
                      id="outlined-basic"
                      label="Modificar role"
                      variant="outlined"
                      value={role}
                    //defaultValue={role}
                    //{...register("role", { required: "Campo requerido", minLength: 1 })}
                    //error={!!errors?.role}

                    />
                  </FormControl>
                </div>

                {arrayMaster.includes(role) && role !== 'Master_GNOB' ?
                  <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                    <FormControl sx={{ mb: 1, width: "95%" }}>
                      <TextField
                        id="outlined-basic"
                        label="Porcentage de interes"
                        variant="outlined"
                        defaultValue={porcentajje}
                        type='number'
                        {...register("porcentage", { required: "Campo requerido", minLength: 1, max: 40, min: 0 })}
                        error={!!errors?.porcentage}
                      />
                    </FormControl>
                  </div>
                  :
                  <></>
                }

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
  );
}