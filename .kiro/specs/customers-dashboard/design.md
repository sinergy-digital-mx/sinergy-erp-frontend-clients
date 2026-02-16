# Documento de Diseño: Dashboard de Customers con Filtro de Grupos

## Descripción General

Esta característica extiende la aplicación con un dashboard de customers similar al de leads. El sistema muestra una tabla de customers con paginación, búsqueda, filtrado por grupo y estado. Incluye un dropdown para seleccionar grupos, un modal para editar customers (incluyendo cambio de grupo), y manejo completo de errores y estados de carga.

El diseño prioriza:
- Interfaz consistente con el dashboard de leads
- Filtrado flexible que permite combinar múltiples filtros
- Carga y manejo de errores graceful para datos de grupos
- Diseño responsivo para todos los tamaños de dispositivo
- Integración sin problemas con la tabla de customers existente

## Arquitectura

### Jerarquía de Componentes

```
CustomersListPage
├── CustomerGroupDropdown
│   ├── GroupLoadingState
│   ├── GroupErrorState
│   └── GroupList
│       ├── ViewAllOption
│       └── GroupListItem (repeated)
│           └── CustomerCountBadge
├── SearchComponent
├── StatusFilterComponent
├── DatatableWrapper
│   ├── CustomerTableRows
│   └── ActionButtons
├── FilterIndicator
└── FilterStateManager

CustomerDetailPage
├── CustomerBasicInfo
├── CustomerAddressSection
├── CustomerStatusSection
├── CustomerActivitiesSummary
├── CustomerActivitiesList
│   ├── ActivityListItem (repeated)
│   └── ActivityDetailModal
├── CreateActivityModal
└── EditActivityModal
```

### Flujo de Datos

1. **Carga Inicial**: Cuando se carga la página de customers, se obtienen grupos de GET /api/customer-groups
2. **Selección de Grupo**: Usuario selecciona un grupo → sistema filtra tabla usando GET /api/customers?group_id={groupId}
3. **Búsqueda**: Usuario escribe en búsqueda → tabla filtra usando GET /api/customers?search={searchTerm}
4. **Filtro de Estado**: Usuario selecciona estado → tabla filtra usando GET /api/customers?status_id={statusId}
5. **Filtros Combinados**: Cuando múltiples filtros están activos, la tabla aplica todos simultáneamente
6. **Edición**: Usuario hace clic en Edit → modal se abre → usuario cambia grupo → PUT /api/customers/{id}

### Gestión de Estado

El componente usa un modelo de estado jerárquico:

```
CustomersTableState
├── customers: Customer[]
├── groups: CustomerGroup[]
├── selectedGroupId: string | null
├── searchTerm: string | null
├── selectedStatusId: string | null
├── isLoadingCustomers: boolean
├── isLoadingGroups: boolean
├── groupsError: ErrorState | null
├── customersError: ErrorState | null
├── page: number
├── limit: number
├── totalResults: number
└── lastRefresh: timestamp
```

## Componentes e Interfaces

### Modelos de Datos Principales

```typescript
interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company_name?: string;
  group_id: string | null;
  status_id?: string;
  status?: {
    id: string;
    name: string;
  };
  created_at?: string;
  updated_at?: string;
}

interface CustomerGroup {
  id: string;
  name: string;
  description?: string;
  customer_count?: number;
}

interface ErrorState {
  type: 'network' | 'server' | 'validation';
  message: string;
  retryable: boolean;
}

interface CustomerEditFormState {
  selectedGroupId: string | null;
  groupsLoading: boolean;
  groupsError: string | null;
  groups: CustomerGroup[];
  isSubmitting: boolean;
  submitError: string | null;
}
```

### Modelos de Datos para Actividades

```typescript
enum ActivityType {
  CALL = 'call',
  EMAIL = 'email',
  MEETING = 'meeting',
  NOTE = 'note',
  TASK = 'task',
  FOLLOW_UP = 'follow_up',
  PURCHASE = 'purchase',
  SUPPORT = 'support'
}

enum ActivityStatus {
  COMPLETED = 'completed',
  SCHEDULED = 'scheduled',
  CANCELLED = 'cancelled',
  IN_PROGRESS = 'in_progress'
}

enum ActivityOutcome {
  SATISFIED = 'satisfied',
  ISSUE_RESOLVED = 'issue_resolved',
  ESCALATED = 'escalated',
  FOLLOW_UP_NEEDED = 'follow_up_needed'
}

interface CustomerActivity {
  id: string;
  customer_id: number;
  type: ActivityType;
  status: ActivityStatus;
  title: string;
  description?: string;
  activity_date: string;
  duration_minutes?: number;
  outcome?: ActivityOutcome;
  follow_up_date?: string;
  notes?: string;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at?: string;
}

interface ActivitySummary {
  total_activities: number;
  activities_by_type: Record<ActivityType, number>;
  activities_by_status: Record<ActivityStatus, number>;
  last_activity_date?: string;
  next_follow_up?: string;
}

interface CreateActivityRequest {
  type: ActivityType;
  status: ActivityStatus;
  title: string;
  description?: string;
  duration_minutes?: number;
  outcome?: ActivityOutcome;
  follow_up_date?: string;
  notes?: string;
  metadata?: Record<string, any>;
}

interface UpdateActivityRequest {
  type?: ActivityType;
  status?: ActivityStatus;
  title?: string;
  description?: string;
  duration_minutes?: number;
  outcome?: ActivityOutcome;
  follow_up_date?: string;
  notes?: string;
  metadata?: Record<string, any>;
}
```

### Componente CustomerGroupDropdown

**Responsabilidades**:
- Mostrar lista de grupos disponibles
- Obtener grupos de la API
- Manejar selección de grupo
- Mostrar contadores de customers por grupo
- Manejar estados de carga y error

**Métodos Clave**:
- `loadGroups()`: Obtener grupos de GET /api/customer-groups
- `selectGroup(groupId)`: Filtrar tabla por grupo
- `selectViewAll()`: Mostrar todos los customers
- `retryLoadGroups()`: Reintentar carga fallida

**Propiedades de Entrada**:
- `selectedGroupId: string | null` - Grupo actualmente seleccionado
- `onGroupSelect: (groupId) => void` - Callback cuando se selecciona grupo

### Componente CustomerEditModal

**Responsabilidades**:
- Mostrar formulario de edición de customer
- Permitir cambio de grupo
- Validar datos
- Enviar cambios a la API

**Métodos Clave**:
- `loadCustomer(customerId)`: Cargar datos del customer
- `loadGroups()`: Obtener grupos disponibles
- `saveCustomer()`: Guardar cambios via PUT /api/customers/{id}
- `cancel()`: Cerrar modal sin guardar

**Propiedades de Entrada**:
- `customerId: string` - ID del customer a editar
- `onSave: (customer) => void` - Callback cuando se guarda
- `onCancel: () => void` - Callback cuando se cancela

### Componente FilterIndicator

**Responsabilidades**:
- Mostrar indicadores visuales de filtros activos
- Permitir limpiar filtros
- Mostrar qué filtros están aplicados

**Métodos Clave**:
- `getActiveFilters()`: Obtener lista de filtros activos
- `clearFilter(filterType)`: Limpiar un filtro específico
- `clearAllFilters()`: Limpiar todos los filtros

### Componente CustomerActivitiesList

**Responsabilidades**:
- Mostrar lista de actividades del customer
- Obtener actividades de la API
- Manejar paginación
- Permitir crear y editar actividades
- Mostrar detalles de actividades

**Métodos Clave**:
- `loadActivities()`: Obtener actividades de GET /api/tenant/customers/{customerId}/activities
- `loadActivitySummary()`: Obtener resumen de GET /api/tenant/customers/{customerId}/activities/summary
- `createActivity(request)`: Crear actividad via POST
- `updateActivity(activityId, request)`: Actualizar actividad via PATCH
- `openActivityDetail(activityId)`: Abrir modal de detalle

**Propiedades de Entrada**:
- `customerId: number` - ID del customer
- `onActivityCreated: () => void` - Callback cuando se crea actividad
- `onActivityUpdated: () => void` - Callback cuando se actualiza actividad

### Componente CustomerAddressSection

**Responsabilidades**:
- Mostrar dirección del customer
- Permitir editar dirección
- Validar datos de dirección

**Métodos Clave**:
- `loadAddress()`: Cargar dirección del customer
- `editAddress()`: Abrir modal de edición
- `saveAddress()`: Guardar cambios de dirección

### Componente CustomerStatusSection

**Responsabilidades**:
- Mostrar estado actual del customer
- Mostrar información de estado
- Permitir cambiar estado

**Métodos Clave**:
- `loadStatus()`: Cargar estado del customer
- `changeStatus(newStatus)`: Cambiar estado del customer

## Modelos de Datos

### Formatos de Respuesta de API

**GET /api/customer-groups**
```json
{
  "groups": [
    {
      "id": "uuid-1",
      "name": "Enterprise Clients",
      "description": "Large enterprise customers",
      "customer_count": 45
    },
    {
      "id": "uuid-2",
      "name": "SMEs",
      "description": "Small and medium business customers",
      "customer_count": 120
    }
  ]
}
```

**GET /api/customers?group_id={groupId}&page=1&limit=20**
```json
{
  "data": [
    {
      "id": "uuid-789",
      "name": "John Smith",
      "email": "john@example.com",
      "phone": "+1234567890",
      "company_name": "Acme Corp",
      "group_id": "uuid-1",
      "status_id": "active",
      "status": {
        "id": "active",
        "name": "Active"
      },
      "created_at": "2026-02-10T10:30:00Z"
    }
  ],
  "total": 45,
  "page": 1,
  "pageSize": 20
}
```

**PUT /api/customers/{id}**
```json
{
  "name": "John Smith",
  "email": "john@example.com",
  "phone": "+1234567890",
  "company_name": "Acme Corp",
  "group_id": "uuid-2"
}
```

### Estructura de Estado Local

```typescript
interface CustomersTableComponentState {
  // Datos de customers
  customers: Customer[];
  isLoadingCustomers: boolean;
  customersError: ErrorState | null;
  
  // Datos de grupos
  groups: CustomerGroup[];
  isLoadingGroups: boolean;
  groupsError: ErrorState | null;
  
  // Estado de filtros
  selectedGroupId: string | null;
  searchTerm: string | null;
  selectedStatusId: string | null;
  
  // Paginación
  page: number;
  limit: number;
  totalResults: number;
  
  // Estado de UI
  lastRefresh: number;
}
```

## Manejo de Errores

### Tipos de Error y Respuestas

**Errores de Red**:
- Mostrar: "No se puede conectar. Por favor, verifica tu conexión a internet."
- Reintentable: Sí
- Acción: Mostrar botón de reintentar

**Errores de Servidor (5xx)**:
- Mostrar: "Error del servidor. Por favor, intenta más tarde."
- Reintentable: Sí
- Acción: Mostrar botón de reintentar

**Errores de Validación (4xx)**:
- Mostrar: Mensaje de validación específico
- Reintentable: No
- Acción: Mostrar errores del formulario, sin botón de reintentar

**Timeout de API**:
- Mostrar: "La solicitud expiró. Por favor, intenta de nuevo."
- Reintentable: Sí
- Acción: Mostrar botón de reintentar

### Estrategia de Recuperación de Errores

1. **Reintentos Automáticos**: Los errores de red se reintentan automáticamente después de 2 segundos
2. **Reintentos Iniciados por Usuario**: El usuario puede hacer clic en el botón de reintentar para cualquier error reintentable
3. **Degradación Elegante**: Si la carga de grupos falla, mostrar estado de error; si la tabla falla, mostrar error en la tabla
4. **Registro de Errores**: Todos los errores se registran para depuración y monitoreo

## Estrategia de Pruebas

### Enfoque de Pruebas Unitarias

Las pruebas unitarias validan ejemplos específicos, casos límite y condiciones de error:

- **Renderizado de Componentes**: Verificar que los componentes se renderizan correctamente con varias props
- **Interacciones del Usuario**: Probar clics de botones, selecciones de grupos, búsqueda
- **Formato de Datos**: Probar formato de fechas, truncamiento de texto, validación de emails
- **Manejo de Errores**: Probar visualización de mensajes de error y funcionalidad de reintentar
- **Gestión de Estado**: Probar actualizaciones de estado y transiciones

### Enfoque de Pruebas Basadas en Propiedades

Las pruebas basadas en propiedades verifican propiedades universales en todas las entradas:

- **Consistencia de Datos**: Las propiedades verifican que los datos se muestren correctamente
- **Lógica de Validación**: Las propiedades verifican que la validación funcione para todas las entradas
- **Transiciones de Estado**: Las propiedades verifican que los estados se actualicen después de operaciones
- **Responsividad de UI**: Las propiedades verifican estados de carga e indicadores
- **Interacciones del Usuario**: Las propiedades verifican comportamiento de modales y navegación

### Configuración de Pruebas

- **Iteraciones Mínimas**: 100 iteraciones por prueba basada en propiedades
- **Etiquetado de Pruebas**: Cada prueba etiquetada con nombre de característica y número de propiedad
- **Objetivo de Cobertura**: Todos los criterios de aceptación comprobables cubiertos por propiedades o pruebas unitarias
- **Pruebas Complementarias**: Las pruebas unitarias manejan ejemplos específicos; las pruebas basadas en propiedades manejan propiedades universales

### Herramientas de Pruebas

- **Pruebas Unitarias**: Jasmine/Karma (framework de pruebas de Angular)
- **Pruebas Basadas en Propiedades**: fast-check (librería de pruebas basadas en propiedades para JavaScript)
- **Pruebas de Componentes**: Angular TestBed para aislamiento de componentes
- **Pruebas E2E**: Cypress para flujos de usuario completos (opcional, no parte de la implementación principal)
