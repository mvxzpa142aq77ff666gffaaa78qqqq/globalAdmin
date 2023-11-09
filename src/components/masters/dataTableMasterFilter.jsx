import * as React from 'react';
import { useDemoData } from '@mui/x-data-grid-generator';
import { Box, Button, IconButton, Stack } from '@mui/material'
import { DataGridPro, GridToolbar, esES, useGridApiRef, useKeepGroupedColumnsHidden } from '@mui/x-data-grid-pro';
import { Add, Delete, Edit, Visibility } from '@mui/icons-material';
import ModalAddMaster from './modalAddMaster';
import useSWR from "swr"
import { GetMasters, GetMastersId } from './getMasters';
import ModalUpdateMaster from './modalUpdateMasters';
import SkeletonTable from '../skelholder/skelethonTable';
import { NavLink } from 'react-router-dom';
import { DataGridPremium } from '@mui/x-data-grid-premium';
import AppContext from '../../contexts/ServiceContext';
import ActiveDesactiveMasterAdmin from '../activarDesactivarMaster';

const arrayMaster = ['Master_GNOB', 'Master_FINANCIADO', 'Master_PREFINANCIADO']

const VISIBLE_FIELDS = ['username', 'name', 'Fecha', 'phone', 'typeUser', 'quantSolde', 'interesSocio', 'fechaA', 'createdAt', 'acciones', 'Acciones'];


export default function QuickFilteringInitialize() {
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
            field: 'username',
            headerName: 'Nombre de usuario',
            width: 130,
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
            width: 100,
            editable: false,
        },
        {
            field: 'typeUser',
            headerName: 'Tipo de master',
            width: 140,
            editable: false,
        },

        {
            field: 'acciones',
            headerName: 'Acciones permitidas',
            width: 220,
            editable: false,
        },
        {
            field: 'quantSolde',
            headerName: 'Cantidad de saldo',
            width: 140,
            editable: false,
            renderCell: (params) => {
                return (Number(params.row.quantSolde).toLocaleString("es-GQ") + ' ' + 'XAF');
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
                //console.log(currentRow)



                return (
                    <>
                        {acciones.includes('activar_desactivar_caja_master') ?
                            <ActiveDesactiveMasterAdmin dataUser={currentRow} />
                            :
                            <></>
                        }
                        {acciones.includes('editar_master') ?
                            <ModalUpdateMaster dataUser={currentRow} />
                            :
                            <></>
                        }
                        {/*<IconButton component={NavLink} to={`/master_info/${id}`} variant="" color="primary" size="small">
                            <Visibility />
                </IconButton>*/}


                        {acciones.includes('ver_info_master') ?
                            <Button color='secondary' size='small' sx={{ marginLeft: '1px' }} variant="contained" component={NavLink} to={`/master_info/${id}`} endIcon={<Visibility />}>
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

    const apiRef = useGridApiRef();

    // Otherwise filter will be applied on fields such as the hidden column id
    const columns = React.useMemo(
        () => columns1.filter((column) => VISIBLE_FIELDS.includes(column.field)),
        [columns1],
    );

    if (arrayMaster.includes(typeUser)) {
        const { data, error, isLoading, } = useSWR(["ObtenerMastersId", userId], () => GetMastersId(userId,AxiosConfigsToken), {})

        if (isLoading) return <SkeletonTable />
        if (error) return <></>
        return (
            <>
            <p>gfgdfg</p>
                <div style={{ width: '100%' }}>
                    <div style={{ height: 600, width: '100%' }}>
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
                    </div>
                </div>

            </>
        );
    } else {
        const { data, error, isLoading, } = useSWR("ObtenerMasterss", () => GetMasters(AxiosConfigsToken), {})

        if (isLoading) return <SkeletonTable />
        if (error) return <></>
        return (
            <>
                <>ADmin</>
                {acciones.includes('crear_master') ?
                    <ModalAddMaster />
                    :
                    <></>
                }
                <div style={{ width: '100%' }}>
                    <div style={{ height: 600, width: '100%' }}>
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
                    </div>
                </div>

            </>
        );
    }

}