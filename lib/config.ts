import { Platform } from "react-native";

// En développement, Android ne peut pas accéder à localhost directement
// On doit utiliser l'IP de la machine de développement
export const API_URL = Platform.select({
  android: "http://10.0.2.2:3000", // Pour l'émulateur Android
  ios: "http://localhost:3000", // Pour iOS
  default: "http://localhost:3000", // Pour le web
});
