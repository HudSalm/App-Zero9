import { ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const loadingScreen = () => {
  return (
    <SafeAreaView style={styles.containerLoading}>
      <ActivityIndicator size="large" color="#00ff00" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerLoading: {
    flex: 1,
    justifyContent: "center",
  },
});

export default loadingScreen;
