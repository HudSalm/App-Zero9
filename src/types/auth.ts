import { Session, User } from "@supabase/supabase-js";
import { ReactNode } from "react";
import {
  KeyboardTypeOptions,
  ModalProps,
  StyleProp,
  TextInputProps,
  TextStyle,
  TouchableOpacityProps,
} from "react-native";

export interface dropwdownProps {
  key: number;
  value: string;
  disable?: boolean;
}

export interface InputProps extends TextInputProps {
  value: string;
  placeholder: string;
  type?: KeyboardTypeOptions;
}

export interface ButtonProps extends TouchableOpacityProps {
  children: ReactNode;
  styleText?: StyleProp<TextStyle>;
}
export interface WarningProps extends ModalProps {
  onClose: () => void;
}

export type AuthContextProps = {
  session: Session | null;
  user: User | null;
  loading: boolean;
};
