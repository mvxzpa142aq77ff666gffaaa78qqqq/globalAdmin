import React, { useContext, useEffect, useState, useMemo } from 'react'
import { Box, Button, IconButton, Stack, Typography } from '@mui/material'
import { Add, Delete, Edit } from '@mui/icons-material';
import { DataGridPro ,GridToolbar,esES,useGridApiRef,useKeepGroupedColumnsHidden} from '@mui/x-data-grid-pro';

import useSWR from "swr"
import {
    useQuery
} from '@tanstack/react-query'

import AppContext from '../../../../contexts/ServiceContext';
import SkeletonTable from '../../../skelholder/skelethonTable';
import { GetEnviosCajaMaster } from './getEnviosCajaMaster';
import VerFactura from '../../../transacciones/envios/verFactura';


const VISIBLE_FIELDS = ['nameSend', 'phoneSend', 'Fecha', 'adressAdmin', 'verifyRecp', 'quantSend', 'interesSocio', 'interesGlobal', 'nameRecep', 'phoneRecep', 'adressRecep', 'nameAdmin', , 'fechaA', 'createdAt', 'phoneAdmin', 'acciones', 'Acciones'];

const columns1 = [
    {
        field: 'fechaA',
        headerName: 'Desde',
        type: "date",
        width: 140,
        Visibility: false,
        editable: false,
        valueGetter: (params) => new Date(params.row.fechaA),
        renderCell: (params) => {
            const mes = Number(new Date(params.row.fechaA).getMonth()) + 1;
            const dia = Number(new Date(params.row.fechaA).getDate());
            const agno = Number(new Date(params.row.fechaA).getFullYear());
            const hora = new Date(params.row.fechaA).getHours();
            const min = new Date(params.row.fechaA).getMinutes();

            return (dia + '/' + mes + '/' + agno + '  ' + hora + ':' + min);
        },

    },
    {
        field: 'createdAt',
        headerName: 'Hasta',
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
        field: 'nameSend',
        headerName: 'Nombre del remitente',
        width: 140,
        editable: false,
    },
    {
        field: 'phoneSend',
        headerName: 'Telefono del remitente',
        width: 120,
        editable: false,
    },
    {
        field: 'nameRecep',
        headerName: 'Nombre del receptor',
        width: 140,
        editable: false,
    },

    {
        field: 'phoneRecep',
        headerName: 'Telefono del receptor',
        width: 120,
        editable: false,
    },
    {
        field: 'adressAdmin',
        headerName: 'Enviado en',
        width: 120,
        editable: false,
    },
    {
        field: 'adressRecep',
        headerName: 'Ciudad de recepcion',
        width: 120,
        editable: false,
    },
    {
        field: 'quantSend',
        headerName: 'Cantidad enviado',
        type: 'phone',
        width: 100,
        editable: false,
    },
    {
        field: 'interesSocio',
        headerName: 'Interes del socio',
        width: 100,
        editable: false,
    },

    {
        field: "verifyRecp",
        headerName: 'Estado',
        width: 100,
        editable: false,
        renderCell: (params) => {
            const currentRow = params.row;
            const verificars = params.row.verifyRecp;

            return (
                <>
                    {verificars ?
                        <Box>
                            <Typography sx={{ color: "#00c853", textAlign: "center", marginTop: '10px' }} variant='p'>
                                Cobrado
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
    {
        field: "Acciones",
        headerName: 'Acciones',
        width: 120,
        editable: false,
        renderCell: (params) => {
            const currentRow = params.row;
            const id = params.row._id;
            const verificars = params.row.verifyRecp;



            return (
                <>

                    
                    <VerFactura datos={currentRow} />
                     
                </>
            );
        },
    },

];


const arrayMaster = ['Master_GNOB']

function DataTableEnviosCajaMaster({id}) {
    const { userId, typeUser ,AxiosConfigsToken } = useContext(AppContext)

    const [dataMaster, setDataMaster] = useState([])

    const columns = useMemo(
        () => columns1.filter((column) => VISIBLE_FIELDS.includes(column.field)),
        [columns1],
    );

    const { data, error, isLoading, } = useSWR(["obtenerEnviosDeCajaMaster", id], () => GetEnviosCajaMaster(id,AxiosConfigsToken), {})

    if (isLoading) return <SkeletonTable />
    if (error) return <></>
    return (
        <>
           
            <Box sx={{ height: 600, width: '100%' }}>
                <DataGridPro
                    rows={data}
                    getRowId={(row) => row._id}
                    //disableColumnFilter
                    disableColumnSelector
                    disableDensitySelector
                    columns={columns}
                    slots={{ toolbar: GridToolbar }}
                    localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                    disableRowSelectionOnClick
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
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
        </>
    )





}

export default DataTableEnviosCajaMaster