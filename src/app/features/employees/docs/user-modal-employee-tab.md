# Pestaña "Empleado" del modal de usuario

Ubicación: `src/app/features/rbac-tenant-ui/components/user-detail-modal/`.

El modal de usuario ya tenía pestañas (Información general, POS, Sucursales). Se
agregó una pestaña **Empleado** que sigue el mismo patrón que la de POS.

## Comportamiento

1. Toggle **"Marcar como empleado"** (`is_employee`).
2. Al activarse, se muestran los campos de RH/nómina agrupados en el
   sub-formulario `employee` (reactive `FormGroup` anidado):
   - Datos: puesto\*, departamento, fecha de ingreso\*, fecha de nacimiento,
     código, RFC, CURP, NSS.
   - Nómina: salario mensual\*, frecuencia de pago.
   - Banco: banco, CLABE, cuenta.
   - (\*) obligatorios cuando `is_employee` es `true`.
3. **Preview en vivo** (no editable): antigüedad, vacaciones/año (LFT), salario
   diario, pago quincenal, pago semanal y salario anual. Se recalcula con
   `computed()` a partir de `hire_date` y `monthly_salary`
   (ver `utils/mexican-labor.util.ts`).
4. **Foto**: solo disponible al **editar** un empleado ya guardado (requiere el
   `employee.id`). En alta se indica que debe guardarse primero. Sube vía
   `POST /tenant/employees/:id/photo`.

## Envío

`is_employee` y el objeto `employee` (limpio, sin campos vacíos) se agregan al
payload de `POST/PUT /tenant/users`. Al editar, el modal precarga el perfil con
`GET /tenant/users/:id` (`UserService.getUserById`).

## Precarga

`applyEmployeeProfile()` normaliza las fechas a `YYYY-MM-DD` para los inputs
`type="date"` y setea `photo_url` / `employee.id`.
