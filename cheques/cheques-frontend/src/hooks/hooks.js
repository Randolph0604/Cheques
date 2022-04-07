import { useState, useEffect } from "react";
import { getPaymentConcepts, postPaymentConcepts } from "../helpers/helpers";

export const PaymentConcepts = (description, status) => {
  const [concept, setConcept] = useState({ data: [], loading: false, err: "" });

  useEffect(() => {
    getPaymentConcepts()
      .then((data) => setConcept({ data, loading: true, err: "" }))
      .catch((err) => setConcept({ data: [], loading: false, err }));
  }, [description, status]);

  return concept;
};

export const InsertPaymentConcepts = (description, status) => {
  const [concept, setConcept] = useState({ data: {}, loading: false, err: "" });

  useEffect(() => {
    postPaymentConcepts(description, status)
      .then((data) => setConcept({ data, loading: true, err: "" }))
      .catch((err) => setConcept({ data: [], loading: false, err }));
  }, [description, status]);

  return concept;
};
