
import React, { useContext, useState } from 'react';
import Auth from './contexts/Auth';
import './App.css';
import { Route, BrowserRouter, Routes, Navigate, HashRouter } from 'react-router-dom';
import Home from './pages/home/home';
import Loginn from './pages/login/loginn';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { TemaGlobal } from './components/temaGlobal';
import MenuAppBars from './components/appBar/appBarr';
import Protected from './components/protectedRoute';
import RedirectUser from './components/redirectUser';
import Transacction from './pages/transactions/transacction';
import Filtersss from './pages/filtersss/filtersss';
import CreateUsers from './pages/createUser/createUsers';
import AllUsers from './pages/allUser/allUsers';
import Roless from './pages/roles/roless';
import toast, { Toaster } from 'react-hot-toast';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import MasterInfo from './pages/masterInfo/masterInfos';
import CajaAdminInfo from './pages/cajaAdminInfo/cajaAdminInfo';
import CajaMasterInfo from './pages/cajaMasterInfo/cajaMasterInfo';
import CambiarPasswords from './pages/cambiarPassword/cambiarPasswords';
//twilio recovery code 2WA3D75E7PNPQ2AH9MBV8FK9

const queryClient = new QueryClient()


function App() {
  const [userData, setUserData] = useState({ permision: ['crear', 'recargar'], name: 'g-nob' })
  return (
    <Auth>
      <ThemeProvider theme={TemaGlobal}>
        <HashRouter>
          <MenuAppBars>
            <Toaster
              toastOptions={{
                className: '',
                duration: 10000,

              }}
            />
            <Routes>

              <Route exact path="/signIn" element={
                <RedirectUser>
                  <Loginn />
                </RedirectUser>

              } />
              <Route exact path="/" element={
                <Protected isAlloweb={!!userData && userData.permision.includes('crear')}>
                  <Home />
                </Protected>
              }
              />
              <Route exact path="/transaction" element={
                <Protected isAlloweb={!!userData}>
                  <Transacction />
                </Protected>
              }
              />
              <Route exact path="/flujo" element={
                <Protected isAlloweb={!!userData}>
                  <Filtersss />
                </Protected>
              }
              />
              <Route exact path="/createUsers" element={
                <Protected isAlloweb={!!userData}>
                  <CreateUsers />
                </Protected>
              }
              />
              <Route exact path="/users" element={
                <Protected isAlloweb={!!userData}>
                  <AllUsers />
                </Protected>
              }
              />

              <Route exact path="/roles" element={
                <Protected isAlloweb={!!userData}>
                  <Roless />
                </Protected>
              }

              />
              <Route exact path="/caja_de_empresa/:id" element={
                <Protected isAlloweb={!!userData}>
                  <CajaAdminInfo />
                </Protected>
              }
              />
              <Route exact path="/master_info/:id" element={
                <Protected isAlloweb={!!userData}>
                  <MasterInfo />
                </Protected>
              }
              />
              <Route exact path="/caja_master_info/:id" element={
                <Protected isAlloweb={!!userData}>
                  <CajaMasterInfo />
                </Protected>
              }
              />
              <Route exact path="/cambiar_password" element={
                <Protected isAlloweb={!!userData}>
                  <CambiarPasswords />
                </Protected>
              }
              />

            </Routes>
          </MenuAppBars>
        </HashRouter>
      </ThemeProvider>
    </Auth>
  );
}

export default App;
