# Documento de Requisitos: Badges de Estado y Filtro de Grupos en Tabla de Leads

## Introducción

Esta característica añade indicadores visuales de estado de comunicación a la tabla de leads y un panel lateral de filtrado por grupos. Los usuarios pueden ver rápidamente el estado de contacto de cada lead (No Contactado, Contactado, Respondido) mediante badges compactos con iconos. Además, pueden filtrar la tabla de leads por grupo de leads disponibles, con contadores de leads por grupo y una opción para ver todos los leads sin filtro.

## Glosario

- **Lead**: Un cliente potencial o contacto en el sistema
- **Status_Badge**: Un indicador visual compacto que muestra el estado de comunicación de un lead
- **Communication_Status**: El estado actual de comunicación con un lead (No Contactado, Contactado, Respondido)
- **Not_Contacted**: Estado cuando email_contacted es false
- **Contacted**: Estado cuando email_contacted es true pero customer_answered es false
- **Responded**: Estado cuando customer_answered es true
- **Lead_Group**: Una categoría o clasificación de leads
- **Group_Filter_Sidebar**: Panel lateral que muestra todos los grupos de leads disponibles
- **Lead_Count_Badge**: Un indicador numérico que muestra cuántos leads pertenecen a un grupo
- **Tooltip**: Información adicional que aparece al pasar el cursor sobre un elemento
- **first_email_sent_at**: Timestamp ISO 8601 de cuándo se envió el primer email
- **customer_answered_at**: Timestamp ISO 8601 de cuándo el cliente respondió
- **LeadsService**: Servicio que gestiona las operaciones de leads
- **GroupFetchService**: Servicio que obtiene los grupos de leads disponibles

## Requisitos

### Requisito 1: Mostrar Badges de Estado de Comunicación

**Historia de Usuario:** Como representante de ventas, quiero ver el estado de comunicación de cada lead en la tabla, para identificar rápidamente qué leads necesitan seguimiento.

#### Criterios de Aceptación

1. WHEN la tabla de leads se muestra, THE sistema SHALL mostrar un badge de estado junto al nombre de cada lead
2. WHEN email_contacted es false, THE badge SHALL mostrar "No Contactado" con color gris
3. WHEN email_contacted es true AND customer_answered es false, THE badge SHALL mostrar "Contactado" con color azul
4. WHEN customer_answered es true, THE badge SHALL mostrar "Respondido" con color verde
5. WHEN un badge se muestra, THE sistema SHALL usar un tamaño compacto que no ocupe más del 20% del ancho de la celda
6. WHEN un badge se muestra, THE sistema SHALL aplicar estilos de PrimeNG para consistencia visual

### Requisito 2: Añadir Iconos a los Badges

**Historia de Usuario:** Como representante de ventas, quiero ver iconos en los badges para identificar visualmente el estado sin leer el texto.

#### Criterios de Aceptación

1. WHEN el badge muestra "No Contactado", THE sistema SHALL mostrar un icono de sobre vacío (envelope-open)
2. WHEN el badge muestra "Contactado", THE sistema SHALL mostrar un icono de sobre (envelope)
3. WHEN el badge muestra "Respondido", THE sistema SHALL mostrar un icono de marca de verificación (check)
4. WHEN un icono se muestra, THE sistema SHALL posicionarlo a la izquierda del texto del badge
5. WHEN un icono se muestra, THE sistema SHALL usar iconos de PrimeNG para consistencia

### Requisito 3: Implementar Tooltips con Fechas

**Historia de Usuario:** Como representante de ventas, quiero ver cuándo ocurrió cada acción de comunicación, para entender el historial temporal.

#### Criterios de Aceptación

1. WHEN un usuario pasa el cursor sobre un badge "No Contactado", THE tooltip SHALL mostrar "Sin contactar"
2. WHEN un usuario pasa el cursor sobre un badge "Contactado", THE tooltip SHALL mostrar la fecha de first_email_sent_at formateada
3. WHEN un usuario pasa el cursor sobre un badge "Respondido", THE tooltip SHALL mostrar la fecha de customer_answered_at formateada
4. WHEN first_email_sent_at es null, THE tooltip SHALL mostrar "Fecha no disponible"
5. WHEN customer_answered_at es null, THE tooltip SHALL mostrar "Fecha no disponible"
6. WHEN el tooltip se muestra, THE sistema SHALL usar el formato de fecha "dd/MM/yyyy HH:mm"

### Requisito 4: Hacer Badges Clickeables para Filtrar

**Historia de Usuario:** Como representante de ventas, quiero hacer clic en un badge de estado para filtrar la tabla y ver solo los leads con ese estado.

#### Criterios de Aceptación

1. WHEN un usuario hace clic en un badge de estado, THE tabla de leads SHALL filtrar para mostrar solo leads con ese estado
2. WHEN un badge está activo (filtro aplicado), THE badge SHALL mostrar un estilo visual diferente (ej: borde más grueso)
3. WHEN un usuario hace clic en un badge activo, THE filtro SHALL removerse y la tabla mostrará todos los leads
4. WHEN un filtro de estado está activo, THE sistema SHALL mostrar un indicador visual en la tabla indicando el filtro activo
5. WHEN un filtro de estado está activo, THE sistema SHALL mantener el filtro cuando se navega entre páginas de la tabla

### Requisito 5: Crear Panel Lateral de Filtro de Grupos

**Historia de Usuario:** Como representante de ventas, quiero filtrar leads por grupo, para enfocarse en leads específicos de un grupo.

#### Criterios de Aceptación

1. WHEN la página de leads se carga, THE sistema SHALL mostrar un panel lateral con opciones de filtro de grupos
2. WHEN el panel lateral se muestra, THE sistema SHALL obtener todos los grupos disponibles de GET /api/lead-groups
3. WHEN los grupos se están cargando, THE sistema SHALL mostrar un indicador de carga en el panel lateral
4. WHEN los grupos fallan al cargar, THE sistema SHALL mostrar un mensaje de error con opción de reintentar
5. WHEN los grupos se cargan exitosamente, THE sistema SHALL mostrar una lista de todos los grupos disponibles
6. WHEN el panel lateral se muestra, THE sistema SHALL incluir una opción "Ver Todos" al inicio de la lista

### Requisito 6: Mostrar Contadores de Leads por Grupo

**Historia de Usuario:** Como representante de ventas, quiero saber cuántos leads hay en cada grupo, para priorizar mi trabajo.

#### Criterios de Aceptación

1. WHEN un grupo se muestra en el panel lateral, THE sistema SHALL mostrar un badge con el número de leads en ese grupo
2. WHEN el badge de conteo se muestra, THE sistema SHALL usar un tamaño compacto (máximo 30px de ancho)
3. WHEN el badge de conteo se muestra, THE sistema SHALL usar color gris claro para no distraer
4. WHEN un usuario selecciona un grupo, THE badge de conteo SHALL permanecer visible
5. WHEN el conteo de leads cambia, THE sistema SHALL actualizar el badge automáticamente

### Requisito 7: Implementar Filtrado por Grupo

**Historia de Usuario:** Como representante de ventas, quiero seleccionar un grupo y ver solo los leads de ese grupo.

#### Criterios de Aceptación

1. WHEN un usuario hace clic en un grupo en el panel lateral, THE tabla de leads SHALL filtrar usando GET /api/leads?group_id={groupId}
2. WHEN un grupo está seleccionado, THE grupo SHALL mostrar un estilo visual diferente (ej: fondo resaltado)
3. WHEN un usuario hace clic en "Ver Todos", THE tabla SHALL mostrar todos los leads sin filtro de grupo
4. WHEN un usuario hace clic en "Ver Todos", THE sistema SHALL llamar a GET /api/leads sin parámetro group_id
5. WHEN un filtro de grupo está activo, THE sistema SHALL mostrar un indicador visual indicando qué grupo está filtrado
6. WHEN un filtro de grupo está activo, THE sistema SHALL mantener el filtro cuando se navega entre páginas

### Requisito 8: Manejar Estados de Carga y Error para Grupos

**Historia de Usuario:** Como representante de ventas, quiero retroalimentación clara sobre el estado de carga de grupos, para entender qué está sucediendo.

#### Criterios de Aceptación

1. WHEN los grupos se están cargando, THE sistema SHALL mostrar un spinner o indicador de carga en el panel lateral
2. WHEN los grupos fallan al cargar, THE sistema SHALL mostrar un mensaje de error descriptivo
3. WHEN los grupos fallan al cargar, THE sistema SHALL proporcionar un botón de reintentar
4. WHEN un usuario hace clic en reintentar, THE sistema SHALL llamar nuevamente a GET /api/lead-groups
5. WHEN un error de red ocurre, THE sistema SHALL mostrar un mensaje indicando problemas de conectividad
6. WHEN un error de servidor ocurre, THE sistema SHALL mostrar un mensaje indicando problemas del servidor

### Requisito 9: Diseño Responsivo

**Historia de Usuario:** Como representante de ventas usando varios dispositivos, quiero que los badges y el filtro de grupos funcionen bien en móvil, tablet y desktop.

#### Criterios de Aceptación

1. WHEN los badges se muestran en dispositivos móviles, THE badges SHALL ser compactos y no ocupar más del 15% del ancho de la celda
2. WHEN el panel lateral se muestra en dispositivos móviles, THE panel SHALL ser colapsable o deslizable
3. WHEN el panel lateral está colapsado en móvil, THE tabla de leads SHALL ocupar el ancho completo
4. WHEN el panel lateral está expandido en móvil, THE tabla de leads SHALL ajustarse o desplazarse horizontalmente
5. WHEN los badges se muestran en tablet, THE badges SHALL ser legibles con tamaño moderado
6. WHEN los badges se muestran en desktop, THE badges SHALL tener tamaño completo con texto e iconos claramente visibles
7. WHEN el panel lateral se muestra en desktop, THE panel SHALL ocupar 20-25% del ancho de la pantalla

### Requisito 10: Integración con Tabla de Leads Existente

**Historia de Usuario:** Como desarrollador, quiero que los badges y filtros se integren sin problemas con la tabla de leads existente.

#### Criterios de Aceptación

1. WHEN la tabla de leads se renderiza, THE badges de estado SHALL aparecer en la columna de nombre del lead
2. WHEN la tabla de leads se renderiza, THE panel lateral de grupos SHALL aparecer a la izquierda de la tabla
3. WHEN múltiples filtros están activos (estado Y grupo), THE tabla SHALL aplicar ambos filtros simultáneamente
4. WHEN múltiples filtros están activos, THE sistema SHALL mostrar indicadores visuales para ambos filtros
5. WHEN un usuario limpia un filtro, THE tabla SHALL actualizar inmediatamente sin recargar la página
6. WHEN la tabla se actualiza, THE badges de estado SHALL reflejar los datos más recientes

</content>
</invoke>