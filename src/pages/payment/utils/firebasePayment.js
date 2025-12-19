import InAppBrowser from "react-native-inappbrowser-reborn";
import { Linking } from "react-native";
import { colors } from "../../../styles/globalStyles";

const DEFAULT_REDIRECT_URL = "tiveo://payment/success";

export const startCheckout = async ({
  id,
  title,
  unit_price,
  onOkay,
  onCancel,
  onError,
  redirectUrl = DEFAULT_REDIRECT_URL,
}) => {
  try {
    const res = await fetch("https://createpreference-fpeb5gaoea-uc.a.run.app", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, title, unit_price }),
    });

    const data = await res.json();
    const initPoint = data.init_point;

    if (await InAppBrowser.isAvailable()) {
      // openAuth cierra el browser cuando redirige al deep link de éxito
      const result = await InAppBrowser.openAuth(initPoint, redirectUrl, {
        showTitle: true,
        toolbarColor: colors.primary,
        enableUrlBarHiding: true,
        enableDefaultShare: false,
      });
      console.log("Resultado InAppBrowser:", result);
      if (result?.type === "success" && onOkay) {
        onOkay();
      } else if (
        (result?.type === "dismiss" || result?.type === "cancel") &&
        onCancel
      ) {
        onCancel();
      } else {
        onError?.();
      }
    } else {
      Linking.openURL(initPoint);
    }
  } catch (error) {
    console.error("❌ Error al abrir Checkout Pro:", error);
    onError?.();
    throw error;
  }
};
