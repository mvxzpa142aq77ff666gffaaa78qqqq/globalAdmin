import React, { useContext, useEffect, useState, useMemo } from 'react'
import { Box, Button, IconButton, Stack } from '@mui/material'
import { DataGridPro, GridToolbar, esES, useGridApiRef, useKeepGroupedColumnsHidden } from '@mui/x-data-grid-pro';
import { Add, Delete, Edit, Visibility } from '@mui/icons-material';
import ModalAddCajas from './modalAddCaja';
import useSWR from "swr"
import {
    useQuery
} from '@tanstack/react-query'
import { GetTodasCajas, GetMasterCajas } from './getCajas';
import AppContext from '../../contexts/ServiceContext';
import ModalAddMaster from '../masters/modalAddMaster';
import { NavLink } from 'react-router-dom';
import ModalUpdateCajas from './modalUpdateCaja';
import SkeletonTable from '../skelholder/skelethonTable';
import ActiveDesactiveCaja from '../activarDesactivarCaja';


const VISIBLE_FIELDS = ['username', 'name', 'phone', 'typeUser', 'quantSolde', 'interesSocio', 'fechaA', 'createdAt', 'acciones', 'Acciones'];



const arrayMaster = ['Master_GNOB', 'Master_FINANCIADO', 'Master_PREFINANCIADO']

function DataTableCajas() {
    const { userId, typeUser, acciones ,AxiosConfigsToken} = useContext(AppContext)
    const apiRef = useGridApiRef();

    const [dataMaster, setDataMaster] = useState([])

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
            renderCell: (params) => {
                return (Number(params.row.quantSolde).toLocaleString("es-GQ") + ' ' + 'XAF');
            },
        },

        {
            field: 'interesSocio',
            headerName: 'Interes del master',
            width: 110,
            editable: false,
            renderCell: (params) => {
                return (Number(params.row.interesSocio).toLocaleString("es-GQ") + ' ' + 'XAF');
            },
        },
        {
            field: "Acciones",
            headerName: 'Acciones',
            width: 300,
            editable: false,
            renderCell: (params) => {
                const currentRow = params.row;
                const id = params.row._id;
                console.log(currentRow)

                return (
                    <>

                        {acciones.includes('activar_desactivar_caja_master') ?
                            <ActiveDesactiveCaja dataUser={currentRow} />
                            :
                            <></>
                        }
                        {acciones.includes('editar_caja_master') ?

                            <ModalUpdateCajas dataUser={currentRow} />

                            :
                            <></>
                        }
                        {/*<IconButton component={NavLink} to={`/caja_master_info/${id}`} variant="" color="primary" size="small">
                            <Visibility />
                    </IconButton>*/}
                        {acciones.includes('ver_info_caja_master') ?
                            <Button color='secondary' size='small' sx={{ marginLeft: '1px' }} variant="contained" component={NavLink} to={`/caja_master_info/${id}`} endIcon={<Visibility />}>
                                Ver
                            </Button>
                            :
                            <></>
                        }

                    </>
                );
            },
        },


    ];

    const columns = useMemo(
        () => columns1.filter((column) => VISIBLE_FIELDS.includes(column.field)),
        [columns1],
    );


    if (arrayMaster.includes(typeUser)) {
        const { data, error, isLoading, } = useSWR(["obtenerCajass", userId], () => GetMasterCajas(userId,AxiosConfigsToken), {})

        if (isLoading) return <SkeletonTable />
        if (error) return <></>
        return (
            <>
                {acciones.includes('ver_info_caja_master') ?
                    <>
                        <ModalAddCajas />

                        <Box sx={{ height: 600, width: '100%' }}>
                            <DataGridPro
                                rows={data}
                                getRowId={(row) => row._id}
                                apiRef={apiRef}
                                disableColumnFilter
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

                    :
                    <>
                    </>
                }
            </>
        )
    } else {
        const { data, error, isLoading, } = useSWR("obtenerTodasCajasss", () => GetTodasCajas(AxiosConfigsToken), {})

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


}

export default DataTableCajas