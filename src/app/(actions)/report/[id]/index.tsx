import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";

export default function ViewRecord() {
  const { id } = useLocalSearchParams();

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      console.log("Carregar registro:", id);

      // const response = await api.get(`/records/${id}`);
      // setData(response.data);

      setData({
        subject: "Consulta psicológica",
        patient: "Maria Silva",
        content:
          "O paciente apresentou melhora no humor. Relatou ter dormido melhor nas últimas noites..."
      });
    };

    load();
  }, [id]);

  if (!data) return <Text>Carregando...</Text>;

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <Text style={styles.title}>{data.subject}</Text>

      <Text style={styles.fieldTitle}>Paciente</Text>
      <Text style={styles.text}>{data.patient}</Text>

      <Text style={styles.fieldTitle}>Conteúdo</Text>
      <Text style={styles.text}>{data.content}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    gap: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
  },
  fieldTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 10
  },
  text: {
    fontSize: 15,
    lineHeight: 22,
  }
});
