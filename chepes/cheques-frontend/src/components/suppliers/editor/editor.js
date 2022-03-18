import React, { useState, useEffect, useCallback } from "react";
import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import { Grabar, Consultar } from "../../../common/server/funcionesServidor";
import BarraHerramienta from "../../../common/barraHerramienta/barraHerramienta";
import Dialog from "../../../common/dialog/dialog";
import EditorDocumento from "./editorDocumento";
import { validarValorAsignado } from "../../../common/validaciones/validaciones";
import MensajeAlerta from "../../../common/mensajeAlerta/mensajeAlerta";
import {
  postSuppliers,
  putSuppliers,
  deleteSuppliers,
} from "../../../helpers/helpers";

export default function Editor({
  documentoEditar,
  funcionCerrar,
  initModificandoAgregando,
}) {
  const [modificandoAgregandoDocumento, setModificandoAgregandoDocumento] =
    useState(false);
  const [confirmarAccionCancelar, setConfirmarAccionCancelar] = useState(false);
  const [confirmarAccionEliminar, setConfirmarAccionEliminar] = useState(false);
  const [documentoModificado, setDocumentoModificado] = useState(false);
  const [errores, setErrores] = useState({});
  const [documento, setDocumento] = useState({ isInactivo: false });
  const [isGrabando, setIsGrabando] = useState(false);

  useEffect(() => {
    setDocumento(documentoEditar);
    setModificandoAgregandoDocumento(initModificandoAgregando);
  }, [documentoEditar, initModificandoAgregando]);

  const onInputChange = ({ name, type, value, checked }) => {
    value = type === "checkbox" ? checked : value;

    if (name === "name" && value.length > 50) return;
    if (name === "identification" && value.length > 11) return;

    setDocumento({ ...documento, [name]: value });

    setDocumentoModificado(true);
  };

  const onEstadoChange = ({ event }) => {
    const value =
      event.target.name === "status"
        ? event.target.checked
        : event.target.value;

    setDocumentoModificado(true);
    setDocumento({ ...documento, [event.target.name]: value });
  };

  //Acciones de la barra de herramientas
  const accionNuevo = async () => {
    setDocumento({
      idSupplier: null,
      name: null,
      personType: "A",
      identification: null,
      balance: 0,
      status: "A",
    });
  };

  const accionModificar = () => setModificandoAgregandoDocumento(true);

  const accionEliminarConfirmar = () => setConfirmarAccionEliminar(true);
  const accionEliminar = async () => {
    let copiaData = { ...documento };
    let respuesta = await deleteSuppliers(documento.idSupplier);
    if (respuesta.length) {
      funcionCerrar();
    } else setConfirmarAccionEliminar(false);
    funcionCerrar();
  };
  const accionEliminarCancelar = () => setConfirmarAccionEliminar(false);

  const accionCancelarConfirmar = () =>
    documentoModificado ? setConfirmarAccionCancelar(true) : accionCancelar();
  const accionCancelar = () => funcionCerrar(documento);
  const accionCancelarCancelar = () => setConfirmarAccionCancelar(false);

  const accionGrabar = useCallback(async () => {
    //Validaciones
    let error = {};
    error = {
      ...error,
      ...validarValorAsignado(
        "nombre",
        documento.name,
        "Debe indicar algun nombre para el suplidor."
      ),
    };
    error = {
      ...error,
      ...validarValorAsignado(
        "nombre",
        documento.identification,
        "Debe indicar alguna identificación para el suplidor"
      ),
    };

    if (JSON.stringify(error) !== "{}") {
      setErrores(error);
      setIsGrabando(false);
      return;
    }
    //Validaciones

    let copiaData = documento;

    let nuevoDoc = undefined;

    if (copiaData.idSupplier) {
      nuevoDoc = await putSuppliers(copiaData);
    } else {
      nuevoDoc = await postSuppliers(copiaData);
    }

    setIsGrabando(false);

    if (nuevoDoc.length) {
      setDocumento(nuevoDoc[0]);
      setDocumentoModificado(false);
      setModificandoAgregandoDocumento(false);
    } else {
      setDocumentoModificado(false);
      setModificandoAgregandoDocumento(false);
    }
  }, [documento]);
  //Acciones de la barra de herramientas

  useEffect(() => {
    if (isGrabando) accionGrabar();
  }, [isGrabando, accionGrabar]);

  return (
    <>
      <BarraHerramienta
        accionGrabar={() => setIsGrabando(true)}
        accionCancelar={accionCancelarConfirmar}
        accionNuevo={accionNuevo}
        accionModificar={accionModificar}
        accionEliminar={accionEliminarConfirmar}
        botonNuevoDesHabilitar={modificandoAgregandoDocumento}
        botonModificarDesHabilitar={modificandoAgregandoDocumento}
        botonEliminarDesHabilitar={modificandoAgregandoDocumento}
        botonGrabarDesHabilitar={!modificandoAgregandoDocumento}
        isGrabando={isGrabando}
      />

      <Dialog
        open={confirmarAccionCancelar}
        titulo="¡Advertencia!"
        estiloTitulo="Warning"
        mensaje="¿Seguro desea cancelar el proceso?, Existen cambios sin grabar si procede serán descartados."
        textoBtn1="Continuar y Descartar Cambios"
        textoBtn2="Cancelar"
        accionDialogBtn1={accionCancelar}
        accionDialogBtn2={accionCancelarCancelar}
      />

      <Dialog
        open={confirmarAccionEliminar}
        titulo="¡Advertencia!"
        estiloTitulo="Warning"
        mensaje="¿Seguro desea eliminar el registro completo?"
        textoBtn1="Continuar y Eliminar Registro"
        textoBtn2="Cancelar"
        accionDialogBtn1={accionEliminar}
        accionDialogBtn2={accionEliminarCancelar}
      />

      <div className="content">
        <Grid container item xs={12} spacing={1}>
          <EditorDocumento
            setDocumentoModificado={setDocumentoModificado}
            setDocumento={setDocumento}
            documento={documento}
            modificandoAgregandoDocumento={modificandoAgregandoDocumento}
            errores={errores}
            onInputChange={onInputChange}
            onEstadoChange={onEstadoChange}
          />
        </Grid>
      </div>

      <BarraHerramienta
        accionGrabar={() => setIsGrabando(true)}
        accionCancelar={accionCancelarConfirmar}
        accionNuevo={accionNuevo}
        accionModificar={accionModificar}
        accionEliminar={accionEliminarConfirmar}
        botonNuevoDesHabilitar={modificandoAgregandoDocumento}
        botonModificarDesHabilitar={modificandoAgregandoDocumento}
        botonEliminarDesHabilitar={modificandoAgregandoDocumento}
        botonGrabarDesHabilitar={!modificandoAgregandoDocumento}
        isGrabando={isGrabando}
      />
    </>
  );
}

Editor.propTypes = {
  documentoEditar: PropTypes.object.isRequired,
  funcionCerrar: PropTypes.func.isRequired,
  initModificandoAgregando: PropTypes.bool.isRequired,
};
