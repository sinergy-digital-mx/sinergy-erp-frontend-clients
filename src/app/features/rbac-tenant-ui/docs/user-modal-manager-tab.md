# Pestaña "Gerente" del modal de usuario

Ubicación: `src/app/features/rbac-tenant-ui/components/user-detail-modal/`.

Sigue el mismo patrón que la pestaña **Empleado**: el tab siempre está visible;
el contenido (lista + agregar) se habilita con el interruptor.

## Cuándo mostrar el tab

Siempre, junto a POS / Empleado / Sucursales asignadas.

Orden: Información general → POS → Empleado → **Gerente** → Sucursales → Seguridad (solo perfil propio).

| Pantalla | Tab Gerente |
|----------|-------------|
| Crear usuario | Sí (toggle). La lista se usa después de guardar. |
| Editar usuario | Sí |

## Toggle "Es gerente"

En edición el campo `is_manager` se persiste al instante con `PUT /tenant/users/:userId` y **el modal no se cierra**, para poder agregar gente a cargo en el mismo flujo.

En alta, `is_manager` viaja en el `POST /tenant/users`. Si el usuario queda como gerente, el modal permanece abierto en este tab para asignar reportes.

Agregar/quitar gente a cargo sigue usando endpoints propios (no va en Guardar cambios).

## Lista (usuarios a cargo)

Solo si `is_manager === true` y el gerente ya está persistido.

- Listar: `GET /tenant/users/:userId/reports`
- Agregar: `POST /tenant/users/:userId/reports` `{ "user_id" }`
- Quitar: `DELETE /tenant/users/:userId/reports/:reportUserId`

`:userId` es el usuario que se está editando (el gerente). Tras 201/200 se actualiza la fila y el modal no se cierra.

El selector excluye: el gerente actual, quienes ya están en `reports` y quienes ya tienen `manager`.

## Permisos

Sin permiso nuevo: `User` + `Read` / `Update` (los mismos del modal).
