import { ButtonProps } from "@/src/types/auth";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const Button = ({ children, style, styleText, ...rest }: ButtonProps) => {
  return (
    <TouchableOpacity style={[styles.baseButton, style]} {...rest}>
      {typeof children === "string" ? (
        <Text style={styleText}>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseButton: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Button;
