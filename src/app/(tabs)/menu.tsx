import { Colors } from "@/src/components/colors";
import Button from "@/src/components/commons/button";
import Header from "@/src/components/layout/header";
import { useAuth } from "@/src/context/authContext";
import { supabase } from "@/src/lib/supabase";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Menu = () => {
  const [name, setName] = useState("");
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        alert("Erro ao deslogar: " + error.message);
        return;
      }
      router.replace("/(auth)/signIn");
    } catch (err) {
      console.error("Erro inesperado no logout:", err);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);

      try {
        if (user) {
          const { data, error } = await supabase
            .from("profiles")
            .select("full_name")
            .eq("id", user.id)
            .single();

          if (error) {
            console.log("Erro ao buscar perfil:", error.message);
            return;
          } else {
            setName(data.full_name);
          }
        }
      } catch (err) {
        console.error("Erro inesperado no logout:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user]);

  if (loading) {
    return (
      <SafeAreaView style={styles.containerLoading}>
        <ActivityIndicator size="large" color="#00ff00" />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.title}>Olá, {name}</Text>
        <Text style={styles.textParagraph}>
          Escolha a opção que você precisa
        </Text>
        <View style={styles.containerMenu}>
          <View style={styles.contentMenu}>
            <Button
              style={styles.buttonMenu}
              onPress={() => router.push("/ocurrence")}
            >
              <AntDesign name="container" size={32} color="#FFF6FF" />
              <Text style={styles.textMenu}>Relatório de Ocorrências</Text>
            </Button>
            <Button
              onPress={() => router.push("/fuel")}
              style={styles.buttonMenu}
            >
              <MaterialCommunityIcons name="fuel" size={32} color="#FFF6FF" />
              <Text style={styles.textMenu}>Relatório de Combustivel</Text>
            </Button>
          </View>
          <View style={styles.contentMenu}>
            {/* <Button
              style={styles.buttonMenu}
              onPress={() => router.push("/(tabs)/profile")}
            >
              <Ionicons name="person" size={32} color="#FFF6FF" />
              <Text style={styles.textMenu}>Perfil</Text>
            </Button> */}
            <Button onPress={logout} style={styles.buttonMenu}>
              <MaterialIcons name="logout" size={32} color="#FFF6FF" />
              <Text style={styles.textMenu}>Sair</Text>
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerLoading: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
  },
  content: {
    backgroundColor: Colors.backgroundPrimary,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    gap: 40,
  },
  title: {
    fontSize: 25,
    color: Colors.titleColor,
    fontWeight: "700",
  },
  textParagraph: {
    color: Colors.paragraphColor,
    marginTop: -30,
  },
  containerMenu: {
    gap: 30,
    flexDirection: "row",
  },
  contentMenu: {
    gap: 30,
  },
  buttonMenu: {
    width: 150,
    height: 150,
    padding: 10,
    backgroundColor: "#4D4D4D",
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "#FFF6FF",
    borderWidth: 0.8,
  },
  textMenu: {
    color: Colors.inputColor,
    fontSize: 12,
    textAlign: "center",
    fontWeight: "700",
  },
});

export default Menu;
