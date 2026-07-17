# Módulo Empleados (RH / Nómina)

Módulo de gestión de personal para el ERP Sinergy: alta de empleados desde el
modal de usuario, cálculo de vacaciones según la Ley Federal del Trabajo,
desglose de nómina y gestión de solicitudes de vacaciones/ausencias.

## Descripción

El módulo permite al área de Recursos Humanos:

- Ver y filtrar la lista de empleados.
- Consultar antigüedad, días de vacaciones disponibles y conteo de solicitudes.
- Ver el detalle de cada empleado (datos generales, nómina, banco e historial).
- Subir/actualizar la foto del empleado.
- Registrar solicitudes de vacaciones/faltas a nombre de un empleado.
- Aprobar, rechazar o cancelar solicitudes.

El perfil de empleado se crea/edita desde el **modal de usuario** (pestaña
"Empleado"), no desde este módulo. Ver [`docs/user-modal-employee-tab.md`](./docs/user-modal-employee-tab.md).

## Estructura

```
src/app/features/employees/
├── config/
│   └── permissions.config.ts        # EMPLOYEE_PERMISSIONS
├── models/
│   └── employee.model.ts            # Employee, vacaciones, nómina, solicitudes
├── utils/
│   └── mexican-labor.util.ts        # Cálculo LFT (vacaciones) + nómina
├── services/
│   └── employee.service.ts          # CRUD, foto, solicitudes
├── components/
│   ├── leave-request-dialog/        # Registrar solicitud (RH)
│   └── leave-review-dialog/         # Aprobar / rechazar
├── pages/
│   ├── employee-list/               # Lista + vista de solicitudes (RH)
│   └── employee-detail/             # Detalle + historial
├── employees.routes.ts
├── README.md
└── docs/
    ├── api.md                       # Contrato de API
    ├── mexican-labor-law.md         # Reglas de cálculo
    └── user-modal-employee-tab.md   # Pestaña "Empleado" del modal de usuario
```

## Rutas

| Ruta              | Componente               | Permiso          |
|-------------------|--------------------------|------------------|
| `/employees`      | `EmployeeListComponent`  | `Employee:Read`  |
| `/employees/:id`  | `EmployeeDetailComponent`| `Employee:Read`  |

## Permisos RBAC

| Permiso                | Controla en el UI                                   |
|------------------------|-----------------------------------------------------|
| `Employee:ViewMenu`    | Muestra el ítem "Empleados" en el menú lateral       |
| `Employee:Create`      | Alta de empleado (desde el modal de usuario)         |
| `Employee:Read`        | Lista y detalle                                      |
| `Employee:Update`      | Editar datos, subir foto, registrar solicitudes      |
| `Employee:Delete`      | Eliminar perfil de empleado                          |
| `Employee:ManageLeave` | Aprobar / rechazar / cancelar solicitudes            |

> El backend hace *matching* de entidad sin distinguir mayúsculas, por lo que
> `Employee:Read` y `employee:Read` son equivalentes.

## Cálculo de vacaciones (Ley mexicana)

La fuente de verdad es el backend (`vacation.*` y `payroll.*` en cada respuesta).
El frontend replica el cálculo únicamente para el **preview en vivo** dentro del
modal de usuario. Ver [`docs/mexican-labor-law.md`](./docs/mexican-labor-law.md).

## Ver también

- Portal de empleado (self-service): `src/app/features/employee-portal/`.
