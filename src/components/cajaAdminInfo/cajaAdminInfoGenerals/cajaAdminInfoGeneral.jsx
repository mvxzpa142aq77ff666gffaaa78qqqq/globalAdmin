import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Grid, InputAdornment, List, ListItem, ListItemText, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import KeyIcon from '@mui/icons-material/Key';
import useSWR from "swr"
import AppContext from '../../../contexts/ServiceContext';
import { GetInfoGeneralCajaAdmin } from './getInfoGeneralCajaAdmin';

export default function CajaAdminInfoGeneral() {
    const [expanded, setExpanded] = React.useState(false);
    const { typeUser, valideLogin, userId, userName, userCode, userPhone, dispatch,AxiosConfigsToken } = React.useContext(AppContext)


    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };


    const { data, error, isLoading, } = useSWR("obtenerInfoCajaAdmin",() => GetInfoGeneralCajaAdmin(AxiosConfigsToken), {})

    //if (isLoading) return <SkeletonTable />
    //if (error) return <></>

    console.log(data,'hhhhhh')

    return (
        <Grid item xs={12} >
            <div style={{ width: '100%' }}>

                <Accordion sx={{ backgroundColor: "transparent" }} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                    >
                        <Typography sx={{ width: '100%', flexShrink: 0 }}>
                            Datos financieros
                        </Typography>

                    </AccordionSummary>
                    <AccordionDetails>

                        {isLoading ?
                            <>
                            </>
                            :
                            <>
                                {error ?
                                    <></>
                                    :
                                    <>
                                        {data ?
                                            <List >
                                                <ListItem>
                                                    <ListItemText
                                                        primary="Cantidad de saldo restante"
                                                        secondary={<Typography variant='h6' color='error'>{data.quantSolde ? data.quantSolde.toLocaleString("es-GQ") + ' XAF' : 0}</Typography>}
                                                    />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText
                                                        primary="Cantidad de saldo repartido"
                                                        secondary={<Typography variant='h6' color='error'>{data.quantSoldeRepar ? data.quantSoldeRepar.toLocaleString("es-GQ") + ' XAF' : 0}</Typography>}
                                                    />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText
                                                        primary="Interes total"
                                                        secondary={<Typography variant='h6' color='error'>{data.interesGlobal ? data.interesGlobal.toLocaleString("es-GQ") + ' XAF' : 0}</Typography>}
                                                    />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText
                                                        primary="Iva"
                                                        secondary={<Typography variant='h6' color='error'>{data.iva ? data.iva.toLocaleString("es-GQ") + ' XAF' : 0}</Typography>}
                                                    />
                                                </ListItem>

                                                <ListItem>
                                                    <ListItemText
                                                        primary="Saldo antes de la recarga"
                                                        secondary={<Typography variant='h6' color='error'>{data.lastSolde ? data.lastSolde.toLocaleString("es-GQ") + ' XAF' : 0}</Typography>}
                                                    />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText
                                                        primary="Saldo recargado"
                                                        secondary={<Typography variant='h6' color='error'>{data.lastSoldeRecharge ? data.lastSoldeRecharge.toLocaleString("es-GQ") + ' XAF' : 0}</Typography>}
                                                    />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText
                                                        primary="Saldo despues de la recarga"
                                                        secondary={<Typography variant='h6' color='error'>{data.lastSoldeRecharge && data.lastSolde ? (data.lastSoldeRecharge + data.lastSolde).toLocaleString("es-GQ") + ' XAF' : 0}</Typography>}
                                                    />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText
                                                        primary="Tipo de recarga"
                                                        secondary={<Typography variant='h6' color='error'>{data.tipoDeRecarga && data.lastSolde ? data.tipoDeRecarga : ""}</Typography>}
                                                    />
                                                </ListItem>

                                            </List>
                                            :
                                            <></>
                                        }
                                    </>

                                }
                            </>
                        }

                    </AccordionDetails>
                </Accordion>

            </div>
        </Grid>
    );
}