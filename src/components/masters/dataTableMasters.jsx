import React from 'react'
import { Box, Button, IconButton, Stack } from '@mui/material'
import { DataGrid, esES, GridToolbar } from '@mui/x-data-grid'
import { Add, Delete, Edit } from '@mui/icons-material';
import ModalAddMaster from './modalAddMaster';
import useSWR from "swr"
import { GetMasters } from './getMasters';
import ModalUpdateMaster from './modalUpdateMasters';
import {
    useQuery,
} from '@tanstack/react-query'
import SkeletonTable from '../skelholder/skelethonTable';

const columns = [
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
        headerName: 'Tipo de master',
        width: 180,
        editable: false,
    },

    {
        field: 'acciones',
        headerName: 'Acciones permitidas',
        width: 180,
        editable: false,
    },
    {
        field: 'quantSolde',
        headerName: 'Cantidad de saldo',
        width: 180,
        editable: false,
    },
    {
        field: 'interesSocio',
        headerName: 'Interes del master',
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
            console.log(currentRow)

            return (
                <>
                    <IconButton variant="" color="warning" size="small">
                        <Edit />
                    </IconButton>
                    <ModalUpdateMaster dataUser={currentRow} />
                </>
            );
        },
    },

];



function DataTableMasters() {

    //SWR para hacer peticiones
    const { data, error, isLoading, } = useSWR(["ObtenerMasters"], GetMasters, {})
    //const { isLoading, isError, data, error } = useQuery({
    //queryKey: ['MasterRs'],
    //queryFn: GetMasters,
    //})
    if (isLoading) return <SkeletonTable />
    if (error) return <></>



    return (
        <>
            <ModalAddMaster />
            <div style={{ width: '100%' }}>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                        rows={data}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        getRowId={(row) => row._id}
                        pageSizeOptions={[5]}

                        components={{
                            //Toolbar: GridToolbar,
                        }}
                        options={{
                            selectableRows: false,
                            rowHover: false,
                            filter: false,
                            print: false,
                            download: false,
                            responsive: "scroll",
                        }}
                        disableRowSelectionOnClick
                    />
                </div>
            </div>

        </>
    )
}

export default DataTableMasters