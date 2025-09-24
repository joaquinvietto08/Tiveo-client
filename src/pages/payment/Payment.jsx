import React, { useState } from "react";
import { View, Button, ActivityIndicator, Linking } from "react-native";
import InAppBrowser from "react-native-inappbrowser-reborn";
import { colors } from "../../styles/globalStyles";
 
const Payment = () => {
  const [loading, setLoading] = useState(false);

  const startCheckout = async () => {
    try {
      setLoading(true);

      // 👉 1. Pedimos la preferencia a tu backend
      const res = await fetch(
        "https://createpreference-fpeb5gaoea-uc.a.run.app",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: "1234545",
            title: "Trabajo de Carlos José",
            unit_price: 4000,
          }),
        }
      );

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button title="Pagar $4000" onPress={startCheckout} />
      )}
    </View>
  );
}


export default Payment;