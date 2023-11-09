import React, { useState, useMemo } from 'react'
import { Box, Button, IconButton, Stack } from '@mui/material'
import { DataGrid, esES, GridToolbar } from '@mui/x-data-grid'
import { Add, Delete, Edit } from '@mui/icons-material';
import ModalAddUser from './modalAddRoles';
import useSWR from "swr"
import ModalAddFormUpdateUser from './modalFormUpdateRoles';
import ModalDeleteUser from './modalDeleteRoles';
import { GetRoles } from './getRoles';
import ModalAddRoles from './modalAddRoles';
import ModalAddFormUpdateRoles from './modalFormUpdateRoles';
import ModalAddMaster from '../masters/modalAddMaster';
import SkeletonTable from '../skelholder/skelethonTable';
import AppContext from '../../contexts/ServiceContext';

const VISIBLE_FIELDS = ['name', "Acciones", "porcentage"];

const columns1 = [
    {
        field: 'name',
        headerName: 'Role',
        width: 180,
        editable: false,
    },
    {
        field: 'porcentage',
        headerName: 'Porcentaje',
        width: 180,
        editable: false,
    },
    {
        field: "Acciones",
        headerName: 'Acciones',
        width: 180,
        editable: false,
        renderCell: (params) => {
            const currentRow = params.row;

            return (
                <>
                    {
                        <>
                            {params.row.name === 'super_admin' || params.row.name === 'Cajero' ?
                                <></>
                                :
                                <ModalAddFormUpdateRoles dataUser={currentRow} />
                            }
                            {/*<ModalDeleteUser dataUser={currentRow} />*/}
                        </>
                    }

                </>
            );
        },
    },

];

function DataTableRoles() {
    const { userId, typeUser, acciones ,AxiosConfigsToken} = React.useContext(AppContext)

    //SWR para hacer peticiones

    const [openFormUpdate, setOpenFormUpdate] = React.useState(false);

    const { data, error, isLoading, } = useSWR("getRoles",()=> GetRoles(AxiosConfigsToken), {})

    const columns = React.useMemo(
        () => columns1.filter((column) => VISIBLE_FIELDS.includes(column.field)),
        [columns1],
    );

    if (isLoading) return <SkeletonTable />

    if (error) return <></>

    return (
        <>
            <ModalAddRoles />
            <Box sx={{ height: 600, width: '100%' }}>
                <DataGrid
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

export default DataTableRoles