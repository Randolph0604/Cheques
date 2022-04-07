import axios from "axios";

export const getPaymentConcepts = async () => {
  const { data } = await axios.get(
    "https://localhost:44385/api/PaymentConcepts"
  );
  return data;
};

export const postPaymentConcepts = async ({ description, status }) => {
  console.log({ description, status });
  const { data } = await axios.post(
    "https://localhost:44385/api/PaymentConcepts",
    { description, status }
  );
  console.log(data);
  return data;
};

export const deletePaymentConcepts = async (id) => {
  const { data } = await axios.delete(
    `https://localhost:44385/api/PaymentConcepts/${id}`
  );
  return data;
};

export const getPaymentConceptById = async (id) => {
  const { data } = await axios.get(
    `https://localhost:44385/api/PaymentConcepts/${id}`
  );
  return data;
};

export const putPaymentConcept = async ({ idPayment, description, status }) => {
  const { data } = await axios.put(
    `https://localhost:44385/api/PaymentConcepts/${idPayment}`,
    { idPayment, description, status }
  );
  return data;
};

//Suplidores

export const getSuppliers = async () => {
  const { data } = await axios.get("https://localhost:44385/api/Suppliers/");
  return data;
};

export const postSuppliers = async ({
  name,
  personType,
  identification,
  balance,
  status,
}) => {
  const { data } = await axios.post(`https://localhost:44385/api/Suppliers/`, {
    name,
    personType,
    identification,
    balance,
    status,
  });
  return data;
};

export const putSuppliers = async ({
  idSupplier,
  name,
  personType,
  identification,
  balance,
  status,
}) => {
  const id = idSupplier;
  const { data } = await axios.put(
    `https://localhost:44385/api/Suppliers/${id}`,
    {
      idSupplier,
      name,
      personType,
      identification,
      balance,
      status,
    }
  );
  return data;
};

export const deleteSuppliers = async (idSupplier) => {
  const id = idSupplier;
  const { data } = await axios.delete(
    `https://localhost:44385/api/Suppliers/${id}`
  );
  return data;
};

//AccountingEntries

export const postAccountingEntries = async ({
  description,
  idInventoryType,
  accountingAccount,
  movementType,
  accountingDate,
  accountingAmount,
  status,
}) => {
  const { data } = await axios.post(
    `https://localhost:44385/api/AccountingEntries`,
    {
      description,
      idInventoryType,
      accountingAccount,
      movementType,
      accountingDate,
      accountingAmount,
      status,
    }
  );
  return data;
};

export const putAccountingEntries = async ({
  idAccounting,
  description,
  idInventoryType,
  accountingAccount,
  movementType,
  accountingDate,
  accountingAmount,
  status,
}) => {
  const id = idAccounting;
  const { data } = await axios.put(
    `https://localhost:44385/api/AccountingEntries/${id}`,
    {
      idAccounting,
      description,
      idInventoryType,
      accountingAccount,
      movementType,
      accountingDate,
      accountingAmount,
      status,
    }
  );
  return data;
};

export const deleteAccountingEntries = async (idAccounting) => {
  const id = idAccounting;
  const { data } = await axios.delete(
    `https://localhost:44385/api/AccountingEntries/${id}`
  );
  return data;
};

//Documents

export const postDocuments = async ({
  noInvoice,
  documentDate,
  amount,
  registrationDate,
  idSupplier,
  status,
}) => {
  const { data } = await axios.post(`https://localhost:44385/api/Documents`, {
    noInvoice,
    documentDate,
    amount,
    registrationDate,
    idSupplier,
    status,
  });
  return data;
};

export const putDocuments = async ({
  noDocument,
  noInvoice,
  documentDate,
  amount,
  registrationDate,
  idSupplier,
  status,
  idAsiento,
}) => {
  const id = noDocument;
  const { data } = await axios.put(
    `https://localhost:44385/api/Documents/${id}`,
    {
      noDocument,
      noInvoice,
      documentDate,
      amount,
      registrationDate,
      idSupplier,
      status,
      idAsiento,
    }
  );
  return data;
};

export const deleteDocuments = async (idAccounting) => {
  const id = idAccounting;
  const { data } = await axios.delete(
    `https://localhost:44385/api/Documents/${id}`
  );
  return data;
};
