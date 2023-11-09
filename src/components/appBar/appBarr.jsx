import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DrawerListt from './drawerListt';
import AppContext from '../../contexts/ServiceContext';
const drawerWidth = 250;

function MenuAppBars(props) {
    const { userId,userName,valideLogin } = React.useContext(AppContext)

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawerToggle = (
        <DrawerListt toggleDrawer={handleDrawerToggle} />
    );
    const drawerStatic = (
        <DrawerListt toggleDrawer={console.log("") } />
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div>
            {valideLogin?
                    <Box sx={{ display: "flex" }}>
                    <CssBaseline />
                    <AppBar
                        position="fixed"
                        sx={{
                            width: { sm: `calc(100% - ${drawerWidth}px)` },
                            ml: { sm: `${drawerWidth}px` },
                            boxShadow: 0,
                            backgroundColor: "#fff"
        
                        }}
                    >
                        <Toolbar>
                            <IconButton
                                color="primary"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                sx={{ mr: 2, display: { sm: 'none' } }}
                            >
                                <MenuIcon />
                            </IconButton>
        
                            <Typography sx={{color:"textColorTitle",fontSize:"19px"}} variant='h6'>
                                {userName}
                            </Typography>
        
                        </Toolbar>
                    </AppBar>
                    <Box
                        component="nav"
                        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, backgroundColor: "#fafafa" }}
                        aria-label="mailbox folders"
                    >
                        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                        <Drawer
                            container={container}
                            variant="temporary"
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                            sx={{
                                display: { xs: 'block', sm: 'none' },
                                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: "#022162" },
                            }}
                        >
                            {drawerToggle}
                        </Drawer>
                        <Drawer
                            variant="permanent"
                            sx={{
                                display: { xs: 'none', sm: 'block' },
                                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: "#022162" },
                            }}
                            open
                        >
                            {drawerStatic}
                        </Drawer>
                    </Box>
                    <Box
                        component="main"
                        sx={{minHeight:"100vh" ,paddingInline:"5px",paddingTop:"10px" ,width:{xs:"100%", sm:`calc(100% - ${drawerWidth}px)` } , backgroundColor: "backgroundColorPage" }}
                    >
                        <Toolbar />
                        {props.children}
                    </Box>
                </Box>
                :
                <div>
                                           {props.children}
 
                </div>
            }
        </div>
    );
}

MenuAppBars.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default MenuAppBars;









/*
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Drawer } from '@mui/material';
import MoreIcon from '@mui/icons-material/MoreVert';

export default function MenuAppBars() {
    const [isDrawerOpen ,setIsDrawerOpen ] = React.useState(false)
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={()=>setIsDrawerOpen(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Photos
          </Typography>
          <div>
          <IconButton
            size="large"
            aria-label="display more actions"
            edge="end"
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer 
      anchor='left' 
      variant="permanent"
      open={isDrawerOpen} 
      onClose={()=>setIsDrawerOpen(false)}
      >
        <Box width={300}>

        </Box>
      </Drawer>
    </Box>
  );
}
*/
