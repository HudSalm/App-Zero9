import { Colors } from "@/src/components/colors";
import Button from "@/src/components/commons/button";
import Warning from "@/src/components/commons/modal";
import { supabase } from "@/src/lib/supabase";
import * as Linking from "expo-linking";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../../components/commons/input";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSessionValid, setIsSessionValid] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [warningTitle, setWarningTitle] = useState("");
  const [warningText, setWarningText] = useState("");

  useEffect(() => {
    const handleDeepLink = async () => {
      const url = await Linking.getInitialURL();

      if (!url) return;

      const extractToken = (param: string) => {
        const regex = new RegExp(`[?&#]${param}=([^&#]+)`);
        const match = url.match(regex);
        return match ? match[1] : null;
      };

      const accessToken = extractToken("access_token");
      const refreshToken = extractToken("refresh_token");

      if (accessToken && refreshToken) {
        console.log("Tokens encontrados! Forçando sessão...");

        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (!error) {
          console.log("Sessão definida com sucesso!");
          setIsSessionValid(true);
        } else {
          console.error("Erro ao definir sessão:", error);
          Alert.alert("Erro", "O link expirou.");
        }
      } else {
        const { data } = await supabase.auth.getSession();
        if (data.session) setIsSessionValid(true);
      }
    };

    handleDeepLink();
  }, []);

  const sendNewPassword = async () => {
    if (!isSessionValid) {
      setShowWarning(true);
      setWarningTitle("Sessão encerrada");
      setWarningText("Sessão inválida. Tente pedir um novo email");
      return;
    }

    if (!password || !passwordConfirm) {
      setShowWarning(true);
      setWarningTitle("Campo não preenchido");
      setWarningText("Por favor, preencha todos os campos");
      return;
    }

    if (password !== passwordConfirm) {
      setShowWarning(true);
      setWarningTitle("Senhas diferentes");
      setWarningText("As senhas digitadas nos campos não são idênticas");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) throw error;
      setShowWarning(true);
      setWarningTitle("Sucesso");
      setWarningText("Senha alterada com sucesso!");
      // Alert.alert("Sucesso", "Senha alterada com sucesso!", [
      //   { text: "OK", onPress: () => {} },
      // ]);
    } catch (err: any) {
      setShowWarning(true);
      setWarningTitle("Erro");
      setWarningText(
        "Ocorreu um erro desconhecido. Entre em contato com o suporte",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.containerTitle}>
          <Text style={styles.title}>Nova Senha</Text>
        </View>

        <View style={styles.containerInput}>
          <Input
            onChangeText={setPassword}
            value={password}
            placeholder="Nova Senha"
            secureTextEntry={true}
          />
          <Input
            onChangeText={setPasswordConfirm}
            value={passwordConfirm}
            placeholder="Confirme a Senha"
            secureTextEntry={true}
          />
        </View>

        <Button onPress={sendNewPassword} disabled={loading}>
          {loading ? "Salvando..." : "Mudar senha"}
        </Button>
      </View>
      <Warning visible={showWarning} onClose={() => setShowWarning(false)}>
        <Text style={styles.warningTitle}>{warningTitle}</Text>
        <Text>{warningText}</Text>
        <Button
          style={styles.warningButton}
          onPress={() => setShowWarning(false)}
        >
          <Text style={styles.warningButtonText}>Ok</Text>
        </Button>
      </Warning>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundPrimary,
  },
  content: {
    flex: 1,
    alignItems: "center",
    gap: 25,
    marginTop: 100,
  },
  containerTitle: {
    gap: 15,
    width: "80%",
  },
  title: {
    fontSize: 25,
    color: Colors.titleColor,
    fontWeight: "700",
  },
  containerInput: {
    width: "80%",
    marginBottom: 20,
    gap: 20,
  },
  warningTitle: {
    fontSize: 18,
    fontWeight: "500",
  },
  warningButton: {
    padding: 15,
    alignItems: "flex-end",
  },
  warningButtonText: {
    color: "#32613ffa",
  },
});

export default ChangePassword;
