import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function GlobalList({ data = [], renderItem }) {

  if (!data.length) {
    return (
      <View style={styles.container}>
        <Text>Nada encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.containerList}>
      {data.map((item) => (
        <View key={item.id}>
          {renderItem(item)}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerList: {
    gap: 18,
    padding: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
