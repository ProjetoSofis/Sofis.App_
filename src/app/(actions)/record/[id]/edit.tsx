import colors from "@/constants/colors";
import api from "@/src/services/api";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";

export default function EditRecord() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);

  // Carregar dados existentes
  useEffect(() => {
    async function loadRecord() {
      try {
        const res = await fetch(`${api.baseUrl}/Children/${id}`);
        if (!res.ok) throw new Error("Erro ao carregar ficha");
        const data = await res.json();
        setRecord(data);
      } catch (err) {
        console.log(err);
        Alert.alert("Erro", "Não foi possível carregar a ficha");
      } finally {
        setLoading(false);
      }
    }

    loadRecord();
  }, [id]);

  if (loading) return <Text style={{ padding: 20 }}>Carregando...</Text>;
  if (!record) return <Text style={{ padding: 20 }}>Ficha não encontrada.</Text>;

  function updateField(key, value) {
    setRecord((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    try {
      const res = await fetch(`${api.baseUrl}/Children/atualizarCrianca/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dto: record }),
      });

      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.message || "Erro ao atualizar ficha");
      }

      Alert.alert("Sucesso", "Ficha atualizada com sucesso!");
      router.back();
    } catch (err) {
      Alert.alert("Erro", err.message);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <Text style={styles.title}>Editar Ficha</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={record.name}
        onChangeText={(t) => updateField("name", t)}
      />

      <Text style={styles.label}>CPF</Text>
      <TextInput
        style={styles.input}
        value={record.cpf}
        onChangeText={(t) => updateField("cpf", t)}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Data de nascimento</Text>
      <TextInput
        style={styles.input}
        value={record.birthDate}
        onChangeText={(t) => updateField("birthDate", t)}
        placeholder="YYYY-MM-DD"
      />

      <Text style={styles.label}>Responsável</Text>
      <TextInput
        style={styles.input}
        value={record.responsible}
        onChangeText={(t) => updateField("responsible", t)}
      />

      <Text style={styles.label}>Endereço</Text>
      <TextInput
        style={styles.input}
        value={record.endereco}
        onChangeText={(t) => updateField("endereco", t)}
      />

      <Text style={styles.label}>Escola</Text>
      <TextInput
        style={styles.input}
        value={record.unidadeEscolar}
        onChangeText={(t) => updateField("unidadeEscolar", t)}
      />

      <Text style={styles.label}>Ano escolar</Text>
      <TextInput
        style={styles.input}
        value={record.anoEscolar}
        onChangeText={(t) => updateField("anoEscolar", t)}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Nome da mãe</Text>
      <TextInput
        style={styles.input}
        value={record.momName}
        onChangeText={(t) => updateField("momName", t)}
      />

      <Text style={styles.label}>Nome do pai</Text>
      <TextInput
        style={styles.input}
        value={record.dadName}
        onChangeText={(t) => updateField("dadName", t)}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar alterações</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    gap: 16,
    paddingBottom: 40,
    backgroundColor: "#F8F8F8",
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
    marginTop: 8,
  },

  input: {
    padding: 14,
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    fontSize: 15,
    marginTop: 4,
  },

  button: {
    marginTop: 20,
    backgroundColor: colors.orangeLight,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: colors.beige,
    fontSize: 16,
    fontWeight: "600",
  },
});
