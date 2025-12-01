import { createContext, useContext, useState } from "react";

const RecordContext = createContext();

export function RecordProvider({ children }) {
  const [record, setRecord] = useState({
    name: "",
    cpf: "",
    birthDate: "",
    responsible: "",
    codigoEol: "",
    endereco: "",
    unidadeEscolar: "",
    anoEscolar: "",
    momName: "",
    dadName: "",
  });

  function updateRecord(field, value) {
    setRecord((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <RecordContext.Provider value={{ record, updateRecord }}>
      {children}
    </RecordContext.Provider>
  );
}

export function useRecord() {
  return useContext(RecordContext);
}
