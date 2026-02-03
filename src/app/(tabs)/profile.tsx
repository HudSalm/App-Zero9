import { Colors } from "@/src/components/colors";
import Button from "@/src/components/commons/button";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Perfil</Text>
        <View style={styles.infoInput}>
          <View style={styles.containerInfo}>
            <Text style={styles.textLabel}>Nome</Text>
            <Button style={styles.buttonInfo}>
              <Text style={styles.buttonText}>Hudson Salmistraro</Text>
            </Button>
          </View>
          <View style={styles.containerInfo}>
            <Text style={styles.textLabel}>Email</Text>
            <Button style={styles.buttonInfo}>
              <Text style={styles.buttonText}>hudson.salm2001@outlook.com</Text>
            </Button>
          </View>
        </View>

        <Button style={styles.buttonPassword}>
          <Text style={styles.textButton}>Mudar senha</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundPrimary,
    justifyContent: "flex-start",
  },
  content: {
    gap: 40,
    padding: 60,
    alignItems: "flex-start",
    marginTop: 40,
    flex: 1,
  },
  title: {
    color: Colors.titleColor,
    fontSize: 25,
    fontWeight: "700",
  },
  infoInput: {
    gap: 25,
    width: "100%",
  },
  containerInfo: {
    gap: 10,
  },
  textLabel: {
    color: Colors.titleColor,
    fontWeight: "600",
  },
  buttonInfo: {
    padding: 20,
    backgroundColor: Colors.backgroundSecundary,
    borderRadius: 5,
  },
  buttonText: { color: Colors.buttonLinkColor },
  buttonPassword: {
    alignSelf: "center",
    backgroundColor: "#4D4D4D",
    padding: 15,
    borderRadius: 5,
    width: "100%",
  },
  textButton: {
    color: "#FFF6FF",
    fontWeight: "700",
    textAlign: "center",
  },
});

export default Profile;
