import colors from "@/constants/colors";
import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.hello}>Olá,</Text>
        <Text style={styles.name}>{user?.name ?? "Usuário"}</Text>
      </View>

      {/* CARDS */}
      <View style={styles.cardContainer}>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("../(actions)/record/create")}
        >
          <Text style={[styles.cardTitle, { color: "#fff" }]}>Criar ficha</Text>
          <Text style={[styles.cardDesc, { color: "#eee" }]}>Registre uma nova criança</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.card, { backgroundColor: colors.orangeDark }]}
          onPress={() => router.push("../(actions)/report/create")}
        >
          <Text style={[styles.cardTitle, { color: "#fff" }]}>Criar relatório</Text>
          <Text style={[styles.cardDesc, { color: "#eee" }]}>Registre um novo relatório</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { backgroundColor: colors.orangeDark }]}
          onPress={() => router.push("/reports")}
        >
          <Text style={[styles.cardTitle, { color: "#fff" }]}>Ver Fichas</Text>
          <Text style={[styles.cardDesc, { color: "#eee" }]}>
            Lista completa das crianças
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.card, { backgroundColor: colors.orangeDark }]}
          onPress={() => router.push("/reports")}
        >
          <Text style={[styles.cardTitle, { color: "#fff" }]}>Ver relatórios</Text>
          <Text style={[styles.cardDesc, { color: "#eee" }]}>
            Lista completa das sessões
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { backgroundColor: colors.red }]}
          onPress={() => router.push("/profile")}
        >
          <Text style={[styles.cardTitle, { color: "#fff" }]}>Meu perfil</Text>
          <Text style={[styles.cardDesc, { color: "#eee" }]}>
            Informações da sua conta
          </Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    paddingBottom: 120,
  },

  header: {
    marginBottom: 30,
  },

  hello: {
    fontFamily: 'Baloo',
    fontSize: 24,
    fontWeight: 'bold',
    color: "#444",
  },

  name: {
    fontFamily: 'Baloo',
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.orangeDark,
  },

  cardContainer: {
    gap: 16,
  },

  card: {
    backgroundColor: colors.orangeLight,
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
  },

  cardDesc: {
    marginTop: 4,
    fontSize: 14,
    color: "#555",
  },
});
