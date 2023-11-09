import React, { useEffect, useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../../contexts/ServiceContext';
import axios from 'axios';
import { URL_SERVER, arrayAdminView } from '../../contexts/constantesVar';
import SpinnerAlls from '../../components/spinnerAll/spinnerAlls';
import { PulseLoader } from 'react-spinners';
import toast, { Toaster } from 'react-hot-toast';
import axiosConfigs from '../../components/axiosConfig';
import { Box, Grid, Tab, Tabs } from '@mui/material';
import MenuAppBars from '../../components/appBar/appBarr';
import { TabContext, TabPanel } from '@mui/lab';
import DataTableRecargasCajaAdmin from '../../components/cajaAdminInfo/cajaAdminInfoTable/tableRecargas/dataTableRecargasCajaAdmin';
import DataTableRecompensasCajaAdmin from '../../components/cajaAdminInfo/cajaAdminInfoTable/tableRecompensas/dataTableRecompensasCajaAdmin';
import CajaAdminInfoGeneral from '../../components/cajaAdminInfo/cajaAdminInfoGenerals/cajaAdminInfoGeneral';
import RecargarCajaAdmin from '../../components/cajaAdminInfo/recargarCajaAdmin/recargarCajaAdmin';
import RembolsarCajaAdmin from '../../components/cajaAdminInfo/rembolsarCajaAdmin/rembolsarCajaAdmin';
import InteresASaldoCajaAdmin from '../../components/cajaAdminInfo/interesASaldoCajaAdmin/interesASaldoCajaAdmin';
import DataTableInteresASaldoCajaAdmin from '../../components/cajaAdminInfo/cajaAdminInfoTable/tableInteresASaldoCajaAdmin/tableInteresASaldoCajaAdmin';
import IvaASaldoCajaAdmin from '../../components/cajaAdminInfo/ivaASaldoCajaAdmin/ivaASaldoCajaAdmin';
import DataTableIvaASaldoCajaAdmin from '../../components/cajaAdminInfo/cajaAdminInfoTable/tableIvaASaldoCajaAdmin/tableIvaASaldoCajaAdmin';

function CajaAdminInfo() {
    const { typeUser, valideLogin, userId, userName, acciones } = useContext(AppContext)
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
            {arrayAdminView.includes(typeUser) ?
                <>
                    {acciones.includes('recargar_caja_admin') ?
                        <RecargarCajaAdmin />
                        :
                        <></>
                    }
                    {acciones.includes('interes_a_saldo_caja_admin') ?
                        <InteresASaldoCajaAdmin />
                        :
                        <></>
                    }

                    {acciones.includes('iva_a_saldo_caja_admin') ?
                        <IvaASaldoCajaAdmin />
                        :
                        <></>
                    }
                    {acciones.includes('recompensar_caja_admin') ?
                        <RembolsarCajaAdmin />
                        :
                        <></>
                    }
                    <Grid
                        spacing={1}
                        bgcolor="backgroundColorPage"
                        container
                    >
                        <CajaAdminInfoGeneral />

                    </Grid>

                    {acciones.includes('ver_info_caja_admin') ?
                        <>
                            <TabContext value={value} >
                                <Box sx={{ bgcolor: 'background.paper', marginTop: 3 }}>
                                    <Tabs
                                        value={value}
                                        onChange={handleChange}
                                        variant="scrollable"
                                        scrollButtons="auto"
                                        aria-label="scrollable auto tabs example"
                                    >
                                        <Tab value={1} label="Recargas" />
                                        <Tab value={2} label="Interes a saldo" />
                                        <Tab value={3} label="Iva a saldo" />
                                        <Tab value={4} label="Rembolsos" />
                                    </Tabs>
                                </Box>
                                <TabPanel value={1} sx={{ paddingInline: "0px" }}><DataTableRecargasCajaAdmin /></TabPanel>
                                <TabPanel value={2} sx={{ paddingInline: "0px" }}><DataTableInteresASaldoCajaAdmin /></TabPanel>
                                <TabPanel value={3} sx={{ paddingInline: "0px" }}><DataTableIvaASaldoCajaAdmin /></TabPanel>
                                <TabPanel value={4} sx={{ paddingInline: "0px" }}><DataTableRecompensasCajaAdmin /></TabPanel>
                            </TabContext>
                        </>
                        :
                        <></>
                    }


                </>

                :
                <></>
            }

        </>
    )

}

export default CajaAdminInfo