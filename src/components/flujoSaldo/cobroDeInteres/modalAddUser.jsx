import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Add } from '@mui/icons-material';
import FormAddUserAdmin from './formAddUserAdmin';
import { Grid } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    pb:4,
    pt:4,
};

export default function ModalAddUser() {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box sx={{ height: "auto", width: '100%', marginBottom: "10px", display: "flex", justifyContent: "end" }}>
            <Button
                variant="contained"
                startIcon={<Add />}
                onClick={handleOpen}
            >
                Agregar admin
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant='h6' sx={{textAlign:"center",marginBottom:2,color:"textColorTitle"}}>Registrar nuevo admin</Typography>
                    <Grid sx={{width:"100%",display:"flex",justifyContent:"center"}}>
                        <FormAddUserAdmin/>
                    </Grid>
                </Box>
            </Modal>
        </Box>

    );
}