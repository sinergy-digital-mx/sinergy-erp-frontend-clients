# API — Empleados

Base URL: `/{apiPrefix}/tenant/employees`

Todos los endpoints requieren:

- Header `Authorization: Bearer <token>`
- Permisos `Employee:*` y el módulo habilitado.

Implementado en `services/employee.service.ts`.

---

## 1. Marcar un usuario como empleado

El perfil se administra desde el modal de usuario (pestaña "Empleado"). Se envía
dentro del objeto `employee` con la bandera `is_employee`.

```http
POST /tenant/users
PUT  /tenant/users/:userId
```

```json
{
  "email": "empleado@empresa.mx",
  "first_name": "Juan",
  "last_name": "Pérez",
  "status_id": 1,
  "is_employee": true,
  "employee": {
    "employee_code": "EMP-001",
    "rfc": "PEPJ900101ABC",
    "curp": "PEPJ900101HDFRRN09",
    "nss": "12345678901",
    "position": "Cajero",
    "department": "Ventas",
    "hire_date": "2022-02-01",
    "birth_date": "1990-01-01",
    "monthly_salary": 12000,
    "payment_frequency": "biweekly",
    "bank_name": "BBVA",
    "clabe": "012345678901234567",
    "bank_account": "0123456789"
  }
}
```

- `is_employee: true` → upsert del perfil y marca al usuario como empleado.
- `is_employee: false` → desmarca (conserva el historial).
- `GET /tenant/users/:userId` incluye `is_employee` y `employee` (con `vacation`,
  `payroll` y `photo_url`) para precargar el modal.

## 2. Lista de empleados

```http
GET /tenant/employees?page=1&limit=20&search=juan&status=active&department=Ventas
```

Cada fila incluye `vacation`, `payroll` y `request_counts`. Ver el modelo
`Employee` / `PaginatedResponse<Employee>`.

## 3. Detalle

```http
GET /tenant/employees/:id
```

Igual que la fila, más `leave_requests` (historial completo).

## 4. Foto

```http
POST /tenant/employees/:id/photo    (multipart/form-data, campo "file")
```

Respuesta: `{ "photo_url": "https://…firmada" }` (expira ~1h).

## 5. Solicitudes de vacaciones/faltas

```http
GET  /tenant/employees/leave-requests/all?status=pending&type=vacation&page=1&limit=20
GET  /tenant/employees/:id/leave-requests
POST /tenant/employees/:id/leave-requests
PUT  /tenant/employees/leave-requests/:requestId/review   { "status": "approved", "review_notes": "..." }
PUT  /tenant/employees/leave-requests/:requestId/cancel
```

Payload de creación:

```json
{
  "type": "vacation",
  "start_date": "2026-08-01",
  "end_date": "2026-08-05",
  "reason": "Vacaciones de verano",
  "is_paid": true
}
```

`days` se calcula en el backend. Para `vacation` se valida contra los días
disponibles.

## Manejo de errores

`EmployeeService.handleError` traduce los códigos HTTP a mensajes en español
(401, 403, 404, 409, 422/400, 500 y error de red).
