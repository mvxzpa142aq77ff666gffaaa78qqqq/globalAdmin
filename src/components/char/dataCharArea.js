import React,{useState} from "react"

const datos = [
    { mes: "Saldo en caja", cantidad: 189 },
    { mes: "Saldo recargado", cantidad: 2450 },

   
];

export const DataCharArea = {
    labels: datos.map((data) => data.mes),
    datasets: [
      {
        label: "Cantidad",
        data: datos.map((data) => data.cantidad),
        backgroundColor: ["#6200ea","#ff9800"]
      }
    ],

} 