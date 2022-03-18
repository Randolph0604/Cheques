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
// import SaveIcon from "@mui/icons-material/Save";
// import ClearAllIcon from "@mui/icons-material/ClearAll";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import "./Documents.css";
// import logo from "../../logo.svg";
import { Consultar } from "../../common/server/funcionesServidor";
import MensajeAlerta from "../../common/mensajeAlerta/mensajeAlerta";
import {
  FormatearFecha,
  convertirTextoAFecha,
} from "../../common/funciones/funciones";

const Solicitud = () => {
  const [modificando, setModificando] = useState({
    Id: undefined,
    Proveedor: undefined,
    Fecha_Registo: undefined,
    Monto: 0,
    Estado: "",
    Cuenta_Proveedor: "",
    Cuenta_Banco: "",
  });

  const [suppliers, setSuppliers] = useState([
    {
      Id: 0,
      Nombre: "",
      Tipo_Persona: "",
      Cedula: "",
      Balance: 0,
      Estado: "",
      Cuenta_Contable: "",
    },
  ]);

  const [data, setData] = useState(undefined);

  const consultar = async () => {
    setData(await Consultar(`api/solicituds/consultar`, null, null, undefined));
  };

  const consultarSuppliers = async () => {
    setSuppliers(
      await Consultar(`api/proveedors/consultar`, null, null, undefined)
    );
  };

  useEffect(() => {
    consultar();
    consultarSuppliers();
  }, []);

  useEffect(() => {
    setModificando({
      Id: undefined,
      Proveedor: undefined,
      Fecha_Registo: undefined,
      Monto: 0,
      Estado: "",
      Cuenta_Proveedor: "",
      Cuenta_Banco: "",
    });
  }, [data]);

  const handleInputs = (value, name) => {
    let copiaData = JSON.parse(JSON.stringify(modificando));
    if (name === "Monto" && value < 0) return;
    if (name === "Proveedor") {
      copiaData.Cuenta_Proveedor = suppliers.filter(
        (e) => e.Id === value
      )[0].Cuenta_Contable;
    }

    // console.log(value);
    setModificando({ ...copiaData, [name]: value });
  };

  const onSubmit = async (e) => {
    if (!modificando.Proveedor)
      return MensajeAlerta("error", "Elegir un Proveedor");
    if (!modificando.Cuenta_Banco)
      return MensajeAlerta("error", "Digitar Cuenta Bancaria");
    if (!modificando.Fecha_Registo)
      return MensajeAlerta("error", "Elegir una Fecha de Registro");
    if (!modificando.Monto)
      return MensajeAlerta(
        "error",
        "El monto del cheque no puede ser igual a 0"
      );

    await Consultar(`api/solicituds/crear`, null, null, {
      object: JSON.stringify(modificando),
    });

    consultar();
    onClear();
  };

  const onModificar = ({
    Id,
    Proveedor,
    Monto,
    Fecha_Registo,
    Estado,
    Cuenta_Proveedor,
    Cuenta_Banco,
  }) => {
    setModificando({
      Id: Id,
      Proveedor: Proveedor,
      Fecha_Registo: FormatearFecha(
        convertirTextoAFecha(Fecha_Registo),
        "YYYY-MM-DD"
      ),
      Monto: Monto,
      Estado: Estado,
      Cuenta_Proveedor: Cuenta_Proveedor,
      Cuenta_Banco: Cuenta_Banco,
    });
  };

  const onDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete it?")) {
      await Consultar(`api/solicituds/eliminar`, null, null, {
        Id: id,
      });
      consultar();
    }
  };

  const onClear = () => {
    setModificando({
      Id: undefined,
      Proveedor: 0,
      Fecha_Registo: undefined,
      Monto: 0,
      Estado: "",
      Cuenta_Proveedor: "",
      Cuenta_Banco: "",
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
              label="Código Solicitud"
              type="text"
              name="Id"
              value={modificando.Id}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => handleInputs(e.currentTarget.value, "Id")}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            {/* <InputLabel id="demo-simple-select-label">Status</InputLabel> */}
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Proveedor"
              name="Proveedor"
              value={modificando.Proveedor}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => handleInputs(e.target.value, "Proveedor")}
            >
              {suppliers
                ? suppliers.map((e) => {
                    return <MenuItem value={e.Id}>{e.Nombre}</MenuItem>;
                  })
                : null}
            </Select>
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-password-input"
              label="Cuenta Proveedor*"
              type="text"
              name="Cuenta_Proveedor"
              value={modificando.Cuenta_Proveedor}
              disabled
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) =>
                handleInputs(e.currentTarget.value, "Cuenta_Proveedor")
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-password-input"
              label="Monto Cheque*"
              type="number"
              name="Monto"
              value={modificando.Monto}
              onChange={(e) => handleInputs(e.currentTarget.value, "Monto")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-password-input"
              label="Cuenta Banco*"
              type="text"
              name="Cuenta_Banco"
              value={modificando.Cuenta_Banco}
              onChange={(e) =>
                handleInputs(e.currentTarget.value, "Cuenta_Banco")
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-password-input"
              label="Fecha de Registro*"
              type="Date"
              name="Fecha_Registo"
              value={modificando.Fecha_Registo}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) =>
                handleInputs(e.currentTarget.value, "Fecha_Registo")
              }
            />
          </Grid>
          <Grid item xs={12}>
            {/* <InputLabel id="demo-simple-select-label">Status</InputLabel> */}
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Estado"
              disabled
              name="Estado"
              value={modificando.Estado}
              onChange={(e) => handleInputs(e.target.value, "Estado")}
            >
              <MenuItem value="Pendiente">Pendiente</MenuItem>
              <MenuItem value="Anulada">Anulada</MenuItem>
              <MenuItem value="Cheque Generado">Cheque Generado</MenuItem>
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
            sx={{ maxWidth: "auto" }}
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className="title">Id</TableCell>
                  <TableCell className="title">Proveedor</TableCell>
                  <TableCell className="title">Monto</TableCell>
                  <TableCell className="title">Fecha de registro</TableCell>
                  <TableCell className="title">Estado</TableCell>
                  <TableCell className="title">Cuenta de Proveedor</TableCell>
                  <TableCell className="title">Cuenta de Banco</TableCell>
                  <TableCell className="title">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((data) => (
                  <TableRow
                    key={data.Id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    className="hover"
                  >
                    <TableCell component="th" scope="row">
                      {data.Id}
                    </TableCell>
                    <TableCell>{data.proveedorNombre}</TableCell>
                    <TableCell>{data.Monto}</TableCell>
                    <TableCell>
                      {FormatearFecha(
                        convertirTextoAFecha(data.Fecha_Registo),
                        "DD-MM-YYYY"
                      )}
                    </TableCell>
                    <TableCell>{data.Estado}</TableCell>
                    <TableCell>{data.Cuenta_Proveedor}</TableCell>
                    <TableCell>{data.Cuenta_Banco}</TableCell>
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

export default Solicitud;
