import InAppBrowser from "react-native-inappbrowser-reborn";
import { Linking } from "react-native";
import { colors } from "../../../styles/globalStyles";

export const startCheckout = async ({ id, title, unit_price }) => {
  try {
    // 👉 1. Pedimos la preferencia a tu backend
    const res = await fetch("https://createpreference-fpeb5gaoea-uc.a.run.app", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        title,
        unit_price,
      }),
    });

    const data = await res.json();
    const initPoint = data.init_point;

    console.log("✅ Preferencia creada:", data);

    // 👉 2. Abrimos Checkout Pro
    if (await InAppBrowser.isAvailable()) {
      await InAppBrowser.open(initPoint, {
        // Opciones Android
        showTitle: true,
        toolbarColor: colors.primary,
        enableUrlBarHiding: true,
        enableDefaultShare: false,
      });
    } else {
      Linking.openURL(initPoint);
    }
  } catch (error) {
    console.error("❌ Error al abrir Checkout Pro:", error);
  }
};
