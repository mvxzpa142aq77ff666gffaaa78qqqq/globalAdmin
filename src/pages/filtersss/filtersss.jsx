import React, { useState, useContext, useEffect } from 'react'
import MenuAppBars from '../../components/appBar/appBarr'
import { Grid, Tab, Tabs, Box } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import UserAdmin from '../../components/user/userAdmin';
import Masters from '../../components/masters/masters';
import Cajas from '../../components/cajas/cajas';
import Recargas from '../../components/flujoSaldo/recargas/recargas';
import Recompensas from '../../components/flujoSaldo/recompensas/recompensas';
import Intereses from '../../components/flujoSaldo/cobroDeInteres/intereses';
import DeCajaAMasters from '../../components/flujoSaldo/deCajaAMaster/deCajaAMasters';
import AppContext from '../../contexts/ServiceContext';
import { arrayAdminView, arrayMaster } from '../../contexts/constantesVar';

function Filtersss() {
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
      {acciones.includes('ver_flujo_de_dinero') ?
        <>
          <Grid
            bgcolor="backgroundColorPage"
            sx={{}}
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
                  <Tab value={1} label="Recargas" />
                  <Tab value={2} label="Recompensa" />
                  <Tab value={3} label="Intereses sumados a saldo" />
                  <Tab value={4} label="De caja a master" />
                </Tabs>
              </Box>
              <TabPanel value={1} sx={{ paddingInline: "0px" }}><Recargas /></TabPanel>
              <TabPanel value={2} sx={{ paddingInline: "0px" }}><Recompensas /></TabPanel>
              <TabPanel value={3} sx={{ paddingInline: "0px" }}><Intereses /></TabPanel>
              <TabPanel value={4} sx={{ paddingInline: "0px" }}><DeCajaAMasters /></TabPanel>
            </TabContext>
          </Grid>
        </>

        :
        <></>
      }

    </>
  )
}


export default Filtersss