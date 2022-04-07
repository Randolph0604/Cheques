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
import "./Usuarios.css";
import { Consultar } from "../../common/server/funcionesServidor";
import MensajeAlerta from "../../common/mensajeAlerta/mensajeAlerta";

const Usuarios = () => {
  const [modificando, setModificando] = useState({
    Id: 0,
    Usuario: "",
    Pass: "",
    Tipo: 0,
  });

  const [data, setData] = useState(undefined);

  useEffect(() => {
    consultar();
  }, []);

  useEffect(() => {
    setModificando({
      Id: 0,
      Usuario: "",
      Pass: "",
      Tipo: 0,
    });
  }, [data]);

  const consultar = async () => {
    setData(await Consultar(`api/usuarios/consultar`, null, null, undefined));
  };

  const handleInputs = (value, name) => {
    let copiaData = JSON.parse(JSON.stringify(modificando));
    setModificando({ ...copiaData, [name]: value });
    // console.log(modificando);
  };

  const onSubmit = async (e) => {
    if (!modificando.Tipo)
      return MensajeAlerta("error", "Elegir tipo de Usuario");
    if (!modificando.Usuario) return MensajeAlerta("error", "Digitar Usuario");
    if (!modificando.Pass) return MensajeAlerta("error", "Digitar Contraseña");

    await Consultar(`api/usuarios/crear`, null, null, {
      object: JSON.stringify(modificando),
    });

    consultar();
    onClear();
  };

  const onModificar = ({ Id, Usuario, Pass, Tipo }) => {
    setModificando({
      Id: Id,
      Usuario: Usuario,
      Pass: Pass,
      Tipo: Tipo,
    });
  };

  const onDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete it?")) {
      await Consultar(`api/usuarios/eliminar`, null, null, {
        Id: id,
      });
      consultar();
    }
  };

  const onClear = () => {
    setModificando({
      Id: 0,
      Usuario: "",
      Pass: "",
      Tipo: 0,
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
              label="Id"
              type="text"
              name="Id"
              value={
                modificando
                  ? modificando.Id
                    ? modificando.Id
                    : undefined
                  : undefined
              }
              onChange={(e) => handleInputs(e.currentTarget.value, "Id")}
              disabled
              style={{ display: "none" }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-password-input"
              label="Usuario*"
              type="text"
              name="Usuario"
              value={modificando.Usuario}
              onChange={(e) => handleInputs(e.currentTarget.value, "Usuario")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="outlined-password-input"
              label="Contraseña*"
              type="password"
              name="Pass"
              value={modificando.Pass}
              onChange={(e) => handleInputs(e.currentTarget.value, "Pass")}
            />
          </Grid>
          <Grid item xs={12}>
            {/* <InputLabel id="demo-simple-select-label">Status</InputLabel> */}
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Tipo"
              name="Tipo"
              value={modificando.Tipo}
              onChange={(e) => handleInputs(e.target.value, "Tipo")}
            >
              <MenuItem value="2">Administrador</MenuItem>
              <MenuItem value="1">Operador</MenuItem>
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
            sx={{ maxWidth: 700 }}
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className="title">Id</TableCell>
                  <TableCell className="title">Usuario</TableCell>
                  <TableCell className="title">Contraseña</TableCell>
                  <TableCell className="title">Tipo</TableCell>
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
                    <TableCell>{data.Usuario}</TableCell>
                    <TableCell>Oculto</TableCell>
                    <TableCell>
                      {data.Tipo === 1 ? "Operador" : "Administrador"}
                    </TableCell>
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

export default Usuarios;
