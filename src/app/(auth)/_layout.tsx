import { Colors } from "@/src/components/colors";
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="signIn" options={{ title: "Entrar" }} />
      <Stack.Screen name="signUp" options={{ title: "Criar Conta" }} />
      <Stack.Screen
        name="forgotPassword"
        options={{
          headerShown: true,
          title: "Recuperar Senha",
          headerBackTitle: "Voltar",
          headerTintColor: "#FFF6FF",
          headerStyle: { backgroundColor: Colors.backgroundSecundary },
        }}
      />
    </Stack>
  );
}
