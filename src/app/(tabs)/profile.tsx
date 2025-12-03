import colors from "@/constants/colors";
import { useAuth } from "@/src/context/AuthContext";
import api from "@/src/services/api";
import axios from "axios";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
  const { user, logout } = useAuth();
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingLogout, setLoadingLogout] = useState(false);
  const API_URL = api.defaults.baseURL;

  if (!user) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const deleteAccount = () => {
    Alert.alert(
      "Confirmar exclusão",
      "Tem certeza que deseja deletar sua conta? Esta ação não pode ser desfeita.",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Deletar", style: "destructive", onPress: handleDelete }
      ]
    );
  };
  const Logout = () => {
    Alert.alert(
      "Você deseja sair dessa conta?",
      "Tem certeza?",
      [
        { text: "Cancelar", style: "cancel"},
        {text: "Sair", style: "destructive", onPress: handleLogout}
      ]
    );
  };

  const handleLogout = async () => {
    try{
      setLoadingLogout(true);
      const id = user.id;
      await logout();
      router.replace('../login');
    } catch (error){
      console.error("Erro ao fazer logout:", error);
      Alert.alert("Erro", "Não foi possível sair da conta. Tente novamente.");
    }
    finally{
      setLoadingLogout(false)
    }

  }
  const handleDelete = async () => {
    try {
      setLoadingDelete(true);

      const id = user.id;

      console.log("🗑 Deletando usuário ID:", id);

      const response = await axios.delete(
        `${API_URL}/Employee/deletar/${id}`
      );

      console.log("🔥 RESPONSE DELETE:", response.data);

      if (response.status === 200) {
        Alert.alert("Conta deletada", "Sua conta foi removida com sucesso!");
        router.push('login')
      } else {
        Alert.alert("Erro", "Não foi possível deletar sua conta.");
      }

    } catch (error) {
      console.log("❌ ERRO AO DELETAR:", error);
      Alert.alert("Erro", "Ocorreu um erro ao deletar sua conta.");
    } finally {
      setLoadingDelete(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Perfil</Text>

        <Text style={styles.label}>Nome</Text>
        <Text style={styles.value}>{user.name}</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user.email}</Text>

        <Text style={styles.label}>Cargo</Text>
        <Text style={styles.value}>{user.role}</Text>

        {/* BOTÃO DE DELETAR */}
        <TouchableOpacity
          style={styles.deletarButton}
          onPress={deleteAccount}
          disabled={loadingDelete}
        >
          <Text style={styles.logoutText}>
            {loadingDelete ? "Deletando..." : "Deletar conta"}
          </Text>
        </TouchableOpacity>

        {/* BOTÃO DE SAIR */}
        <TouchableOpacity style={styles.logoutButton} onPress={logout} disabled={loadingLogout}>
          <Text style={styles.logoutText}>{loadingLogout ? "Saindo..." : "Sair da conta"}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}



const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 120 },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 14,
    gap: 14,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: "#555",
    fontWeight: "600",
  },
  value: {
    fontSize: 16,
    marginTop: 2,
    marginBottom: 10,
  },
  deletarButton: {
    backgroundColor: colors.red,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
  },
  logoutButton: {
    backgroundColor: colors.orangeDark,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  center: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
  },
});
