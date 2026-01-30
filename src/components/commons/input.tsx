import { InputProps } from "@/src/types/auth";
import { StyleSheet, TextInput } from "react-native";
import { Colors } from "../colors";

const Input = ({ value, style, placeholder, type, ...rest }: InputProps) => {
  return (
    <TextInput
      style={[style || styles.input]}
      value={value}
      placeholder={placeholder}
      placeholderTextColor={Colors.inputTextColor}
      keyboardType={type}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 15,
    backgroundColor: "#FFF6FF",
    borderRadius: 5,
  },
});

export default Input;
