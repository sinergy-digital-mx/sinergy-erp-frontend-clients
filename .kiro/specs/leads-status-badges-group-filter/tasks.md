# Plan de Implementación: Badges de Estado y Filtro de Grupos en Tabla de Leads

## Descripción General

Este plan de implementación desglosa la característica de badges de estado y filtro de grupos en tareas de codificación discretas e incrementales. Cada tarea se construye sobre el trabajo anterior, con pruebas basadas en propiedades integradas en todo el proceso para validar propiedades de corrección. La implementación sigue las mejores prácticas de Angular con jerarquía clara de componentes, gestión de estado y integración de API.

## Tareas

- [x] 1. Configurar estructura de proyecto e interfaces principales
  - Crear directorio de componentes para StatusBadge, LeadGroupFilterSidebar, y FilterIndicator
  - Definir interfaces TypeScript para Lead, LeadGroup, CommunicationStatus, StatusBadgeData, ErrorState
  - Configurar módulo de componentes con importaciones requeridas (HttpClientModule, CommonModule, PrimeNG)
  - Crear servicio para llamadas de API de grupos (GroupFetchService)
  - _Requisitos: 1.1, 5.1, 5.2, 10.1, 10.2_

- [x] 2. Implementar servicio de obtención de grupos
  - Crear métodos para GET /api/lead-groups
  - Implementar manejo de errores y lógica de reintentos
  - Implementar caché de grupos con invalidación
  - _Requisitos: 5.2, 8.1, 8.2, 8.3, 8.4_

- [x] 3. Implementar componente StatusBadge
  - Crear componente que reciba un lead como entrada
  - Implementar método getStatusFromLead() para determinar estado basado en propiedades
  - Implementar renderizado de icono, texto y color según estado
  - Implementar tooltip con fecha formateada
  - Implementar manejo de clics para filtrar por estado
  - _Requisitos: 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.2, 2.3, 2.4, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

- [ ]* 3.1 Escribir prueba de propiedad para renderizado de badge
  - **Propiedad 1: Badge display for all leads**
  - **Propiedad 2: Not Contacted badge rendering**
  - **Propiedad 3: Contacted badge rendering**
  - **Propiedad 4: Responded badge rendering**
  - **Valida: Requisitos 1.1, 1.2, 1.3, 1.4**

- [ ]* 3.2 Escribir prueba de propiedad para tamaño compacto del badge
  - **Propiedad 5: Badge compact size**
  - **Valida: Requisitos 1.5**

- [ ]* 3.3 Escribir prueba de propiedad para iconos del badge
  - **Propiedad 6: Not Contacted icon display**
  - **Propiedad 7: Contacted icon display**
  - **Propiedad 8: Responded icon display**
  - **Propiedad 9: Icon positioning**
  - **Valida: Requisitos 2.1, 2.2, 2.3, 2.4**

- [ ]* 3.4 Escribir prueba de propiedad para tooltips
  - **Propiedad 10: Not Contacted tooltip**
  - **Propiedad 11: Contacted tooltip with date**
  - **Propiedad 12: Responded tooltip with date**
  - **Propiedad 13: Null date handling in tooltip**
  - **Propiedad 14: Date format in tooltip**
  - **Valida: Requisitos 3.1, 3.2, 3.3, 3.4, 3.5, 3.6**

- [x] 4. Implementar componente LeadGroupFilterSidebar
  - Crear componente que muestre lista de grupos disponibles
  - Implementar método loadGroups() para obtener grupos de la API
  - Implementar método selectGroup() para filtrar tabla por grupo
  - Implementar método selectViewAll() para mostrar todos los leads
  - Implementar manejo de estados de carga y error
  - Implementar indicador visual de grupo seleccionado
  - _Requisitos: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 6.1, 6.2, 6.4, 6.5, 7.1, 7.2, 7.3, 7.4, 7.5, 7.6_

- [ ]* 4.1 Escribir prueba de propiedad para carga de grupos
  - **Propiedad 20: Group sidebar display**
  - **Propiedad 21: Group API call**
  - **Propiedad 22: Group loading indicator**
  - **Valida: Requisitos 5.1, 5.2, 5.3**

- [ ]* 4.2 Escribir prueba de propiedad para manejo de errores de grupos
  - **Propiedad 23: Group error handling**
  - **Propiedad 36: Group loading state display**
  - **Propiedad 37: Group error message display**
  - **Propiedad 38: Group retry button presence**
  - **Propiedad 39: Group retry functionality**
  - **Valida: Requisitos 5.4, 8.1, 8.2, 8.3, 8.4**

- [ ]* 4.3 Escribir prueba de propiedad para visualización de grupos
  - **Propiedad 24: Group list display**
  - **Propiedad 25: View All option presence**
  - **Valida: Requisitos 5.5, 5.6**

- [ ]* 4.4 Escribir prueba de propiedad para contadores de leads
  - **Propiedad 26: Lead count badge display**
  - **Propiedad 27: Lead count badge size**
  - **Propiedad 28: Lead count badge visibility on selection**
  - **Propiedad 29: Lead count badge update**
  - **Valida: Requisitos 6.1, 6.2, 6.4, 6.5**

- [ ]* 4.5 Escribir prueba de propiedad para filtrado de grupos
  - **Propiedad 30: Group filtering API call**
  - **Propiedad 31: Selected group styling**
  - **Propiedad 32: View All filtering**
  - **Propiedad 33: View All API call**
  - **Propiedad 34: Group filter indicator**
  - **Propiedad 35: Group filter persistence across pages**
  - **Valida: Requisitos 7.1, 7.2, 7.3, 7.4, 7.5, 7.6**

- [x] 5. Implementar componente FilterIndicator
  - Crear componente que muestre indicadores visuales de filtros activos
  - Implementar método getActiveFilters() para obtener lista de filtros activos
  - Implementar método clearFilter() para limpiar un filtro específico
  - Implementar método clearAllFilters() para limpiar todos los filtros
  - _Requisitos: 4.4, 7.5, 10.4_

- [ ]* 5.1 Escribir prueba de propiedad para indicadores de filtro
  - **Propiedad 18: Filter indicator display**
  - **Propiedad 34: Group filter indicator**
  - **Propiedad 50: Combined filter indicators**
  - **Valida: Requisitos 4.4, 7.5, 10.4**

- [x] 6. Integrar StatusBadge en columna de nombre de lead
  - Modificar DatatableWrapper para incluir StatusBadge en la columna de nombre
  - Pasar datos del lead al componente StatusBadge
  - Implementar manejo de eventos de clic del badge para filtrar
  - _Requisitos: 1.1, 4.1, 10.1_

- [ ]* 6.1 Escribir prueba de propiedad para filtrado por estado
  - **Propiedad 15: Status badge filtering**
  - **Propiedad 16: Active badge styling**
  - **Propiedad 17: Badge filter toggle**
  - **Valida: Requisitos 4.1, 4.2, 4.3**

- [ ]* 6.2 Escribir prueba de propiedad para persistencia de filtro
  - **Propiedad 19: Filter persistence across pages**
  - **Valida: Requisitos 4.5**

- [x] 7. Implementar gestión de estado de filtros
  - Crear servicio para gestionar estado de filtros (estado y grupo)
  - Implementar métodos para aplicar/limpiar filtros
  - Implementar lógica para combinar múltiples filtros
  - Implementar persistencia de filtros en navegación de páginas
  - _Requisitos: 4.1, 4.3, 4.5, 7.1, 7.3, 7.6, 10.3, 10.5_

- [ ]* 7.1 Escribir prueba de propiedad para filtros combinados
  - **Propiedad 49: Combined filter application**
  - **Valida: Requisitos 10.3**

- [ ]* 7.2 Escribir prueba de propiedad para limpieza de filtros
  - **Propiedad 51: Filter clearing**
  - **Valida: Requisitos 10.5**

- [x] 8. Implementar diseño responsivo para móvil
  - Crear estilos CSS para dispositivos móviles (viewport < 768px)
  - Implementar sidebar colapsable/deslizable en móvil
  - Implementar badges compactos en móvil (máximo 15% del ancho)
  - Implementar tabla de leads que ocupe ancho completo cuando sidebar está colapsado
  - Usar media queries para viewport < 768px
  - _Requisitos: 9.1, 9.2, 9.3, 9.4_

- [ ]* 8.1 Escribir prueba de propiedad para diseño móvil
  - **Propiedad 40: Mobile badge compactness**
  - **Propiedad 41: Mobile sidebar collapsibility**
  - **Propiedad 42: Mobile table full width when sidebar collapsed**
  - **Propiedad 43: Mobile table adjustment when sidebar expanded**
  - **Valida: Requisitos 9.1, 9.2, 9.3, 9.4**

- [x] 9. Implementar diseño responsivo para tablet
  - Crear estilos CSS para dispositivos tablet (viewport 768px-1023px)
  - Implementar badges legibles en tablet con tamaño moderado
  - Usar media queries para viewport 768px-1023px
  - _Requisitos: 9.5_

- [ ]* 9.1 Escribir prueba de propiedad para diseño tablet
  - **Propiedad 44: Tablet badge readability**
  - **Valida: Requisitos 9.5**

- [x] 10. Implementar diseño responsivo para desktop
  - Crear estilos CSS para dispositivos desktop (viewport >= 1024px)
  - Implementar badges con tamaño completo en desktop
  - Implementar sidebar que ocupe 20-25% del ancho de pantalla
  - Usar media queries para viewport >= 1024px
  - _Requisitos: 9.6, 9.7_

- [ ]* 10.1 Escribir prueba de propiedad para diseño desktop
  - **Propiedad 45: Desktop badge visibility**
  - **Propiedad 46: Desktop sidebar width**
  - **Valida: Requisitos 9.6, 9.7**

- [x] 11. Implementar manejo de errores y reintentos
  - Crear componente ErrorBoundary para capturar y mostrar errores
  - Implementar botón de reintentar para todas las llamadas de API fallidas
  - Implementar formato de mensaje de error para diferentes tipos (red, servidor, validación)
  - Implementar reintentos automáticos para errores de red después de 2 segundos
  - _Requisitos: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6_

- [ ]* 11.1 Escribir prueba de propiedad para manejo de errores
  - **Propiedad 37: Group error message display**
  - **Propiedad 38: Group retry button presence**
  - **Propiedad 39: Group retry functionality**
  - **Valida: Requisitos 8.2, 8.3, 8.4**

- [x] 12. Integrar componentes en página de leads
  - Integrar LeadGroupFilterSidebar en la página de leads
  - Integrar StatusBadge en la tabla de leads
  - Integrar FilterIndicator en la página de leads
  - Conectar eventos entre componentes para sincronizar filtros
  - Pasar datos de leads y grupos a componentes secundarios
  - _Requisitos: 1.1, 5.1, 10.1, 10.2, 10.3, 10.4_

- [ ]* 12.1 Escribir prueba de integración
  - Probar flujo completo: cargar grupos → seleccionar grupo → filtrar tabla
  - Probar flujo completo: hacer clic en badge → filtrar tabla
  - Probar flujo completo: aplicar múltiples filtros → verificar ambos aplicados
  - Probar flujo completo: limpiar filtro → tabla se actualiza
  - _Requisitos: 1.1, 5.1, 10.1, 10.2, 10.3, 10.4, 10.5, 10.6_

- [x] 13. Checkpoint - Asegurar que todas las pruebas pasen
  - Ejecutar todas las pruebas unitarias y verificar que pasen
  - Ejecutar todas las pruebas basadas en propiedades con mínimo 100 iteraciones cada una
  - Verificar que no haya errores en consola o advertencias
  - Preguntar al usuario si tiene preguntas

- [x] 14. Actualizar datos de badge cuando tabla se actualiza
  - Implementar detección de cambios para actualizar badges cuando los datos del lead cambian
  - Implementar suscripción a cambios de datos de leads
  - Asegurar que los badges reflejen los datos más recientes
  - _Requisitos: 10.6_

- [ ]* 14.1 Escribir prueba de propiedad para actualización de datos
  - **Propiedad 52: Badge data freshness**
  - **Valida: Requisitos 10.6**

- [x] 15. Checkpoint final - Asegurar que todas las pruebas pasen
  - Ejecutar todas las pruebas unitarias y verificar que pasen
  - Ejecutar todas las pruebas basadas en propiedades con mínimo 100 iteraciones cada una
  - Verificar diseño responsivo en múltiples tamaños de dispositivo
  - Verificar manejo de errores y funcionalidad de reintentos
  - Preguntar al usuario si tiene preguntas

## Notas

- Las tareas marcadas con `*` son opcionales y pueden omitirse para un MVP más rápido
- Cada tarea referencia requisitos específicos para trazabilidad
- Las pruebas basadas en propiedades se integran en todo el proceso para detectar errores temprano
- Los checkpoints aseguran validación incremental de funcionalidad
- Todas las pruebas basadas en propiedades deben ejecutarse con mínimo 100 iteraciones usando la librería fast-check
- Cada prueba basada en propiedades debe etiquetarse con: `Feature: leads-status-badges-group-filter, Property {number}: {property_text}`

</content>
</invoke>
