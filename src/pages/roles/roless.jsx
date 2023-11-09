import React, { useState, useContext, useEffect } from 'react'
import MenuAppBars from '../../components/appBar/appBarr'
import { Grid, Tab, Tabs, Box } from '@mui/material';

import Roles from '../../components/roles/roles';
import AppContext from '../../contexts/ServiceContext';
import { arrayAdminView } from '../../contexts/constantesVar';

function Roless() {
  const { typeUser, valideLogin, userId, userName, userCode, userPhone, dispatch, acciones } = useContext(AppContext)

  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (JSON.parse(window.localStorage.getItem("enableTCaja"))) {
    } else {
      window.localStorage.setItem("enableTCaja", JSON.stringify({ valor: false, valorI: "", nameI: '', typeI: '', phoneI: '' }))
    }
  }, [])

  return (
    <>
      {acciones.includes('ver_info') ?
        <>
          {arrayAdminView.includes(typeUser) ?
            <>
              <Grid
                bgcolor="backgroundColorPage"
                sx={{}}
              >
                <Roles />
              </Grid>
            </>
            :
            <></>
          }
        </>

        :
        <></>
      }
    </>
  )
}


export default Roless