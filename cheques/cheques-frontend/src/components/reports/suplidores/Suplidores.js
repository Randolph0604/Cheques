import React from "react";
import { Grid } from "@material-ui/core";
import DetalleGrid from "../../../common/detalleGrid/DetalleGrid";
import { useQuery } from "react-query";
import { Consultar } from "../../../common/server/funcionesServidor";

function SuplidoresR() {
  const { data } = useQuery(
    ["data"],
    async () =>
      await Consultar(`api/proveedors/consultar`, null, null, undefined)
  );

  return (
    <div className="content">
      <Grid container item xs={12}>
        <DetalleGrid
          data={data}
          collection="suppliers"
          titulo={`Reporte de Suplidores`}
        />
      </Grid>
    </div>
  );
}

export default SuplidoresR;
