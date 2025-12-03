import axios from "axios";
import { createContext, useContext, useState } from "react";
import api from "../services/api";

const RecordContext = createContext();
const API_URL = api.defaults.baseURL;


export function RecordProvider({ children }) {
  const [record, setRecord] = useState(null);
  const [reports, setReports] = useState([]);

  async function loadRecord(id) {
    const response = await axios.get(`${API_URL}/Children/${id}`);
    setRecord(response.data);
  }

  async function createRecord(payload) {
    const response = await axios.post(`${API_URL}/Children`, payload);
    setRecord(response.data);
  }

  function updateRecord(field, value) {
    setRecord((prev) => ({ ...prev, [field]: value }));
    setRecord(null);
  }
  async function deleteRecord(id) {
    await axios.delete(`${API_URL}/Children/${id}`);
    setRecord(null);
  }
  async function loadReports(childId) {
    const response = await axios.get(`${API_URL}/Children/${childId}/reports`);
    setReports(response.data);
  }

  async function createReport(childId, payload) {
    const respose = await axios.post(`${API_URL}/Children/${childId}/report`, payload);
    return respose.data;
  }

  return (
    <RecordContext.Provider value={{ record, updateRecord, reports, loadRecord, loadReports, updateRecord, createRecord, createReport, deleteRecord }}>
      {children}
    </RecordContext.Provider>
  );
}

export function useRecord() {
  return useContext(RecordContext);
}
