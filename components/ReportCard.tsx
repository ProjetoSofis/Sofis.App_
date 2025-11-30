import colors from "@/constants/colors";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

export default function ReportCard({ item, onPress }) {
  return (
    <Pressable onPress={() => onPress?.(item)} style={styles.card}>
      <Text style={styles.title}>{item.assunto}</Text>
      <Text style={styles.subtitle}>{item.paciente}</Text>
      <Text style={styles.date}>{item.data}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    padding: 20,
    backgroundColor: colors.orangeDark,
    borderRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.beige
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: colors.beige
  },
  date: {
    marginTop: 8,
    fontSize: 12,
    opacity: 0.8,
    color: colors.beige
  },
});
