import colors from "@/constants/colors";
import { useAuth } from "@/src/context/AuthContext";
import { useRecord } from "@/src/context/RecordContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput } from "react-native";

export default function CreateReport() {
  const { id } = useLocalSearchParams();
  const { reports, loadReports, createReport } = useRecord();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReports(id);
  }, [id])

  const router = useRouter();

  // Estados para enviar à API
  const [title, setTitle] = useState("");
  const [patient, setPatient] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = () => {
    const idEmployee = user.id;
    const payload = { title, description, employeeId: idEmployee, childId: id };

    console.log("Criar relatório:", payload);
    createReport(payload);


    router.push('/(tabs)/home');
  };

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <Text style={styles.label}>Assunto</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o assunto"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Paciente</Text>
      <TextInput
        style={styles.input}
        placeholder="ID do paciente"
        value={patient}
        onChangeText={setPatient}
      />

      <Text style={styles.label}>Conteúdo</Text>
      <TextInput
        style={styles.textarea}
        placeholder="Escreva aqui..."
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Pressable style={styles.button} onPress={handleCreate}>
        <Text style={styles.buttonText}>Criar</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    gap: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  input: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
  },
  textarea: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    minHeight: 140,
    textAlignVertical: "top",
  },
  button: {
    marginTop: 20,
    backgroundColor: colors.orangeLight,
    padding: 14,
    borderRadius: 10,
    alignItems: "center"
  },
  buttonText: {
    color: "#fff",
    fontSize: 16
  }
});
