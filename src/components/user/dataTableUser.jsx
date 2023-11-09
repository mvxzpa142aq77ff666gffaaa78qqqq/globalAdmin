import React, { useState, useMemo } from 'react'
import { Box, Button, IconButton, Stack } from '@mui/material'
//import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { Add, Delete, Edit } from '@mui/icons-material';
import ModalAddUser from './modalAddUser';
import { DataGridPremium } from '@mui/x-data-grid-premium';
import { DataGridPro, GridToolbar, esES, useGridApiRef, useKeepGroupedColumnsHidden } from '@mui/x-data-grid-pro';
import useSWR from "swr"
import { GetUsers } from './getUsers';
import ModalAddFormUpdateUser from './modalFormUpdateUser';
import ModalDeleteUser from './modalDeleteUser';
import SkeletonTable from '../skelholder/skelethonTable';
import AppContext from '../../contexts/ServiceContext';
import ActiveDesactiveMasterAdmin from '../activarDesactivarMaster';


const VISIBLE_FIELDS = ['username', 'name', 'Fecha', 'phone', 'typeUser', 'quantSolde', 'interesSocio', 'acciones', 'Fecha', 'createdAt', 'fechaA', 'Acciones'];



function DataTableUser() {
    const { typeUser, valideLogin, userId, userName, userCode, userPhone, dispatch, acciones,AxiosConfigsToken } = React.useContext(AppContext)
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
            width: 180,
            editable: false,
        },
        {
            field: 'name',
            headerName: 'Nombre completo',
            width: 180,
            editable: false,
        },
        {
            field: 'phone',
            headerName: 'Telefono',
            type: 'phone',
            width: 180,
            editable: false,
        },
        {
            field: 'typeUser',
            headerName: 'Role del usuario',
            width: 180,
            editable: false,
        },

        {
            field: 'acciones',
            headerName: 'Operaciones permitidas',
            width: 200,
            editable: false,
        },

        {
            field: "Acciones",
            headerName: 'Acciones',
            width: 300,
            editable: false,
            renderCell: (params) => {
                const currentRow = params.row;



                return (
                    <>

                        {currentRow.typeUser === 'Cajero' ?
                            <></>
                            :
                            <>


                                {acciones.includes('editar_admin') ?
                                    <ActiveDesactiveMasterAdmin dataUser={currentRow} />

                                    :
                                    <></>
                                }
                                {acciones.includes('editar_admin') ?
                                    <>
                                        <ModalAddFormUpdateUser dataUser={currentRow} />
                                    </>
                                    :
                                    <></>
                                }
                                {acciones.includes('eliminar_admin') ?
                                    <ModalDeleteUser dataUser={currentRow} />
                                    :
                                    <></>
                                }
                            </>
                        }
                    </>
                );
            },
        },

    ];
    //SWR para hacer peticiones

    const [openFormUpdate, setOpenFormUpdate] = React.useState(false);
    const apiRef = useGridApiRef();

    const { data, error, isLoading, } = useSWR("ObtenerAdminis",()=> GetUsers(AxiosConfigsToken), {})


    const columns = useMemo(
        () => columns1.filter((column) => VISIBLE_FIELDS.includes(column.field)),
        [columns1],
    );

    const filterColumns = ({ field, columns, currentFilters }) => {
        // remove already filtered fields from list of columns
        const filteredFields = currentFilters?.map((item) => item.field);
        return columns
            .filter(
                (colDef) =>
                    colDef.filterable &&
                    (colDef.field === field || !filteredFields.includes(colDef.field)),
            )
            .map((column) => column.field);
    };

    const getColumnForNewFilter = ({ currentFilters, columns }) => {
        const filteredFields = currentFilters?.map(({ field }) => field);
        const columnForNewFilter = columns
            .filter(
                (colDef) => colDef.filterable && !filteredFields.includes(colDef.field),
            )
            .find((colDef) => colDef.filterOperators?.length);
        return columnForNewFilter?.field ?? null;
    };
    if (isLoading) return <SkeletonTable />

    if (error) return <p>Cargando</p>
    return (
        <>
            {acciones.includes('crear_admin') ?
                <ModalAddUser />
                :
                <></>
            }
            <Box sx={{ height: 600, width: '100%' }}>
                <DataGridPro
                    rows={data}
                    getRowId={(row) => row._id}
                    localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                    columns={columns}
                    apiRef={apiRef}

                    disableColumnFilter
                    slots={{ toolbar: GridToolbar }}

                    disableColumnSelector
                    disableDensitySelector
                    disableRowSelectionOnClick
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                            quickFilterProps: { debounceMs: 500 },
                        },
                        filterPanel: {
                            filterFormProps: {
                                filterColumns,
                            },
                            getColumnForNewFilter,
                        },

                    }}
                    options={{
                        responsive: "scroll",
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

export default DataTableUser