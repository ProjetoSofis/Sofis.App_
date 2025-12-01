import { useFonts } from "expo-font";
import { SplashScreen, Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, View } from "react-native";
import { AuthProvider } from "../context/AuthContext";
import { RecordProvider } from "../context/RecordContext";

export default function MainLayout() {
  const [fontsLoaded] = useFonts({
    Nunito: require("../../assets/fonts/Nunito.ttf"),
    Baloo: require("../../assets/fonts/Baloo2.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <AuthProvider>
      <RecordProvider>
        <View style={[styles.container]}>
          <Stack>
            <Stack.Screen
              name="index"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="login"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(auth)/signup/page"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="(actions)/report/create"
              options={{
                title: 'Novo Relatório',
                headerTitleAlign: 'center'
              }}
            />
            <Stack.Screen
              name="(actions)/report/[id]/index"
              options={{
                headerTitleAlign: 'center'
              }}
            />
            <Stack.Screen
              name="(actions)/report/[id]/edit"
              options={{
                title: 'Editar Relatório',
                headerTitleAlign: 'center'
              }}
            />
            <Stack.Screen
              name="(actions)/record/create"
              options={{
                title: 'Nova Ficha',
                headerTitleAlign: 'center'
              }}
            />
            <Stack.Screen
              name="(tabs)"
              options={{ headerShown: false }} />
          </Stack>
        </View>
      </RecordProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});