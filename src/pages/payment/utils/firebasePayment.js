import InAppBrowser from "react-native-inappbrowser-reborn";
import { Linking } from "react-native";
import { colors } from "../../../styles/globalStyles";

const DEFAULT_REDIRECT_URL = "tiveo://payment/success";

/** Cloud Function confirmPayment (efectivo: payment + activity + warranty + worker) */
const CONFIRM_PAYMENT_URL =
  "https://us-central1-tiveo-5f6c4.cloudfunctions.net/confirmPayment";

/**
 * Marca el pago como cobrado (efectivo). Misma lógica que el webhook de MP: actualiza payment, activity, warranty 15 días y worker.
 */
export const confirmPayment = async ({
  paymentId,
  activityId,
  workerId,
  method = "efectivo",
}) => {
  const res = await fetch(CONFIRM_PAYMENT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      paymentId,
      activityId: activityId || null,
      workerId: workerId || null,
      method,
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `confirmPayment ${res.status}`);
  }
  return res.json();
};

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
