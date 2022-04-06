import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import DetalleGrid from "../../../common/detalleGrid/DetalleGrid";
import { useQuery } from "react-query";
import { FormatearFecha } from "../../../common/funciones/funciones";
import { Consultar } from "../../../common/server/funcionesServidor";
import FiltrosFecha from "../../../common/FiltrosFecha/FiltrosFecha";

function ChequesR() {
  const [filtros, setFiltros] = useState({
    fechaDesde: FormatearFecha(new Date(), "YYYY-MM-DD"),
    fechaHasta: FormatearFecha(new Date(), "YYYY-MM-DD"),
  });

  const { data } = useQuery(
    ["data", filtros],
    async () =>
      await Consultar(`api/solicituds/consultar`, undefined, undefined, {
        where: `s.Fecha_Registo between '${filtros.fechaDesde}' and '${filtros.fechaHasta}'`,
      })
  );

  return (
    <div className="content">
      <Grid container item xs={12}>
        <FiltrosFecha filtros={filtros} setFiltros={setFiltros} />
        <DetalleGrid
          data={data}
          collection="solicituds"
          titulo={`Reporte de Cheques`}
        />
      </Grid>
    </div>
  );
}

export default ChequesR;
