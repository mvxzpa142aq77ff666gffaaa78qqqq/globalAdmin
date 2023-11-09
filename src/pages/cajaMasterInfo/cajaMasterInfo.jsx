import React, { useEffect, useContext, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import AppContext from '../../contexts/ServiceContext';
import axios from 'axios';
import { URL_SERVER, arrayMaster } from '../../contexts/constantesVar';
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

import CajaMasterInfoGeneral from '../../components/cajaMasterInfo/cajaMasterInfoGeneral/cajaMasterInfoGeneral';
import FormRecargarCajaMaster from '../../components/cajaMasterInfo/cajaMasterInfoRecarga/formRecargarCajaMaster';
import FormDeCajaAMasters from '../../components/cajaMasterInfo/deCajaAMaster/formDeCajaAMasters';
import DataTableEnviosCajaMaster from '../../components/cajaMasterInfo/cajaMasterInfoTable/tableEnvios/dataTableEnviosCajaMaster';
import DataTableRecepcionesCajaMaster from '../../components/cajaMasterInfo/cajaMasterInfoTable/tableRecepciones/dataTableRecepcionesCajaMaster';
import DataTableRecargasCajaMaster from '../../components/cajaMasterInfo/cajaMasterInfoTable/tableRecargas/dataTableRecargasCajaMaster';
import DataTableSaldoDeCajaAMaster from '../../components/cajaMasterInfo/cajaMasterInfoTable/tableDeCajaAMaster/dataTableSaldoDeCajaAMaster';
import FormInteresASaldoCajaMaster from '../../components/cajaMasterInfo/interesASaldoCajaMaster/FormInteresASaldoCaja';

function CajaMasterInfo() {
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
            {arrayMaster.includes(typeUser) ?
                <>
                    {acciones.includes('recargar_caja_master') ?
                        <FormRecargarCajaMaster id={id} />
                        :
                        <></>
                    }

                    {acciones.includes('saldo_de_caja_a_master') ?
                        <FormDeCajaAMasters id={id} />
                        :
                        <></>
                    }
                    {acciones.includes('interes_a_saldo_master') ?
                        <FormInteresASaldoCajaMaster id={id} />
                        :
                        <></>
                    }
                </>
                :
                <>
                </>
            }



            <Grid
                spacing={1}
                bgcolor="backgroundColorPage"
                container
            >
                <CajaMasterInfoGeneral id={id} />

            </Grid>



        </>
    )

}

export default CajaMasterInfo

/*


            <TabContext value={value} >
                <Box sx={{ bgcolor: 'background.paper', marginTop: 3 }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                    >
                        <Tab value={1} label="Envios" />
                        <Tab value={2} label="Recepciones" />
                        <Tab value={3} label="Recargas" />
                        <Tab value={4} label="De caja a master" />

                    </Tabs>
                </Box>
                <TabPanel value={1} sx={{ paddingInline: "0px" }}><DataTableEnviosCajaMaster id={id} /></TabPanel>
                <TabPanel value={2} sx={{ paddingInline: "0px" }}><DataTableRecepcionesCajaMaster id={id} /></TabPanel>
                <TabPanel value={3} sx={{ paddingInline: "0px" }}><DataTableRecargasCajaMaster id={id} /></TabPanel>
                <TabPanel value={4} sx={{ paddingInline: "0px" }}><DataTableSaldoDeCajaAMaster id={id} /></TabPanel>
            </TabContext>




                */