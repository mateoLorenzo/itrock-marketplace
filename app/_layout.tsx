import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { QueryProvider } from "@/contexts/QueryProvider";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Platform } from "react-native";

SplashScreen.preventAutoHideAsync();

function NavigationContent() {
  const { state } = useAuth();

  if (state.isLoading) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!state.isAuthenticated}>
        <Stack.Screen
          name="auth"
          options={{
            animation: Platform.OS === "ios" ? "ios_from_left" : "fade",
            animationDuration: 400,
          }}
        />
      </Stack.Protected>

      <Stack.Protected guard={state.isAuthenticated}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "OpenSauceOne-Regular": require("../assets/fonts/OpenSauceOne-Regular.ttf"),
    "OpenSauceOne-Medium": require("../assets/fonts/OpenSauceOne-Medium.ttf"),
    "OpenSauceOne-SemiBold": require("../assets/fonts/OpenSauceOne-SemiBold.ttf"),
    "OpenSauceOne-Bold": require("../assets/fonts/OpenSauceOne-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryProvider>
      <AuthProvider>
        <NavigationContent />
      </AuthProvider>
    </QueryProvider>
  );
}
