import colors from "@/constants/colors";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput } from "react-native";

export default function CreateReport() {
  const router = useRouter();

  // Estados para enviar à API
  const [subject, setSubject] = useState("");
  const [patient, setPatient] = useState("");
  const [content, setContent] = useState("");

  const handleCreate = () => {
    const payload = { subject, patient, content };

    console.log("Criar relatório:", payload);
    // await api.post("/records", payload);

    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <Text style={styles.label}>Assunto</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o assunto"
        value={subject}
        onChangeText={setSubject}
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
        value={content}
        onChangeText={setContent}
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
