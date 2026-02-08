import { getApp } from "@react-native-firebase/app";
import {
  getStorage,
  ref,
  putFile,
  getDownloadURL,
} from "@react-native-firebase/storage/lib/modular";
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

  const storage = getStorage(getApp());
  const baseId = requestId || userId || "request";

  const uploadedUrls = await Promise.all(
    uris.map(async (uri, index) => {
      const extension = getExtension(uri);
      const fileName = `${baseId}_${Date.now()}_${index}${
        extension ? `.${extension}` : ""
      }`;
      const reference = ref(storage, `requests/${fileName}`);
      await putFile(reference, normalizePath(uri));
      return getDownloadURL(reference);
    })
  );

  return uploadedUrls;
};
