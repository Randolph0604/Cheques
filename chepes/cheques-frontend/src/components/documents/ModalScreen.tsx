import React, { useState } from 'react'
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import {
    CardContent,
    Card,
    CardHeader,
    Grid,
    TextField,
    Button,
} from "@material-ui/core";
import { now } from '../../common/funciones/funciones';
import { Consultar, GrabarCustom } from '../../common/server/funcionesServidor';
import MensajeAlerta from '../../common/mensajeAlerta/mensajeAlerta';
import { putDocuments } from '../../helpers/helpers';

export default function ModalScreen({ setModal, consultar }: { setModal: (C: boolean) => void, consultar: () => void }) {
    const fecha = now("YYYY-MM-DD").date;
    const [dateFrom, setdateFrom] = useState(fecha);
    const [dateUntil, setDateUntil] = useState(fecha)

    const handleInputChange = ({ value, name }: { value: any, name: string }) => {
        if (name === 'dateFrom') setdateFrom(value)
        else setDateUntil(value);
    }

    const makeAnEntrie = async () => {
        const documents = await Consultar(`api/Documents?dateFrom=${dateFrom}&dateUntil=${dateUntil}`, undefined, undefined, undefined, undefined);

        if (documents.length) {
            const copiaData = JSON.parse(JSON.stringify(documents));
            const makeAnEntrie = {
                description: `Asiento  de CxP Correspondiente al periodo ${now("YYYY-MM-DD").year + now("YYYY-MM-DD").month}`,
                auxiliar: 6,
                currencyCode: 1,
                detail: {
                    cuentaCR: "4",
                    cuentaDB: "82",
                    amountCR: 0.00,
                    amountDB: 0.00,
                },
                asientoId: 5,

            }

            let totalMontoDocuments = copiaData.reduce(
                (acc: any, document: { amount: any; }) => (acc = acc + document.amount),
                0
            );

            makeAnEntrie.detail.amountCR = totalMontoDocuments;
            makeAnEntrie.detail.amountDB = totalMontoDocuments;

            const grabarAsiento = await GrabarCustom("https://accountingaccountapi20211205021409.azurewebsites.net/api/AccountingSeat/Register", makeAnEntrie, true);

            if (grabarAsiento.length) {
                for (let i = 0; i < copiaData.length; i++) {
                    //@ts-ignore :)
                    copiaData[i].idAsiento = grabarAsiento[0].id;
                    copiaData[i].amount = totalMontoDocuments;
                    await putDocuments(copiaData[i])
                        .then((res) => console.log(res))
                        .catch((err) => console.log(err));
                }
            }
            else MensajeAlerta("error", "Ups... Sucedio algo inesperado");

            consultar();
            setModal(false);

        }
        else MensajeAlerta("error", "No se encontraron documentos en este rango de fechas");

    }
    return (
        <Modal isOpen={true} zIndex={2000} size="lg">
            <ModalHeader>
                <Button
                    onClick={() => setModal(false)}
                    type='button'
                    variant="contained"
                    disableElevation
                    color='primary'
                >
                    Salir
                </Button>
            </ModalHeader>
            <ModalBody>
                <Card>
                    <CardHeader
                        className="cardRoot cardTitle"
                        title="Elegir un rango de fecha"
                    />
                    <CardContent>
                        <Grid container xs={12}>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    id="outlined-password-input"
                                    label="Fecha Desde*"
                                    type="Date"
                                    name="dateFrom"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    defaultValue={fecha}
                                    value={dateFrom}
                                    onChange={(e) => handleInputChange(e.target)}
                                />

                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    fullWidth
                                    id="outlined-password-input"
                                    label="Fecha Hasta*"
                                    type="Date"
                                    name="dateUntil"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    defaultValue={fecha}
                                    value={dateUntil}
                                    onChange={(e) => handleInputChange(e.target)}
                                />
                            </Grid>
                            <Grid item xs={12} style={{ paddingTop: '10px' }}>
                                <Button
                                    fullWidth
                                    onClick={() => makeAnEntrie()}
                                    type='button'
                                    variant="contained"
                                    disableElevation
                                    color='primary'
                                >
                                    Listo
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </ModalBody>
        </Modal>
    )
}

