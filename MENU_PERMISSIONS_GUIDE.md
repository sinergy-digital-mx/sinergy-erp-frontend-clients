# Guía de Permisos del Menú

## Resumen de Implementación

Se ha implementado un sistema de permisos para controlar la visibilidad de los elementos del menú principal de la aplicación.

## Permisos Implementados

Cada módulo del menú principal requiere un permiso específico con el formato `{módulo}:ViewMenu`:

| Módulo | Permiso | Descripción |
|--------|---------|-------------|
| Leads | `leads:ViewMenu` | Ver menú de Leads |
| Clientes | `customers:ViewMenu` | Ver menú de Clientes |
| Lotes | `properties:ViewMenu` | Ver menú de Lotes |
| Contratos | `contracts:ViewMenu` | Ver menú de Contratos |
| Órdenes de Compra | `purchase_orders:ViewMenu` | Ver menú de Órdenes de Compra |
| Órdenes de Venta | `sales_orders:ViewMenu` | Ver menú de Órdenes de Venta |
| Inventario | `inventory:ViewMenu` | Ver menú de Inventario |
| Punto de Venta | `pos:ViewMenu` | Ver menú de Punto de Venta |
| Marketing | `marketing:ViewMenu` | Ver menú de Marketing |

## Funcionamiento

1. **Login**: Al iniciar sesión, el JWT token contiene un array de permisos en el claim `permissions`
2. **Decodificación**: El `AuthService` decodifica el token y extrae los permisos
3. **Normalización**: Los permisos se normalizan al formato `entidad:Acción` (entidad en minúsculas)
4. **Filtrado**: El sidebar filtra los elementos del menú según los permisos del usuario
5. **Visualización**: Solo se muestran los elementos para los que el usuario tiene permiso

## Ejemplo de JWT Token

```json
{
  "sub": "user-uuid",
  "email": "usuario@ejemplo.com",
  "tenant_id": "tenant-uuid",
  "permissions": [
    "leads:ViewMenu",
    "customers:ViewMenu",
    "customers:Create",
    "customers:Read",
    "customers:Update"
  ],
  "exp": 1234567890
}
```

## Configuración Backend

El backend debe:

1. Incluir los permisos `ViewMenu` en el sistema de roles y permisos
2. Asignar estos permisos a los roles según las necesidades del negocio
3. Incluir los permisos en el JWT token al momento del login
4. Validar los permisos en los endpoints correspondientes

## Ejemplo de Configuración de Roles

```typescript
// Rol: Vendedor
{
  name: "Vendedor",
  permissions: [
    "leads:ViewMenu",
    "leads:Read",
    "leads:Create",
    "leads:Update",
    "customers:ViewMenu",
    "customers:Read",
    "sales_orders:ViewMenu",
    "sales_orders:Read",
    "sales_orders:Create"
  ]
}

// Rol: Administrador de Inventario
{
  name: "Administrador de Inventario",
  permissions: [
    "inventory:ViewMenu",
    "inventory:Read",
    "inventory:Create",
    "inventory:Update",
    "inventory:Delete",
    "purchase_orders:ViewMenu",
    "purchase_orders:Read",
    "purchase_orders:Create"
  ]
}
```

## Archivos Modificados

- `src/app/core/components/sidebar/sidebar.ts` - Agregado sistema de permisos
- `src/app/core/components/sidebar/sidebar.html` - Usa `visibleMenuItems` en lugar de `menu`
- `src/app/core/services/auth.service.ts` - Ya tenía el método `hasPermission()`

## Notas Importantes

- Los permisos son case-insensitive para la entidad (e.g., `Leads:ViewMenu` = `leads:ViewMenu`)
- Si un elemento del menú no tiene permiso definido, se muestra por defecto
- El sistema usa el método `hasPermission()` del `AuthService` que ya estaba implementado
- Los permisos se almacenan en un `BehaviorSubject` para reactividad
