import storage from "@react-native-firebase/storage";
import { Platform } from "react-native";

const normalizePath = (uri = "") =>
  Platform.OS === "ios" ? uri.replace("file://", "") : uri;

const getExtension = (uri = "") => {
  const cleanUri = uri.split("?")[0];
  const parts = cleanUri.split(".");
  return parts.length > 1 ? parts.pop() : "";
};

export const uploadRequestImages = async (
  uris = [],
  { requestId = "", userId = "" } = {}
) => {
  if (!Array.isArray(uris) || uris.length === 0) {
    return [];
  }

  const baseId = requestId || userId || "request";

  const uploadedUrls = await Promise.all(
    uris.map(async (uri, index) => {
      const extension = getExtension(uri);
      const fileName = `${baseId}_${Date.now()}_${index}${
        extension ? `.${extension}` : ""
      }`;
      const reference = storage().ref(`requests/${fileName}`);
      await reference.putFile(normalizePath(uri));
      return reference.getDownloadURL();
    })
  );

  return uploadedUrls;
};
