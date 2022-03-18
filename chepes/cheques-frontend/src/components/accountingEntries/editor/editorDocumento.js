import React, { useState } from "react";
import {
  CardContent,
  Grid,
  Card,
  CardHeader,
  TextField,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { Select, FormControl, MenuItem, InputLabel } from "@mui/material";
import {
  FormatearFecha,
  convertirTextoAFecha,
} from "../../../common/funciones/funciones";

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
                ? "Edición de Entrada de Diario"
                : "Visualizando Entrada de Diario"
            }
          />
          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={4}>
                <TextField
                  disabled={false}
                  label="Fecha"
                  placeholder=""
                  name="accountingDate"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  margin="normal"
                  error={errores.accountingDate ? true : false}
                  helperText={errores.accountingDate}
                  onChange={(e) => onInputChange(e.target)}
                  value={
                    FormatearFecha(
                      convertirTextoAFecha(documento.accountingDate),
                      "YYYY-MM-DD"
                    ) ?? ""
                  }
                  type="date"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6} id="description">
                {modificandoAgregandoDocumento ? (
                  <TextField
                    fullWidth
                    id="description"
                    name="description"
                    label="Descripción"
                    placeholder=""
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    margin="normal"
                    error={errores.description ? true : false}
                    helperText={errores.description}
                    onChange={(e) => onInputChange(e.target)}
                    value={documento.description ?? ""}
                    type="string"
                  />
                ) : (
                  <div>
                    <div>
                      <strong>Descripción</strong>
                    </div>
                    <div>{documento.description}</div>
                  </div>
                )}
              </Grid>
              <Grid item xs={12} sm={6} id="idInventoryType">
                {modificandoAgregandoDocumento ? (
                  <TextField
                    fullWidth
                    id="idInventoryType"
                    name="idInventoryType"
                    label="Tipo de Inventario"
                    placeholder=""
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    margin="normal"
                    error={errores.idInventoryType ? true : false}
                    helperText={errores.idInventoryType}
                    onChange={(e) => onInputChange(e.target)}
                    value={documento.idInventoryType ?? ""}
                    type="string"
                  />
                ) : (
                  <div>
                    <div>
                      <strong>Tipo de inventario</strong>
                    </div>
                    <div>{documento.idInventoryType}</div>
                  </div>
                )}
              </Grid>
              <Grid item xs={12} sm={6} id="accountingAccount">
                {modificandoAgregandoDocumento ? (
                  <TextField
                    fullWidth
                    id="accountingAccount"
                    name="accountingAccount"
                    label="Cuenta Contable"
                    placeholder=""
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    margin="normal"
                    error={errores.accountingAccount ? true : false}
                    helperText={errores.accountingAccount}
                    onChange={(e) => onInputChange(e.target)}
                    value={documento.accountingAccount ?? ""}
                    type="string"
                  />
                ) : (
                  <div>
                    <div>
                      <strong>Cuenta Contable</strong>
                    </div>
                    <div>{documento.accountingAccount}</div>
                  </div>
                )}
              </Grid>
              <Grid item xs={12} sm={6} id="accountingAmount">
                {modificandoAgregandoDocumento ? (
                  <TextField
                    fullWidth
                    id="accountingAmount"
                    name="accountingAmount"
                    label="Monto"
                    placeholder=""
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    margin="normal"
                    error={errores.accountingAmount ? true : false}
                    helperText={errores.accountingAmount}
                    onChange={(e) => onInputChange(e.target)}
                    value={documento.accountingAmount ?? ""}
                    type="string"
                  />
                ) : (
                  <div>
                    <div>
                      <strong>Monto</strong>
                    </div>
                    <div>{documento.accountingAmount}</div>
                  </div>
                )}
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Tipo de Movimiento (Debito/Credito)
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Tipo de Persona"
                    name="movementType"
                    value={documento.movementType}
                    onChange={(e) => onInputChange(e.target)}
                  >
                    <MenuItem value="D">Debito</MenuItem>
                    <MenuItem value="C">Credito</MenuItem>
                  </Select>
                </FormControl>
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
