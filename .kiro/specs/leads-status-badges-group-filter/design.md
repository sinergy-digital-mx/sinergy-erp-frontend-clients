# Documento de Diseño: Badges de Estado y Filtro de Grupos en Tabla de Leads

## Descripción General

Esta característica extiende la tabla de leads con indicadores visuales de estado de comunicación y un panel lateral de filtrado por grupos. El sistema muestra badges compactos con iconos que indican si un lead ha sido contactado, respondió, o aún no ha sido contactado. Además, proporciona un panel lateral que permite filtrar leads por grupo, con contadores de leads por grupo y una opción para ver todos los leads.

El diseño prioriza:
- Indicadores visuales claros y compactos que no interfieren con la tabla
- Filtrado flexible que permite combinar filtros de estado y grupo
- Carga y manejo de errores graceful para datos de grupos
- Diseño responsivo para todos los tamaños de dispositivo
- Integración sin problemas con la tabla de leads existente

## Arquitectura

### Jerarquía de Componentes

```
LeadsListPage
├── LeadGroupFilterSidebar
│   ├── GroupLoadingState
│   ├── GroupErrorState
│   ├── GroupList
│   │   ├── ViewAllOption
│   │   └── GroupListItem (repeated)
│   │       └── LeadCountBadge
│   └── GroupSelectionIndicator
├── DatatableWrapper
│   ├── StatusBadgeColumn
│   │   └── StatusBadge (repeated)
│   │       ├── StatusIcon
│   │       ├── StatusText
│   │       └── StatusTooltip
│   ├── FilterIndicator
│   └── LeadTableRows
└── FilterStateManager
```

### Flujo de Datos

1. **Carga Inicial**: Cuando se carga la página de leads, LeadGroupFilterSidebar obtiene grupos de GET /api/lead-groups
2. **Selección de Grupo**: Usuario hace clic en un grupo → sistema filtra tabla usando GET /api/leads?group_id={groupId}
3. **Filtro de Estado**: Usuario hace clic en un badge de estado → tabla filtra por estado de comunicación
4. **Filtros Combinados**: Cuando ambos filtros están activos, la tabla aplica ambos simultáneamente
5. **Actualización**: Cuando se cambia un filtro, la tabla se actualiza sin recargar la página

### Gestión de Estado

El componente usa un modelo de estado jerárquico:

```
LeadsTableState
├── leads: Lead[]
├── groups: LeadGroup[]
├── selectedGroupId: string | null
├── selectedStatusFilter: CommunicationStatus | null
├── isLoadingGroups: boolean
├── isLoadingLeads: boolean
├── groupsError: ErrorState | null
├── leadsError: ErrorState | null
├── sidebarCollapsed: boolean (mobile only)
└── lastRefresh: timestamp
```

## Componentes e Interfaces

### Modelos de Datos Principales

```typescript
interface Lead {
  id: string;
  name: string;
  email: string;
  email_contacted: boolean;
  first_email_sent_at: string | null; // ISO 8601 timestamp
  customer_answered: boolean;
  customer_answered_at: string | null; // ISO 8601 timestamp
  group_id: string;
  [key: string]: any; // Other lead properties
}

interface LeadGroup {
  id: string;
  name: string;
  description?: string;
  lead_count: number;
}

enum CommunicationStatus {
  NOT_CONTACTED = 'not_contacted',
  CONTACTED = 'contacted',
  RESPONDED = 'responded'
}

interface StatusBadgeData {
  status: CommunicationStatus;
  label: string;
  icon: string;
  color: string;
  tooltip: string;
}

interface ErrorState {
  type: 'network' | 'server' | 'validation';
  message: string;
  retryable: boolean;
}
```

### Componente StatusBadge

**Responsabilidades**:
- Mostrar el estado de comunicación de un lead
- Renderizar icono y texto del badge
- Mostrar tooltip con fecha relevante
- Manejar clics para filtrar por estado
- Indicar visualmente cuando el filtro está activo

**Métodos Clave**:
- `getStatusFromLead(lead)`: Determinar estado basado en propiedades del lead
- `formatTooltipDate(date)`: Formatear fecha para tooltip
- `onBadgeClick()`: Manejar clic para filtrar
- `isFilterActive()`: Verificar si este estado está filtrado

**Propiedades de Entrada**:
- `lead: Lead` - Datos del lead
- `isFilterActive: boolean` - Si este estado está siendo filtrado
- `onStatusFilterChange: (status) => void` - Callback cuando se hace clic

### Componente LeadGroupFilterSidebar

**Responsabilidades**:
- Mostrar lista de grupos disponibles
- Obtener grupos de la API
- Manejar selección de grupo
- Mostrar contadores de leads por grupo
- Manejar estados de carga y error
- Ser colapsable en dispositivos móviles

**Métodos Clave**:
- `loadGroups()`: Obtener grupos de GET /api/lead-groups
- `selectGroup(groupId)`: Filtrar tabla por grupo
- `selectViewAll()`: Mostrar todos los leads
- `retryLoadGroups()`: Reintentar carga fallida
- `toggleSidebar()`: Colapsar/expandir en móvil

**Propiedades de Entrada**:
- `selectedGroupId: string | null` - Grupo actualmente seleccionado
- `onGroupSelect: (groupId) => void` - Callback cuando se selecciona grupo
- `onViewAllClick: () => void` - Callback para "Ver Todos"

### Componente FilterIndicator

**Responsabilidades**:
- Mostrar indicadores visuales de filtros activos
- Permitir limpiar filtros
- Mostrar qué filtros están aplicados

**Métodos Clave**:
- `getActiveFilters()`: Obtener lista de filtros activos
- `clearFilter(filterType)`: Limpiar un filtro específico
- `clearAllFilters()`: Limpiar todos los filtros

## Modelos de Datos

### Formatos de Respuesta de API

**GET /api/lead-groups**
```json
{
  "groups": [
    {
      "id": "group-123",
      "name": "Enterprise Clients",
      "description": "Large enterprise customers",
      "lead_count": 45
    },
    {
      "id": "group-456",
      "name": "SMB Clients",
      "description": "Small and medium business customers",
      "lead_count": 120
    }
  ]
}
```

**GET /api/leads?group_id={groupId}**
```json
{
  "leads": [
    {
      "id": "lead-789",
      "name": "John Smith",
      "email": "john@example.com",
      "email_contacted": true,
      "first_email_sent_at": "2026-02-10T10:30:00Z",
      "customer_answered": false,
      "customer_answered_at": null,
      "group_id": "group-123"
    }
  ],
  "total": 45,
  "page": 1,
  "pageSize": 20
}
```

### Estructura de Estado Local

```typescript
interface LeadsTableComponentState {
  // Datos de leads
  leads: Lead[];
  isLoadingLeads: boolean;
  leadsError: ErrorState | null;
  
  // Datos de grupos
  groups: LeadGroup[];
  isLoadingGroups: boolean;
  groupsError: ErrorState | null;
  
  // Estado de filtros
  selectedGroupId: string | null;
  selectedStatusFilter: CommunicationStatus | null;
  
  // Estado de UI
  sidebarCollapsed: boolean;
  lastRefresh: number;
}
```

### Mapeo de Estados de Comunicación

```typescript
const STATUS_CONFIG = {
  [CommunicationStatus.NOT_CONTACTED]: {
    label: 'No Contactado',
    icon: 'pi-envelope-open',
    color: '#9CA3AF', // Gray
    tooltip: 'Sin contactar'
  },
  [CommunicationStatus.CONTACTED]: {
    label: 'Contactado',
    icon: 'pi-envelope',
    color: '#3B82F6', // Blue
    tooltip: (date) => `Contactado: ${formatDate(date)}`
  },
  [CommunicationStatus.RESPONDED]: {
    label: 'Respondido',
    icon: 'pi-check',
    color: '#10B981', // Green
    tooltip: (date) => `Respondido: ${formatDate(date)}`
  }
};
```

## Propiedades de Corrección

Una propiedad es una característica o comportamiento que debe ser verdadero en todas las ejecuciones válidas del sistema—esencialmente, una declaración formal sobre lo que el sistema debe hacer. Las propiedades sirven como puente entre especificaciones legibles por humanos y garantías de corrección verificables por máquina.

### Descripción General de Pruebas Basadas en Propiedades

Las pruebas basadas en propiedades (PBT) validan la corrección del software probando propiedades universales en muchas entradas generadas. Cada propiedad es una especificación formal que debe cumplirse para todas las entradas válidas.

**Principios Centrales**:
1. **Cuantificación Universal**: Cada propiedad debe contener una declaración explícita "para todos"
2. **Trazabilidad de Requisitos**: Cada propiedad debe referenciar los requisitos que valida
3. **Especificaciones Ejecutables**: Las propiedades deben ser implementables como pruebas automatizadas
4. **Cobertura Integral**: Las propiedades deben cubrir todos los criterios de aceptación comprobables

### Propiedades de Corrección

Property 1: Badge display for all leads
*For any* lead in the leads table, a status badge should be displayed next to the lead's name.
**Validates: Requirements 1.1**

Property 2: Not Contacted badge rendering
*For any* lead with email_contacted=false, the badge should display "No Contactado" text with gray color.
**Validates: Requirements 1.2**

Property 3: Contacted badge rendering
*For any* lead with email_contacted=true AND customer_answered=false, the badge should display "Contactado" text with blue color.
**Validates: Requirements 1.3**

Property 4: Responded badge rendering
*For any* lead with customer_answered=true, the badge should display "Respondido" text with green color.
**Validates: Requirements 1.4**

Property 5: Badge compact size
*For any* status badge displayed in a table cell, the badge width should not exceed 20% of the cell width.
**Validates: Requirements 1.5**

Property 6: Not Contacted icon display
*For any* lead with email_contacted=false, the badge should display an envelope-open icon.
**Validates: Requirements 2.1**

Property 7: Contacted icon display
*For any* lead with email_contacted=true AND customer_answered=false, the badge should display an envelope icon.
**Validates: Requirements 2.2**

Property 8: Responded icon display
*For any* lead with customer_answered=true, the badge should display a checkmark icon.
**Validates: Requirements 2.3**

Property 9: Icon positioning
*For any* status badge with an icon, the icon should be positioned to the left of the badge text.
**Validates: Requirements 2.4**

Property 10: Not Contacted tooltip
*For any* lead with email_contacted=false, hovering over the badge should display a tooltip with text "Sin contactar".
**Validates: Requirements 3.1**

Property 11: Contacted tooltip with date
*For any* lead with email_contacted=true AND customer_answered=false AND first_email_sent_at is not null, hovering over the badge should display a tooltip with the formatted date.
**Validates: Requirements 3.2**

Property 12: Responded tooltip with date
*For any* lead with customer_answered=true AND customer_answered_at is not null, hovering over the badge should display a tooltip with the formatted date.
**Validates: Requirements 3.3**

Property 13: Null date handling in tooltip
*For any* lead where the relevant date field is null, the tooltip should display "Fecha no disponible".
**Validates: Requirements 3.4, 3.5**

Property 14: Date format in tooltip
*For any* date displayed in a tooltip, it should be formatted as "dd/MM/yyyy HH:mm".
**Validates: Requirements 3.6**

Property 15: Status badge filtering
*For any* status badge clicked, the leads table should filter to show only leads with that communication status.
**Validates: Requirements 4.1**

Property 16: Active badge styling
*For any* status badge that is currently filtering the table, the badge should display with a different visual style (e.g., thicker border).
**Validates: Requirements 4.2**

Property 17: Badge filter toggle
*For any* active status filter, clicking the badge again should remove the filter and show all leads.
**Validates: Requirements 4.3**

Property 18: Filter indicator display
*For any* active status filter, the table should display a visual indicator showing which filter is active.
**Validates: Requirements 4.4**

Property 19: Filter persistence across pages
*For any* active status filter, navigating between table pages should maintain the filter.
**Validates: Requirements 4.5**

Property 20: Group sidebar display
*For any* leads list page load, a group filter sidebar should be displayed.
**Validates: Requirements 5.1**

Property 21: Group API call
*For any* group filter sidebar display, the system should call GET /api/lead-groups to fetch available groups.
**Validates: Requirements 5.2**

Property 22: Group loading indicator
*For any* group fetch operation in progress, the sidebar should display a loading indicator.
**Validates: Requirements 5.3**

Property 23: Group error handling
*For any* failed group fetch request, the sidebar should display an error message with a retry option.
**Validates: Requirements 5.4**

Property 24: Group list display
*For any* set of groups returned from the API, all groups should be displayed in the sidebar.
**Validates: Requirements 5.5**

Property 25: View All option presence
*For any* group filter sidebar, a "Ver Todos" option should be present at the start of the group list.
**Validates: Requirements 5.6**

Property 26: Lead count badge display
*For any* group in the sidebar, a badge displaying the lead count should be shown next to the group name.
**Validates: Requirements 6.1**

Property 27: Lead count badge size
*For any* lead count badge displayed, the badge width should not exceed 30px.
**Validates: Requirements 6.2**

Property 28: Lead count badge visibility on selection
*For any* selected group, the lead count badge should remain visible.
**Validates: Requirements 6.4**

Property 29: Lead count badge update
*For any* change in lead count for a group, the badge should update automatically.
**Validates: Requirements 6.5**

Property 30: Group filtering API call
*For any* group selected in the sidebar, the system should call GET /api/leads?group_id={groupId} with the correct group ID.
**Validates: Requirements 7.1**

Property 31: Selected group styling
*For any* selected group in the sidebar, the group should display with a different visual style (e.g., highlighted background).
**Validates: Requirements 7.2**

Property 32: View All filtering
*For any* "Ver Todos" option clicked, the table should display all leads without group filtering.
**Validates: Requirements 7.3**

Property 33: View All API call
*For any* "Ver Todos" option clicked, the system should call GET /api/leads without the group_id parameter.
**Validates: Requirements 7.4**

Property 34: Group filter indicator
*For any* active group filter, the table should display a visual indicator showing which group is filtered.
**Validates: Requirements 7.5**

Property 35: Group filter persistence across pages
*For any* active group filter, navigating between table pages should maintain the filter.
**Validates: Requirements 7.6**

Property 36: Group loading state display
*For any* group fetch operation in progress, a loading spinner should be displayed in the sidebar.
**Validates: Requirements 8.1**

Property 37: Group error message display
*For any* failed group fetch, an error message should be displayed in the sidebar.
**Validates: Requirements 8.2**

Property 38: Group retry button presence
*For any* failed group fetch, a retry button should be present.
**Validates: Requirements 8.3**

Property 39: Group retry functionality
*For any* retry button clicked after a failed group fetch, the system should call GET /api/lead-groups again.
**Validates: Requirements 8.4**

Property 40: Mobile badge compactness
*For any* status badge displayed on a mobile device (viewport width < 768px), the badge should not exceed 15% of the cell width.
**Validates: Requirements 9.1**

Property 41: Mobile sidebar collapsibility
*For any* group filter sidebar on a mobile device, the sidebar should be collapsible or slideable.
**Validates: Requirements 9.2**

Property 42: Mobile table full width when sidebar collapsed
*For any* mobile device with collapsed sidebar, the leads table should occupy the full width.
**Validates: Requirements 9.3**

Property 43: Mobile table adjustment when sidebar expanded
*For any* mobile device with expanded sidebar, the leads table should adjust or scroll horizontally.
**Validates: Requirements 9.4**

Property 44: Tablet badge readability
*For any* status badge displayed on a tablet device (viewport width 768px-1023px), the badge should be readable with moderate size.
**Validates: Requirements 9.5**

Property 45: Desktop badge visibility
*For any* status badge displayed on a desktop device (viewport width >= 1024px), the badge should display with full size, text, and icons clearly visible.
**Validates: Requirements 9.6**

Property 46: Desktop sidebar width
*For any* group filter sidebar displayed on a desktop device, the sidebar should occupy 20-25% of the screen width.
**Validates: Requirements 9.7**

Property 47: Badge column placement
*For any* leads table rendered, status badges should appear in the lead name column.
**Validates: Requirements 10.1**

Property 48: Sidebar placement
*For any* leads table rendered, the group filter sidebar should appear to the left of the table.
**Validates: Requirements 10.2**

Property 49: Combined filter application
*For any* combination of active status filter and group filter, the table should apply both filters simultaneously.
**Validates: Requirements 10.3**

Property 50: Combined filter indicators
*For any* combination of active filters, the table should display visual indicators for both filters.
**Validates: Requirements 10.4**

Property 51: Filter clearing
*For any* active filter cleared by the user, the table should update immediately without page reload.
**Validates: Requirements 10.5**

Property 52: Badge data freshness
*For any* table update, status badges should reflect the most recent lead data.
**Validates: Requirements 10.6**

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
- **Interacciones del Usuario**: Probar clics de botones, selecciones de grupos, filtrado de estado
- **Formato de Datos**: Probar formato de fechas, truncamiento de texto, validación de emails
- **Manejo de Errores**: Probar visualización de mensajes de error y funcionalidad de reintentar
- **Gestión de Estado**: Probar actualizaciones de estado y transiciones

### Enfoque de Pruebas Basadas en Propiedades

Las pruebas basadas en propiedades verifican propiedades universales en todas las entradas:

- **Consistencia de Datos**: Las propiedades 1-5 verifican que los datos se muestren correctamente
- **Lógica de Validación**: Las propiedades 6-14 verifican que la validación funcione para todas las entradas
- **Transiciones de Estado**: Las propiedades 15-19 verifican que los estados se actualicen después de operaciones
- **Responsividad de UI**: Las propiedades 20-35 verifican estados de carga e indicadores
- **Interacciones del Usuario**: Las propiedades 36-52 verifican comportamiento de modales y navegación
- **Diseño Responsivo**: Las propiedades 40-46 verifican diseños para todos los tamaños de dispositivo

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

</content>
</invoke>
