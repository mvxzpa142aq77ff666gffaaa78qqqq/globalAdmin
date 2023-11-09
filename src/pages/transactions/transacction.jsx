import React, { useState, useContext, useEffect } from 'react'
import MenuAppBars from '../../components/appBar/appBarr'
import { Grid, Tab, Tabs, Box } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import UserAdmin from '../../components/user/userAdmin';
import Masters from '../../components/masters/masters';
import Cajas from '../../components/cajas/cajas';
import Envios from '../../components/transacciones/envios/envios';
import Recepciones from '../../components/transacciones/recepciones/recepciones';
import AppContext from '../../contexts/ServiceContext';
import EnviosPendientes from '../../components/transacciones/enviosPendientes/enviosPendientes';
import EnviosCancelados from '../../components/transacciones/enviosCancelados/enviosCancelados';

function Transacction() {
  const { typeUser, valideLogin, userId, userName, userCode, userPhone, dispatch, acciones } = useContext(AppContext)

  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (JSON.parse(window.localStorage.getItem("enableTCaja"))) {
    } else {
      window.localStorage.setItem("enableTCaja", JSON.stringify({ valor: false, valorI: "", nameI: '', typeI: '', phoneI: '' }))
    }
  }, [])

  return (
    <>
      {acciones.includes('ver_transacciones') ?
        <Grid
          bgcolor="backgroundColorPage"
          sx={{

          }}
        >
          <TabContext value={value}>
            <Box sx={{ bgcolor: 'background.paper' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >
                <Tab value={1} label="Envios" />
                <Tab value={2} label="Recepciones" />
                <Tab value={4} label="Envios Pendientes" />
                <Tab value={3} label="Envios Cancelados" />
              </Tabs>
            </Box>
            <TabPanel value={1} sx={{ paddingInline: "0px" }}><Envios /></TabPanel>
            <TabPanel value={2} sx={{ paddingInline: "0px" }}><Recepciones /></TabPanel>
            {acciones.includes('ver_envios_pending') ?
              <TabPanel value={4} sx={{ paddingInline: "0px" }}><EnviosPendientes /></TabPanel>

              :
              <TabPanel value={4} sx={{ paddingInline: "0px" }}><div></div></TabPanel>
            }
            <TabPanel value={3} sx={{ paddingInline: "0px" }}><EnviosCancelados /></TabPanel>
          </TabContext>
        </Grid>
        :
        <></>
      }


    </>
  )
}


export default Transacction