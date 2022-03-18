import { toast } from "react-toastify";

/**
 * presenta una información en formato de alerta
 */
export default function MensajeAlerta(
  tipoAlerta: "success" | "error" | "info" | "dark" | "default" | "warning",
  mensaje: string,
  autoClose: boolean = true
) {
  const parametros: any = {
    position: "top-right",
    autoClose: autoClose ? 5000 : false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  if (tipoAlerta === "success") toast.success(mensaje, parametros);
  if (tipoAlerta === "warning") toast.warning(mensaje, parametros);
  if (tipoAlerta === "error") toast.error(mensaje, parametros);
  if (tipoAlerta === "info") toast.info(mensaje, parametros);
  if (tipoAlerta === "dark") toast.dark(mensaje, parametros);
  if (tipoAlerta === "default") toast(mensaje, parametros);
}
