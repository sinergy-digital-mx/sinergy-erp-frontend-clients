# Documento de Requisitos: Dashboard de Customers con Filtro de Grupos

## Introducción

Esta característica añade un dashboard de customers similar al de leads, con un dropdown de filtrado por grupos de customers. Los usuarios pueden ver rápidamente todos los customers, filtrar por grupo, buscar, y cambiar el grupo de un customer mediante un modal de edición. El sistema incluye paginación, contadores de customers por grupo, y estados visuales de carga y error.

## Glosario

- **Customer**: Un cliente registrado en el sistema
- **Customer_Group**: Una categoría o clasificación de customers (ej: Enterprise Clients, SMEs)
- **Group_Filter_Dropdown**: Dropdown que muestra todos los grupos de customers disponibles
- **Lead_Count_Badge**: Un indicador numérico que muestra cuántos customers pertenecen a un grupo
- **Customer_Edit_Modal**: Modal para editar información del customer, incluyendo cambio de grupo
- **Status**: Estado del customer (activo, inactivo, etc.)

## Requisitos

### Requisito 1: Mostrar Dashboard de Customers

**Historia de Usuario:** Como gerente de ventas, quiero ver todos los customers en un dashboard similar al de leads, para gestionar mis clientes de forma centralizada.

#### Criterios de Aceptación

1. WHEN la página de customers se carga, THE sistema SHALL mostrar una tabla con todos los customers
2. WHEN la tabla se muestra, THE sistema SHALL incluir columnas: Nombre, Email, Teléfono, Empresa, Grupo, Estado, Fecha de Creación, Acciones
3. WHEN la tabla se muestra, THE sistema SHALL mostrar un máximo de 20 customers por página
4. WHEN la tabla se muestra, THE sistema SHALL incluir paginación con botones Anterior/Siguiente
5. WHEN la tabla está vacía, THE sistema SHALL mostrar un estado vacío con mensaje "No customers found"

### Requisito 2: Crear Dropdown de Filtro de Grupos

**Historia de Usuario:** Como gerente de ventas, quiero filtrar customers por grupo, para enfocarse en un segmento específico de clientes.

#### Criterios de Aceptación

1. WHEN la página de customers se carga, THE sistema SHALL mostrar un dropdown con opciones de filtro de grupos
2. WHEN el dropdown se muestra, THE sistema SHALL obtener todos los grupos disponibles de GET /api/customer-groups
3. WHEN los grupos se están cargando, THE sistema SHALL mostrar un indicador de carga en el dropdown
4. WHEN los grupos fallan al cargar, THE sistema SHALL mostrar un mensaje de error con opción de reintentar
5. WHEN los grupos se cargan exitosamente, THE sistema SHALL mostrar una lista de todos los grupos disponibles
6. WHEN el dropdown se muestra, THE sistema SHALL incluir una opción "Ver Todos" al inicio de la lista

### Requisito 3: Mostrar Contadores de Customers por Grupo

**Historia de Usuario:** Como gerente de ventas, quiero saber cuántos customers hay en cada grupo, para priorizar mi trabajo.

#### Criterios de Aceptación

1. WHEN un grupo se muestra en el dropdown, THE sistema SHALL mostrar un badge con el número de customers en ese grupo
2. WHEN el badge de conteo se muestra, THE sistema SHALL usar un tamaño compacto (máximo 30px de ancho)
3. WHEN el badge de conteo se muestra, THE sistema SHALL usar color gris claro para no distraer
4. WHEN un usuario selecciona un grupo, THE badge de conteo SHALL permanecer visible
5. WHEN el conteo de customers cambia, THE sistema SHALL actualizar el badge automáticamente

### Requisito 4: Implementar Filtrado por Grupo

**Historia de Usuario:** Como gerente de ventas, quiero seleccionar un grupo y ver solo los customers de ese grupo.

#### Criterios de Aceptación

1. WHEN un usuario selecciona un grupo en el dropdown, THE tabla de customers SHALL filtrar usando GET /api/customers?group_id={groupId}
2. WHEN un grupo está seleccionado, THE dropdown SHALL mostrar un estilo visual diferente (ej: fondo resaltado)
3. WHEN un usuario hace clic en "Ver Todos", THE tabla SHALL mostrar todos los customers sin filtro de grupo
4. WHEN un usuario hace clic en "Ver Todos", THE sistema SHALL llamar a GET /api/customers sin parámetro group_id
5. WHEN un filtro de grupo está activo, THE sistema SHALL mostrar un indicador visual indicando qué grupo está filtrado
6. WHEN un filtro de grupo está activo, THE sistema SHALL mantener el filtro cuando se navega entre páginas

### Requisito 5: Implementar Búsqueda de Customers

**Historia de Usuario:** Como gerente de ventas, quiero buscar customers por nombre, email, teléfono o empresa.

#### Criterios de Aceptación

1. WHEN la página de customers se carga, THE sistema SHALL mostrar un campo de búsqueda
2. WHEN un usuario escribe en el campo de búsqueda, THE tabla SHALL filtrar usando GET /api/customers?search={searchTerm}
3. WHEN un usuario busca, THE búsqueda SHALL funcionar en nombre, email, teléfono y empresa
4. WHEN un usuario busca, THE sistema SHALL resetear a la página 1
5. WHEN un usuario limpia la búsqueda, THE tabla SHALL mostrar todos los customers nuevamente

### Requisito 6: Implementar Filtro de Estado

**Historia de Usuario:** Como gerente de ventas, quiero filtrar customers por estado, para ver solo clientes activos o inactivos.

#### Criterios de Aceptación

1. WHEN la página de customers se carga, THE sistema SHALL mostrar opciones de filtro de estado
2. WHEN un usuario selecciona un estado, THE tabla SHALL filtrar usando GET /api/customers?status_id={statusId}
3. WHEN un usuario selecciona un estado, THE sistema SHALL resetear a la página 1
4. WHEN un usuario limpia el filtro de estado, THE tabla SHALL mostrar todos los customers nuevamente

### Requisito 7: Crear Modal de Edición de Customer

**Historia de Usuario:** Como gerente de ventas, quiero editar información del customer, incluyendo cambiar su grupo.

#### Criterios de Aceptación

1. WHEN un usuario hace clic en el botón "Edit" de un customer, THE sistema SHALL abrir un modal de edición
2. WHEN el modal se abre, THE sistema SHALL cargar los datos actuales del customer
3. WHEN el modal se muestra, THE sistema SHALL incluir un dropdown para cambiar el grupo del customer
4. WHEN el usuario cambia el grupo, THE sistema SHALL mostrar el nuevo grupo seleccionado
5. WHEN el usuario hace clic en "Guardar", THE sistema SHALL llamar a PUT /api/customers/{id} con los datos actualizados
6. WHEN la actualización es exitosa, THE modal SHALL cerrarse y la tabla se actualizará
7. WHEN la actualización falla, THE sistema SHALL mostrar un mensaje de error

### Requisito 8: Manejar Estados de Carga y Error

**Historia de Usuario:** Como gerente de ventas, quiero retroalimentación clara sobre el estado de carga de datos.

#### Criterios de Aceptación

1. WHEN los customers se están cargando, THE sistema SHALL mostrar un indicador de carga en la tabla
2. WHEN los customers fallan al cargar, THE sistema SHALL mostrar un mensaje de error descriptivo
3. WHEN los customers fallan al cargar, THE sistema SHALL proporcionar un botón de reintentar
4. WHEN un usuario hace clic en reintentar, THE sistema SHALL llamar nuevamente a GET /api/customers
5. WHEN un error de red ocurre, THE sistema SHALL mostrar un mensaje indicando problemas de conectividad
6. WHEN un error de servidor ocurre, THE sistema SHALL mostrar un mensaje indicando problemas del servidor

### Requisito 9: Diseño Responsivo

**Historia de Usuario:** Como gerente de ventas usando varios dispositivos, quiero que el dashboard funcione bien en móvil, tablet y desktop.

#### Criterios de Aceptación

1. WHEN el dashboard se muestra en dispositivos móviles, THE tabla SHALL ser responsive y scrolleable horizontalmente
2. WHEN el dashboard se muestra en dispositivos móviles, THE dropdown de filtro SHALL ocupar el ancho completo
3. WHEN el dashboard se muestra en tablet, THE tabla SHALL ser legible con tamaño moderado
4. WHEN el dashboard se muestra en desktop, THE tabla SHALL mostrar todas las columnas claramente visibles
5. WHEN el modal de edición se muestra en móvil, THE modal SHALL ocupar el ancho completo con márgenes

### Requisito 10: Integración con Tabla de Customers Existente

**Historia de Usuario:** Como desarrollador, quiero que el dashboard se integre sin problemas con la tabla de customers existente.

#### Criterios de Aceptación

1. WHEN la tabla de customers se renderiza, THE dropdown de filtro de grupos SHALL aparecer en la barra superior
2. WHEN la tabla de customers se renderiza, THE campo de búsqueda SHALL aparecer en la barra superior
3. WHEN múltiples filtros están activos (grupo Y búsqueda Y estado), THE tabla SHALL aplicar todos los filtros simultáneamente
4. WHEN múltiples filtros están activos, THE sistema SHALL mostrar indicadores visuales para todos los filtros
5. WHEN un usuario limpia un filtro, THE tabla SHALL actualizar inmediatamente sin recargar la página
6. WHEN la tabla se actualiza, THE datos de customers SHALL reflejar los datos más recientes

### Requisito 11: Mostrar Detalle de Customer

**Historia de Usuario:** Como gerente de ventas, quiero ver los detalles completos de un customer, incluyendo su dirección, estado y actividades.

#### Criterios de Aceptación

1. WHEN un usuario hace clic en un customer en la tabla, THE sistema SHALL navegar a la página de detalle del customer
2. WHEN la página de detalle se carga, THE sistema SHALL mostrar información básica del customer (nombre, email, teléfono, empresa)
3. WHEN la página de detalle se carga, THE sistema SHALL mostrar la dirección del customer
4. WHEN la página de detalle se carga, THE sistema SHALL mostrar el estado actual del customer
5. WHEN la página de detalle se carga, THE sistema SHALL mostrar un botón para editar la información del customer
6. WHEN la página de detalle se carga, THE sistema SHALL mostrar un botón para editar la dirección del customer

### Requisito 12: Mostrar Actividades del Customer

**Historia de Usuario:** Como gerente de ventas, quiero ver todas las actividades asociadas a un customer, para entender el historial de interacciones.

#### Criterios de Aceptación

1. WHEN la página de detalle del customer se carga, THE sistema SHALL mostrar una sección de actividades
2. WHEN la sección de actividades se muestra, THE sistema SHALL obtener actividades de GET /api/tenant/customers/{customerId}/activities
3. WHEN las actividades se están cargando, THE sistema SHALL mostrar un indicador de carga
4. WHEN las actividades fallan al cargar, THE sistema SHALL mostrar un mensaje de error con opción de reintentar
5. WHEN las actividades se cargan exitosamente, THE sistema SHALL mostrar una lista de todas las actividades
6. WHEN la lista de actividades se muestra, THE sistema SHALL incluir columnas: Tipo, Título, Estado, Fecha, Duración, Resultado
7. WHEN la lista de actividades se muestra, THE sistema SHALL incluir paginación con límite de 10 actividades por página
8. WHEN un usuario hace clic en una actividad, THE sistema SHALL mostrar los detalles completos de la actividad

### Requisito 13: Crear Nueva Actividad

**Historia de Usuario:** Como gerente de ventas, quiero crear nuevas actividades para un customer, para registrar mis interacciones.

#### Criterios de Aceptación

1. WHEN la página de detalle del customer se muestra, THE sistema SHALL mostrar un botón "Nueva Actividad"
2. WHEN un usuario hace clic en "Nueva Actividad", THE sistema SHALL abrir un modal de creación
3. WHEN el modal se abre, THE sistema SHALL mostrar campos para: Tipo, Título, Descripción, Estado, Duración, Resultado, Fecha de Seguimiento
4. WHEN el usuario completa el formulario y hace clic en "Guardar", THE sistema SHALL llamar a POST /api/tenant/customers/{customerId}/activities
5. WHEN la creación es exitosa, THE modal SHALL cerrarse y la lista de actividades se actualizará
6. WHEN la creación falla, THE sistema SHALL mostrar un mensaje de error

### Requisito 14: Editar Actividad

**Historia de Usuario:** Como gerente de ventas, quiero editar actividades existentes, para corregir información o actualizar el estado.

#### Criterios de Aceptación

1. WHEN un usuario hace clic en una actividad en la lista, THE sistema SHALL abrir un modal de edición
2. WHEN el modal se abre, THE sistema SHALL cargar los datos actuales de la actividad
3. WHEN el usuario modifica los datos y hace clic en "Guardar", THE sistema SHALL llamar a PATCH /api/tenant/customers/{customerId}/activities/{activityId}
4. WHEN la actualización es exitosa, THE modal SHALL cerrarse y la lista de actividades se actualizará
5. WHEN la actualización falla, THE sistema SHALL mostrar un mensaje de error

### Requisito 15: Mostrar Resumen de Actividades

**Historia de Usuario:** Como gerente de ventas, quiero ver un resumen de las actividades del customer, para entender rápidamente el nivel de engagement.

#### Criterios de Aceptación

1. WHEN la página de detalle del customer se carga, THE sistema SHALL mostrar un resumen de actividades
2. WHEN el resumen se muestra, THE sistema SHALL obtener datos de GET /api/tenant/customers/{customerId}/activities/summary
3. WHEN el resumen se muestra, THE sistema SHALL mostrar: Total de actividades, Actividades por tipo, Actividades por estado, Última actividad, Próximo seguimiento
4. WHEN el resumen se muestra, THE sistema SHALL usar tarjetas o badges para mostrar los datos de forma visual

