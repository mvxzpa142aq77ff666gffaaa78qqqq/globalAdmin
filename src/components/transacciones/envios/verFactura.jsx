import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { jsPDF } from "jspdf";
import { Button, IconButton } from '@mui/material';
import { More, RemoveRedEye } from '@mui/icons-material';


const VerFactura = ({ datos }) => {
    const doc = new jsPDF("p", "pt", "b6");

    const GenerarPdf = async () => {
        //console.log("first")
        var content = document.querySelector("#facturaSend")
        await doc.html(content, {
            callback: (pdf) => {
                pdf.save("factura.pdf")
            }
        });
    }

    const Verfact = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
                const mes = Number(new Date(datos.fechaA).getMonth()) + 1;
                const dia = Number(new Date(datos.fechaA).getDate());
                const agno = Number(new Date(datos.fechaA).getFullYear());
                const hora = new Date(datos.fechaA).getHours();
                const min = new Date(datos.fechaA).getMinutes();

                const fecha = dia + '/' + mes + '/' + agno + '  ' + hora + ':' + min;
                return (

                    <div className='container-dialog-confirm' >
                        <div id='facturaSend' style={{ marginLeft: 10, marginTop: 0 }} >
                            <div style={{ display: 'flex', width: "100%", alignItems: "center", marginBottom: -10 }}>
                                <div style={{ width: "60%", display: 'flex' }}>
                                    <img src="https://res.cloudinary.com/mumbex/image/upload/v1697882076/ahb4n32vt8pnabzd9voa.png" style={{ width: "150px" }} alt="" />
                                </div>
                                <div style={{ width: "30%" }}>
                                    <h3>G-NOB</h3>
                                    <h3 style={{ marginTop: '-20px' }}>MONEY</h3>
                                </div>
                            </div>
                            <h3 style={{ marginBlock: -7 }}>FACTURA DE ENVIO</h3>
                            <p style={{ marginBlock: 1 }}><span style={{ fontSize: 12, fontWeight: '700', color: '#000000' }}>Fecha de envio:</span> <span style={{ fontWeight: "700", color: '#000000', fontSize: 12 }}>{fecha}</span></p>
                            <p style={{ marginBlock: 1 }}><span style={{ fontSize: 12, fontWeight: '700', color: '#000000' }}>Ciudad de envio:</span> <span style={{ fontWeight: "700", color: '#000000', fontSize: 12 }}>{datos.adressAdmin}</span></p>
                            <p style={{ marginBlock: 1 }}><span style={{ fontSize: 12, fontWeight: '700', color: '#000000' }}>Punto de envio:</span> <span style={{ fontWeight: "700", color: '#000000', fontSize: 12 }}>{datos.adressGettoSend}</span></p>
                            <p style={{ marginBlock: 1 }}><span style={{ fontSize: 12, fontWeight: '700', color: '#000000' }}>Tel.. del Agente:</span> <span style={{ fontWeight: "700", color: '#000000', fontSize: 12 }}>{datos.phoneAdmin}</span></p>
                            <h4 style={{ marginBlock: -6, marginTop: 3, color: '#000000' }}>DATOS DEL REMITENTE</h4>

                            <p style={{ marginBlock: 1 }}><span style={{ fontSize: 12, fontWeight: '700', color: '#000000' }}>Nombre del remitente:</span> <span style={{ fontWeight: "700", color: '#000000', fontSize: 12 }}>{datos.nameSend}</span></p>
                            <p style={{ marginBlock: 1 }}><span style={{ fontSize: 12, fontWeight: '700', color: '#000000' }}>Tel. del remitente:</span> <span style={{ fontWeight: "700", color: '#000000', fontSize: 12 }}>{datos.phoneSend}</span></p>
                            <p style={{ marginBlock: 1 }}><span style={{ fontSize: 12, fontWeight: '700', color: '#000000' }}>DIP/Pass del remitente:</span> <span style={{ fontWeight: "700", color: '#000000', fontSize: 12 }}>{datos.dipSend}</span></p>
                            <p style={{ marginBlock: 1 }}><span style={{ fontSize: 12, fontWeight: '700', color: '#000000' }}>Cantidad enviada:</span> <span style={{ fontWeight: "700", color: '#000000', fontSize: 12 }}>{Number(datos.quantSend).toLocaleString("es-GQ")} XAF</span></p>
                            <h4 style={{ marginBlock: -6, marginTop: 3, color: '#000000' }}>DATOS DEL BENEFICIARIO</h4>

                            <p style={{ marginBlock: 1 }}><span style={{ fontSize: 12, fontWeight: '700', color: '#000000' }}>Ciudad de recepcion:</span> <span style={{ fontWeight: "700", color: '#000000', fontSize: 12 }}>{datos.adressRecep}</span></p>
                            <p style={{ marginBlock: 1 }}><span style={{ fontSize: 12, fontWeight: '700', color: '#000000' }}>Nombre del receptor:</span> <span style={{ fontWeight: "700", fontSize: 12 }}>{datos.nameRecep}</span></p>
                            <p style={{ marginBlock: 1 }}><span style={{ fontSize: 12, fontWeight: '700', color: '#000000' }}>Tel. del receptor:</span> <span style={{ fontWeight: "700", color: '#000000', fontSize: 12 }}>{datos.phoneRecep}</span></p>
                            <p style={{ marginBlock: 1 }}><span style={{ fontSize: 12, fontWeight: '700', color: '#000000' }}>Codigo de recepcion:</span> <span style={{ fontWeight: "700", color: '#000000', fontSize: 12 }}>{datos.codeRecp}</span></p>
                        </div>
                        <div style={{ marginLeft: 10, marginTop: 10 }} >

                            <Button
                                size='small'
                                variant="contained"
                                color='error'
                                onClick={onClose}>Cerrar</Button>
                            <Button
                                size='small'
                                variant="contained"
                                sx={{ marginLeft: 3 }}
                                onClick={async () => {
                                    GenerarPdf()
                                }}
                            >
                                Descargar pdf
                            </Button>
                        </div>
                    </div>
                );
            },

        });
    }

    return (

        <Button color='secondary' size='small' sx={{ marginLeft: '1px' }} variant="contained" onClick={() => Verfact()} endIcon={<RemoveRedEye />}>
            Ver
        </Button>
    )
}

export default VerFactura

