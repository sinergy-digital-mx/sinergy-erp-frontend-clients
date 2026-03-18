# Guía de Debug - Sistema de Permisos

## Console Logs Implementados

Se han agregado console.logs detallados en el flujo de autenticación y permisos para facilitar el debug.

## Flujo de Logs al Hacer Login

### 1. Auth Service - Login Response
```
=== AUTH SERVICE - LOGIN ===
Response completo: { token: "eyJ...", ... }
Token encontrado: eyJ...
```

### 2. Decodificación del JWT
```
Permisos decodificados del JWT: ["leads:ViewMenu", "customers:ViewMenu", ...]
```

### 3. Normalización de Permisos
```
=== SET PERMISSIONS ===
Permisos recibidos: ["leads:ViewMenu", "customers:ViewMenu", ...]
Es array? true
Normalizando: "leads:ViewMenu" -> "leads:ViewMenu"
Normalizando: "customers:ViewMenu" -> "customers:ViewMenu"
...
Permisos normalizados finales: ["leads:ViewMenu", "customers:ViewMenu", ...]
```

### 4. Login Component - Confirmación
```
=== LOGIN RESPONSE ===
Full response: { access_token: "eyJ...", ... }
Token: eyJ...
=== PERMISOS DEL USUARIO ===
Permisos extraídos: ["leads:ViewMenu", "customers:ViewMenu", ...]
Total de permisos: 5
```

### 5. Sidebar - Filtrado de Menú
```
=== SIDEBAR - VISIBLE MENU ITEMS ===
Permisos actuales del usuario: ["leads:ViewMenu", "customers:ViewMenu", ...]
✓ "Leads" - Requiere: leads:ViewMenu - PERMITIDO
✗ "Clientes" - Requiere: customers:ViewMenu - DENEGADO
✓ "Lotes" - Requiere: properties:ViewMenu - PERMITIDO
...
Total items visibles: 3 de 9
```

## Cómo Interpretar los Logs

### ✅ Caso Exitoso
Si ves esto, el sistema está funcionando correctamente:
```
Permisos decodificados del JWT: ["leads:ViewMenu", "customers:ViewMenu"]
Permisos normalizados finales: ["leads:ViewMenu", "customers:ViewMenu"]
✓ "Leads" - Requiere: leads:ViewMenu - PERMITIDO
✓ "Clientes" - Requiere: customers:ViewMenu - PERMITIDO
Total items visibles: 2 de 9
```

### ❌ Problema: No hay permisos en el JWT
```
Permisos decodificados del JWT: []
Permisos normalizados finales: []
✗ "Leads" - Requiere: leads:ViewMenu - DENEGADO
✗ "Clientes" - Requiere: customers:ViewMenu - DENEGADO
Total items visibles: 0 de 9
```
**Solución**: El backend no está incluyendo permisos en el JWT. Verificar que el claim `permissions` esté presente.

### ❌ Problema: Token no encontrado
```
=== AUTH SERVICE - LOGIN ===
Response completo: { access_token: "eyJ..." }
No se encontró token en la respuesta
```
**Solución**: El backend está enviando `access_token` pero el código busca `token`. Verificar el nombre del campo.

### ❌ Problema: Formato incorrecto de permisos
```
Permisos recibidos: { "leads": ["ViewMenu"], "customers": ["ViewMenu"] }
Es array? false
Permisos normalizados finales: []
```
**Solución**: Los permisos deben ser un array de strings, no un objeto. Formato correcto: `["leads:ViewMenu", "customers:ViewMenu"]`

## Verificación Rápida

Para verificar que el sistema funciona:

1. **Abrir DevTools** (F12) y ir a la pestaña Console
2. **Hacer login** con un usuario
3. **Buscar los logs** con el formato `=== ... ===`
4. **Verificar**:
   - ✅ Los permisos se decodifican correctamente
   - ✅ Los permisos se normalizan correctamente
   - ✅ El sidebar filtra correctamente los items
   - ✅ Solo se muestran los items con permisos

## Permisos Esperados del Backend

El JWT debe incluir estos permisos según el rol del usuario:

```json
{
  "permissions": [
    "leads:ViewMenu",
    "customers:ViewMenu",
    "properties:ViewMenu",
    "contracts:ViewMenu",
    "purchase_orders:ViewMenu",
    "sales_orders:ViewMenu",
    "inventory:ViewMenu",
    "pos:ViewMenu",
    "marketing:ViewMenu"
  ]
}
```

## Formato del JWT Token

El token debe tener esta estructura:

```json
{
  "sub": "user-uuid",
  "email": "usuario@ejemplo.com",
  "tenant_id": "tenant-uuid",
  "permissions": [
    "leads:ViewMenu",
    "leads:Read",
    "leads:Create",
    "customers:ViewMenu",
    "customers:Read"
  ],
  "exp": 1234567890,
  "iat": 1234567890
}
```

## Notas Importantes

- Los logs son **muy verbosos** para facilitar el debug
- Una vez verificado que funciona, se pueden **remover o comentar** los console.logs
- Los permisos son **case-insensitive** para la entidad (e.g., `Leads:ViewMenu` = `leads:ViewMenu`)
- El formato debe ser **exactamente** `entidad:Acción` (con dos puntos)

## Próximos Pasos

1. Hacer login y revisar los logs en la consola
2. Verificar que los permisos lleguen correctamente del backend
3. Si no hay permisos, coordinar con el backend para agregarlos al JWT
4. Una vez funcionando, remover los console.logs si se desea
