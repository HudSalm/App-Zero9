import { ButtonProps } from "@/src/types/auth";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const Button = ({ children, style, styleText, ...rest }: ButtonProps) => {
  return (
    <TouchableOpacity style={[style || styles.baseButton]} {...rest}>
      {typeof children === "string" ? (
        <Text style={styleText || styles.textButton}>{children}</Text>
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
    backgroundColor: "#4D4D4D",
    padding: 15,
    borderRadius: 5,
    width: "80%",
    borderColor: "#FFF6FF",
    borderWidth: 0.8,
  },
  textButton: {
    color: "#FFF6FF",
    fontWeight: "700",
  },
});

export default Button;
