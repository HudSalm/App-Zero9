import { useState } from "react";
import { SelectList, SelectListProps } from "react-native-dropdown-select-list";
import { Colors } from "../colors";

const Dropdown = ({
  data,
  placeholder,
  setSelected,
  ...rest
}: SelectListProps) => {
  const [hasColor, setHasColor] = useState(false);

  return (
    <SelectList
      setSelected={(val: string) => {
        (setSelected(val), setHasColor(true));
      }}
      data={data}
      save="key"
      search={false}
      placeholder={placeholder}
      inputStyles={
        hasColor
          ? { color: Colors.inputValueColor }
          : { color: Colors.inputTextColor }
      }
      boxStyles={{
        borderRadius: 5,
        backgroundColor: Colors.inputColor,
        height: 55,
        alignItems: "center",
      }}
      dropdownItemStyles={{ backgroundColor: Colors.inputColor }}
      dropdownStyles={{ backgroundColor: Colors.inputColor }}
      dropdownTextStyles={{ color: Colors.inputValueColor }}
      {...rest}
    />
  );
};

export default Dropdown;
