import { useColorScheme } from "~/lib/useColorScheme";
import Toast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from "react-native-toast-message";
import { CheckCircle2, AlertCircle, Info } from "lucide-react-native";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  base: {
    height: "auto",
    minHeight: 40,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    borderLeftWidth: 1,
    elevation: 0,
    shadowColor: "transparent",
  },
  light: {
    backgroundColor: "#ffffff",
  },
  dark: {
    backgroundColor: "#111827",
  },
  text1: {
    fontSize: 15,
    fontWeight: "500",
  },
  text1Light: {
    color: "#111827",
  },
  text1Dark: {
    color: "#f9fafb",
  },
  text2: {
    fontSize: 13,
    marginTop: 2,
  },
  text2Light: {
    color: "#4b5563",
  },
  text2Dark: {
    color: "#9ca3af",
  },
});

export const toastConfig = {
  success: (props: BaseToastProps) => {
    const { colorScheme } = useColorScheme();
    return (
      <BaseToast
        {...props}
        style={[
          styles.base,
          colorScheme === "dark" ? styles.dark : styles.light,
        ]}
        contentContainerStyle={{ paddingHorizontal: 0 }}
        text1Style={[
          styles.text1,
          colorScheme === "dark" ? styles.text1Dark : styles.text1Light,
        ]}
        text2Style={[
          styles.text2,
          colorScheme === "dark" ? styles.text2Dark : styles.text2Light,
        ]}
        renderLeadingIcon={() => (
          <CheckCircle2 size={20} color="#1B512D" style={{ marginRight: 8 }} />
        )}
      />
    );
  },
  error: (props: BaseToastProps) => {
    const { colorScheme } = useColorScheme();
    return (
      <ErrorToast
        {...props}
        style={[
          styles.base,
          colorScheme === "dark" ? styles.dark : styles.light,
        ]}
        contentContainerStyle={{ paddingHorizontal: 0 }}
        text1Style={[
          styles.text1,
          colorScheme === "dark" ? styles.text1Dark : styles.text1Light,
        ]}
        text2Style={[
          styles.text2,
          colorScheme === "dark" ? styles.text2Dark : styles.text2Light,
        ]}
        renderLeadingIcon={() => (
          <AlertCircle size={20} color="#dc2626" style={{ marginRight: 8 }} />
        )}
      />
    );
  },
  info: (props: BaseToastProps) => {
    const { colorScheme } = useColorScheme();
    return (
      <BaseToast
        {...props}
        style={[
          styles.base,
          colorScheme === "dark" ? styles.dark : styles.light,
        ]}
        contentContainerStyle={{ paddingHorizontal: 0 }}
        text1Style={[
          styles.text1,
          colorScheme === "dark" ? styles.text1Dark : styles.text1Light,
        ]}
        text2Style={[
          styles.text2,
          colorScheme === "dark" ? styles.text2Dark : styles.text2Light,
        ]}
        renderLeadingIcon={() => (
          <Info size={20} color="#2563eb" style={{ marginRight: 8 }} />
        )}
      />
    );
  },
};

export const Toaster = () => {
  return <Toast config={toastConfig} topOffset={50} visibilityTime={3000} />;
};

// Helper function to show toasts
export const toast = {
  success: (message: string, description?: string) => {
    Toast.show({
      type: "success",
      text1: message,
      text2: description,
      position: "bottom",
      visibilityTime: 3000,
    });
  },
  error: (message: string, description?: string) => {
    Toast.show({
      type: "error",
      text1: message,
      text2: description,
      position: "bottom",
      visibilityTime: 4000,
    });
  },
  info: (message: string, description?: string) => {
    Toast.show({
      type: "info",
      text1: message,
      text2: description,
      position: "bottom",
      visibilityTime: 3000,
    });
  },
};
