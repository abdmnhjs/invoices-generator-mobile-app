import { KeyboardTypeOptions, View } from "react-native";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";

export function InputForm({
  label,
  type,
  placeholder,
  isDate,
}: {
  label: string;
  type: KeyboardTypeOptions;
  placeholder?: string;
  isDate?: boolean;
}) {
  const [value, setValue] = useState("");

  const handleChange = (text: string) => {
    if (isDate) {
      text = text.replace(/\D/g, "");
      if (text.length <= 8) {
        if (text.length > 4)
          text =
            text.slice(0, 2) + "/" + text.slice(2, 4) + "/" + text.slice(4);
        else if (text.length > 2) text = text.slice(0, 2) + "/" + text.slice(2);
      } else {
        text = text.slice(0, 8);
      }
    }
    setValue(text);
  };

  return (
    <View>
      <Label>{label}</Label>
      <Input
        placeholder={placeholder}
        keyboardType={type}
        value={value}
        onChangeText={handleChange}
        maxLength={isDate ? 10 : undefined}
      />
    </View>
  );
}
