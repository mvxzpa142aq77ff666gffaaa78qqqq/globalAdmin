import React,{useState} from "react"

const datos = [
    { mes: "enero", cantidad: 189 },
    { mes: "febrero", cantidad: 2450 },
    { mes: "marzo", cantidad: 12245 },
    { mes: "abril", cantidad: 1405 },
    { mes: "mayo", cantidad: 2405 },
    { mes: "junio", cantidad: 3050 },
    { mes: "julio", cantidad: 2800 },
   
];
const datos2 = [
    { mes: "enero", cantidad: 120 },
    { mes: "febrero", cantidad: 2150 },
    { mes: "marzo", cantidad: 12005 },
    { mes: "abril", cantidad: 2405 },
    { mes: "mayo", cantidad: 2005 },
    { mes: "junio", cantidad: 4050 },
    { mes: "julio", cantidad: 2300 },
   
];

export const DataCharBar = {
    labels: datos.map((data) => data.mes),
    datasets: [
      {
        label: "Envios",
        data: datos.map((data) => data.cantidad),
        backgroundColor: ["#6200ea"]
      },
      {
        label: "Recepciones",
        data: datos2.map((data) => data.cantidad),
        backgroundColor: ["#ff9800"]
      }
    ],

} 