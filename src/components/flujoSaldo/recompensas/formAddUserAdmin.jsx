import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useForm } from 'react-hook-form';
import axiosConfigs from '../../axiosConfig';

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
  'crear_socio',
  'recargar_socio',
  'recompensar_socio',
  'activar_desactivar_socio',
  'recargar_caja_admin',
  'editar_admin',
  'editar_socio',
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

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}



export default function FormAddUserAdmin() {
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
    control,
    formState: { errors }
  } = useForm();

  //para enviar datos en el servidor
  const onSubmit = async (data) => {
    
    try {
      setLoad(true)
      const sendData = await axiosConfigs({ url: `/iniciarAdmin111`, method: "post", data })
      if (sendData) {
        setLoad(false)

      } else {
        setLoad(false)

      }
    } catch (error) {
      setLoad(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center", flexDirection: "column" }}>

        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <FormControl sx={{ mb: 1, width: "95%" }}>
            <InputLabel id="demo-simple-select-label">Tipo de admin</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Tipo de admin"
              {...register("tipoAdmin", { required: true })}
              defaultValue=""
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
              defaultValue=""
              input={
                <OutlinedInput
                  {...register("accionesAdmin", { required: true })}
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
              {...register("userName", { required: "Campo requerido", minLength: 1 })}
            />
          </FormControl>
        </div>
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <FormControl sx={{ mb: 1, width: "95%" }}>
            <TextField
              id="outlined-basic"
              label="Nombre completo"
              variant="outlined"
              {...register("firsName", { required: "Campo requerido", minLength: 1 })}
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
              {...register("phone", { 
                required: "Campo requerido", 
                minLength:9,
                maxLength:9,
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


  );
}