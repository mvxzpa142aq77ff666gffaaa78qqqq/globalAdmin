import React, { useContext, useEffect, useState, useMemo } from 'react'
import { Box, Button, IconButton, Stack } from '@mui/material'
import { DataGridPro, GridToolbar, esES, useGridApiRef, useKeepGroupedColumnsHidden } from '@mui/x-data-grid-pro';

import { Add, Delete, Edit, Visibility } from '@mui/icons-material';
import useSWR from "swr"
import {
    useQuery
} from '@tanstack/react-query'

import AppContext from '../../../../contexts/ServiceContext';
import SkeletonTable from '../../../skelholder/skelethonTable';
import { GetCajasMaster } from './getCajasMaster';
import { NavLink } from 'react-router-dom';


const VISIBLE_FIELDS = ['username', 'Fecha', 'name', 'phone', 'typeUser', 'quantSolde', 'interesSocio', 'acciones', 'fechaA', 'createdAt', 'Acciones'];

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
        field: 'username',
        headerName: 'Nombre de usuario',
        width: 150,
        editable: false,
    },
    {
        field: 'name',
        headerName: 'Nombre completo',
        width: 150,
        editable: false,
    },
    {
        field: 'phone',
        headerName: 'Telefono',
        type: 'phone',
        width: 110,
        editable: false,
    },
    {
        field: 'acciones',
        headerName: 'Acciones permitidas',
        width: 110,
        editable: false,
    },
    {
        field: 'quantSolde',
        headerName: 'Cantidad de saldo',
        width: 110,
        editable: false,
    },
    {
        field: 'interesSocio',
        headerName: 'Interes del master',
        width: 110,
        editable: false,
    },
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
        field: "Acciones",
        headerName: 'Acciones',
        width: 140,
        editable: false,
        renderCell: (params) => {
            const currentRow = params.row;
            const id = params.row._id;
            console.log(currentRow)



            return (
                <>
                    <Button component={NavLink} to={`/caja_master_info/${id}`} color='secondary' size='small' sx={{ marginLeft: '1px' }} variant="contained" endIcon={<Visibility />}>
                        Ver
                    </Button>
                </>
            );
        },
    },


];

const arrayMaster = ['Master_GNOB']

function DataTableCajasMaster({ id }) {
    const { userId, typeUser ,AxiosConfigsToken} = useContext(AppContext)

    const [dataMaster, setDataMaster] = useState([])

    const columns = useMemo(
        () => columns1.filter((column) => VISIBLE_FIELDS.includes(column.field)),
        [columns1],
    );

    const { data, error, isLoading, } = useSWR(["obtenerCajasMaster", id], () => GetCajasMaster(id,AxiosConfigsToken), {})

    if (isLoading) return <SkeletonTable />
    if (error) return <></>
    return (
        <>

            <Box sx={{ height: 600, width: '100%' }}>
                <DataGridPro
                    rows={data}
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
        </>
    )





}

export default DataTableCajasMaster