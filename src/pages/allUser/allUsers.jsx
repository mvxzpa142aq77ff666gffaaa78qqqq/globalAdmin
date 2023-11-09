import React, { useState, useContext, useEffect } from 'react'
import MenuAppBars from '../../components/appBar/appBarr'
import { Grid, Tab, Tabs, Box } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import UserAdmin from '../../components/user/userAdmin';
import Masters from '../../components/masters/masters';
import Cajas from '../../components/cajas/cajas';
import AppContext from '../../contexts/ServiceContext';
import { arrayMaster } from '../../contexts/constantesVar';

function AllUsers() {
  const arrayAdmin = ['Gestor', 'super_admin', 'Cajero', 'Atencion_al_cliente']

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

      {acciones.includes('ver_info') ?
        <>
          {arrayMaster.includes(typeUser) ?
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

                    <Tab value={1} label="Masters" />
                    <Tab value={2} label="Cajas" />

                  </Tabs>
                </Box>

                {acciones.includes('ver_info_master') ?
                  <TabPanel value={1} sx={{ paddingInline: "0px" }}><Masters /></TabPanel>
                  :
                  <></>
                }
                {acciones.includes('ver_info_caja_master') ?
                  <TabPanel value={2} sx={{ paddingInline: "0px" }}><Cajas /></TabPanel>
                  :
                  <></>
                }



              </TabContext>
            </Grid>
            
            :
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

                    <Tab value={1} label="Masters" />
                    <Tab value={2} label="Cajas" />
                    <Tab value={3} label="Administradores" />

                  </Tabs>
                </Box>

                {acciones.includes('ver_info_master') ?
                  <TabPanel value={1} sx={{ paddingInline: "0px" }}><Masters /></TabPanel>
                  :
                  <></>
                }
                {acciones.includes('ver_info_caja_master') ?
                  <TabPanel value={2} sx={{ paddingInline: "0px" }}><Cajas /></TabPanel>
                  :
                  <></>
                }
                {acciones.includes('ver_info_admin') ?
                  <TabPanel value={3} sx={{ paddingInline: "0px" }}><UserAdmin /></TabPanel>
                  :
                  <></>
                }

              </TabContext>
            </Grid>
          }
        </>
        :
        <></>
      }

    </>
  )
}

export default AllUsers