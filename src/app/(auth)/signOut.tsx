import { Colors } from "@/src/components/colors";
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
          ></Input>
        </View>
        <Button>Cadastrar-se</Button>
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
});
