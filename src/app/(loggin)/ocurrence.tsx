import { Colors } from "@/src/components/colors";
import Button from "@/src/components/commons/button";
import Input from "@/src/components/commons/input";
import InputDate from "@/src/components/commons/inputDate";
import Dropdown from "@/src/components/commons/selectList";
import Footer from "@/src/components/layout/footer";
import Header from "@/src/components/layout/header";
import { dropwdownProps } from "@/src/types/auth";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Ocurrence = () => {
  const [data, setData] = useState("");
  const [name, setName] = useState("");
  const [observation, setObservation] = useState("");
  const [selectedEnterprise, setSelectedEnterprise] = useState("");
  const [selectedContract, setSelectedContract] = useState("");
  const [selectedReason, setSelectedReason] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");

  const enterprise: dropwdownProps[] = [
    { key: 1, value: "Fiel" },
    { key: 2, value: "Fender" },
    { key: 3, value: "Unobike" },
  ];

  const contract: dropwdownProps[] = [
    { key: 1, value: "Bonde" },
    { key: 2, value: "Vigia - Guapi" },
    { key: 3, value: "Vigias/Oficial Manut." },
  ];
  const reason: dropwdownProps[] = [
    { key: 1, value: "Falta" },
    { key: 2, value: "Suspensão" },
    { key: 3, value: "Problemas de saúde" },
    { key: 4, value: "Outros" },
  ];
  const position: dropwdownProps[] = [
    { key: 1, value: "Motorneiro" },
    { key: 2, value: "Auxiliar de Motorneiro" },
    { key: 3, value: "Vigia" },
    { key: 4, value: "Porteiro" },
    { key: 5, value: "Oficial de manutenção" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Relatório de Ocorrências</Text>
        <View style={styles.containerInput}>
          <InputDate
            value={data}
            onChange={setData}
            placeholder="Data do Ocorrido"
          />
          <Input
            value={name}
            onChangeText={setName}
            placeholder="Nome do Funcionário"
          />
          <Dropdown
            setSelected={(val: string) => setSelectedEnterprise(val)}
            data={enterprise}
            placeholder="Empresa"
          />
          <Dropdown
            setSelected={(val: string) => setSelectedContract(val)}
            data={contract}
            placeholder="Contrato"
          />
          <Dropdown
            setSelected={(val: string) => setSelectedReason(val)}
            data={reason}
            placeholder="Motivo"
          />
          <Dropdown
            setSelected={(val: string) => setSelectedPosition(val)}
            data={position}
            placeholder="Função"
          />
          <Input
            style={styles.inputObservation}
            value={observation}
            onChangeText={setObservation}
            placeholder="Observações"
            multiline={true}
          />
        </View>
        <Button>Enviar</Button>
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundPrimary,
    flex: 1,
  },
  content: {
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
});

export default Ocurrence;
