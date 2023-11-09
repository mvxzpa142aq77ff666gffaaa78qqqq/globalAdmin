import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Add } from '@mui/icons-material';
import FormAddMasters from './formAddMasters';
import { Grid } from '@mui/material';
import FormUpdateMasters from './formUpdateMaster';

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

export default function ModalUpdateMaster({dataUser}) {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (

        <FormUpdateMasters dataUser={dataUser}/>

    );
}