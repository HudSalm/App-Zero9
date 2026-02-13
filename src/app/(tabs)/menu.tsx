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
import { router } from "expo-router";
import * as Sharing from "expo-sharing";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { StorageAccessFramework } = FileSystem;

const Menu = () => {
  const [name, setName] = useState("");
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showDownloadReport, setShowDownloadReport] = useState(false);
  const [warningTitle, setWarningTitle] = useState("");
  const [warningText, setWarningText] = useState("");
  const [showWarning, setShowWarning] = useState(false);

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        setShowWarning(true);
        setWarningTitle("Erro");
        setWarningText("Erro ao deslogar");
        return;
      }
      router.replace("/(auth)/signIn");
    } catch (err) {
      console.error("Erro inesperado no logout:", err);
      setShowWarning(true);
      setWarningTitle("Erro inesperado ao deslogar");
      setWarningText("Entre em contato com o suporte.");
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
        console.error("Erro inesperado ao buscar perfil", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user]);

  const saveFileAndroid = async (fileName: string, fileContent: string) => {
    try {
      const permissions =
        await StorageAccessFramework.requestDirectoryPermissionsAsync();

      if (permissions.granted) {
        const uri = await StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          fileName,
          "text/csv",
        );

        await FileSystem.writeAsStringAsync(uri, fileContent, {
          encoding: FileSystem.EncodingType.UTF8,
        });
        setShowWarning(true);
        setWarningTitle("Sucesso");
        setWarningText("Relatório salvo na pasta selecionada!");
      } else {
        setShowWarning(true);
        setWarningTitle("Cancelado");
        setWarningText("RPermissão de pasta negada.");
      }
    } catch (e) {
      console.error(e);
      setShowWarning(true);
      setWarningTitle("Erro inesperado");
      setWarningText("Não foi possível salvar o arquivo.");
    }
  };

  const exportToCSV = async (data: any, type: "fuel" | "ocurrences") => {
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
      headers.join(";"),
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
            ].join(";")
          : [
              item.created_at,
              item.date,
              item.name,
              item.enterprise,
              item.contract,
              item.reason,
              item.position,
              item.observation,
            ].join(";"),
      ),
    ].join("\n");

    try {
      setLoading(true);
      const fileName = `relatorio_${type}.csv`;

      if (Platform.OS === "android") {
        await saveFileAndroid(fileName, csvString);
      } else {
        const fileUri = `${FileSystem.cacheDirectory}${fileName}`;
        await FileSystem.writeAsStringAsync(fileUri, csvString, {
          encoding: FileSystem.EncodingType.UTF8,
        });
        await Sharing.shareAsync(fileUri);
      }
    } catch (err) {
      console.error(err);
      setShowWarning(true);
      setWarningTitle("Erro");
      setWarningText("Erro ao processar arquivo.");
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
      } else {
        setShowWarning(true);
        setWarningTitle("Erro");
        setWarningText("Erro ao buscar dados do banco.");
      }
    } catch (err) {
      console.error(err);
      setShowWarning(true);
      setWarningTitle("Erro");
      setWarningText("Erro ao se comunicar com o banco de dados.");
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
      <Warning visible={showWarning} onClose={() => setShowWarning(false)}>
        <Text style={styles.warningTitle}>{warningTitle}</Text>
        <Text>{warningText}</Text>
        <Button
          style={styles.warningButton}
          onPress={() => setShowWarning(false)}
        >
          <Text style={styles.warningButtonText}>Ok</Text>
        </Button>
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

export default Menu;
