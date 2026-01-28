import Button from "@/src/components/commons/button";
import Header from "@/src/components/layout/header";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Menu = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.title}>Olá, Hudson Salmistraro</Text>
        <Text style={styles.textParagraph}>
          Escolha a opção que você precisa
        </Text>
        <View style={styles.containerMenu}>
          <View style={styles.contentMenu}>
            <Button style={styles.buttonMenu}>
              <AntDesign name="container" size={32} color="#FFF6FF" />
              <Text style={styles.textMenu}>Relatório de Ocorrências</Text>
            </Button>
            <Button style={styles.buttonMenu}>
              <MaterialCommunityIcons name="fuel" size={32} color="#FFF6FF" />
              <Text style={styles.textMenu}>Relatório de Combustivel</Text>
            </Button>
          </View>
          <View style={styles.contentMenu}>
            <Button style={styles.buttonMenu}>
              <Ionicons name="person" size={32} color="#FFF6FF" />
              <Text style={styles.textMenu}>Perfil</Text>
            </Button>
            <Button style={styles.buttonMenu}>
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
  container: {
    backgroundColor: "#1A1A1A",
    flex: 1,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    gap: 40,
    marginBottom: 80,
  },
  title: {
    fontSize: 25,
    color: "#FFF6FF",
    fontWeight: "700",
  },
  textParagraph: {
    color: "#BDBDBD",
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
  },
  textMenu: {
    color: "#FFF6FF",
    fontSize: 12,
    textAlign: "center",
    fontWeight: "700",
  },
});

export default Menu;
