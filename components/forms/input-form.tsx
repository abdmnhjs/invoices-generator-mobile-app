import { KeyboardTypeOptions, View, Text } from "react-native";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState, useEffect } from "react";

export function InputForm({
  label,
  type,
  placeholder,
  isDate,
  error,
  onChange,
  ...props
}: {
  label: string;
  type: KeyboardTypeOptions;
  placeholder?: string;
  isDate?: boolean;
  error?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
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
    onChange?.(text);
  };

  useEffect(() => {
    onChange?.(value);
  }, []);

  return (
    <View className="space-y-1.5">
      <Label className="text-[#1B512D]">{label}</Label>
      <Input
        className={error ? "border-red-500" : ""}
        placeholder={placeholder}
        keyboardType={type}
        value={value}
        onChangeText={handleChange}
        maxLength={isDate ? 10 : undefined}
        {...props}
      />

      {error && <Text className="text-red-500 text-sm">{error}</Text>}
    </View>
  );
}
