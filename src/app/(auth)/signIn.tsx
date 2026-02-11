import { Colors } from "@/src/components/colors";
import Button from "@/src/components/commons/button";
import Warning from "@/src/components/commons/modal";
import { supabase } from "@/src/lib/supabase";
import { router } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../../components/commons/input";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [isNull, setIsNull] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      setShowWarning(true);
      setIsNull(true);
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        setShowWarning(true);
        return;
      }
    } catch (err) {
      console.error("Erro inesperado:", err);
      alert("Ocorreu um erro inesperado ao tentar entrar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image source={require("../../assets/zero9-icon.png")} />

        <View style={styles.containerTitle}>
          <Text style={styles.title}>Bem-Vindo</Text>
          <Text style={styles.textParagraph}>
            Faça seu login para acessar sua conta.
          </Text>
        </View>

        <View style={styles.containerInput}>
          <Input
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
          ></Input>
          <Input
            onChangeText={setPassword}
            value={password}
            placeholder="Senha"
            secureTextEntry={true}
            autoCapitalize="none"
          ></Input>
          <Button
            onPress={() => router.push("/(auth)/forgotPassword")}
            style={styles.buttonForgot}
          >
            <Text style={styles.textForgot}>Esqueceu a senha?</Text>
          </Button>
        </View>
        <Button onPress={handleSignIn} disabled={loading}>
          {loading ? "Carregando..." : "Entrar"}
        </Button>
        <Button
          style={styles.buttonRegister}
          onPress={() => router.push("/(auth)/signUp")}
        >
          <Text style={styles.textRegister}>Não tem conta?</Text>
          <Text style={{ fontWeight: "700", color: "#BDBDBD" }}>
            Cadastre-se
          </Text>
        </Button>
      </View>
      {isNull ? (
        <Warning visible={showWarning} onClose={() => setShowWarning(false)}>
          <Text style={styles.warningTitle}>Atenção</Text>
          <Text>É obrigatório preencher todos os campos</Text>
          <Button
            style={styles.warningButton}
            onPress={() => setShowWarning(false)}
          >
            <Text style={styles.warningButtonText}>Ok</Text>
          </Button>
        </Warning>
      ) : (
        <Warning visible={showWarning} onClose={() => setShowWarning(false)}>
          <Text style={styles.warningTitle}>Login não autorizado</Text>
          <Text>O email ou a senha estão incorretos.</Text>
          <Button
            style={styles.warningButton}
            onPress={() => setShowWarning(false)}
          >
            <Text style={styles.warningButtonText}>Ok</Text>
          </Button>
        </Warning>
      )}
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
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
  },

  containerTitle: {
    alignItems: "center",
    gap: 15,
  },

  title: {
    fontSize: 25,
    color: Colors.titleColor,
    fontWeight: "700",
  },
  textParagraph: {
    color: Colors.paragraphColor,
    alignSelf: "flex-end",
    marginTop: -15,
  },

  containerInput: {
    width: "80%",
    gap: 25,
  },
  buttonForgot: {
    alignSelf: "flex-end",
    marginTop: -15,
    padding: 10,
  },
  textForgot: {
    color: Colors.buttonLinkColor,
    fontSize: 12,
  },
  buttonRegister: {
    padding: 10,
  },
  textRegister: {
    color: Colors.buttonLinkColor,
    fontSize: 12,
    marginTop: -20,
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

export default SignIn;
