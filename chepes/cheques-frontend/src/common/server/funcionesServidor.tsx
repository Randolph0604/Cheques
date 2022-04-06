import { baseUrl } from "../../shared/baseUrl";
import MensajeAlerta from "../mensajeAlerta/mensajeAlerta";
import MensajesError from "../mensajesError/MensajesError";
// @ts-ignore
import V from "max-validator";

const serverCall = async <T extends any>(
  rutaAPI: string,
  method: string,
  headers: any = {},
  body?: any,
  messageOnSuccess?: string,
  validator?: any
): Promise<T[]> => {
  // console.log('Valores del fetch:', rutaAPI, method, headers, body, messageOnSuccess);

  try {
    const response: any = await fetch(rutaAPI, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      credentials: "same-origin",
      body,
    });

    let documento: any[] = [];

    try {
      documento = await response.json();
    } catch (error) { }

    //Se convierte de object a array para tener respuestas estandarizadas
    if (documento.length === undefined) documento = [documento];

    let respuesta: T[] = documento;

    // console.log("Respuesta del servidor:", respuesta);

    if (response.ok) {
      if (validator) {
        respuesta.forEach((res) => {
          let validado = V.validate(res, validator);
          if (validado.hasError)
            throw new Error(JSON.stringify(validado.errors));
        });
      }

      if (messageOnSuccess) MensajeAlerta("success", messageOnSuccess);
      return respuesta;
    }

    throw new Error(JSON.stringify(documento[0].error.message));
  } catch (mensajeError) {
    // @ts-ignore
    if (mensajeError.message === "Failed to fetch") {
      MensajeAlerta("error", "Failed to fetch");
    } else {
      // @ts-ignore
      const error: any = MensajesError(mensajeError.message)
        ? // @ts-ignore
        MensajesError(mensajeError.message)
        : // @ts-ignore
        mensajeError.message;

      MensajeAlerta("error", error, false);
    }
    return [];
  }
};

/**
 * Ejecuta el custom end point para grabar y actualizar
 */
export const Grabar = <T extends any>(
  rutaAPI: string,
  documento: any,
  noMostrarMensaje: boolean = false
): Promise<T[]> =>
  serverCall(
    baseUrl + rutaAPI,
    "POST",
    undefined,
    JSON.stringify(documento),
    noMostrarMensaje ? undefined : "Documento actualizado satisfactoriamente."
  );

/**
 * Graba varios documentos al mismo tiempo
 */
export const GrabarVariosDocumentosNuevos = <T extends any>(
  rutaAPI: string,
  info: any[]
): Promise<T[]> =>
  serverCall(
    baseUrl + rutaAPI,
    "POST",
    undefined,
    JSON.stringify(info),
    "Documentos grabados satisfactoriamente."
  );

export const Consultar = <T extends any>(
  rutaAPI: string,
  filtro?: string,
  tokenAUtilizar?: string,
  arregloHeaders?: any,
  validator?: any,
  messageOnSuccess?: string,
): Promise<T[]> =>
  serverCall<T>(
    baseUrl + rutaAPI + (filtro ? `?filter=${JSON.stringify(filtro)}` : ``),
    "GET",
    arregloHeaders,
    undefined,
    messageOnSuccess,
    validator,
  );

export const Ejecutar = <T extends any>(
  rutaAPI: string,
  arregloHeaders?: any,
  body?: any,
  message?: string,
  tokenAUtilizar?: string,
  noUsarToken?: boolean
): Promise<T[]> =>
  serverCall(
    baseUrl + rutaAPI,
    "POST",
    arregloHeaders,
    body ? JSON.stringify(body) : undefined,
    message
  );

/**
 * Ejecuta el custom end point para eliminar
 */
export const Eliminar = <T extends any>(
  rutaAPI: string,
  documento: any,
  noMostrarMensaje: boolean = false
): Promise<T[]> =>
  serverCall(
    baseUrl + rutaAPI,
    "DELETE",
    undefined,
    JSON.stringify(documento),
    noMostrarMensaje ? undefined : "Documento eliminado satisfactoriamente."
  );

/**
 * Ejecuta el custom end point para grabar y actualizar
 */
export const GrabarCustom = <T extends any>(
  rutaAPI: string,
  documento: any,
  noMostrarMensaje: boolean = false
): Promise<T[]> =>
  serverCall(
    rutaAPI,
    "POST",
    undefined,
    JSON.stringify(documento),
    noMostrarMensaje ? undefined : "Documento actualizado satisfactoriamente."
  );
