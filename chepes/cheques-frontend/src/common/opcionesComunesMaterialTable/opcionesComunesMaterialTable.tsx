import { Column, Options, Localization } from "@material-table/core";
import { ExportCsv } from "@material-table/exporters";
import {
  FormatearNumeroCurrency,
  ExportarPDF,
} from "../funciones/funciones";

export const options = (
  nombreFile?: string,
  titulo?: string
): Options<any> => ({
  headerStyle: {
    color: "#800000",
    fontSize: "1rem",
    fontWeight: "bold",
  },
  rowStyle: {
    fontSize: "1rem",
  },
  grouping: true,
  filtering: true,
  paging: false,
  exportMenu: [
    {
      label: "Exportar PDF",
      exportFunc: (cols, datas) =>
        ExportarPDF(cols, datas, nombreFile ? nombreFile : "PDFFile", titulo),
    },
    {
      label: "Exportar CSV",
      exportFunc: (cols, datas) =>
        ExportCsv(cols, datas, nombreFile ? nombreFile : "CSVFile"),
    },
  ],
  search: true,
  showTitle: true,
  tableLayout: "auto",
  columnsButton: true,
  sorting: true,
  draggable: true,
});

export const localization: Localization = {
  grouping: {
    placeholder: "Arrastra aquí las cabezeras que deseas agrupar.",
  },
  toolbar: {
    addRemoveColumns: "Agregar o remover columnas",
    showColumnsTitle: "Mostrar / Ocultar columnas",
    showColumnsAriaLabel: "Mostrar / Ocultar columnas",
    searchTooltip: "Buscar",
    searchPlaceholder: "Buscar...",
    exportTitle: "Exportar",
    exportAriaLabel: "Exportar",
  },
  header: {
    actions: "Acciones",
  },
  body: {
    emptyDataSourceMessage: "No hay información que presentar",
  },
};

export const cabezeras = (
  collection: string,
  utilizaCentroCosto: boolean = false
): Column<any>[] => {
  switch (collection) {
    case "solicituds":
      return [
        {
          type: "numeric",
          title: "Codigo",
          field: "Id",
        },
        {
          type: "date",
          title: "Fecha",
          field: "Fecha_Registo",
          render: (rowData) => {
            const fecha = new Date(rowData.Fecha_Registo);
            return fecha.toLocaleString();
          },
          cellStyle: { minWidth: 100 },
          headerStyle: { minWidth: 100 },
        },
        {
          type: "string",
          title: "Proveedor",
          field: "proveedorNombre",
        },
        {
          type: "numeric",
          title: "Monto",
          field: "Monto",
          render: (rowData) => (
            <span>
              {rowData.Monto === null
                ? null
                : FormatearNumeroCurrency.format(rowData.Monto)}
            </span>
          ),
        },
        {
          type: "string",
          title: "Estado",
          field: "Estado",
        },
      ];
    case "asiento":
      return [
        {
          type: "string",
          title: "Cuenta",
          field: "Cuenta",
        },
        {
          type: "numeric",
          title: "Debito",
          field: "Debito",
          render: (rowData) => (
            <span>
              {rowData.Debito === null
                ? null
                : FormatearNumeroCurrency.format(rowData.Debito)}
            </span>
          ),
        },
        {
          type: "numeric",
          title: "Crédito",
          field: "Credito",
          render: (rowData) => (
            <span>
              {rowData.Credito === null
                ? null
                : FormatearNumeroCurrency.format(rowData.Credito)}
            </span>
          ),
        },
      ];
    case "suppliers":
      return [
        {
          type: "string",
          title: "Nombre",
          field: "Nombre",
        },
        {
          type: "string",
          title: "Tipo de Persona",
          field: "Tipo_Persona",
        },
        {
          type: "string",
          title: "Cédula",
          field: "Cedula",
        },
        {
          type: "numeric",
          title: "Balance",
          field: "Balance",
        },
        {
          type: "string",
          title: "Cuenta Contable",
          field: "Cuenta_Contable",
        },
        {
          type: "string",
          title: "Estado",
          field: "Estado",
        },
      ];
    default:
      return [{}];
  }
};
