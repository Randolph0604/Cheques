import React from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import BusquedaGrid from "./busquedaGrid";

export default function Busqueda({
  funcionCerrar,
  collection,
  where,
  order,
  thirdParameter,
  listadoManual,
  permitirNuevoRegistro,
}: {
  funcionCerrar: (registro?: any, nuevoRegistro?: boolean) => void;
  collection: string;
  where?: string;
  order?: string;
  thirdParameter?: object;
  listadoManual?: any[];
  permitirNuevoRegistro?: string;
}) {
  return (
    <Modal isOpen={true} zIndex={2000} size="xl">
      <ModalHeader>
        <Button onClick={() => funcionCerrar()}>Cancelar</Button>

        {permitirNuevoRegistro && (
          <Button
            onClick={() => funcionCerrar(null, true)}
            color="primary"
            style={{ marginLeft: 5 }}
          >
            Nuevo
          </Button>
        )}
      </ModalHeader>

      <ModalBody style={{ padding: "0px" }}>
        <BusquedaGrid
          onClick={funcionCerrar}
          collection={collection}
          where={where}
          order={order}
          thirdParameter={thirdParameter}
          listadoManual={listadoManual}
        />
      </ModalBody>
    </Modal>
  );
}
