import colors from "@/constants/colors";
import api from "@/src/services/api";
import axios from "axios";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ViewRecord() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const API_URL = api.defaults.baseURL;

  useEffect(() => {
    async function loadRecord() {
      try {
        const response = await axios.get(`${API_URL}/Children/${id}`);
        setRecord(response.data);
        console.log(response.data);
      } catch (err) {
        console.log("Erro ao carregar ficha:", err);
      } finally {
        setLoading(false);
      }
    }

    loadRecord();

    navigation.setOptions({
      title: `Visualizar ficha`,
      headerTitleAlign: "center",
    });
  }, [id]);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  if (!record) return <Text style={{ padding: 20 }}>Ficha não encontrada.</Text>;

  async function deleteRecord() {
    try {
      const response = await axios.delete(`${API_URL}/Children/deletarcrianca/${id}`);
      setRecord(response.data);
      router.back()
    } catch (err) {
      console.log("Erro ao deletar ficha:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <View style={styles.card}>
        <Text style={styles.title}>{record.name}</Text>

        <View style={styles.section}>
          <Text style={styles.fieldLabel}>CPF</Text>
          <Text style={styles.fieldValue}>{record.cpf}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.fieldLabel}>Data de nascimento</Text>
          <Text style={styles.fieldValue}>{record.birthDate}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.fieldLabel}>Responsável</Text>
          <Text style={styles.fieldValue}>{record.responsible}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.fieldLabel}>Endereço</Text>
          <Text style={styles.fieldValue}>{record.endereco}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.fieldLabel}>Escola</Text>
          <Text style={styles.fieldValue}>{record.unidadeEscolar}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.fieldLabel}>Ano escolar</Text>
          <Text style={styles.fieldValue}>{record.anoEscolar}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.fieldLabel}>Nome da mãe</Text>
          <Text style={styles.fieldValue}>{record.momName}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.fieldLabel}>Nome do pai</Text>
          <Text style={styles.fieldValue}>{record.dadName}</Text>
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.green }]}
          onPress={() => router.push(`/edit`)}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.red }]}
          onPress={deleteRecord}
        >
          <Text style={styles.buttonText}>Deletar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.yellow }]} onPress={() => router.push(`/(actions)/${record.id}/create`)}>
          <Text style={styles.buttonText}>Adicionar Relatório</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    gap: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
  },

  section: {
    marginTop: 10,
  },

  fieldLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
  },

  fieldValue: {
    fontSize: 16,
    marginTop: 3,
  },

  button: {
    marginTop: 4,
    backgroundColor: colors.orangeLight,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: colors.beige,
    fontSize: 16,
    fontWeight: "600",
  },
});
