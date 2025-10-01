import InAppBrowser from "react-native-inappbrowser-reborn";
import { Linking } from "react-native";
import { colors } from "../../../styles/globalStyles";

export const startCheckout = async ({
  id,
  title,
  unit_price,
  onOkay,
  onCancel,
  onError
}) => {
  try {
    const res = await fetch(
      "https://createpreference-fpeb5gaoea-uc.a.run.app",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, title, unit_price }),
      }
    );

    const data = await res.json();
    const initPoint = data.init_point;

    if (await InAppBrowser.isAvailable()) {
      const result = await InAppBrowser.open(initPoint, {
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
        onError();
      }
    } else {
      Linking.openURL(initPoint);
    }
  } catch (error) {
    console.error("❌ Error al abrir Checkout Pro:", error);
    onError();
    throw error;
  }
};
