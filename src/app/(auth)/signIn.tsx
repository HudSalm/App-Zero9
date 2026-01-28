import Button from "@/src/components/commons/button";
import { router } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../../components/commons/input";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
          ></Input>
          <Input
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Senha"
            secureTextEntry={true}
          ></Input>
          <Button style={styles.buttonForgot}>
            <Text style={styles.text}>Esqueceu a senha?</Text>
          </Button>
        </View>
        <Button onPress={() => router.push("/menu")} style={styles.button}>
          <Text style={styles.textButton}>Entrar</Text>
        </Button>
        <Button
          style={styles.buttonRegister}
          onPress={() => router.push("/signOut")}
        >
          <Text style={styles.textRegister}>Não tem conta?</Text>
          <Text style={{ fontWeight: "700", color: "#BDBDBD" }}>
            Cadastre-se
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1A",
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
    color: "#FFF6FF",
    fontWeight: "700",
  },
  textParagraph: {
    color: "#BDBDBD",
    alignSelf: "flex-end",
    marginTop: -15,
  },

  containerInput: {
    width: "80%",
    gap: 25,
  },

  input: {
    padding: 15,
    backgroundColor: "#FFF6FF",
    borderRadius: 5,
  },

  buttonForgot: {
    alignSelf: "flex-end",
    marginTop: -15,
    padding: 10,
  },
  text: {
    color: "#BDBDBD",
    fontSize: 12,
  },

  button: {
    backgroundColor: "#4D4D4D",
    padding: 15,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
  },
  textButton: {
    color: "#FFF6FF",
    fontWeight: "700",
  },
  buttonRegister: {
    padding: 10,
    width: "30%",
  },
  textRegister: {
    color: "#BDBDBD",
    fontSize: 12,
    marginTop: -20,
    textAlign: "center",
  },
});
