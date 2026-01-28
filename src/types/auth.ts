import { ReactNode } from "react";
import {
    KeyboardTypeOptions,
    StyleProp,
    TextInputProps,
    TextStyle,
    TouchableOpacityProps,
} from "react-native";

export interface InputProps extends TextInputProps {
  value: string;
  placeholder: string;
  type?: KeyboardTypeOptions;
}

export interface ButtonProps extends TouchableOpacityProps {
  children: ReactNode;
  styleText?: StyleProp<TextStyle>;
}
