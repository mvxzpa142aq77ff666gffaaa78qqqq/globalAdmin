import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Add, Edit } from '@mui/icons-material';
import { Grid, IconButton } from '@mui/material';
import FormAddUserAdmin from './formAddUserAdmin';
import FormUpdateUser from './formUpdateUser';

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

export default function ModalAddFormUpdateUser({ dataUser }) {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

 

    return (
        
        <FormUpdateUser dataUser={dataUser}/>
        

    );
}


/*

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant='h6' sx={{ textAlign: "center", marginBottom: 2, color: "textColorTitle" }}>Registrar nuevo admin</Typography>
                    <Grid sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                        <FormAddUserAdmin />
                    </Grid>
                </Box>
            </Modal>

*/