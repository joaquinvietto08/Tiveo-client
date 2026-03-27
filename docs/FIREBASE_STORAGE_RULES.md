# Reglas de Firebase Storage (soluciona `storage/unauthorized`)

El error **`[storage/unauthorized] User is not authorized to perform the desired action.`** ocurre cuando las **reglas de seguridad de Firebase Storage** no permiten la operación (por ejemplo subir a `requests/` o `messages/`).

## Dónde se configura

**En Firebase (consola), no en el código ni en el backend.**

1. Entrá a [Firebase Console](https://console.firebase.google.com/) → tu proyecto **tiveo**.
2. **Storage** → pestaña **Rules**.
3. Reemplazá las reglas actuales por las que necesitás (ejemplo abajo) y guardá.

## Ejemplo de reglas

Para que **usuarios autenticados** puedan:

- Subir y leer en `requests/` (imágenes de solicitudes en Default.jsx y Advance.jsx).
- Subir y leer en `messages/` (imágenes del chat).

Podés usar algo así:

```text
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Imágenes de solicitudes (workerRequest)
    match /requests/{fileName} {
      allow read, write: if request.auth != null;
    }
    // Imágenes de mensajes del chat
    match /messages/{activityId}/{fileName} {
      allow read, write: if request.auth != null;
    }
  }
}
```

- `request.auth != null` → solo usuarios logueados (Auth de Firebase).
- Si más adelante querés restringir por path o por usuario, podés usar `request.auth.uid` en las condiciones.

## Resumen

| Problema | Dónde | Qué hacer |
|----------|--------|-----------|
| **ERROR** `storage/unauthorized` | **Firebase** (Storage → Rules) | Ajustar reglas para permitir `read, write` en `requests/` y `messages/` cuando `request.auth != null`. |
| **WARN** deprecation “use getApp() instead” | **Front** (ya corregido) | Se actualizó `uploadRequestImages.js` y `firebaseChat.js` a la API modular (`getApp()`, `getStorage()`, `ref()`, `putFile()`, `getDownloadURL()`). |

Si después de cambiar las reglas seguís teniendo `unauthorized`, comprobá que el usuario esté logueado cuando se dispara la subida (por ejemplo que no se llame a la pantalla de request antes de tener sesión).
