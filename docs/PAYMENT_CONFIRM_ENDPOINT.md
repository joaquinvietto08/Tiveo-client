# Endpoint `confirmPayment` (pago en efectivo + garantía)

La app llama a la Cloud Function **confirmPayment** cuando el usuario paga en efectivo. Es la **misma lógica** que el webhook de Mercado Pago: actualiza payment, activity (y **garantía 15 días**) y worker.

## Dónde está el backend

- **Código**: `src/pages/payment/payment.js` (Firebase Function `exports.confirmPayment`).
- **URL**: `https://us-central1-tiveo-5f6c4.cloudfunctions.net/confirmPayment` (POST).

## Body (JSON)

```json
{
  "paymentId": "abc123",
  "activityId": "act456",
  "workerId": "worker789",
  "method": "efectivo"
}
```

## Qué hace la función

En una transacción Firestore:

1. **payments/{paymentId}**: `status: "paid"`, `method`, `paidAt`, `updatedAt`.
2. **activities/{activityId}**: `paymentStatus: "paid"`, **`warranty`** (fecha actual + 15 días), `updatedAt`.
3. **workers/{workerId}**: `completedJobs: increment(1)`, `updatedAt` (merge).

Así el pago en efectivo aplica la **garantía** igual que tarjeta/MP.
