import { Colors } from "@/src/components/colors";
import Button from "@/src/components/commons/button";
import Warning from "@/src/components/commons/modal";
import Header from "@/src/components/layout/header";
import { useAuth } from "@/src/context/authContext";
import { supabase } from "@/src/lib/supabase";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as FileSystem from "expo-file-system/legacy";
import * as MediaLibrary from "expo-media-library";
import { router } from "expo-router";
import * as Sharing from "expo-sharing";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Menu = () => {
  const [name, setName] = useState("");
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showDownloadReport, setShowDownloadReport] = useState(false);

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

  const exportToCSV = async (data: any, type: "fuel" | "ocurrences") => {
    console.log(data);
    const headers =
      type === "fuel"
        ? [
            "Criado",
            "Data",
            "Valor",
            "Veiculo",
            "Tipo de Combustivel",
            "Km inicial",
            "Km final",
            "Km rodado",
            "Descricao",
          ]
        : [
            "Criado",
            "Data",
            "Nome",
            "Empresa",
            "Contrato",
            "Motivo",
            "Função",
            "Observacao",
          ];

    const csvString = [
      headers,
      ...data.map((item: any) =>
        type === "fuel"
          ? [
              item.created_at,
              item.date,
              item.value,
              item.vehicle,
              item.type_fuel,
              item.km_start,
              item.km_end,
              item.km_driven,
              item.description,
            ]
          : [
              item.created_at,
              item.date,
              item.name,
              item.enterprise,
              item.contract,
              item.reason,
              item.position,
              item.observation,
            ],
      ),
    ]
      .map((e) => e.join(";"))
      .join("\n");

    try {
      setLoading(true);
      const fileName = `relatorio_${type}.csv`;
      const fileUri = `${FileSystem.cacheDirectory}${fileName}`;

      await FileSystem.writeAsStringAsync(fileUri, csvString, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      if (Platform.OS === "android") {
        const { status } = await MediaLibrary.requestPermissionsAsync();

        if (status === "granted") {
          const asset = await MediaLibrary.createAssetAsync(fileUri);
          alert("Arquivo salvo com sucesso na pasta selecionada!");
        } else {
          await Sharing.shareAsync(fileUri);
        }
      } else {
        -(await Sharing.shareAsync(fileUri));
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao processar arquivo.");
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = async (table: "fuel" | "ocurrences") => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from(table).select("*");

      if (!error && data) {
        await exportToCSV(data, table);
        console.log(data);
      } else {
        alert("Erro ao buscar dados do banco.");
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao se comunicar com o banco de dados.");
    } finally {
      setLoading(false);
      setShowDownloadReport(false);
    }
  };

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
            <Button
              style={styles.buttonMenu}
              onPress={() => setShowDownloadReport(true)}
            >
              <AntDesign name="file-excel" size={32} color="#FFF6FF" />
              <Text style={styles.textMenu}>Gerar relatório</Text>
            </Button>
            <Button onPress={logout} style={styles.buttonMenu}>
              <MaterialIcons name="logout" size={32} color="#FFF6FF" />
              <Text style={styles.textMenu}>Sair</Text>
            </Button>
          </View>
        </View>
      </View>
      <Warning
        visible={showDownloadReport}
        onClose={() => setShowDownloadReport(false)}
      >
        <Text style={styles.modalTitle}>Exportar Relatórios</Text>
        <Text>Escolha qual relatório deseja baixar:</Text>
        <View style={styles.containerButton}>
          <Button
            style={styles.modalButton}
            onPress={() => downloadReport("fuel")}
          >
            <Text style={styles.modalText}>Combustível</Text>
          </Button>
          <Button
            style={styles.modalButton}
            onPress={() => downloadReport("ocurrences")}
          >
            <Text style={styles.modalText}>Ocorrências</Text>
          </Button>
        </View>
      </Warning>
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
  modalTitle: {
    fontSize: 18,
    fontWeight: "500",
  },
  containerButton: {
    flexDirection: "row",
    gap: 20,
    justifyContent: "flex-end",
  },
  modalButton: {
    padding: 5,
  },
  modalText: {
    color: "#235d32fa",
  },
});

export default Menu;
