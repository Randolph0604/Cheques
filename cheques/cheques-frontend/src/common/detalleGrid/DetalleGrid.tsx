import React from "react";
import MaterialTable from "@material-table/core";
import { options, localization, cabezeras } from "../opcionesComunesMaterialTable/opcionesComunesMaterialTable";
import { FormatearFechaArray } from "../funciones/funciones";
import { BookLoader } from "../loader/loader";

import "./DetalleGrid.css";

export default function DetalleGrid({
  data = [],
  collection,
  onVisualizar,
  titulo = "",
  detailPanel,
  otrasOpciones = {},
  otrasAcciones = [],
  otrasLocalization = {},
  parentChildData,
  textoFiltros = "",
  cabezeraRemplazar = [],
  isLoading = false,
  loaderComponent,
}: {
  data: any[];
  collection: string;
  onVisualizar?: (registro: any) => void;
  titulo?: string;
  detailPanel?: any[];
  otrasOpciones?: object;
  otrasAcciones?: any[];
  otrasLocalization?: object;
  parentChildData?: (row: any, rows: any) => void;
  textoFiltros?: string;
  cabezeraRemplazar?: any[];
  isLoading?: boolean;
  loaderComponent?: JSX.Element;
}) {
  return (
    <MaterialTable
      title={titulo}
      columns={cabezeraRemplazar.length ? cabezeraRemplazar : cabezeras(collection)}
      data={data ? FormatearFechaArray(data) : []}
      parentChildData={parentChildData}
      options={{ ...options(titulo), ...otrasOpciones }}
      localization={{ ...localization, ...otrasLocalization }}
      onRowClick={onVisualizar ? (event, rowData, togglePanel) => onVisualizar(rowData) : undefined}
      actions={[...otrasAcciones]}
      detailPanel={detailPanel ? detailPanel : undefined}
      components={{ OverlayLoading: (props) => (loaderComponent ? loaderComponent : <BookLoader />) }}
      isLoading={isLoading}
      style={{ minWidth: "100%" }}
    />
  );
}
