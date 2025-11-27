import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput } from "react-native";

export default function EditRecord() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [subject, setSubject] = useState("");
  const [patient, setPatient] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    // Buscar registro pelo ID
    const loadData = async () => {
      console.log("Carregar dados do registro:", id);

      // const response = await api.get(`/records/${id}`);
      // const data = response.data;

      // Exemplo mock:
      const data = {
        subject: "Exemplo assunto",
        patient: "Paciente XPTO",
        content: "Conteúdo do relatório..."
      };

      setSubject(data.subject);
      setPatient(data.patient);
      setContent(data.content);
    };

    loadData();
  }, [id]);

  const handleSave = () => {
    const payload = { subject, patient, content };

    console.log("Atualizar registro:", id, payload);
    // await api.put(`/records/${id}`, payload);

    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <Text>Editar Registro</Text>

      <Text style={styles.label}>Assunto</Text>
      <TextInput style={styles.input} value={subject} onChangeText={setSubject} />

      <Text style={styles.label}>Paciente</Text>
      <TextInput style={styles.input} value={patient} onChangeText={setPatient} />

      <Text style={styles.label}>Conteúdo</Text>
      <TextInput
        style={styles.textarea}
        multiline
        value={content}
        onChangeText={setContent}
      />

      <Pressable style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar</Text>
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
    backgroundColor: "#ff8a00",
    padding: 14,
    borderRadius: 10,
    alignItems: "center"
  },
  buttonText: {
    color: "#fff",
    fontSize: 16
  }
});
