import { useEffect, useState } from "react";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "@react-native-firebase/firestore";

// Real-time payment listener by activityId
export const usePayment = (activityId) => {
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!activityId) {
      setLoading(false);
      setPayment(null);
      setError("No encontramos el trabajo asociado al pago.");
      return;
    }

    const db = getFirestore();
    const paymentsQuery = query(
      collection(db, "payments"),
      where("activityId", "==", activityId)
    );

    const unsubscribe = onSnapshot(
      paymentsQuery,
      (snapshot) => {
        if (!snapshot.empty) {
          const docSnapshot = snapshot.docs[0];
          const data = docSnapshot.data();
          setPayment({
            id: docSnapshot.id,
            ...data,
            createdAt: data?.createdAt?.toDate?.() || data?.createdAt,
            updatedAt: data?.updatedAt?.toDate?.() || data?.updatedAt,
          });
          setError(null);
        } else {
          setPayment(null);
          setError(null);
        }
        setLoading(false);
      },
      (err) => {
        console.error("❌ Error al obtener el pago:", err);
        setError("No pudimos cargar el pago.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [activityId]);

  return { payment, loading, error };
};
