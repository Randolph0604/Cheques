import React, { useState, useEffect } from "react";
// import { PaymentConcepts } from "../../hooks/hooks";
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
import "./accountingEntries.css";
import {
  postAccountingEntries,
  putAccountingEntries,
  deleteAccountingEntries,
} from "../../helpers/helpers";
import logo from "../../logo.svg";
import { Consultar } from "../../common/server/funcionesServidor";

const AccountingEntries = () => {
  const [fecha, setFecha] = useState('01-01-1999');
  const [modificando, setModificando] = useState({
    idAccounting: "",
    description: "",
    idInventoryType: "",
    accountingAccount: "",
    movementType: "",
    accountingDate: fecha,
    accountingAmount: 0.00,
    status: "",
  });

  const [data, setData] = useState(undefined);

  useEffect(() => {
    consultar();
    const date = new Date();
    const [month, day, year] = [
      date.getMonth() + 1,
      date.getDate().toString(),
      date.getFullYear().toString(),
    ];
    setFecha(year + "-" + month.toString() + "-" + day);
  }, []);

  const onClear = () => {
    setModificando({
      idAccounting: "",
      description: "",
      idInventoryType: "",
      accountingAccount: "",
      movementType: "",
      accountingDate: fecha,
      accountingAmount: 0.00,
      status: "",
    });
  };

  useEffect(() => {
    setModificando({
      idAccounting: "",
      description: "",
      idInventoryType: "",
      accountingAccount: "",
      movementType: "",
      accountingDate: fecha,
      accountingAmount: 0.00,
      status: "",
    });
  }, [fecha, data]);

  const consultar = async () => {
    setData(await Consultar(`api/AccountingEntries`, null, null, undefined));
  };

  const handleInputs = (value, name) => {
    let copiaData = JSON.parse(JSON.stringify(modificando));
    setModificando({ ...copiaData, [name]: value });
    console.log({ value, name });
  };

  const onSubmit = async (e) => {
    if (!modificando.idAccounting) {
      await postAccountingEntries(modificando);
    } else {
      await putAccountingEntries(modificando)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }

    consultar();
    onClear();
  };

  const onModificar = ({
    idAccounting,
    description,
    idInventoryType,
    accountingAccount,
    movementType,
    accountingDate,
    accountingAmount,
    status,
  }) => {
    setModificando({
      idAccounting: idAccounting,
      description: description,
      idInventoryType: idInventoryType,
      accountingAccount: accountingAccount,
      movementType: movementType,
      accountingDate: accountingDate,
      accountingAmount: accountingAmount,
      status: status,
    });
  };

  const onDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete it?")) {
      await deleteAccountingEntries(id)
        .then((res) => console.log(res))
        .then(() => {
          consultar();
          onClear();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="container">
      <Paper variant="outlined" className="paper">
        <img src={logo} className="img App-logo" alt="img" />
        <Grid container spacing={2} className="grid">
          <Grid item xs={12} fullWidth>
            <TextField
              fullWidth
              id="outlined-password-input"
              label="idAccounting"
              type="text"
              name="idAccounting"
              value={
                modificando.idAccounting
              }
              onChange={(e) => handleInputs(e.currentTarget.value, "idAccounting")}
              disabled
              style={{ display: "none" }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-password-input"
              label="Descripción*"
              type="text"
              name="description"
              value={modificando.description}
              onChange={(e) =>
                handleInputs(e.currentTarget.value, "description")
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-password-input"
              label="Tipo de Inventario*"
              type="text"
              name="idInventoryType"
              value={modificando.idInventoryType}
              onChange={(e) =>
                handleInputs(e.currentTarget.value, "idInventoryType")
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-password-input"
              label="Cuenta Contable*"
              type="text"
              name="accountingAccount"
              value={modificando.accountingAccount}
              onChange={(e) =>
                handleInputs(e.currentTarget.value, "accountingAccount")
              }
            />
          </Grid>
          <Grid item xs={6}>
            {/* <InputLabel id="demo-simple-select-label">Status</InputLabel> */}
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Tipo de Movimiento"
              name="movementType"
              value={modificando.movementType}
              onChange={(e) => handleInputs(e.target.value, "movementType")}
            >
              <MenuItem value="D">Debito</MenuItem>
              <MenuItem value="C">Credito</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-password-input"
              label="Fecha*"
              type="date"
              name="accountingDate"
              InputLabelProps={{
                shrink: true,
            }}
              value={modificando.accountingDate}
              onChange={(e) =>
                handleInputs(e.currentTarget.value, "accountingDate")
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-password-input"
              label="Monto*"
              type="numeric"
              name="accountingAmount"
              value={modificando.accountingAmount}
              onChange={(e) =>
                handleInputs(e.currentTarget.value, "accountingAmount")
              }
            />
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
              <MenuItem value="A">Activo</MenuItem>
              <MenuItem value="I">Inactivo</MenuItem>
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
                  <TableCell className="title">ID&nbsp;(IdCuenta Contable)</TableCell>
                  <TableCell className="title">Descripción</TableCell>
                  <TableCell className="title">Tipo de Inventario</TableCell>
                  <TableCell className="title">Cuenta Contable</TableCell>
                  <TableCell className="title">Tipo de movimiento&nbsp;(Debito/Credito)</TableCell>
                  <TableCell className="title">Fecha</TableCell>
                  <TableCell className="title">Monto</TableCell>
                  <TableCell className="title">Estado</TableCell>
                  <TableCell className="title">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((data) => (
                  <TableRow
                    key={data.idSupplier}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    className="hover"
                  >
                    <TableCell component="th" scope="row">
                      {data.idAccounting}
                    </TableCell>
                    <TableCell>{data.description}</TableCell>
                    <TableCell>{data.idInventoryType}</TableCell>
                    <TableCell>{data.accountingAccount}</TableCell>
                    <TableCell>{data.movementType}</TableCell>
                    <TableCell>{data.accountingDate}</TableCell>
                    <TableCell>{data.accountingAmount}</TableCell>
                    <TableCell>{data.status}</TableCell>
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
                        onClick={() => onDelete(data.idAccounting)}
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

export default AccountingEntries;
