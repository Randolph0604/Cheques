import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  TextField,
  Grid,
  Paper,
  Select,
  FormControl,
  MenuItem,
  Button,
  IconButton,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import "./Documents.css";
import {
  putDocuments,
  deleteDocuments,
  postDocuments,
} from "../../helpers/helpers";
import logo from "../../logo.svg";
import { Consultar } from "../../common/server/funcionesServidor";
import { PlusOne } from "@material-ui/icons";
import ModalScreen from "./ModalScreen";

const Documents = () => {
  const [modal, setModal] = useState(false);
  const [modificando, setModificando] = useState({
    noDocument: null,
    noInvoice: "",
    documentDate: "",
    amount: 0.0,
    registrationDate: "",
    idSupplier: 0,
    status: "",
  });

  const [suppliers, setSuppliers] = useState([
    {
      balance: 0,
      idSupplier: 6,
      identification: "4024441115",
      name: "Noel Arnaldo Grullon Delgado",
      personType: "J",
      status: "A",
    },
  ]);

  const [data, setData] = useState(undefined);

  useEffect(() => {
    async function fetchData() {
      setData(await Consultar(`api/Documents`, null, null, undefined));
      setSuppliers(await Consultar(`api/Suppliers`, null, null, undefined));
    }

    fetchData();
  }, []);

  useEffect(() => {
    setModificando({
      noDocument: null,
      noInvoice: "",
      documentDate: "",
      amount: 0.0,
      registrationDate: "",
      idSupplier: 0,
      status: "",
    });
  }, [data]);

  const consultar = async () => {
    setData(await Consultar(`api/Documents`, null, null, undefined));
  };

  const handleInputs = (value, name) => {
    let copiaData = JSON.parse(JSON.stringify(modificando));
    if (name === "amount" && value < 0) return;
    setModificando({ ...copiaData, [name]: value });
  };

  const onSubmit = async (e) => {
    if (!modificando.noDocument) {
      await postDocuments(modificando);
    } else {
      await putDocuments(modificando)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }

    consultar();
    onClear();
  };

  const onModificar = ({
    noDocument,
    noInvoice,
    documentDate,
    amount,
    registrationDate,
    idSupplier,
    status,
  }) => {
    setModificando({
      noDocument: noDocument,
      noInvoice: noInvoice,
      documentDate: documentDate,
      amount: amount,
      registrationDate: registrationDate,
      idSupplier: idSupplier,
      status: status,
    });
  };

  const onDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete it?")) {
      await deleteDocuments(id)
        .then((res) => console.log(res))
        .then(() => {
          consultar();
          onClear();
        })
        .catch((err) => console.log(err));
    }
  };

  const onClear = () => {
    setModificando({
      noDocument: null,
      noInvoice: "",
      documentDate: "",
      amount: 0.0,
      registrationDate: "",
      idSupplier: 0,
      status: "",
    });
  };

  return (
    <div className="container">
      {modal ? <ModalScreen setModal={setModal} consultar={consultar} /> : null}
      <Paper variant="outlined" className="paper">
        <img src={logo} className="img App-logo" alt="img" />
        <Grid container spacing={2} className="grid">
          <Grid item xs={12} fullWidth>
            <TextField
              fullWidth
              id="outlined-password-input"
              label="noDocument"
              type="text"
              name="noDocument"
              value={modificando.noDocument}
              onChange={(e) =>
                handleInputs(e.currentTarget.value, "noDocument")
              }
              disabled
              style={{ display: "none" }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-password-input"
              label="Numero de Invoice*"
              type="text"
              name="noInvoice"
              value={modificando.noInvoice}
              onChange={(e) => handleInputs(e.currentTarget.value, "noInvoice")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-password-input"
              label="Fecha*"
              type="Date"
              name="documentDate"
              value={modificando.documentDate}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) =>
                handleInputs(e.currentTarget.value, "documentDate")
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-password-input"
              label="Fecha de Registro*"
              type="Date"
              name="registrationDate"
              value={modificando.registrationDate}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) =>
                handleInputs(e.currentTarget.value, "registrationDate")
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-password-input"
              label="Monto*"
              // type="numeric"
              name="amount"
              value={modificando.amount}
              type="number"
              onChange={(e) => handleInputs(e.currentTarget.value, "amount")}
            />
          </Grid>
          <Grid item xs={12}>
            {/* <InputLabel id="demo-simple-select-label">Status</InputLabel> */}
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="idSupplier"
              name="idSupplier"
              value={modificando.idSupplier}
              onChange={(e) => handleInputs(e.target.value, "idSupplier")}
            >
              {suppliers.map((e) => {
                return <MenuItem value={e.idSupplier}>{e.name}</MenuItem>;
              })}
            </Select>
          </Grid>
          <Grid item xs={12}>
            {/* <InputLabel id="demo-simple-select-label">Status</InputLabel> */}
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="status"
              name="status"
              value={modificando.status}
              onChange={(e) => handleInputs(e.target.value, "status")}
            >
              <MenuItem value="Pagado">Pagado</MenuItem>
              <MenuItem value="Pendiente">Pendiente</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <Button
                className="btnSave"
                type="button"
                variant="contained"
                size="large"
                endIcon={<SaveIcon />}
                onClick={() => onSubmit()}
              >
                Save
              </Button>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <Button
                className="btnSave"
                onClick={() => onClear()}
                type="button"
                color="inherit"
                variant="contained"
                size="large"
                endIcon={<ClearAllIcon />}
              >
                Clear
              </Button>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Button
                className="btn"
                onClick={() => setModal(true)}
                type="button"
                color="inherit"
                variant="contained"
                size="large"
                endIcon={<PlusOne />}
              >
                Crear asiento contable
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {data ? (
        <>
          <TableContainer
            className="table"
            component={Paper}
            sx={{ maxWidth: "auto" }}
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className="title">ID&nbsp;(noDocument)</TableCell>
                  <TableCell className="title">Numero de Invoice</TableCell>
                  <TableCell className="title">Fecha</TableCell>
                  <TableCell className="title">Fecha de registro</TableCell>
                  <TableCell className="title">Monto</TableCell>
                  <TableCell className="title">Suplidor</TableCell>
                  <TableCell className="title">Estado</TableCell>
                  <TableCell className="title">IdAsiento</TableCell>
                  <TableCell className="title">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((data) => (
                  <TableRow
                    key={data.noDocument}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    className="hover"
                  >
                    <TableCell component="th" scope="row">
                      {data.noDocument}
                    </TableCell>
                    <TableCell>{data.noInvoice}</TableCell>
                    <TableCell>{data.documentDate}</TableCell>
                    <TableCell>{data.registrationDate}</TableCell>
                    <TableCell>{data.amount}</TableCell>
                    <TableCell>{data.idSupplier}</TableCell>
                    <TableCell>{data.status}</TableCell>
                    <TableCell>{data.idAsiento}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => onModificar(data)}
                        style={{ color: "#ff9100" }}
                        aria-label="upload picture"
                        component="span"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => onDelete(data.noDocument)}
                        color="error"
                        aria-label="upload picture"
                        component="span"
                      >
                        <DeleteForeverIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : null}
    </div>
  );
};

export default Documents;
