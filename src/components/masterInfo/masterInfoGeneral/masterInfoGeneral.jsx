import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Grid, InputAdornment, List, ListItem, ListItemText, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import KeyIcon from '@mui/icons-material/Key';
import { GetInfoMasterGeneral } from './getInfoMasterGeneral';
import useSWR from 'swr'
import AppContext from '../../../contexts/ServiceContext';

export default function MasterInfoGeneral({ id }) {
    const { userId, AxiosConfigsToken } = React.useContext(AppContext)

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const { data, error, isLoading, } = useSWR(["obtenerInfoMasterGeneral", id], () => GetInfoMasterGeneral(id,AxiosConfigsToken), {})


    return (
        <Grid item xs={12} >
            <div style={{ width: '100%' }}>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        sx={{ width: '100%' }}
                    >
                        <Typography sx={{ width: '100%', flexShrink: 0 }}>
                            Datos personales
                        </Typography>
                    </AccordionSummary>

                    {isLoading ?
                        <></> :
                        <>
                            {error ?
                                <></>
                                :
                                <AccordionDetails>
                                    {data !== null ?
                                        <List >
                                            <ListItem>
                                                <ListItemText
                                                    primary="Nombre del negocio o empresa"
                                                    secondary={<Typography color='primary' variant='h6'>{data.nameBussnes ? data.nameBussnes : ''}</Typography>}
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Numero de NIF"
                                                    secondary={<Typography color='primary' variant='h6'>{data.nif ? data.nif : ''}</Typography>}
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Nombre del titular"
                                                    secondary={<Typography color='primary' variant='h6'>{data.name ? data.name : ''}</Typography>}
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Tipo de Master"
                                                    secondary={<Typography color='primary' variant='h6'>{data.roles[0].name ? data.roles[0].name : ''}</Typography>}
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Telefono"
                                                    secondary={<Typography color='primary' variant='h6'>{data.phone ? data.phone : ''}</Typography>}
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Ciudad"
                                                    secondary={<Typography color='primary' variant='h6'>{data.adress1 ? data.adress1 : ''}</Typography>}
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary="Ubicacion"
                                                    secondary={<Typography color='primary' variant='h6'>{data.gettoFriend ? data.gettoFriend : ''}</Typography>}
                                                />
                                            </ListItem>
                                        </List>

                                        :
                                        <></>
                                    }

                                </AccordionDetails>
                            }
                        </>
                    }

                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
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
                                        {data?
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