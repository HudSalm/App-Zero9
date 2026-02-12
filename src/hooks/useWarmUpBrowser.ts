import * as Linking from "expo-linking";
import { usePathname, useRouter } from "expo-router";
import { useEffect, useRef } from "react";

export function useHandlePasswordReset() {
  const router = useRouter();
  const pathname = usePathname();
  const hasHandledInitialUrl = useRef(false);

  useEffect(() => {
    const handleDeepLink = (url: string | null) => {
      if (!url) return;

      if (pathname.includes("changePassword")) {
        console.log("Já estamos na tela de senha. Cancelando redirecionamento.");
        return;
      }

      if (url.includes("type=recovery") || url.includes("changePassword")) {
        console.log("Link de recuperação detectado! Navegando...");
        router.replace("/(auth)/changePassword");
      }
    };

    if (!hasHandledInitialUrl.current) {
      Linking.getInitialURL().then((url) => {
        if (url) {
            handleDeepLink(url);
            hasHandledInitialUrl.current = true; 
        }
      });
    }

    const subscription = Linking.addEventListener("url", (event) => {
      handleDeepLink(event.url);
    });

    return () => {
      subscription.remove();
    };
  }, [pathname]);
}