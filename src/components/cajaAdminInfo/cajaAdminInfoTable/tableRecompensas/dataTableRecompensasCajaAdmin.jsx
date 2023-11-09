import React, { useContext, useEffect, useState, useMemo } from 'react'
import { DataGridPro, GridToolbar, esES, useGridApiRef, useKeepGroupedColumnsHidden } from '@mui/x-data-grid-pro';
import { Box, Button, IconButton, Pagination, Stack, Typography, TablePagination, Paper, Grid, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { Add, Delete, Edit, Search, Visibility } from '@mui/icons-material'; import useSWR from "swr"
import {
    useQuery
} from '@tanstack/react-query'

import AppContext from '../../../../contexts/ServiceContext';
import { DataGridPremium } from '@mui/x-data-grid-premium';
import SkeletonTable from '../../../skelholder/skelethonTable';
import { GetRecargasCajaAdmin } from '../../cajaAdminInfoGenerals/getRecargasCajaAdmin';
import { getRecompensasCajaAdmin } from './getRecompensas';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { es } from 'date-fns/locale'
import { LoadingButton } from '@mui/lab';
import axiosConfigs from '../../../axiosConfig';
import ExportExcel from "react-export-excel"


const ExcelFile = ExportExcel.ExcelFile
const ExcelSheet = ExportExcel.ExcelSheet
const ExcelColumn = ExportExcel.ExcelColumn

const VISIBLE_FIELDS = ['nameAdmin', '', 'phoneAdmin','quantSoldeActual', 'typeUser', 'Fecha', 'quantSolde', 'quantSoldeCount', 'nameConfSist', 'phoneConfSist', 'fechaA', 'createdAt', 'Acciones'];

const columns1 = [
    {
        field: 'fechaA',
        headerName: 'Desde',
        type: "date",
        width: 140,
        editable: false,
        valueGetter: (params) => new Date(params.row.fechaA)

    },
    {
        field: 'createdAt',
        headerName: 'Hasta',
        type: "date",
        width: 140,
        editable: false,
        valueGetter: (params) => new Date(params.row.createdAt)

    },
    {
        field: 'Fecha',
        headerName: 'Fecha',
        type: "date",
        width: 140,
        editable: false,
        valueGetter: (params) => new Date(params.row.createdAt),
        renderCell: (params) => {
            const mes = Number(new Date(params.row.createdAt).getMonth()) + 1;
            const dia = Number(new Date(params.row.createdAt).getDate());
            const agno = Number(new Date(params.row.createdAt).getFullYear());
            const hora = new Date(params.row.createdAt).getHours();
            const min = new Date(params.row.createdAt).getMinutes();

            return (dia + '/' + mes + '/' + agno + '  ' + hora + ':' + min);
        },
    },
    {
        field: 'nameAdmin',
        headerName: 'Usuario recompensado',
        width: 150,
        editable: false,
    },
    {
        field: 'phoneAdmin',
        headerName: 'Telefono',
        type: 'phone',
        width: 110,
        editable: false,
    },
    {
        field: 'typeUser',
        headerName: 'Tipo o Role',
        width: 110,
        editable: false,
    },
    {
        field: 'quantSoldeCount',
        headerName: 'Cantidad existente',
        width: 140,
        editable: false,
        renderCell: (params) => {
            return (Number(params.row.quantSoldeCount).toLocaleString("es-GQ") + ' ' + 'XAF');
        },
    },
    {
        field: 'quantSolde',
        headerName: 'Cantidad recompensada',
        width: 140,
        editable: false,
        renderCell: (params) => {
            return (Number(params.row.quantSolde).toLocaleString("es-GQ") + ' ' + 'XAF');
        },
    },

    {
        field: 'quantSoldeActual',
        headerName: 'Cantidad actual',
        width: 140,
        editable: false,
        renderCell: (params) => {

            const suma =  Number(params.row.quantSoldeCount)-Number(params.row.quantSolde)

            return (suma.toLocaleString("es-GQ") + ' ' + 'XAF');
        },
    },
    {
        field: 'nameConfSist',
        headerName: 'Recompensado por',
        width: 140,
        editable: false,
    },
    {
        field: 'phoneConfSist',
        headerName: 'Telefono Agente',
        width: 130,
        editable: false,
    },



];

const arrayMaster = ['Master_GNOB']

function DataTableRecompensasCajaAdmin() {
    const { userId, typeUser ,AxiosConfigsToken} = useContext(AppContext)

    const [dataMaster, setDataMaster] = useState([])

    const [dataArray, setDataArray] = React.useState([])
    const [spinnerArray, setSpinnerArray] = React.useState(false)
    const [desde, setDesde] = React.useState('')
    const [hasta, setHasta] = React.useState('')
    const [texto, setTexto] = React.useState('')
    const [ciudad, setCiudad] = React.useState('')
    const [buscar, setBuscar] = React.useState(false)


    const [totalSaldo, setTotalSaldo] = React.useState("")
    const [totalColision, setTotalComision] = React.useState("")
    const [totalIG, setTotalIG] = React.useState("")
    const [totalIS, setTotalIS] = React.useState("")
    const [totalIva, setTotalIva] = React.useState("")
    const [totalData, setTotalData] = React.useState("")

    const columns = useMemo(
        () => columns1.filter((column) => VISIBLE_FIELDS.includes(column.field)),
        [columns1],
    );


    /**************************************************************************** */

    const SumaTotalData = (lista) => {
        if (lista) {
            var total = 0
            var cesta = lista
            for (let x in cesta) {
                total += 1
            }
            setTotalData(total)
        }

    }
    const SumaTotalComision = (lista) => {
        if (lista) {
            var total = 0
            var cesta = lista
            for (let x in cesta) {
                total += cesta[x]["comision"]
            }
            setTotalComision(total)
        }

    }

    const SumaTotalSaldo = (lista) => {
        if (lista) {
            var totals = 0
            var cesta = lista
            for (let x in cesta) {
                if (cesta[x]["quantSolde"]) {
                    totals += cesta[x]["quantSolde"]
                } else {

                }
            }

            setTotalSaldo(totals)
        }

    }
    const SumaTotalIG = (lista) => {
        if (lista) {
            var total = 0
            var cesta = lista
            for (let x in cesta) {
                total += cesta[x]["interesGlobal"]
            }
            setTotalIG(total)
        }

    }
    const SumaTotalIS = (lista) => {
        if (lista) {
            var total = 0
            var cesta = lista
            for (let x in cesta) {
                total += cesta[x]["interesSocio"]
            }
            setTotalIS(total)
        }

    }

    const SumaTotalIva = (lista) => {
        if (lista) {
            var total = 0
            var cesta = lista
            for (let x in cesta) {
                if (cesta[x]["iva"]) {
                    total += cesta[x]["iva"]
                }

            }
            setTotalIva(total)
        }

    }


    /********************************************************************************************* */
    const Buscar = async (url) => {
        try {
            if (texto === "" && desde === "" && hasta === "") {

                GetRecargasAdmin()

            } else {
                if (((desde && hasta) || texto || ciudad) && userId) {
                    setBuscar(true)
                    const result = await AxiosConfigsToken({
                        url: `/${url}`,
                        method: "post",
                        data: {
                            texto: texto, ciudad: ciudad, desde: desde, hasta: hasta, userId: userId
                        }
                    })

                    if (result.data.verificar) {
                        console.log(result)
                        setDataArray(result.data.data.docs)

                        SumaTotalData(result.data.data.docs)
                        SumaTotalSaldo(result.data.data.docs)
                        SumaTotalIG(result.data.data.docs)
                        SumaTotalIS(result.data.data.docs)
                        SumaTotalIva(result.data.data.docs)
                        SumaTotalComision(result.data.data.docs)

                        setBuscar(false)

                    } else {
                        console.log(result)
                        setDataArray([])
                        setBuscar(false)
                    }

                } else {

                }
            }
        } catch (error) {

            console.log(error)

        }


    }
    /****************************************************************************** */


    const GetRecargasAdmin = async () => {
        setSpinnerArray(true)
        try {
            const res = await AxiosConfigsToken.get(`/get_recomp_caja_admin`)
            if (res.data.data.docs) {
                const datos = res.data.data.docs
                setDataArray(datos)

                SumaTotalData(datos)
                SumaTotalSaldo(datos)
                SumaTotalIG(datos)
                SumaTotalIS(datos)
                SumaTotalIva(datos)
                SumaTotalComision(datos)

                setSpinnerArray(false)
            } else {
                setDataArray([])
                setSpinnerArray(false)

            }
        } catch (error) {
            setDataArray([])
            setSpinnerArray(false)

        }

    }
    /***************************************************************************** */

    React.useEffect(() => {

        GetRecargasAdmin()

    }, [])
    /**************************************************** */

    const { data, error, isLoading, } = useSWR("getRecompensasCajaAdmin", getRecompensasCajaAdmin, {})

    if (spinnerArray) return <SkeletonTable />
    //if (error) return <></>
    return (
        <>
            <Grid

                spacing={1}
                bgcolor="backgroundColorPage"
                container
                sx={{ marginBottom: 1 }}
            >
                <Grid item xs={12} sm={12} md={6} lg={2} xl={2}  >
                    <Box sx={{ width: '100%', }}>
                        <TextField
                            label="Texto"
                            id="outlined-size-small-name-s"
                            size="medium"
                            sx={{ width: "100%" }}
                            value={texto}

                            onChange={(e) => { setTexto(e.target.value) }}

                        />
                    </Box>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={2} xl={2}  >
                    <Box sx={{ width: '100%' }}>
                        <LocalizationProvider locale={es} dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Desde"
                                slotProps={{
                                    textField: { size: 'medium' },
                                    actionBar: { actions: ['clear'] },
                                }}

                                //views={["year", "month", "day"]}
                                format="DD-MM-YYYY"
                                sx={{ width: '100%' }}
                                onChange={(e) => {
                                    try {
                                        if (e.$d) {
                                            setDesde(e.$d)
                                        } else {
                                            setDesde('')
                                        }
                                    } catch (error) {
                                        setDesde('')

                                    }

                                }}
                            />
                        </LocalizationProvider>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={2} xl={2}  >
                    <Box sx={{ width: '100%' }}>
                        <LocalizationProvider locale={es} dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Hasta"
                                slotProps={{
                                    textField: { size: 'medium' },
                                    actionBar: { actions: ['clear'] }
                                }}
                                //views={["year", "month", "day"]}
                                format="DD-MM-YYYY"
                                sx={{ width: '100%' }}
                                onChange={(e) => {

                                    try {
                                        if (e.$d) {
                                            setHasta(e.$d)
                                        } else {
                                            setHasta('')
                                        }
                                    } catch (error) {
                                        setHasta('')

                                    }

                                }}
                            />
                        </LocalizationProvider>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={2} xl={2}  >
                    <Box sx={{ width: '100%' }}>

                        <LoadingButton
                            onClick={() => { Buscar('filtrar_recompensas_caja_admin') }}
                            loading={buscar}
                            variant="contained"
                            color="primary"
                            sx={{ width: "100%" }}
                            size="large"
                            endIcon={<Search />}
                        >
                            <span>Buscar</span>
                        </LoadingButton>
                    </Box>
                </Grid>
            </Grid>
            <Box sx={{ height: 600, width: '100%' }}>
                <DataGridPro
                    rows={dataArray}
                    getRowId={(row) => row._id}
                    disableColumnFilter
                    disableColumnSelector
                    disableDensitySelector
                    columns={columns}
                    slots={{ toolbar: GridToolbar }}
                    localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                    disableRowSelectionOnClick
                    slotProps={{
                        toolbar: {
                            showQuickFilter: false,
                            quickFilterProps: { debounceMs: 500 },
                        },
                    }}
                    initialState={{
                        columns: {
                            columnVisibilityModel: {
                                // Hide columns status and traderName, the other columns will remain visible
                                createdAt: false,
                                fechaA: false

                            },
                        },
                        pagination: { paginationModel: { pageSize: 8 } }
                    }}
                    pagination={true}
                />
            </Box>
            <Box >
                <Paper sx={{ display: 'flex', height: '120px', paddingBlock: 1, flexDirection: 'column' }}>
                    <ExcelFile element={<Button sx={{ marginLeft: 1, marginBottom: 1 }} color='inherit' variant='contained' size='small'>Excel</Button>} filename={`recompenzasAdmin`}>
                        <ExcelSheet data={dataArray} name="transferencia">
                            <ExcelColumn label="Usuario recompenzado" value="nameAdmin" />
                            <ExcelColumn label="Telefono" value="phoneAdmin" />
                            <ExcelColumn label="Tipo o Role" value="typeUser" />
                            <ExcelColumn label="Cantidad" value="quantSolde" />
                            <ExcelColumn label="Cantidad existente" value="quantSoldeCount" />
                            <ExcelColumn label="Recargado por" value="nameConfSist" />
                            <ExcelColumn label="Telefono" value="phoneConfSist" />
                            <ExcelColumn label="Fecha" value="createdAt" />
                        </ExcelSheet>
                    </ExcelFile>
                    <Typography variant='p' sx={{ marginBlock: '3px',fontWeight:"700", marginLeft: 1 }}><span style={{  color: '#212121', fontSize: '13px' }}>Total operaciones : </span><span style={{ color: "#000000", fontSize: '16px' }}>{Number(totalData).toLocaleString("es-GQ")}</span></Typography>
                    <Typography variant='p' sx={{ marginBlock: '3px',fontWeight:"700", marginLeft: 1 }}><span style={{  color: '#212121', fontSize: '13px' }}>Total saldo recompensas : </span><span style={{ color: "#000000", fontSize: '16px' }}>{Number(totalSaldo).toLocaleString("es-GQ")} XAF</span></Typography>
                </Paper>
            </Box>
        </>
    )

}

export default DataTableRecompensasCajaAdmin