import { Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../colors";

const Header = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.img}
        source={require("../../assets/zero9-icon.png")}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    height: 80,
    borderBottomWidth: 1,
    borderColor: Colors.inputColor,
    paddingTop: -18,
  },

  img: {
    width: 200,
    height: 40,
  },
});

export default Header;
