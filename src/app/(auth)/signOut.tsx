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
          <Input
            style={styles.input}
            onChangeText={setName}
            value={name}
            placeholder="Nome"
          ></Input>
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
        </View>
        <Button style={styles.button}>
          <Text style={styles.textButton}>Cadastrar-se</Text>
        </Button>
        <Button
          style={styles.buttonRegister}
          onPress={() => router.push("/signIn")}
        >
          <Text style={styles.textRegister}>Já tem conta?</Text>
          <Text style={{ fontWeight: "700", color: "#BDBDBD" }}>
            Fazer login
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default SignOut;

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
