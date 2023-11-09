import * as React from 'react';
import { useDemoData } from '@mui/x-data-grid-generator';
import { Box, Button, IconButton, Pagination, Stack, Typography, TablePagination, Paper, Grid, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { Add, Delete, Edit, Search, Visibility } from '@mui/icons-material';
import useSWR from "swr"
import SkeletonTable from '../../skelholder/skelethonTable';
import { NavLink } from 'react-router-dom';
import { GetRecompensasTodos, GetRecompensasMaster } from './getRecompensas'
import { DataGridPro, GridToolbar, esES, useGridApiRef, useKeepGroupedColumnsHidden } from '@mui/x-data-grid-pro';
import { arrayMaster } from '../../../contexts/constantesVar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { es } from 'date-fns/locale'
import { LoadingButton } from '@mui/lab';
import axiosConfigs from '../../axiosConfig';
import ExportExcel from "react-export-excel"
import FormSolicitarRecompensa from './formSolicitarRecompensa';
import FormValidarRecompensa from './formValidarRecompensa';
import AppContext from '../../../contexts/ServiceContext';


const ExcelFile = ExportExcel.ExcelFile
const ExcelSheet = ExportExcel.ExcelSheet
const ExcelColumn = ExportExcel.ExcelColumn

const VISIBLE_FIELDS = ['nameAdmin', 'codigo', 'phoneAdmin', 'typeUser', 'estado', 'Fecha', 'quantSoldeActual', 'quantSolde', 'quantSoldeCount', 'nameConfSist', 'phoneConfSist', 'fechaA', 'createdAt', 'Acciones'];




export default function DataTableRecompensas() {

    const { userId, typeUser, acciones ,AxiosConfigsToken} = React.useContext(AppContext)
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

                const suma = Number(params.row.quantSoldeCount) - Number(params.row.quantSolde)

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

        arrayMaster.includes(typeUser) ?
            {
                field: 'codigo',
                headerName: 'Codigo',
                width: 130,
                editable: false,
            }
            :
            {

            },
        {
            field: "estado",
            headerName: 'Estado',
            width: 120,
            editable: false,
            renderCell: (params) => {
                const currentRow = params.row;
                const verificars = params.row.quantSoldeCount;

                return (
                    <>
                        {verificars ?
                            <Box>
                                <Typography sx={{ color: "#00c853", textAlign: "center", marginTop: '10px' }} variant='p'>
                                    Recompensado
                                </Typography>
                            </Box>
                            :
                            <Box>
                                <Typography sx={{ color: "principalColor", textAlign: "center", marginTop: '10px' }} variant='p'>
                                    Pendiente
                                </Typography>
                            </Box>
                        }
                    </>
                );
            },
        },

        arrayMaster.includes(typeUser) ?
            {

            }
            :
            {
                field: "Acciones",
                headerName: 'Acciones',
                width: 300,
                editable: false,
                renderCell: (params) => {
                    const currentRow = params.row;
                    const verificars = params.row.quantSoldeCount;




                    return (
                        <>
                            {acciones.includes('recompensar_master') ?
                                <>
                                    {verificars ?
                                        <></>
                                        :
                                        <FormValidarRecompensa dataUser={currentRow} GetRecompAdmin={GetRecargasAdmin} />
                                    }
                                </>
                                :
                                <>

                                </>
                            }

                        </>
                    );
                },
            },




    ];

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

    /**************************************************************************************************** */

    const columns = React.useMemo(
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
    const SumaTotalIG = (lista) => {
        if (lista) {
            var totals = 0
            var cesta = lista
            for (let x in cesta) {
                totals += cesta[x]["interesGlobal"]
            }
            setTotalIG(totals)
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
                if (arrayMaster.includes(typeUser)) {
                    GetRecargasMasters(userId)
                } else {
                    GetRecargasAdmin()
                }
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

    const GetRecargasMasters = async (userId) => {
        setSpinnerArray(true)
        try {
            const res = await AxiosConfigsToken.get(`/obtener_recompensas_master/${userId}`)
            console.log(res)
            if (res.data.data.docs) {
                const datos = res.data.data.docs
                setDataArray(datos)

                SumaTotalData(datos)
                SumaTotalSaldo(datos)
                //SumaTotalIG(datos)
                //SumaTotalIS(datos)
                //SumaTotalIva(datos)
                //SumaTotalComision(datos)

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
    const GetRecargasAdmin = async () => {
        setSpinnerArray(true)
        try {
            const res = await AxiosConfigsToken.get(`/obtener_recompensas_todas`)
            if (res.data.data.docs) {
                const datos = res.data.data.docs
                setDataArray(datos)

                SumaTotalData(datos)
                SumaTotalSaldo(datos)
                //SumaTotalIG(datos)
                //SumaTotalIS(datos)
                //SumaTotalIva(datos)
                //SumaTotalComision(datos)

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
        //console.log(typeUser)
        if (arrayMaster.includes(typeUser)) {
            GetRecargasMasters(userId)
            console.log("master")
        } else {
            GetRecargasAdmin()
            console.log("admin sda")

        }
    }, [])
    /**************************************************** */

    if (arrayMaster.includes(typeUser)) {
        //const { data, error, isLoading, } = useSWR(["obtenerRecompensasMaster", userId], () => GetRecompensasMaster(userId), {})

        if (spinnerArray) return <SkeletonTable />
        //if (error) return <></>
        return (
            <>

                <FormSolicitarRecompensa GetEnviosMaster={GetRecargasMasters} />
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
                                onClick={() => { Buscar('filtrar_recompensas_master') }}
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
                        <ExcelFile element={<Button sx={{ marginLeft: 1, marginBottom: 1 }} color='inherit' variant='contained' size='small'>Excel</Button>} filename={`recompenzas`}>
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
                        <Typography variant='p' sx={{ marginBlock: '3px', fontWeight: "700", marginLeft: 1 }}><span style={{ color: '#212121', fontSize: '13px' }}>Total operaciones : </span><span style={{ color: "#000000", fontSize: '16px' }}>{Number(totalData).toLocaleString("es-GQ")}</span></Typography>
                        <Typography variant='p' sx={{ marginBlock: '3px', fontWeight: "700", marginLeft: 1 }}><span style={{ color: '#212121', fontSize: '13px' }}>Total saldo recompensado : </span><span style={{ color: "#000000", fontSize: '16px' }}>{Number(totalSaldo).toLocaleString("es-GQ")} XAF</span></Typography>
                    </Paper>
                </Box>
            </>
        )
    } else {
        //const { data, error, isLoading, } = useSWR(["obtenerRecompensasTodos", userId], () => GetRecompensasTodos(), {})

        if (spinnerArray) return <SkeletonTable />
        //if (error) return <></>
        return (
            <>

                <p>Admin</p>

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
                                onClick={() => { Buscar('filtrar_recompensas_admin') }}
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
                        <ExcelFile element={<Button sx={{ marginLeft: 1, marginBottom: 1 }} color='inherit' variant='contained' size='small'>Excel</Button>} filename={`recompenzas`}>
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
                        <Typography variant='p' sx={{ marginBlock: '3px', fontWeight: "700", marginLeft: 1 }}><span style={{ color: '#212121', fontSize: '13px' }}>Total operaciones : </span><span style={{ color: "#000000", fontSize: '16px' }}>{Number(totalData).toLocaleString("es-GQ")}</span></Typography>
                        <Typography variant='p' sx={{ marginBlock: '3px', fontWeight: "700", marginLeft: 1 }}><span style={{ color: '#212121', fontSize: '13px' }}>Total saldo recompensado : </span><span style={{ color: "#000000", fontSize: '16px' }}>{Number(totalSaldo).toLocaleString("es-GQ")} XAF</span></Typography>
                    </Paper>
                </Box>

            </>
        )
    }
}

