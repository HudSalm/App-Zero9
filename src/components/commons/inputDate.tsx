import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "./button";
import Input from "./input";

interface DateInputProps {
  value: string;
  onChange: (date: string) => void;
  placeholder: string;
}

const InputDate = ({ value, onChange, placeholder }: DateInputProps) => {
  const [showDate, setShowDate] = useState(false);
  const [date, setDate] = useState(new Date());

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    setShowDate(Platform.OS === "ios");

    if (selectedDate) {
      setDate(selectedDate);
      const formattedDate = selectedDate.toLocaleDateString("pt-BR");
      onChange(formattedDate);
    }
  };

  return (
    <SafeAreaView
      style={{
        width: "100%",
        padding: -25,
      }}
    >
      <Button style={styles.dateButton} onPress={() => setShowDate(true)}>
        <View pointerEvents="none">
          <Input value={value} placeholder={placeholder} editable={false} />

          {showDate && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={handleDateChange}
              maximumDate={new Date()}
            />
          )}
        </View>
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dateButton: {},
});

export default InputDate;
