import * as FileSystem from "expo-file-system";

export const saveImageToAppDirectory = async (
  imageUri: string
): Promise<string> => {
  try {
    const fileName = `profile_${Date.now()}.jpg`;

    // ✅ Nueva API orientada a objetos
    const sourceFile = new FileSystem.File(imageUri);
    const destinationFile = new FileSystem.File(
      FileSystem.Paths.document || FileSystem.Paths.cache,
      fileName
    );

    // Copiar usando el método copy()
    await sourceFile.copy(destinationFile);

    return destinationFile.uri;
  } catch (error) {
    console.error("Error saving image:", error);
    throw error;
  }
};
