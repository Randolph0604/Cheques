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
  // InputLabel/,
  Button,
  IconButton,
} from "@mui/material";
// import SaveIcon from "@mui/icons-material/Save";
// import ClearAllIcon from "@mui/icons-material/ClearAll";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import "./Suppliers.css";
// import logo from "../../logo.svg";
import { Consultar } from "../../common/server/funcionesServidor";
import MensajeAlerta from "../../common/mensajeAlerta/mensajeAlerta";

const Suppliers = () => {
  const [modificando, setModificando] = useState({
    Id: undefined,
    Nombre: "",
    Tipo_Persona: "",
    Cedula: "",
    Balance: 0,
    Estado: "",
    Cuenta_Contable: "",
  });

  const [data, setData] = useState(undefined);

  useEffect(() => {
    consultar();
  }, []);

  useEffect(() => {
    setModificando({
      Id: undefined,
      Nombre: "",
      Tipo_Persona: "",
      Cedula: "",
      Balance: 0,
      Estado: "",
      Cuenta_Contable: "",
    });
  }, [data]);

  const consultar = async () => {
    setData(await Consultar(`api/proveedors/consultar`, null, null, undefined));
  };

  const handleInputs = (value, name) => {
    let copiaData = JSON.parse(JSON.stringify(modificando));
    if (name === "Cedula" && isNaN(value))
      return MensajeAlerta(
        "error",
        "Solo se aceptan numeros en el campo de cédula"
      );
    if (name === "Cedula" && value.length > 11) return;
    setModificando({ ...copiaData, [name]: value });
  };

  const onSubmit = async (e) => {
    if (!modificando.Cedula) return MensajeAlerta("error", "Digitar cédula");
    if (!modificando.Cuenta_Contable)
      return MensajeAlerta("error", "Digitar Cuenta Contable");
    if (!modificando.Tipo_Persona)
      return MensajeAlerta("error", "Elegir Tipo de Persona");
    if (!modificando.Nombre)
      return MensajeAlerta("error", "Digitar el nombre del Proveedor");

    await Consultar(`api/proveedors/crear`, null, null, {
      object: JSON.stringify(modificando),
    });

    consultar();
    onClear();
  };

  const onModificar = ({
    Id,
    Nombre,
    Tipo_Persona,
    Cedula,
    Balance,
    Estado,
    Cuenta_Contable,
  }) => {
    setModificando({
      Id: Id,
      Nombre: Nombre,
      Tipo_Persona: Tipo_Persona,
      Cedula: Cedula,
      Balance: Balance,
      Estado: Estado,
      Cuenta_Contable: Cuenta_Contable,
    });
  };

  const onDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete it?")) {
      await Consultar(`api/proveedors/eliminar`, null, null, {
        Id: id,
      });
      consultar();
    }
  };

  const onClear = () => {
    setModificando({
      Id: undefined,
      Nombre: "",
      Tipo_Persona: "",
      Cedula: "",
      Balance: 0,
      Estado: "",
      Cuenta_Contable: 0,
    });
  };

  return (
    <div className="container">
      <Paper variant="outlined" className="paper">
        {/* <img src={logo} className="img App-logo" alt="img" /> */}
        <Grid container spacing={2} className="grid">
          <Grid item xs={12} fullWidth>
            <TextField
              fullWidth
              id="outlined-password-input"
              label="idSuppliers"
              type="text"
              name="Id"
              value={modificando.Id}
              onChange={(e) => handleInputs(e.currentTarget.value, "Id")}
              disabled
              style={{ display: "none" }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-password-input"
              label="Nombre*"
              type="text"
              name="Nombre"
              value={modificando.Nombre}
              onChange={(e) => handleInputs(e.currentTarget.value, "Nombre")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-password-input"
              label="Rnc/Cedula*"
              type="number"
              name="Cedula"
              value={modificando.Cedula}
              onChange={(e) => handleInputs(e.currentTarget.value, "Cedula")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-password-input"
              label="Balance*"
              type="number"
              name="Balance"
              value={modificando.Balance}
              onChange={(e) => handleInputs(e.currentTarget.value, "Balance")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-password-input"
              label="Cuenta Contable*"
              type="text"
              name="Cuenta_Contable"
              value={modificando.Cuenta_Contable}
              onChange={(e) =>
                handleInputs(e.currentTarget.value, "Cuenta_Contable")
              }
            />
          </Grid>

          <Grid item xs={6}>
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Estado"
              name="Estado"
              value={modificando.Estado}
              onChange={(e) => handleInputs(e.target.value, "Estado")}
            >
              <MenuItem value="Activo">Activo</MenuItem>
              <MenuItem value="Inactivo">Inactivo</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Tipo de Persona"
              name="Tipo_Persona"
              value={modificando.Tipo_Persona}
              onChange={(e) => handleInputs(e.target.value, "Tipo_Persona")}
            >
              <MenuItem value="Juridica">Juridica</MenuItem>
              <MenuItem value="Fisica">Fisica</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <Button
                className="btnSave"
                type="button"
                variant="contained"
                size="large"
                style={{ background: "#1E8449" }}
                // endIcon={<SaveIcon />}
                onClick={() => onSubmit()}
              >
                Guardar
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
                // endIcon={<ClearAllIcon />}
              >
                Limpiar
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
            sx={{ maxWidth: 900 }}
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className="title">Nombre</TableCell>
                  <TableCell className="title">RNC/Cedula</TableCell>
                  <TableCell className="title">Cuenta Contable</TableCell>
                  <TableCell className="title">Balance</TableCell>
                  <TableCell className="title">Tipo de Persona</TableCell>
                  <TableCell className="title">Estado</TableCell>
                  <TableCell className="title">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((data, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    className="hover"
                  >
                    <TableCell>{data.Nombre}</TableCell>
                    <TableCell>{data.Cedula}</TableCell>
                    <TableCell>{data.Cuenta_Contable}</TableCell>
                    <TableCell>{data.Balance}</TableCell>
                    <TableCell>{data.Tipo_Persona}</TableCell>
                    <TableCell>{data.Estado}</TableCell>
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
                        onClick={() => onDelete(data.Id)}
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

export default Suppliers;
