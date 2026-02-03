import { Colors } from "@/src/components/colors";
import Button from "@/src/components/commons/button";
import Input from "@/src/components/commons/input";
import InputDate from "@/src/components/commons/inputDate";
import Warning from "@/src/components/commons/modal";
import Dropdown from "@/src/components/commons/selectList";
import Header from "@/src/components/layout/header";
import { supabase } from "@/src/lib/supabase";
import { dropwdownProps } from "@/src/types/auth";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Fuel = () => {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [value, setValue] = useState("");
  const [observation, setObservation] = useState("");
  const [selectedEnterprise, setSelectedEnterprise] = useState("");
  const [selectedContract, setSelectedContract] = useState("");
  const [loading, setLoading] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [isNull, setIsNull] = useState(false);

  const sendOcurrence = async () => {
    if (
      !date ||
      !value ||
      !observation ||
      !selectedEnterprise ||
      !selectedContract
    ) {
      setShowWarning(true);
      setIsNull(true);
      return;
    }
    setLoading(true);

    try {
      const { data, error } = await supabase.from("ocurrences").insert({
        date: date.split("/").reverse().join("-"),
        name: name,
        observation: observation,
        enterprise: selectedEnterprise,
        contract: selectedContract,
      });

      if (!error) {
        alert("Sua ocorrência foi registrada com sucesso");
      }

      if (error) {
        console.error("Erro inesperado:", error);
        alert("Erro ao registrar as ocorrências, tente novamente");
      }
    } catch (err) {
      console.error("Erro inesperado:", err);
      alert("Ocorreu um erro inesperado ao registrar as ocorrências");
    } finally {
      setLoading(false);
    }
  };

  const vehicle: dropwdownProps[] = [
    { key: 1, value: "FIESTA" },
    { key: 2, value: "ÓNIX" },
    { key: 3, value: "CLASSIC PRATA" },
    { key: 4, value: "RENEGADE" },
    { key: 5, value: "CLASSIC PRETO" },
  ];

  const type_fuel: dropwdownProps[] = [
    { key: 1, value: "GNV" },
    { key: 2, value: "GNV/ETANOL" },
    { key: 3, value: "GASOLINA" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Relatório de Combustível</Text>
        <View style={styles.containerInput}>
          <InputDate
            value={date}
            onChange={setDate}
            placeholder="Data do Ocorrido"
          />
          <Input
            value={value}
            onChangeText={setValue}
            placeholder="Valor colocado"
          />
          <Dropdown
            setSelected={(val: string) => setSelectedEnterprise(val)}
            data={vehicle}
            placeholder="Veículo"
          />
          <Dropdown
            setSelected={(val: string) => setSelectedContract(val)}
            data={type_fuel}
            placeholder="Tipo de Combustível"
          />
          <Input
            style={styles.inputObservation}
            value={observation}
            onChangeText={setObservation}
            placeholder="Observações"
            multiline={true}
          />
        </View>
        <Button onPress={sendOcurrence} disabled={loading}>
          {loading ? "Carregando..." : "Enviar"}
        </Button>
      </ScrollView>
      {isNull ? (
        <Warning visible={showWarning} onClose={() => setShowWarning(false)}>
          <Text style={styles.warningTitle}>Atenção</Text>
          <Text>É obrigatório preencher todos os campos</Text>
          <Button
            style={styles.warningButton}
            onPress={() => setShowWarning(false)}
          >
            <Text style={styles.warningButtonText}>Ok</Text>
          </Button>
        </Warning>
      ) : (
        <Warning visible={showWarning} onClose={() => setShowWarning(false)}>
          <Text style={styles.warningTitle}>Sucesso</Text>
          <Text>Sua ocorrência foi registrada com sucesso</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    backgroundColor: Colors.backgroundPrimary,
    gap: 40,
    padding: 60,
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    color: Colors.titleColor,
    fontWeight: "700",
    alignSelf: "flex-start",
    width: 300,
  },
  containerInput: {
    width: "100%",
    gap: 30,
  },
  inputObservation: {
    backgroundColor: "#FFF6FF",
    borderRadius: 5,
    padding: 15,
    height: 200,
    textAlignVertical: "top",
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
    color: "#235d32fa",
  },
});

export default Fuel;
