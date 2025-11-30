import colors from "@/constants/colors";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface RecordCardProps {
  id: number;
  name: string;                 
  responsible: string;          
  category: string;             
  createdAt: string;            
  onPress?: () => void;
}

export default function RecordCard({
  name,
  responsible,
  category,
  createdAt,
  onPress
}: RecordCardProps) {

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <Text style={styles.title}>{name}</Text>

      <Text style={styles.subtitle}>
        Responsável: <Text style={styles.bold}>{responsible}</Text>
      </Text>

      <Text style={styles.subtitle}>
        Demanda: <Text style={styles.bold}>{category}</Text>
      </Text>

      <Text style={styles.date}>{createdAt}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    padding: 20,
    backgroundColor: colors.green,
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
  bold: {
    fontWeight: "600",
    color: colors.beige
  },
  date: {
    marginTop: 8,
    fontSize: 12,
    opacity: 0.8,
    color: colors.beige
  },
});