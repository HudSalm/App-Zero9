import { Colors } from "@/src/components/colors";
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
          ></Input>
          <Button style={styles.buttonForgot}>
            <Text style={styles.textForgot}>Esqueceu a senha?</Text>
          </Button>
        </View>
        <Button onPress={() => router.push("/(loggin)/menu")}>Entrar</Button>
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
    borderWidth: 1,
  },
  textRegister: {
    color: Colors.buttonLinkColor,
    fontSize: 12,
    marginTop: -20,
  },
});
