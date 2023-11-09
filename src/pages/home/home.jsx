import React, { useEffect, useContext, useState } from 'react'
import "./home.css"
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../../contexts/ServiceContext';
import axios from 'axios';
import { URL_SERVER, arrayAdminView } from '../../contexts/constantesVar';
import SpinnerAlls from '../../components/spinnerAll/spinnerAlls';
import { PulseLoader } from 'react-spinners';
import toast, { Toaster } from 'react-hot-toast';
import axiosConfigs from '../../components/axiosConfig';
import { Box, Grid } from '@mui/material';
import MenuAppBars from '../../components/appBar/appBarr';
import CardHome from '../../components/cardHome';
import { Group, Payment, Payments, PeopleAlt } from '@mui/icons-material';
import CharTransfertBar from '../../components/char/charTransfertBar';
import CharArea from '../../components/char/charArea';
import SkelethonCard from '../../components/skelholder/skelethonCardHome';
import useSWR from "swr"
import { GetDataHome, GetDataHomeMaster } from './getDataHome';
import { arrayMaster } from '../../contexts/constantesVar';

function Home() {

  const { typeUser, valideLogin, userId, userName, userCode, userPhone, dispatch, acciones, AxiosConfigsToken } = useContext(AppContext)

  const navigate = useNavigate();

  useEffect(() => {
    if (JSON.parse(window.localStorage.getItem("enableTCaja"))) {
    } else {
      window.localStorage.setItem("enableTCaja", JSON.stringify({ valor: false, valorI: "", nameI: '', typeI: '', phoneI: '' }))
    }
  }, [])

  if (userId && arrayMaster.includes(typeUser)) {
    const { data, error, isLoading, } = useSWR(["getDataHomeMaster", userId], () => GetDataHomeMaster(userId, AxiosConfigsToken), {})

    //if (isLoading) return <SkeletonTable />

    //if (error) return <></>

    return (
      <>
        {acciones.includes('ver_info') ?
          <Grid

            spacing={1}
            bgcolor="backgroundColorPage"

            container
          >
            {/*isLoading ?
              <>
                {
                  error ?
                    <></>
                    :
                    <SkelethonCard />

                }
              </>
              :
              <CardHome IconHome={PeopleAlt} cantidad={data.master ?Number(data.master).toLocaleString("es-GQ") : 0} colorIcon="#ff9800" titleCard="Total Masters" />
              */}

            {isLoading ?
              <>
                {
                  error ?
                    <></>
                    :
                    <SkelethonCard />

                }
              </>
              :
              <>
                {data ?
                  <CardHome IconHome={Group} cantidad={data.caja ? Number(data.caja).toLocaleString("es-GQ") : 0} colorIcon="#ff9800" titleCard="Total Cajas" />

                  :
                  <></>
                }
              </>
            }

            {isLoading ?
              <>
                {
                  error ?
                    <></>
                    :
                    <SkelethonCard />

                }
              </>
              :
              <>
                {data ?
                  <CardHome IconHome={Payment} cantidad={data.saldo_rest ? Number(data.saldo_rest).toLocaleString("es-GQ") + '  ' + 'XAF' : 0} colorIcon='#ff9800' titleCard="Total Saldo restante" />

                  :
                  <></>
                }
              </>
            }



            {isLoading ?
              <>
                {
                  error ?
                    <></>
                    :
                    <SkelethonCard />

                }
              </>
              :
              <>
                {data ?
                  <CardHome IconHome={Payments} cantidad={data.interesTotal ? Number(data.interesTotal).toLocaleString("es-GQ") + ' ' + 'XAF' : 0} colorIcon="#ff9800" titleCard="Total int. de cajas" />

                  :
                  <></>
                }
              </>
            }

            {isLoading ?
              <>
                {
                  error ?
                    <></>
                    :
                    <SkelethonCard />

                }
              </>
              :
              <>
                {data ?
                  <CardHome IconHome={Payments} cantidad={data.saldo_caja ? Number(data.saldo_caja).toLocaleString("es-GQ") + ' ' + 'XAF' : 0} colorIcon="#ff9800" titleCard="Total saldo de cajas" />

                  :
                  <></>
                }
              </>
            }

          </Grid>
          :
          <></>
        }


      </>
    )
  } else {
    const { data, error, isLoading, } = useSWR("getDataHome", () => GetDataHome(AxiosConfigsToken), {})

    //if (isLoading) return <SkeletonTable />

    //if (error) return <></>



    return (
      <>
        {acciones.includes('ver_info') ?
          <>
            <Grid
              spacing={1}
              bgcolor="backgroundColorPage"

              container
            >
              {isLoading ?
                <>
                  {
                    error ?
                      <></>
                      :
                      <SkelethonCard />

                  }
                </>
                :
                <>
                  {acciones.includes('ver_cant_master') ?
                    <>
                      {data ?
                        <CardHome IconHome={PeopleAlt} cantidad={data.master ? Number(data.master).toLocaleString("es-GQ") : 0} colorIcon="#ff9800" titleCard="Total Masters" />

                        :
                        <></>
                      }

                    </>
                    :
                    <></>

                  }
                </>
              }

              {isLoading ?
                <>
                  {
                    error ?
                      <></>
                      :
                      <SkelethonCard />

                  }
                </>
                :

                <>
                  {acciones.includes('ver_cant_cajas') ?
                    <>
                      {data ?
                        <CardHome IconHome={Group} cantidad={data.caja ? Number(data.caja).toLocaleString("es-GQ") : 0} colorIcon="#ff9800" titleCard="Total Cajas" />


                        :
                        <></>
                      }

                    </>
                    :
                    <></>

                  }
                </>
              }

              {isLoading ?
                <>
                  {
                    error ?
                      <></>
                      :
                      <SkelethonCard />

                  }
                </>
                :
                <>
                  {acciones.includes('ver_saldo_rest') ?
                    <>
                      {data ?
                        <CardHome IconHome={Payment} cantidad={data.saldo_rest ? Number(data.saldo_rest).toLocaleString("es-GQ") + ' ' + 'XAF' : 0} colorIcon='#ff9800' titleCard="Total Saldo restante" />


                        :
                        <></>
                      }

                    </>
                    :
                    <></>

                  }
                </>
              }



              {isLoading ?
                <>
                  {
                    error ?
                      <></>
                      :
                      <SkelethonCard />

                  }
                </>
                :
                <>
                  {acciones.includes('ver_saldo_total_master') ?
                    <>
                      {data ?

                        <CardHome IconHome={Payment} cantidad={data.saldo_master ? Number(data.saldo_master).toLocaleString("es-GQ") + ' ' + 'XAF' : 0} colorIcon='#ff9800' titleCard="Total Saldo masters" />

                        :
                        <></>
                      }

                    </>
                    :
                    <></>

                  }
                </>
              }
              {isLoading ?
                <>
                  {
                    error ?
                      <></>
                      :
                      <SkelethonCard />

                  }
                </>
                :
                <>
                  {acciones.includes('ver_saldo_total_cajas') ?
                    <>
                      {data ?
                        <CardHome IconHome={Payment} cantidad={data.saldo_caja ? Number(data.saldo_caja).toLocaleString("es-GQ") + ' ' + 'XAF' : 0} colorIcon='#ff9800' titleCard="Total Saldo cajas" />


                        :
                        <></>
                      }
                    </>
                    :
                    <></>

                  }
                </>
              }
              {isLoading ?
                <>
                  {
                    error ?
                      <></>
                      :
                      <SkelethonCard />

                  }
                </>
                :
                <>
                  {acciones.includes('ver_saldo_op_pending') ?
                    <>
                      {data ?

                        <CardHome IconHome={Payment} cantidad={data.saldo_envios_pending ? Number(data.saldo_envios_pending).toLocaleString("es-GQ") + ' ' + 'XAF' : 0} colorIcon='#ff9800' titleCard="Total saldo op. pendiente" />

                        :
                        <></>
                      }

                    </>
                    :
                    <></>

                  }
                </>
              }
              {isLoading ?
                <>
                  {
                    error ?
                      <></>
                      :
                      <SkelethonCard />

                  }
                </>
                :
                <>
                  {acciones.includes('ver_interes') ?
                    <>
                      {data ?
                        <CardHome IconHome={Payments} cantidad={data.interesTotal ? Number(data.interesTotal).toLocaleString("es-GQ") + ' ' + 'XAF' : 0} colorIcon="#ff9800" titleCard="Total interes" />

                        :
                        <></>
                      }
                    </>
                    :
                    <></>

                  }
                </>
              }

              {isLoading ?
                <>
                  {
                    error ?
                      <></>
                      :
                      <SkelethonCard />

                  }
                </>
                :
                <>
                  {acciones.includes('ver_iva') ?
                    <>
                      {data ?
                        <CardHome IconHome={Payments} cantidad={data.ivaTotal ? Number(data.ivaTotal).toLocaleString("es-GQ") + ' ' + 'XAF' : 0} colorIcon="#ff9800" titleCard="Total iva" />
                        :
                        <></>
                      }

                    </>
                    :
                    <></>

                  }
                </>
              }

            </Grid>
          </>

          :
          <></>
        }


      </>
    )
  }

}

export default Home

/*

            {isLoading ?
              <>
                {
                  error ?
                    <></>
                    :
                    <SkelethonCard />

                }
              </>
              :
              <CardHome IconHome={Payment} cantidad={data.saldo_repar ? Number(data.saldo_repar).toLocaleString("es-GQ") + ' ' + 'XAF' : 0} colorIcon='#ff9800' titleCard="Total Saldo repartido" />
            }


*/