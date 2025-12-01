import colors from "@/constants/colors";
import api from "@/src/services/api";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ViewRecord() {
  const router = useRouter();
  const { id, name } = useLocalSearchParams();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    async function loadRecord() {
      try {
        const res = await fetch(`${api.baseUrl}/Children/${id}`);
        if (!res.ok) throw new Error("Erro ao carregar ficha");
        const data = await res.json();
        setRecord(data);
        console.log(data)
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    loadRecord();
    navigation.setOptions({
      title: `Relatório ${name}`,
      headerTitleAlign: "center",
    });
  }, [id, name]);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  if (!record) return <Text style={{ padding: 20 }}>Ficha não encontrada.</Text>;

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

        {/* Botão de Editar */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.orangeDark }]}
          onPress={() => router.push(`/edit?id=${id}`)}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>

        {/* Botão de Voltar */}
        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Voltar</Text>
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
    marginTop: 12,
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
