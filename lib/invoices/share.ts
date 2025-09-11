import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

export const shareInvoice = async (pdfUrl: string, fileName: string) => {
  try {
    console.log("Tentative de partage avec URL:", pdfUrl);
    console.log("Nom du fichier:", fileName);

    // Télécharger le fichier
    const { uri } = await FileSystem.downloadAsync(
      pdfUrl,
      FileSystem.documentDirectory + fileName
    );

    console.log("Fichier téléchargé à:", uri);

    // Vérifier si le partage est disponible
    const isAvailable = await Sharing.isAvailableAsync();
    if (!isAvailable) {
      throw new Error("Le partage n'est pas disponible sur cet appareil");
    }

    // Ouvrir le dialogue de partage
    await Sharing.shareAsync(uri);
  } catch (error) {
    console.error("Erreur lors du téléchargement:", error);
    throw error;
  }
};
