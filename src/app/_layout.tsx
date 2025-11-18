import { useFonts } from "expo-font";
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, View } from "react-native";

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
    <View style={[styles.container]}>
      <Stack>
        <Stack.Screen 
          name="login" 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="(auth)/signup/page" 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="(tabs)" 
          options={{ headerShown: false }} />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});