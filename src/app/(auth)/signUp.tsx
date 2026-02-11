import { Colors } from "@/src/components/colors";
import Warning from "@/src/components/commons/modal";
import { supabase } from "@/src/lib/supabase";
import { router } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/commons/button";
import Input from "../../components/commons/input";

const SignOut = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [isNull, setIsNull] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password || !name) {
      setShowWarning(true);
      setIsNull(true);
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (error) {
        setShowWarning(true);
        return;
      }
    } catch (err) {
      console.error("Erro inesperado:", err);
      alert("Ocorreu um erro inesperado ao tentar se Cadastrar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image source={require("../../assets/zero9-icon.png")} />

        <View style={styles.containerTitle}>
          <Text style={styles.title}>Crie a sua conta</Text>
          <Text style={styles.textParagraph}>
            Entre com seus dados para acessar.
          </Text>
        </View>

        <View style={styles.containerInput}>
          <Input onChangeText={setName} value={name} placeholder="Nome"></Input>
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
        </View>
        <Button onPress={handleSignUp} disabled={loading}>
          {loading ? "Carregando..." : "Cadastrar-se"}
        </Button>
        <Button
          style={styles.buttonLogin}
          onPress={() => router.push("/signIn")}
        >
          <Text style={styles.textLogin}>Já tem conta?</Text>
          <Text style={{ fontWeight: "700", color: "#BDBDBD" }}>
            Fazer login
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
          <Text style={styles.warningTitle}>Formatação inválida</Text>
          <Text>
            A formatação do email digitado não é válida. Use o modelo
            user@email.com.
          </Text>
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

export default SignOut;

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
    marginTop: -15,
  },

  containerInput: {
    width: "80%",
    gap: 25,
  },

  buttonLogin: {
    padding: 10,
  },
  textLogin: {
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
