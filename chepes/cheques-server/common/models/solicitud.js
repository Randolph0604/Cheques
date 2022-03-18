"use strict";

module.exports = function (Solicitud) {
  Solicitud.consultar = (where, order, cb) => {
    const ds = Solicitud.app.dataSources.SQLServerContinuo.connector;
    let query = `select S.*, P.Nombre as proveedorNombre from Solicitudes_Cheques S\
    inner join Proveedores P on (P.Id = S.Proveedor)`;

    ds.query(query, [], async (error, data) => {
      if (error) cb(error);
      else {
        try {
          cb(null, data);
        } catch (err) {
          cb(err);
        }
      }
    });
  };

  Solicitud.remoteMethod("consultar", {
    accepts: [
      { arg: "where", type: "string", required: false },
      { arg: "order", type: "string" },
    ],
    returns: { type: "array", root: true },
    http: { verb: "get" },
  });

  Solicitud.crear = (object, cb) => {
    const ds = Solicitud.app.dataSources.SQLServerContinuo.connector;

    if (object.Id) {
      let query = `update Solicitudes_Cheques set \
      Proveedor = ${object.Proveedor},\
      Monto = ${object.Monto},\
      Fecha_Registo = '${object.Fecha_Registo}',\
      Estado = '${object.Estado ? object.Estado : "Pendiente"}',\
      Cuenta_Proveedor = '${object.Cuenta_Proveedor}',\
      Cuenta_Banco = '${object.Cuenta_Banco}'\
      where id = ${object.Id}`;

      ds.query(query, [], async (error, data) => {
        if (error) cb(error);
        else {
          try {
            cb(null, data);
          } catch (err) {
            cb(err);
          }
        }
      });
    } else {
      let query = `insert into Solicitudes_Cheques (Proveedor, Monto, Fecha_Registo, Estado, Cuenta_Proveedor, Cuenta_Banco)\
      values (${object.Proveedor},${object.Monto},'${object.Fecha_Registo}','${
        object.Estado ? object.Estado : "Pendiente"
      }',\
      '${object.Cuenta_Proveedor}','${object.Cuenta_Banco}')`;

      ds.query(query, [], async (error, data) => {
        if (error) cb(error);
        else {
          try {
            cb(null, data);
          } catch (err) {
            cb(err);
          }
        }
      });
    }
  };

  Solicitud.remoteMethod("crear", {
    accepts: [{ arg: "object", type: "object", required: true }],
    returns: { type: "array", root: true },
    http: { verb: "get" },
  });

  Solicitud.eliminar = (Id, cb) => {
    const ds = Solicitud.app.dataSources.SQLServerContinuo.connector;

    if (Id) {
      let query = `delete from Solicitudes_Cheques where id = ${Id}`;

      ds.query(query, [], async (error, data) => {
        if (error) cb(error);
        else {
          try {
            cb(null, data);
          } catch (err) {
            cb(err);
          }
        }
      });
    } else {
      cb("Se necesita un ID para poder eliminar");
    }
  };

  Solicitud.remoteMethod("eliminar", {
    accepts: [{ arg: "id", type: "number", required: true }],
    returns: { type: "array", root: true },
    http: { verb: "get" },
  });
};