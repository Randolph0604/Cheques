import React, { useState, useEffect, useRef } from "react";
import { Grid } from "@material-ui/core";
// import { useReactToPrint } from "react-to-print";
import { Consultar } from "../../common/server/funcionesServidor";
import { AsignarNombreMaterialTable } from "../../common/funciones/funciones";
import DetalleGrid from "../../common/detalleGrid/DetalleGrid";
import Editor from "./editor/Editor";

export default function Asiento() {
  const collection = "solicituds";
  const titulo = "Asientos contables";
  const didMountRef = useRef(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [documentoEditar, setDocumentoEditar] = useState(null);

  useEffect(() => {
    if (!didMountRef.current) {
      consultar();
      didMountRef.current = true;
    } else {
      AsignarNombreMaterialTable();
    }
  });

  const consultar = async () => {
    setLoading(true);
    setData(
      await Consultar(`api/asientos/consultar`, null, null, {
        where: `s.estado <> 'Pendiente'`,
        order: `Id ASC`,
      })
    );
    setLoading(false);
  };

  /**Impresión**/
  const printRef = useRef();
  // const onImprimir = useReactToPrint({
  //   content: () => printRef.current,
  //   pageStyle: "@page { size: letter portrait;}",
  // });
  /**Impresión**/

  //Funciones para el editor
  const onVisualizar = (registro) => {
    setDocumentoEditar(registro);
    console.log(registro);
  };
  const onCerrarEditor = () => {
    setDocumentoEditar(null);
    consultar();
  };

  // const onNuevo = async () => {
  //   setDocumentoEditar({
  //     CODIGO: null,
  //     descripcion: null,
  //     isInactivo: false,
  //   });
  // };

  return documentoEditar ? (
    <Editor documentoEditar={documentoEditar} funcionCerrar={onCerrarEditor} />
  ) : (
    <div className="content">
      <Grid container item xs={12} ref={printRef}>
        <DetalleGrid
          isLoading={loading}
          data={data.filter((e) => e.asiento)}
          onVisualizar={onVisualizar}
          collection={collection}
          titulo={titulo}
        />
      </Grid>
    </div>
  );
}
