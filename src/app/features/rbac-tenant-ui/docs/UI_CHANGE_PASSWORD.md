# UI — Cambiar / restablecer contraseña

Ubicación: `src/app/features/rbac-tenant-ui/components/user-detail-modal/`.

Tab **Seguridad** en el modal **Editar Usuario**. Endpoint: `PUT /tenant/users/:userId/password`.

## Cuándo mostrar el tab

```ts
const isOwnProfile = editedUser.id === loggedInUserId;
const canResetOthers = authService.hasEntityPermission('User', 'Reset_Password');
const showSecurityTab = !isNew && (isOwnProfile || canResetOthers);
```

`hasEntityPermission` es case-insensitive en la entidad y Admin (`hasAdminRole`) lo bypasea. En `permissions_flat` la clave es `user:Reset_Password`.

| Pantalla | Tab Seguridad |
|----------|----------------|
| Modal **Editar Usuario** | Sí si `isOwnProfile` **o** `canResetOthers` |
| Detalle del usuario logueado (mismo modal) | Sí |
| Crear usuario | No |

No mezclar estos campos con **Guardar cambios** de Información general / POS / Empleado / Gerente / Sucursales.

## Tab Seguridad

Después de **Sucursales asignadas**.

| UI | API | Tipo | Requerido | Mín. |
|----|-----|------|-----------|------|
| Nueva contraseña | `new_password` | `string` | Sí | 8 |
| Confirmar contraseña | `confirm_password` | `string` | Sí | 8 |

Botones del tab (no usar el **Guardar cambios** global):

- **Cancelar** — limpia los inputs
- **Cambiar contraseña** si es el propio perfil
- **Restablecer contraseña** si es ajeno y hay `User:Reset_Password`

Tras 200: toast, limpiar inputs, no cerrar el modal. El otro usuario sigue con su sesión hasta que expire.

**No** enviar `password` en `PUT /tenant/users/:userId`.

## Cómo asignar el permiso (Roles)

Quien deba restablecer contraseñas de **cualquier** usuario necesita `User:Reset_Password` en su rol.

1. Configuración → **Gestión de Roles y Permisos**.
2. Seleccionar el rol (ej. Admin, RRHH).
3. Categoría **Administración** → módulo **Usuarios**.
4. Marcar **Reset_Password** (`entity: "User"`, descripción: Restablecer contraseñas de usuarios).
5. **Guardar cambios**.
6. Los usuarios de ese rol: re-login o esperar el refresh de permisos (`POST /auth/refresh`).

Sin este permiso, el tab Seguridad **solo** aparece en el propio perfil.

Admin (`hasAdminRole: true`) ya puede restablecer cualquiera; conviene dejar el checkbox marcado para que salga en `permissions_flat`.
