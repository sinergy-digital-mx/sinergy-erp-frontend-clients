# Plan de Implementación: Dashboard de Customers con Filtro de Grupos

## Descripción General

Este plan de implementación desglosa la característica de dashboard de customers en tareas de codificación discretas e incrementales. Cada tarea se construye sobre el trabajo anterior, con pruebas integradas en todo el proceso para validar funcionalidad. La implementación sigue las mejores prácticas de Angular con jerarquía clara de componentes, gestión de estado y integración de API.

## Tareas

- [x] 1. Configurar estructura de proyecto e interfaces principales
  - Crear directorio de componentes para CustomerGroupDropdown, CustomerEditModal, y FilterIndicator
  - Definir interfaces TypeScript para Customer, CustomerGroup, ErrorState
  - Configurar módulo de componentes con importaciones requeridas (HttpClientModule, CommonModule, PrimeNG)
  - Crear servicio para llamadas de API de grupos (CustomerGroupFetchService)
  - _Requisitos: 1.1, 2.1, 2.2, 10.1, 10.2_

- [x] 2. Implementar servicio de obtención de grupos de customers
  - Crear métodos para GET /api/customer-groups
  - Implementar manejo de errores y lógica de reintentos
  - Implementar caché de grupos con invalidación
  - _Requisitos: 2.2, 8.1, 8.2, 8.3, 8.4_

- [x] 3. Implementar componente CustomerGroupDropdown
  - Crear componente que muestre lista de grupos disponibles
  - Implementar método loadGroups() para obtener grupos de la API
  - Implementar método selectGroup() para filtrar tabla por grupo
  - Implementar método selectViewAll() para mostrar todos los customers
  - Implementar manejo de estados de carga y error
  - Implementar indicador visual de grupo seleccionado
  - _Requisitos: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 3.1, 3.2, 3.4, 3.5, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_

- [x] 4. Implementar componente CustomerEditModal
  - Crear modal para editar información del customer
  - Implementar carga de datos del customer
  - Implementar dropdown para cambiar grupo
  - Implementar validación de datos
  - Implementar guardado via PUT /api/customers/{id}
  - Implementar manejo de errores
  - _Requisitos: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7_

- [x] 5. Implementar componente FilterIndicator
  - Crear componente que muestre indicadores visuales de filtros activos
  - Implementar método getActiveFilters() para obtener lista de filtros activos
  - Implementar método clearFilter() para limpiar un filtro específico
  - Implementar método clearAllFilters() para limpiar todos los filtros
  - _Requisitos: 4.5, 10.4_

- [x] 6. Integrar componentes en página de customers
  - Integrar CustomerGroupDropdown en la página de customers
  - Integrar CustomerEditModal en la página de customers
  - Integrar FilterIndicator en la página de customers
  - Conectar eventos entre componentes para sincronizar filtros
  - Pasar datos de customers y grupos a componentes secundarios
  - _Requisitos: 1.1, 2.1, 10.1, 10.2, 10.3, 10.4_

- [x] 7. Implementar búsqueda de customers
  - Crear campo de búsqueda en la barra superior
  - Implementar filtrado por nombre, email, teléfono, empresa
  - Implementar debounce para evitar múltiples requests
  - Implementar reseteo a página 1 cuando se busca
  - _Requisitos: 5.1, 5.2, 5.3, 5.4, 5.5_

- [x] 8. Implementar filtro de estado
  - Crear dropdown de filtro de estado
  - Implementar filtrado por status_id
  - Implementar reseteo a página 1 cuando se filtra
  - Implementar limpieza de filtro
  - _Requisitos: 6.1, 6.2, 6.3, 6.4_

- [x] 9. Implementar gestión de estado de filtros
  - Crear servicio para gestionar estado de filtros (grupo, búsqueda, estado)
  - Implementar métodos para aplicar/limpiar filtros
  - Implementar lógica para combinar múltiples filtros
  - Implementar persistencia de filtros en navegación de páginas
  - _Requisitos: 4.1, 4.3, 4.5, 10.3, 10.5_

- [x] 10. Implementar diseño responsivo
  - Crear estilos CSS para dispositivos móviles (viewport < 768px)
  - Crear estilos CSS para dispositivos tablet (viewport 768px-1023px)
  - Crear estilos CSS para dispositivos desktop (viewport >= 1024px)
  - Implementar tabla scrolleable en móvil
  - Usar media queries para todos los breakpoints
  - _Requisitos: 9.1, 9.2, 9.3, 9.4, 9.5_

- [x] 11. Implementar manejo de errores y reintentos
  - Crear componente ErrorBoundary para capturar y mostrar errores
  - Implementar botón de reintentar para todas las llamadas de API fallidas
  - Implementar formato de mensaje de error para diferentes tipos (red, servidor, validación)
  - Implementar reintentos automáticos para errores de red después de 2 segundos
  - _Requisitos: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6_

- [x] 12. Implementar paginación
  - Implementar paginación con límite de 20 customers por página
  - Implementar botones Anterior/Siguiente
  - Implementar indicador de página actual
  - Implementar reseteo a página 1 cuando se aplica filtro
  - _Requisitos: 1.3, 1.4_

- [x] 13. Checkpoint - Asegurar que todas las pruebas pasen
  - Ejecutar todas las pruebas unitarias y verificar que pasen
  - Verificar que no haya errores en consola o advertencias
  - Preguntar al usuario si tiene preguntas

- [x] 14. Checkpoint final - Asegurar que todo funciona correctamente
  - Verificar que todos los filtros funcionan correctamente
  - Verificar que la edición de customers funciona
  - Verificar diseño responsivo en múltiples tamaños de dispositivo
  - Verificar manejo de errores y funcionalidad de reintentos
  - Preguntar al usuario si tiene preguntas

- [x] 15. Crear página de detalle de customer
  - Crear página CustomerDetailPage
  - Mostrar información básica del customer
  - Mostrar dirección del customer
  - Mostrar estado del customer
  - Implementar botones de edición
  - _Requisitos: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6_

- [x] 16. Implementar servicio de actividades
  - Crear CustomerActivityService
  - Implementar GET /api/tenant/customers/{customerId}/activities
  - Implementar GET /api/tenant/customers/{customerId}/activities/summary
  - Implementar GET /api/tenant/customers/{customerId}/activities/{activityId}
  - Implementar POST /api/tenant/customers/{customerId}/activities
  - Implementar PATCH /api/tenant/customers/{customerId}/activities/{activityId}
  - Implementar manejo de errores y reintentos
  - _Requisitos: 12.2, 13.4, 14.3, 15.2_

- [x] 17. Implementar componente CustomerActivitiesList
  - Crear componente que muestre lista de actividades
  - Implementar carga de actividades
  - Implementar paginación (10 actividades por página)
  - Implementar manejo de estados de carga y error
  - Implementar botón "Nueva Actividad"
  - Implementar clic en actividad para ver detalles
  - _Requisitos: 12.1, 12.3, 12.4, 12.5, 12.6, 12.7, 12.8_

- [x] 18. Implementar componente CustomerActivitySummary
  - Crear componente que muestre resumen de actividades
  - Implementar carga de resumen
  - Mostrar total de actividades, por tipo, por estado
  - Mostrar última actividad y próximo seguimiento
  - Usar tarjetas o badges para visualización
  - _Requisitos: 15.1, 15.2, 15.3, 15.4_

- [x] 19. Implementar modal de crear actividad
  - Crear modal para crear nueva actividad
  - Implementar formulario con campos: Tipo, Título, Descripción, Estado, Duración, Resultado, Fecha de Seguimiento
  - Implementar validación de datos
  - Implementar guardado via POST /api/tenant/customers/{customerId}/activities
  - Implementar manejo de errores
  - _Requisitos: 13.1, 13.2, 13.3, 13.4, 13.5, 13.6_

- [x] 20. Implementar modal de editar actividad
  - Crear modal para editar actividad existente
  - Implementar carga de datos de la actividad
  - Implementar formulario con campos editables
  - Implementar guardado via PATCH /api/tenant/customers/{customerId}/activities/{activityId}
  - Implementar manejo de errores
  - _Requisitos: 14.1, 14.2, 14.3, 14.4, 14.5_

- [x] 21. Integrar componentes de actividades en customer detail
  - Integrar CustomerActivitiesList en la página de detalle
  - Integrar CustomerActivitySummary en la página de detalle
  - Integrar modales de crear y editar actividades
  - Conectar eventos para actualizar lista cuando se crea/edita actividad
  - _Requisitos: 12.1, 13.1, 14.1, 15.1_

- [x] 22. Checkpoint - Asegurar que todas las actividades funcionan
  - Ejecutar todas las pruebas unitarias y verificar que pasen
  - Verificar que la carga de actividades funciona
  - Verificar que la creación de actividades funciona
  - Verificar que la edición de actividades funciona
  - Preguntar al usuario si tiene preguntas

- [x] 23. Checkpoint final - Asegurar que todo funciona correctamente
  - Verificar que el customer detail muestra toda la información
  - Verificar que las actividades se cargan y actualizan correctamente
  - Verificar que el resumen de actividades es preciso
  - Verificar diseño responsivo en múltiples tamaños de dispositivo
  - Preguntar al usuario si tiene preguntas

## Notas

- Cada tarea referencia requisitos específicos para trazabilidad
- Los checkpoints aseguran validación incremental de funcionalidad
- La implementación sigue el patrón del dashboard de leads para consistencia
- Todas las pruebas deben ejecutarse antes de completar cada tarea
- El diseño debe ser responsive y funcionar en todos los dispositivos
- Las actividades incluyen tipos: call, email, meeting, note, task, follow_up, purchase, support
- Los estados de actividad: completed, scheduled, cancelled, in_progress
- Los resultados de actividad: satisfied, issue_resolved, escalated, follow_up_needed
