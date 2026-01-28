import { InputProps } from "@/src/types/auth";
import { TextInput } from "react-native";

const Input = ({ value, style, placeholder, type, ...rest }: InputProps) => {
  return (
    <TextInput
      style={style}
      value={value}
      placeholder={placeholder}
      keyboardType={type}
      {...rest}
    />
  );
};

export default Input;
