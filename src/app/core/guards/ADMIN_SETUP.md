# Admin User Setup

## Objetivo
Asegurar que el usuario con ID `763b6ebe-fb57-11f0-a52e-06e7ea787385` tenga rol de admin para acceder a Settings.

## Pasos

### 1. Verificar el usuario en la base de datos
```sql
SELECT id, email, status FROM users WHERE id = '763b6ebe-fb57-11f0-a52e-06e7ea787385';
```

### 2. Crear o asignar rol de admin
Si el usuario existe, asigna el rol de admin:

```sql
-- Opción 1: Si existe una tabla de roles de usuario
INSERT INTO user_roles (user_id, role_id) 
VALUES ('763b6ebe-fb57-11f0-a52e-06e7ea787385', (SELECT id FROM roles WHERE name = 'admin'))
ON CONFLICT DO NOTHING;

-- Opción 2: Si el rol se guarda directamente en la tabla users
UPDATE users 
SET hasAdminRole = true 
WHERE id = '763b6ebe-fb57-11f0-a52e-06e7ea787385';

-- Opción 3: Si existe una tabla de permisos
INSERT INTO user_permissions (user_id, permission_id)
SELECT '763b6ebe-fb57-11f0-a52e-06e7ea787385', id 
FROM permissions 
WHERE permission_type IN ('admin', 'settings_access')
ON CONFLICT DO NOTHING;
```

### 3. Verificar que el cambio se aplicó
```sql
SELECT * FROM users WHERE id = '763b6ebe-fb57-11f0-a52e-06e7ea787385';
```

### 4. Logout y Login
- Cierra sesión en la aplicación
- Vuelve a iniciar sesión con el usuario
- Ahora deberías poder acceder a `/settings`

## Notas
- El token JWT se genera en el backend y debe incluir `hasAdminRole: true`
- El AdminGuard verifica `user_info.hasAdminRole` del token decodificado
- Si el cambio no se refleja, puede ser necesario regenerar el token

## Troubleshooting

Si aún no puedes acceder a Settings después de hacer los cambios:

1. **Verifica el token JWT**: Abre la consola del navegador y ejecuta:
   ```javascript
   console.log(localStorage.getItem('sinergy_erp_token'));
   ```

2. **Decodifica el token**: Usa https://jwt.io para ver el contenido del token

3. **Verifica hasAdminRole**: Asegúrate de que `hasAdminRole: true` esté en el payload del token

4. **Limpia el localStorage**: 
   ```javascript
   localStorage.removeItem('sinergy_erp_token');
   ```
   Luego logout y login nuevamente.
