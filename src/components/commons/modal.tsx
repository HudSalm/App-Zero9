import { WarningProps } from "@/src/types/auth";
import React from "react";
import { Modal, StyleSheet, View } from "react-native";
import { Colors } from "../colors";

const Warning = ({ visible, children, onClose }: WarningProps) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.containerModal}>{children}</View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Escurece o fundo atrás do modal
  },
  containerModal: {
    backgroundColor: Colors.inputColor,
    padding: 25,
    borderRadius: 5,
    gap: 15,
    width: "70%",
  },
});

export default Warning;
