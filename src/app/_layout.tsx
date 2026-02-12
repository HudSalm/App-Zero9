import * as Linking from "expo-linking";
import {
  Stack,
  usePathname,
  useRootNavigationState,
  useRouter,
  useSegments,
} from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { AuthProvider, useAuth } from "../context/authContext";
import { useHandlePasswordReset } from "../hooks/useWarmUpBrowser";

function RootLayoutNav() {
  const { session, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const navigationState = useRootNavigationState();
  const pathname = usePathname();

  useHandlePasswordReset();

  useEffect(() => {
    if (loading || !navigationState?.key) return;

    const inAuthGroup = segments[0] === "(auth)";
    const isChangingPassword = pathname && pathname.includes("changePassword");

    if (isChangingPassword) {
      return;
    }
    if (!session && !inAuthGroup) {
      router.replace("/(auth)/signIn");
    } else if (session && (inAuthGroup || pathname === "/")) {
      router.replace("/(tabs)/menu");
    }
  }, [session, loading, segments, navigationState?.key, pathname]);

  if (loading || !navigationState?.key) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
