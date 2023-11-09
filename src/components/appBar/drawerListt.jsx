import * as React from 'react';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Add, BusinessCenter, CurrencyExchange, PersonAddAlt1, SyncLock } from '@mui/icons-material';
import { PeopleAlt } from '@mui/icons-material';
import { Sort } from '@mui/icons-material';
import { Sync } from '@mui/icons-material';
import LockIcon from '@mui/icons-material/Lock';
import { HouseSharp } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import FeedIcon from '@mui/icons-material/Feed';
import { Box, Button } from '@mui/material';
import { ID_USER, NAME_USER, PHONE_USER, TYPE_USER, VALIDE_USER } from '../../contexts/constantesVar';
import AppContext from '../../contexts/ServiceContext';

const drawerWidth = 200;

const listIconStyle = {
    color: "textColorTitle2",
    fontSize: '27px',
    fontWeight: "600px"
}

const listTextStyle = {
    fontWeight: "900",
    color: "textColorTitle2"
}



function DrawerListt({ toggleDrawer }) {
    const { userId, dispatch, typeUser } = React.useContext(AppContext)

    const CloseSesion = () => {
        window.localStorage.setItem("enableTCaja", JSON.stringify({ valor: false, valorI: "", nameI: '', typeI: '', phoneI: '', accI: [] }))

        dispatch({
            type: VALIDE_USER,
            payload: false
        })
        dispatch({
            type: NAME_USER,
            payload: ""
        })

        dispatch({
            type: ID_USER,
            payload: ""
        })


        dispatch({
            type: TYPE_USER,
            payload: ""
        })
        dispatch({
            type: PHONE_USER,
            payload: ""
        })


    }
    const listePathSuper = [
        { text: 'Inicio', link: "/" },
        { text: 'Usuario', link: "/users" },
        { text: 'Transacciones', link: "/transaction" },
        { text: 'Flujo de saldo', link: "/flujo" },
        { text: 'Caja de la empresa', link: `/caja_de_empresa/${userId}` },
        { text: 'Roles', link: "/roles" },
        { text: 'Cambiar contra...', link: "/cambiar_password" }
    ]
    const listePathAdmin = [
        { text: 'Inicio', link: "/" },
        { text: 'Usuario', link: "/users" },
        { text: 'Transacciones', link: "/transaction" },
        { text: 'Flujo de saldo', link: "/flujo" },
        { text: 'Caja de la empresa', link: `/caja_de_empresa/${userId}` },
    ]
    const listePathMaster = [
        { text: 'Inicio', link: "/" },
        { text: 'Usuario', link: "/users" },
        { text: 'Transacciones', link: "/transaction" },
        { text: 'Flujo de saldo', link: "/flujo" },
        { text: 'Cambiar contra...', link: "/cambiar_password" }
    ]
    return (
        <div>
            <Toolbar title="TITLE" >
                
                <Box sx={{
                    marginTop: 3,
                    flexDirection: 'column'
                }}>
                    <img
                        src={'https://res.cloudinary.com/mumbex/image/upload/v1690124154/logo_llkugd.png'}
                        alt={"gnob"}
                        loading="lazy"
                        width={200}

                    />
                    {<Typography sx={{ color: "#eee", textAlign: 'center', marginTop: -1 }} variant='h5'>
                        G-NOB MONEY
                    </Typography>}
                </Box>


            </Toolbar>

            <List>


                <>
                    {
                        typeUser === 'super_admin' || typeUser === 'Gestor' || typeUser === 'Cajero' ?
                            <>
                                {typeUser === 'super_admin' ?
                                    <>
                                        {listePathSuper.map((menu, index) => (
                                            <ListItem key={menu.text} disablePadding divider={true} sx={{ color: "#212121", fontSize: '30px', fontWeight: "800px" }}>
                                                <ListItemButton component={NavLink} to={menu.link} onClick={toggleDrawer}  >
                                                    <ListItemIcon  >
                                                        {menu.text === "Inicio" ? <HouseSharp sx={listIconStyle} /> : <></>}
                                                        {menu.text === "Usuario" ? <PeopleAlt sx={listIconStyle} /> : <></>}
                                                        {menu.text === "Transacciones" ? <Sync sx={listIconStyle} /> : <></>}
                                                        {menu.text === "Flujo de saldo" ? <CurrencyExchange sx={listIconStyle} /> : <></>}
                                                        {menu.text === "Caja de la empresa" ? <BusinessCenter sx={listIconStyle} /> : <></>}
                                                        {menu.text === "Cambiar contra..." ? <SyncLock sx={listIconStyle} /> : <></>}
                                                        {menu.text === "Roles" ? <FeedIcon sx={listIconStyle} /> : <></>}
                                                    </ListItemIcon>
                                                    <ListItemText primary={menu.text} sx={listTextStyle} />
                                                </ListItemButton>
                                            </ListItem>

                                        ))}
                                    </>
                                    :
                                    <>
                                        {listePathAdmin.map((menu, index) => (
                                            <ListItem key={menu.text} disablePadding divider={true} sx={{ color: "#212121", fontSize: '30px', fontWeight: "800px" }}>
                                                <ListItemButton component={NavLink} to={menu.link} onClick={toggleDrawer} >
                                                    <ListItemIcon  >
                                                        {menu.text === "Inicio" ? <HouseSharp sx={listIconStyle} /> : <></>}
                                                        {menu.text === "Usuario" ? <PeopleAlt sx={listIconStyle} /> : <></>}
                                                        {menu.text === "Transacciones" ? <Sync sx={listIconStyle} /> : <></>}
                                                        {menu.text === "Flujo de saldo" ? <CurrencyExchange sx={listIconStyle} /> : <></>}
                                                        {menu.text === "Caja de la empresa" ? <BusinessCenter sx={listIconStyle} /> : <></>}
                                                        {menu.text === "Cambiar contra..." ? <SyncLock sx={listIconStyle} /> : <></>}
                                                        {menu.text === "Roles" ? <FeedIcon sx={listIconStyle} /> : <></>}
                                                    </ListItemIcon>
                                                    <ListItemText primary={menu.text} sx={listTextStyle} />
                                                </ListItemButton>
                                            </ListItem>

                                        ))}
                                    </>

                                }

                            </>

                            :
                            <>
                                {listePathMaster.map((menu, index) => (
                                    <ListItem key={menu.text} disablePadding divider={true} sx={{ color: "#212121", fontSize: '30px', fontWeight: "800px" }}>
                                        <ListItemButton component={NavLink} to={menu.link} onClick={toggleDrawer}  >
                                            <ListItemIcon  >
                                                {menu.text === "Inicio" ? <HouseSharp sx={listIconStyle} /> : <></>}
                                                {menu.text === "Usuario" ? <PeopleAlt sx={listIconStyle} /> : <></>}
                                                {menu.text === "Transacciones" ? <Sync sx={listIconStyle} /> : <></>}
                                                {menu.text === "Flujo de saldo" ? <CurrencyExchange sx={listIconStyle} /> : <></>}
                                                {menu.text === "Caja de la empresa" ? <BusinessCenter sx={listIconStyle} /> : <></>}
                                                {menu.text === "Cambiar contra..." ? <SyncLock sx={listIconStyle} /> : <></>}
                                                {menu.text === "Roles" ? <FeedIcon sx={listIconStyle} /> : <></>}
                                            </ListItemIcon>
                                            <ListItemText primary={menu.text} sx={listTextStyle} />
                                        </ListItemButton>
                                    </ListItem>

                                ))}

                            </>
                    }



                </>

            </List>
            <List>
                <ListItem disablePadding divider={true} sx={{ color: "#212121", marginTop: 3, fontSize: '30px', fontWeight: "800px" }}>
                    <ListItemButton onClick={() => {
                        CloseSesion()
                        toggleDrawer()
                    }} >
                        <ListItemIcon  >

                            <LockIcon sx={listIconStyle} />
                        </ListItemIcon>
                        <ListItemText primary={'Cerra sesion'} sx={listTextStyle} />
                    </ListItemButton>
                </ListItem>
            </List>



        </div>
    )
}

export default DrawerListt