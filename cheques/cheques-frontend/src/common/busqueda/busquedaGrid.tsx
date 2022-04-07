import React, { useState, useEffect, useCallback } from "react";
import { Consultar } from "../server/funcionesServidor";
import MaterialTable from "@material-table/core";
import { Grid } from "@material-ui/core";
import {
  options,
  localization,
  cabezeras,
} from "../opcionesComunesMaterialTable/opcionesComunesMaterialTable";
import { BookLoader } from "../loader/loader";
import { FormatearFechaArray } from "../funciones/funciones";

export default function BusquedaGrid({
  onClick,
  collection,
  where = "",
  order = "",
  thirdParameter,
  listadoManual,
}: {
  onClick: (registro: any) => void;
  collection: string;
  where?: string;
  order?: string;
  thirdParameter?: object;
  listadoManual?: any[];
}) {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const thirdParametertoJSON = JSON.stringify(thirdParameter);

  const consultar = useCallback(async () => {
    setIsLoading(true);
    if (listadoManual) setData(listadoManual);
    else if (!thirdParameter) {
      setData(
        await Consultar(`api/${collection}/consultar`, undefined, undefined, {
          where,
          order,
        })
      );
    } else {
      setData(
        await Consultar(`api/${collection}/consultar`, undefined, undefined, {
          where,
          order,
          thirdParametertoJSON,
        })
      );
    }
    setIsLoading(false);
  }, [
    collection,
    where,
    order,
    listadoManual,
    thirdParameter,
    thirdParametertoJSON,
  ]);

  useEffect(() => {
    consultar();
  }, [consultar]);

  return (
    <Grid container item>
      <Grid item xs={12}>
        {isLoading ? (
          <BookLoader />
        ) : (
          <MaterialTable
            title="Búsqueda"
            onRowClick={(event, rowData, togglePanel) => onClick(rowData)}
            columns={cabezeras(collection)}
            data={FormatearFechaArray(data)}
            options={{
              ...options(),
              searchAutoFocus: true,
              maxBodyHeight: window.innerHeight - 220,
              minBodyHeight: 400,
              grouping: false,
              exportMenu: [],
              columnsButton: false,
              paging: true,
              pageSize: 5,
              initialPage: 0,
            }}
            localization={localization}
          />
        )}
      </Grid>
    </Grid>
  );
}
