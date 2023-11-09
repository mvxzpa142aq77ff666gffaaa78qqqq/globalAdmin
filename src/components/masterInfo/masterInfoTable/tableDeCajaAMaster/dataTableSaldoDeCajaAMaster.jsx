import React, { useContext, useEffect, useState, useMemo } from 'react'
import { Box, Button, IconButton, Stack } from '@mui/material'
import { Add, Delete, Edit } from '@mui/icons-material';
import useSWR from "swr"
import {
    useQuery
} from '@tanstack/react-query'

import AppContext from '../../../../contexts/ServiceContext';
import { DataGridPro ,GridToolbar,esES,useGridApiRef,useKeepGroupedColumnsHidden} from '@mui/x-data-grid-pro';
import SkeletonTable from '../../../skelholder/skelethonTable';
import { GetSaldoDeCajaAMaster } from './getSaldoDeCajaAMaster';



const VISIBLE_FIELDS = ['nameCaja', 'phoneCaja','Fecha' ,'quantSolde', 'quantSoldeCaja', 'nameMaster', 'phoneMaster', 'quantSoldeCount', 'fechaA', 'createdAt', 'Acciones'];

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
        field: 'nameCaja',
        headerName: 'Nombre de la caja',
        width: 150,
        editable: false,
    },
    {
        field: 'phoneCaja',
        headerName: 'Telefono de la caja',
        type: 'phone',
        width: 110,
        editable: false,
    },
    {
        field: 'quantSoldeCaja',
        headerName: 'Cantidad antes de recargar',
        width: 120,
        editable: false,
    },
    {
        field: 'quantSolde',
        headerName: 'Cantidad recargado',
        width: 120,
        editable: false,
    },
    {
        field: 'quantSolde',
        headerName: 'Cantidad resultante caja',
        width: 120,
        editable: false,
        renderCell: (params) => {
            let cant = Number(params.row.quantSoldeCaja) + Number(params.row.quantSoldeCaja);

            return (cant);
        },
    },

    {
        field: 'nameMaster',
        headerName: 'Master recargado',
        width: 120,
        editable: false,
    },
    {
        field: 'phoneMaster',
        headerName: 'Telefono master',
        width: 120,
        editable: false,
    },
    {
        field: 'quantSoldeCount',
        headerName: 'Cant.. exist.. master',
        width: 120,
        editable: false,
    },



];

const arrayMaster = ['Master_GNOB']

function DataTableSaldoDeCajaAMaster({id}) {
    const { userId, typeUser ,AxiosConfigsToken } = useContext(AppContext)

    const [dataMaster, setDataMaster] = useState([])

    const columns = useMemo(
        () => columns1.filter((column) => VISIBLE_FIELDS.includes(column.field)),
        [columns1],
    );

    const { data, error, isLoading, } = useSWR(["obtenerDeCajaAMaster", id], () =>  GetSaldoDeCajaAMaster(id,AxiosConfigsToken), {})

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

export default DataTableSaldoDeCajaAMaster