import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Add } from '@mui/icons-material';
import FormAddCaja from './formAddCaja';
import { Grid } from '@mui/material';
import FormUpdateCaja from './formUpdateCaja';



export default function ModalUpdateCajas({dataUser}) {


    return (
        <FormUpdateCaja dataUser={dataUser}/>
    );
}