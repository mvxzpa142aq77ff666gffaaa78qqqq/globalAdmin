import React, { useEffect, useContext, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import AppContext from '../../contexts/ServiceContext';
import axios from 'axios';
import { URL_SERVER } from '../../contexts/constantesVar';
import SpinnerAlls from '../../components/spinnerAll/spinnerAlls';
import { PulseLoader } from 'react-spinners';
import toast, { Toaster } from 'react-hot-toast';
import axiosConfigs from '../../components/axiosConfig';
import { Box, Grid, Tab, Tabs } from '@mui/material';
import MenuAppBars from '../../components/appBar/appBarr';
import CardHome from '../../components/cardHome';
import { Group, Payment, Payments, PeopleAlt } from '@mui/icons-material';
import CharTransfertBar from '../../components/char/charTransfertBar';
import CharArea from '../../components/char/charArea';
import MasterInfoGeneral from '../../components/masterInfo/masterInfoGeneral/masterInfoGeneral';
import { TabContext, TabPanel } from '@mui/lab';
import DataTableCajasMaster from '../../components/masterInfo/masterInfoTable/tableCajas/dataTableCajasMaster';
import DataTableEnviosMaster from '../../components/masterInfo/masterInfoTable/tableEnvios/dataTableEnviosMaster';
import DataTableRecepcionesMaster from '../../components/masterInfo/masterInfoTable/tableRecepciones/dataTableRecepcionesMaster';
import DataTableRecargasMaster from '../../components/masterInfo/masterInfoTable/tableRecargas/dataTableRecargasMaster';
import DataTableRecompensasMaster from '../../components/masterInfo/masterInfoTable/tableRecompensas/dataTableRecompensasMaster';
import FormRecargarMaster from '../../components/masterInfo/masterInfoRecargarMaster/formRecargarMaster';
import FormInfoRembolsarMasters from '../../components/masterInfo/masterInfoRembolsarMaster/FormInfoRembolsarMasters';
import FormInteresASaldoMasters from '../../components/masterInfo/masterInteresASaldo/FormInteresASaldoMasters';
import DataTableInteresASaldoMaster from '../../components/masterInfo/masterInfoTable/tableInteresASaldo/dataTableInteresASaldoMaster';
import DataTableSaldoDeCajaAMaster from '../../components/masterInfo/masterInfoTable/tableDeCajaAMaster/dataTableSaldoDeCajaAMaster';

function MasterInfo() {
    const { typeUser, valideLogin, userId, userName, userCode, userPhone, dispatch, acciones } = useContext(AppContext)
    const [value, setValue] = useState(1);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const { id } = useParams()




    useEffect(() => {
        if (JSON.parse(window.localStorage.getItem("enableTCaja"))) {
        } else {
            window.localStorage.setItem("enableTCaja", JSON.stringify({ valor: false, valorI: "", nameI: '', typeI: '', phoneI: '' }))
        }
    }, [])


    return (
        <>
            {acciones.includes('recargar_master') ?
                <FormRecargarMaster id={id} />
                :
                <></>
            }


            <Grid
                spacing={1}
                bgcolor="backgroundColorPage"
                container
            >
                {acciones.includes('ver_info_master') ?
                    <MasterInfoGeneral id={id} />
                    :
                    <></>
                }

            </Grid>
            <TabContext value={value} >
                <Box sx={{ bgcolor: 'background.paper', marginTop: 3 }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                    >
                        <Tab value={1} label="Cajas" />

                    </Tabs>
                </Box>
                {acciones.includes('ver_info_caja_master') ?
                    <TabPanel value={1} sx={{ paddingInline: "0px" }}><DataTableCajasMaster id={id} /></TabPanel>
                    :
                    <></>
                }

            </TabContext>
        </>
    )

}

export default MasterInfo

/*

            {false?
                <FormInteresASaldoMasters id={id} />
                :
                <></>
            }




                            <Box sx={{ bgcolor: 'background.paper', marginTop: 3 }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                    >
                        <Tab value={1} label="Cajas" />
                        <Tab value={2} label="Envios" />
                        <Tab value={3} label="Recepciones" />
                        <Tab value={4} label="Recargas" />
                        <Tab value={5} label="Intereses a saldo" />
                        <Tab value={6} label="Recompensas" />
                        <Tab value={7} label="De caja a master" />
                    </Tabs>
                </Box>
                <TabPanel value={1} sx={{ paddingInline: "0px" }}><DataTableCajasMaster id={id} /></TabPanel>
                <TabPanel value={2} sx={{ paddingInline: "0px" }}><DataTableEnviosMaster id={id} /></TabPanel>
                <TabPanel value={3} sx={{ paddingInline: "0px" }}><DataTableRecepcionesMaster id={id} /></TabPanel>
                <TabPanel value={4} sx={{ paddingInline: "0px" }}><DataTableRecargasMaster id={id} /></TabPanel>
                <TabPanel value={5} sx={{ paddingInline: "0px" }}><DataTableInteresASaldoMaster id={id} /></TabPanel>
                <TabPanel value={6} sx={{ paddingInline: "0px" }}><DataTableRecompensasMaster id={id} /></TabPanel>
                <TabPanel value={7} sx={{ paddingInline: "0px" }}><DataTableSaldoDeCajaAMaster id={id} /></TabPanel>
            {acciones.includes('recompensar_master') ?
                <FormInfoRembolsarMasters id={id} />
                :
                <></>
            }
            */