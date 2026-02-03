import * as Linking from "expo-linking";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export function useHandlePasswordReset() {
  const router = useRouter();

  useEffect(() => {
    const subscription = Linking.addEventListener("url", (event) => {
      handleUrl(event.url);
    });

    Linking.getInitialURL().then((url) => {
      if (url) handleUrl(url);
    });

    const handleUrl = async (url: string) => {
      const parsed = Linking.parse(url);

      if (parsed.path === "changePassword") {
        router.replace("/(auth)/changePassword");
      }
    };

    return () => subscription.remove();
  }, []);
}
