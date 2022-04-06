import React from "react";
import { Grid } from "@material-ui/core";
import DetalleGrid from "../../../common/detalleGrid/DetalleGrid";

function Editor({ documentoEditar }) {
  return (
    <div className="content">
      <Grid container item xs={12}>
        <DetalleGrid
          data={
            documentoEditar
              ? documentoEditar.asiento
                ? documentoEditar.asiento
                : []
              : []
          }
          collection="asiento"
          titulo={`Asientos contables cheque #${
            documentoEditar ? (documentoEditar.Id ? documentoEditar.Id : 0) : 0
          }`}
        />
      </Grid>
    </div>
  );
}

export default Editor;
