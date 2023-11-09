import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Add, Delete, Edit } from '@mui/icons-material';
import { Grid, IconButton } from '@mui/material';
import FormAddRoles from './formAddRoles';
import FormDeleteRoles from './formDeleteRole';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    pb: 4,
    pt: 4,
};

export default function ModalDeleteRoles({ dataUser }) {

   

    return (


        <FormDeleteRoles dataUser={dataUser} />


    );
}