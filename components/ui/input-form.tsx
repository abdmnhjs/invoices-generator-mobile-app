import { KeyboardTypeOptions, View, Text } from "react-native";
import { Input } from "./input";
import { useState, useEffect } from "react";

export function InputForm({
  type,
  placeholder,
  error,
  value: externalValue,
  onChange,
  maxLength,
  ...props
}: {
  type: KeyboardTypeOptions;
  placeholder?: string;

  error?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  maxLength?: number;
}) {
  const [internalValue, setInternalValue] = useState(externalValue || "");

  const handleChange = (text: string) => {
    setInternalValue(text);
    onChange?.(text);
  };

  useEffect(() => {
    if (externalValue !== undefined && externalValue !== internalValue) {
      setInternalValue(externalValue);
    }
  }, [externalValue]);

  return (
    <View className="space-y-1.5">
      <Input
        className={error ? "border-red-500" : ""}
        placeholder={placeholder}
        keyboardType={type}
        value={internalValue}
        onChangeText={handleChange}
        maxLength={maxLength}
        {...props}
      />

      {error && <Text className="text-red-500 text-sm">{error}</Text>}
    </View>
  );
}
