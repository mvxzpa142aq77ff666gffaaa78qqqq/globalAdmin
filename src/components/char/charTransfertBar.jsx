import React, { useState } from 'react'
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar, Line } from 'react-chartjs-2';
import { DataCharBar } from './dataCharBar';
import { Box } from '@mui/material';



function CharTransfertBar() {

  return (
    <Box
      bgcolor="#ffffff"
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        width: "100%",
        height: 500,
        marginBottom: "10px",
        marginTop:"10px"
      }}
    >
      <Bar data={DataCharBar} />
    </Box>
  )
}

export default CharTransfertBar