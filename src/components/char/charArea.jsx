import React, { useState } from 'react'
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import { DataCharArea } from './dataCharArea';
import { Box } from '@mui/material';





function CharArea() {

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
            }}
        >
            <Doughnut data={DataCharArea} />

        </Box>
    )
}

export default CharArea