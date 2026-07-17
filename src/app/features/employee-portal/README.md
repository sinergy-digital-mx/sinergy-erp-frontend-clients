# Portal de empleado (self-service)

Portal para los usuarios de tipo **empleado**. Desde aquí el empleado consulta
su propia información y gestiona sus solicitudes, sin acceso al módulo de RH.

## Acceso

- Ruta: `/employee-portal`.
- Se muestra como tarjeta **"Portal de empleado"** dentro de **Configuración**,
  visible solo si `AuthService.isEmployeeUser()` es `true` (bandera
  `is_employee` en la sesión).
- Un usuario que solo es empleado (sin módulos ERP) aterriza aquí tras el login
  (`AuthService.resolvePostLoginRoute`).

## Funcionalidad

- Ver foto, nombre, puesto, departamento y correo.
- Ver días de vacaciones: disponibles, por año, tomados y pendientes.
- Enviar una solicitud de vacaciones/ausencia (queda **pendiente** de aprobación).
- Ver el historial de solicitudes y cancelar las pendientes.
- Actualizar nombre y/o contraseña.

## Estructura

```
src/app/features/employee-portal/
├── services/
│   └── employee-portal.service.ts   # Endpoints self-service (/me)
├── pages/
│   └── employee-portal/             # Página del portal
├── employee-portal.routes.ts
└── README.md
```

## Endpoints (self-service)

> El empleado resuelve su propio perfil en el backend vía el namespace `/me`.

| Método | Endpoint                                             | Uso                       |
|--------|------------------------------------------------------|---------------------------|
| GET    | `/tenant/employees/me`                               | Perfil propio             |
| GET    | `/tenant/employees/me/leave-requests`                | Mis solicitudes           |
| POST   | `/tenant/employees/me/leave-requests`                | Enviar solicitud          |
| PUT    | `/tenant/employees/me/leave-requests/:id/cancel`     | Cancelar solicitud propia |
| PUT    | `/tenant/users/me`                                   | Cambiar nombre/contraseña |

Los modelos y el cálculo de días se reutilizan del módulo `employees`
(`../employees/models/employee.model.ts`, `../employees/utils/mexican-labor.util.ts`).

## Nota de integración

Si el backend expone los endpoints self-service con otra ruta, ajústalos en
`employee-portal.service.ts` (único punto de acoplamiento con la API).
