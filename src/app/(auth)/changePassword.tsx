import { Colors } from "@/src/components/colors";
import Button from "@/src/components/commons/button";
import { supabase } from "@/src/lib/supabase";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../../components/commons/input";

const changePassword = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const sendNewPassword = async () => {
    if (!password || passwordConfirm) {
      alert("Preencha todos os campos");
    }
    if (password !== passwordConfirm) {
      alert("Digite a mesma senha nos dois campos");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.updateUser({
        password: password,
      });
      if (data) {
        alert("Senha alterada com sucesso");
      }
      if (error) {
        alert("Ocorreu um erro ao alterar a senha.");
      }
    } catch (err) {
      console.error("Erro inesperado:", err);
      alert("Ocorreu um erro inesperado ao tentar entrar.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.containerTitle}>
          <Text style={styles.title}>Entre com a nova senha:</Text>
        </View>

        <View style={styles.containerInput}>
          <Input
            onChangeText={setPassword}
            value={password}
            placeholder="Senha"
            secureTextEntry={true}
          ></Input>
          <Input
            onChangeText={setPasswordConfirm}
            value={passwordConfirm}
            placeholder="Confirme a Senha"
            secureTextEntry={true}
          ></Input>
        </View>
        <Button onPress={sendNewPassword} disabled={loading}>
          {loading ? "Carregando..." : "Mudar senha"}
        </Button>
      </View>
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
});

export default changePassword;
