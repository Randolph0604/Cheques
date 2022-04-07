import React from "react";
import { TextField } from "../Inputs";
import { CardContent, Grid, Card, CardHeader } from "@material-ui/core";

export default function FiltrosFecha({
  filtros,
  setFiltros,
  soloFechaHasta = false,
  children,
}: {
  filtros: { fechaDesde?: string; fechaHasta: string };
  setFiltros: (...args: any) => void;
  soloFechaHasta?: boolean;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <Grid item xs={12}>
      <Card className="card" id="cardFiltros">
        <CardHeader title="Filtros" />

        <CardContent>
          <Grid container item spacing={1}>
            {!soloFechaHasta && (
              <Grid item xs={12} sm={4} id="fechaDesde">
                <TextField
                  name="fechaDesde"
                  label="Fecha Desde"
                  value={filtros.fechaDesde}
                  type="date"
                  onChange={(e) =>
                    setFiltros({ ...filtros, fechaDesde: e.target.value })
                  }
                />
              </Grid>
            )}

            <Grid item xs={12} sm={4} id="fechaHasta">
              <TextField
                name="fechaHasta"
                label="Fecha Hasta"
                value={filtros.fechaHasta}
                type="date"
                onChange={(e) =>
                  setFiltros({ ...filtros, fechaHasta: e.target.value })
                }
              />
            </Grid>
          </Grid>

          {children}
        </CardContent>
      </Card>
    </Grid>
  );
}
