import React, { useState } from "react";
import {
  CardContent,
  Grid,
  Card,
  CardHeader,
  TextField,
  FormControlLabel,
  Switch,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { Search, Close } from "@material-ui/icons";
import PropTypes from "prop-types";
import Busqueda from "../../../common/busqueda/busqueda";
import { Select, FormControl, MenuItem, InputLabel } from "@mui/material";

export default function EditorDocumento({
  documento,
  setDocumento,
  modificandoAgregandoDocumento,
  setDocumentoModificado,
  errores,
  onInputChange,
  onEstadoChange,
}) {
  // console.log(documento);
  return (
    <>
      <Grid item xs={12}>
        <Card className="card">
          <CardHeader
            className="cardRoot cardTitle"
            title={
              modificandoAgregandoDocumento
                ? "Edición de Suplidor"
                : "Visualizando Suplidor"
            }
          />
          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6} id="name">
                {modificandoAgregandoDocumento ? (
                  <TextField
                    fullWidth
                    id="name"
                    name="name"
                    label="Nombre"
                    placeholder=""
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    margin="normal"
                    error={errores.name ? true : false}
                    helperText={errores.name}
                    onChange={(e) => onInputChange(e.target)}
                    value={documento.name ?? ""}
                    type="string"
                  />
                ) : (
                  <div>
                    <div>
                      <strong>Nombre</strong>
                    </div>
                    <div>{documento.name}</div>
                  </div>
                )}
              </Grid>
              <Grid item xs={12} sm={6} id="identification">
                {modificandoAgregandoDocumento ? (
                  <TextField
                    fullWidth
                    id="identification"
                    name="identification"
                    label="Identificación"
                    placeholder=""
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    margin="normal"
                    error={errores.identification ? true : false}
                    helperText={errores.identification}
                    onChange={(e) => onInputChange(e.target)}
                    value={documento.identification ?? ""}
                    type="string"
                  />
                ) : (
                  <div>
                    <div>
                      <strong>Identificación</strong>
                    </div>
                    <div>{documento.identification}</div>
                  </div>
                )}
              </Grid>
              <Grid container item xs={12} spacing={1}>
                <Grid item xs={12} id="isInactivo">
                  {modificandoAgregandoDocumento ? (
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Estado
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Estado"
                        name="status"
                        value={documento.status}
                        onChange={(e) => onInputChange(e.target)}
                      >
                        <MenuItem value="A">Activo</MenuItem>
                        <MenuItem value="I">Inactivo</MenuItem>
                      </Select>
                    </FormControl>
                  ) : (
                    <div>
                      <div>
                        <strong>Esta Inactivo</strong>
                      </div>
                      <div>{documento.status === "I" ? "SI" : "NO"}</div>
                    </div>
                  )}
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Tipo de Persona
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Tipo de Persona"
                      name="personType"
                      value={documento.personType}
                      onChange={(e) => onInputChange(e.target)}
                    >
                      <MenuItem value="J">Jurídica</MenuItem>
                      <MenuItem value="F">Física</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}

EditorDocumento.propTypes = {
  documento: PropTypes.object.isRequired,
  modificandoAgregandoDocumento: PropTypes.bool.isRequired,
  errores: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired,
  accionBuscar: PropTypes.func.isRequired,
  companiaId: PropTypes.number.isRequired,
  accionLimpiar: PropTypes.func.isRequired,
  roleNombre: PropTypes.string,
};
