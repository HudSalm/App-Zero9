import { Colors } from "@/src/components/colors";
import Button from "@/src/components/commons/button";
import Warning from "@/src/components/commons/modal";
import { supabase } from "@/src/lib/supabase";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../../components/commons/input";

const forgotPassoword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [isNull, setIsNull] = useState(false);

  const sendEmail = async () => {
    if (!email) {
      setShowWarning(true);
      setIsNull(true);
      return;
    }
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "zero9-app://changePassword",
      });

      if (error) {
        setShowWarning(true);
        setIsNull(true);
        return;
      } else {
        setShowWarning(true);
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
        <View style={styles.containerTitle}>
          <Text style={styles.title}>Entre com seu email:</Text>
          <Text style={styles.textParagraph}>
            Enviaremos um link de restauração para o seu email.
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
        </View>
        <Button onPress={sendEmail} disabled={loading}>
          {loading ? "Carregando..." : "Enviar"}
        </Button>
      </View>
      {isNull ? (
        <Warning visible={showWarning} onClose={() => setShowWarning(false)}>
          <Text style={styles.warningTitle}>Atenção</Text>
          <Text>
            É necessário que você digite um email válido. Ex: user@email.com
          </Text>
          <Button
            style={styles.warningButton}
            onPress={() => setShowWarning(false)}
          >
            <Text style={styles.warningButtonText}>Ok</Text>
          </Button>
        </Warning>
      ) : (
        <Warning visible={showWarning} onClose={() => setShowWarning(false)}>
          <Text style={styles.warningTitle}>Email enviado</Text>
          <Text>
            Caso o email seja válido, você receberá um email de recuperação de
            senha{" "}
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

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundPrimary,
  },

  content: {
    flex: 1,
    alignItems: "center",
    gap: 20,
    marginTop: 100,
  },

  containerTitle: {
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
    marginBottom: 20,
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

export default forgotPassoword;
