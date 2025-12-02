import colors from "@/constants/colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import api from "../../../services/api";

import { useRecord } from "@/src/context/RecordContext";
import { validateCPF, validateDate } from "@/src/utils/validators";

const API_URL = api.defaults.baseURL;

async function createRecord(payload) {
  try {
    const res = await axios.post(
      `${API_URL}/Children`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        }
      }
    );

    return res.data;

  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Erro ao criar ficha";

    throw new Error(message);
  }
}


export default function CreateRecord() {
  const router = useRouter();
  const { record, updateRecord } = useRecord();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [birthDate, setBirthDate] = useState(new Date());

  const formattedDate = birthDate.toISOString().split("T")[0];

  function onDateChange(_, date) {
    const d = date || birthDate;

    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }

    setBirthDate(d);
    updateRecord("birthDate", d.toISOString().split("T")[0]);
  }

  function validateForm() {
    if (!record.name) return "Nome é obrigatório.";
    if (!validateCPF(record.cpf)) return "CPF inválido.";
    if (!validateDate(record.birthDate)) return "Data de nascimento inválida.";
    if (!record.responsible) return "Responsável obrigatório.";
    if (!record.unidadeEscolar) return "Escola obrigatória.";
    return null;
  }

  async function handleSubmit() {
    const error = validateForm();
    if (error) {
      Alert.alert("Erro", error);
      return;
    }

    try {
      await createRecord(record);
      Alert.alert("Sucesso", "Ficha criada com sucesso!");
      router.back();

    } catch (err) {
      Alert.alert("Erro", err.message);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={record.name}
        onChangeText={(t) => updateRecord("name", t)}
      />

      <Text style={styles.label}>CPF</Text>
      <TextInput
        style={styles.input}
        value={record.cpf}
        onChangeText={(t) => updateRecord("cpf", t)}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Data de nascimento</Text>
      <TouchableOpacity
        style={styles.inputButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Text>{formattedDate}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={birthDate}
          mode="date"
          onChange={onDateChange}
        />
      )}

      <Text style={styles.label}>Responsável</Text>
      <TextInput
        style={styles.input}
        value={record.responsible}
        onChangeText={(t) => updateRecord("responsible", t)}
      />

      <Text style={styles.label}>Endereço</Text>
      <TextInput
        style={styles.input}
        value={record.endereco}
        onChangeText={(t) => updateRecord("endereco", t)}
      />

      <Text style={styles.label}>Escola</Text>
      <TextInput
        style={styles.input}
        value={record.unidadeEscolar}
        onChangeText={(t) => updateRecord("unidadeEscolar", t)}
      />

      <Text style={styles.label}>Ano escolar</Text>
      <TextInput
        style={styles.input}
        value={record.anoEscolar}
        onChangeText={(t) => updateRecord("anoEscolar", t)}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Nome da mãe</Text>
      <TextInput
        style={styles.input}
        value={record.momName}
        onChangeText={(t) => updateRecord("momName", t)}
      />

      <Text style={styles.label}>Nome do pai</Text>
      <TextInput
        style={styles.input}
        value={record.dadName}
        onChangeText={(t) => updateRecord("dadName", t)}
      />

      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Criar ficha</Text>
      </Pressable>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    gap: 20,
    paddingBottom: 40,
    backgroundColor: "#F8F8F8",
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
    marginBottom: 2
  },

  input: {
    padding: 14,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    backgroundColor: "white",
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  inputButton: {
    padding: 14,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  button: {
    marginTop: 30,
    backgroundColor: colors.orangeDark,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },

  buttonText: {
    color: colors.beige,
    fontSize: 17,
    fontWeight: "600",
  },
});

