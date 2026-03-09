# Purchase Orders Module - Requirements

## Overview

El módulo de Purchase Orders (Órdenes de Compra) permite a los usuarios gestionar el proceso completo de compras a proveedores, desde la creación de órdenes hasta su recepción y pago. El módulo se integra con los sistemas de inventario, proveedores, productos y almacenes para proporcionar una solución completa de gestión de compras.

## Business Context

Las órdenes de compra son documentos fundamentales en la gestión de inventario y finanzas de la empresa. Este módulo permite:
- Crear y gestionar órdenes de compra con múltiples líneas de productos
- Controlar el estado de las órdenes (En Proceso, Recibida, Cancelada)
- Gestionar pagos parciales y totales
- Calcular automáticamente impuestos (IVA, IEPS)
- Integrar automáticamente con el inventario al recibir mercancía
- Mantener trazabilidad completa de las compras

## Stakeholders

- **Compradores**: Crean y gestionan órdenes de compra
- **Gerentes de Compras**: Supervisan el proceso de compras y aprueban órdenes
- **Personal de Almacén**: Reciben mercancía y actualizan estados
- **Contabilidad**: Gestionan pagos y conciliaciones
- **Administradores del Sistema**: Configuran permisos y accesos

## Requirements

### Requirement 1

**User Story:** Como comprador, quiero crear órdenes de compra con múltiples líneas de productos, para poder solicitar mercancía a proveedores de manera organizada.

#### Acceptance Criteria

1. WHEN un usuario con permiso `purchase_orders:Create` accede al módulo THEN el sistema SHALL mostrar un botón "Crear" visible
2. WHEN el usuario hace clic en "Crear" THEN el sistema SHALL mostrar un formulario con campos: proveedor, propósito, almacén destino, fecha tentativa de recepción
3. WHEN el usuario selecciona un proveedor THEN el sistema SHALL cargar la lista de proveedores activos desde el endpoint `/tenant/vendors`
4. WHEN el usuario selecciona un almacén THEN el sistema SHALL cargar la lista de almacenes desde el endpoint `/tenant/warehouses`
5. WHEN el usuario agrega una línea de producto THEN el sistema SHALL permitir buscar productos desde el endpoint `/tenant/products`
6. WHEN el usuario selecciona un producto THEN el sistema SHALL mostrar las unidades de medida disponibles para ese producto
7. WHEN el usuario ingresa cantidad y precio unitario THEN el sistema SHALL calcular automáticamente: subtotal, IVA, IEPS, y total de línea
8. WHEN el usuario agrega múltiples líneas THEN el sistema SHALL calcular automáticamente los totales generales: total_subtotal, total_iva, total_ieps, grand_total
9. WHEN el usuario guarda la orden THEN el sistema SHALL enviar una petición POST a `/tenant/purchase-orders` con todos los datos
10. WHEN la orden se crea exitosamente THEN el sistema SHALL mostrar un mensaje de confirmación y redirigir a la vista de detalle

### Requirement 2

**User Story:** Como comprador, quiero ver una lista de todas las órdenes de compra con filtros y paginación, para poder gestionar y dar seguimiento a las compras.

#### Acceptance Criteria

1. WHEN un usuario con permiso `purchase_orders:Read` accede al módulo THEN el sistema SHALL cargar y mostrar la lista de órdenes desde `/tenant/purchase-orders`
2. WHEN se carga la lista THEN el sistema SHALL mostrar las columnas: FOLIO, TIPO, PROVEEDOR, CEDIS, ESTADO, TOTAL, PAGO, FECHA CREACIÓN
3. WHEN se muestra el estado THEN el sistema SHALL usar badges de colores distintivos para "En Proceso", "Recibida", "Cancelada"
4. WHEN se muestra el estado de pago THEN el sistema SHALL usar badges para "Pagada", "Parcial", "No pagado"
5. WHEN el usuario escribe en el campo de búsqueda THEN el sistema SHALL filtrar las órdenes en tiempo real por folio, proveedor o propósito
6. WHEN el usuario selecciona un filtro de fecha THEN el sistema SHALL filtrar las órdenes por rango de fechas
7. WHEN el usuario selecciona un filtro de estado THEN el sistema SHALL filtrar las órdenes por estado específico
8. WHEN el usuario selecciona un filtro de almacén THEN el sistema SHALL filtrar las órdenes por almacén destino
9. WHEN se alcanza el final de la lista THEN el sistema SHALL cargar automáticamente la siguiente página (infinite scroll)
10. WHEN no hay órdenes que mostrar THEN el sistema SHALL mostrar un estado vacío con mensaje apropiado

### Requirement 3

**User Story:** Como comprador, quiero ver el detalle completo de una orden de compra, para revisar toda la información y documentos asociados.

#### Acceptance Criteria

1. WHEN un usuario hace clic en una orden de la lista THEN el sistema SHALL navegar a la vista de detalle
2. WHEN se carga el detalle THEN el sistema SHALL obtener los datos desde `/tenant/purchase-orders/:id`
3. WHEN se muestra el detalle THEN el sistema SHALL mostrar: información del proveedor, almacén, fechas, estado, propósito
4. WHEN se muestra el detalle THEN el sistema SHALL mostrar todas las líneas de productos con: producto, UOM, cantidad, precio, subtotal, impuestos, total
5. WHEN existen pagos registrados THEN el sistema SHALL mostrar la lista de pagos con: monto, fecha, método, referencia, notas
6. WHEN existen documentos adjuntos THEN el sistema SHALL mostrar la lista de documentos
7. WHEN se muestran los totales THEN el sistema SHALL mostrar: subtotal, IVA, IEPS, gran total, monto pagado, saldo pendiente
8. WHEN el usuario tiene permiso `purchase_orders:Update` THEN el sistema SHALL mostrar botones de acción: Editar, Cambiar Estado
9. WHEN el usuario tiene permiso `purchase_orders:Delete` THEN el sistema SHALL mostrar botón Eliminar
10. WHEN la orden está en estado "En Proceso" THEN el sistema SHALL permitir cancelar la orden

### Requirement 4

**User Story:** Como comprador, quiero editar órdenes de compra existentes, para corregir errores o actualizar información.

#### Acceptance Criteria

1. WHEN un usuario con permiso `purchase_orders:Update` hace clic en "Editar" THEN el sistema SHALL cargar el formulario con los datos actuales
2. WHEN se carga el formulario de edición THEN el sistema SHALL pre-llenar todos los campos con los valores existentes
3. WHEN se carga el formulario de edición THEN el sistema SHALL mostrar todas las líneas de productos existentes
4. WHEN el usuario modifica campos THEN el sistema SHALL recalcular automáticamente los totales
5. WHEN el usuario agrega nuevas líneas THEN el sistema SHALL permitir agregar productos adicionales
6. WHEN el usuario elimina líneas THEN el sistema SHALL actualizar los totales automáticamente
7. WHEN el usuario guarda los cambios THEN el sistema SHALL enviar una petición PUT a `/tenant/purchase-orders/:id`
8. WHEN la actualización es exitosa THEN el sistema SHALL mostrar un mensaje de confirmación y actualizar la vista
9. WHEN la orden está en estado "Recibida" o "Cancelada" THEN el sistema SHALL deshabilitar la edición de líneas de productos
10. WHEN hay errores de validación THEN el sistema SHALL mostrar mensajes de error específicos por campo

### Requirement 5

**User Story:** Como personal de almacén, quiero cambiar el estado de una orden de compra a "Recibida", para registrar la recepción de mercancía.

#### Acceptance Criteria

1. WHEN un usuario con permiso `purchase_orders:Update` hace clic en "Cambiar Estado" THEN el sistema SHALL mostrar un diálogo de confirmación
2. WHEN la orden está en estado "En Proceso" THEN el sistema SHALL permitir cambiar a "Recibida"
3. WHEN el usuario confirma el cambio a "Recibida" THEN el sistema SHALL enviar una petición PUT a `/tenant/purchase-orders/:id/status`
4. WHEN el estado cambia a "Recibida" THEN el backend SHALL crear automáticamente movimientos de inventario
5. WHEN el cambio de estado es exitoso THEN el sistema SHALL actualizar la vista y mostrar el nuevo estado
6. WHEN el cambio de estado falla THEN el sistema SHALL mostrar un mensaje de error descriptivo
7. WHEN la orden ya está "Recibida" THEN el sistema SHALL deshabilitar el cambio de estado
8. WHEN la orden está "Cancelada" THEN el sistema SHALL deshabilitar el cambio de estado

### Requirement 6

**User Story:** Como comprador, quiero cancelar órdenes de compra, para anular compras que ya no son necesarias.

#### Acceptance Criteria

1. WHEN un usuario con permiso `purchase_orders:Update` hace clic en "Cancelar" THEN el sistema SHALL mostrar un diálogo solicitando razón de cancelación
2. WHEN la orden está en estado "En Proceso" THEN el sistema SHALL permitir la cancelación
3. WHEN el usuario ingresa la razón y confirma THEN el sistema SHALL enviar una petición POST a `/tenant/purchase-orders/:id/cancel`
4. WHEN la cancelación es exitosa THEN el sistema SHALL actualizar el estado a "Cancelada" y registrar fecha y razón
5. WHEN la orden ya está "Recibida" THEN el sistema SHALL prevenir la cancelación y mostrar mensaje explicativo
6. WHEN la orden ya está "Cancelada" THEN el sistema SHALL ocultar el botón de cancelar
7. WHEN se cancela una orden THEN el sistema SHALL mantener todos los datos históricos para auditoría

### Requirement 7

**User Story:** Como personal de contabilidad, quiero registrar pagos parciales o totales en órdenes de compra, para llevar control de las cuentas por pagar.

#### Acceptance Criteria

1. WHEN un usuario visualiza el detalle de una orden THEN el sistema SHALL mostrar un botón "Registrar Pago"
2. WHEN el usuario hace clic en "Registrar Pago" THEN el sistema SHALL mostrar un formulario con campos: monto, fecha, método de pago, referencia, notas
3. WHEN el usuario ingresa un monto THEN el sistema SHALL validar que no exceda el saldo pendiente
4. WHEN el usuario guarda el pago THEN el sistema SHALL actualizar el payment_status según el monto: "Pagada" si cubre el total, "Parcial" si es menor
5. WHEN se registra un pago THEN el sistema SHALL actualizar remaining_amount restando el monto pagado
6. WHEN se registra un pago THEN el sistema SHALL agregar el pago a la lista de pagos de la orden
7. WHEN existen múltiples pagos THEN el sistema SHALL mostrar el historial completo de pagos
8. WHEN la orden está completamente pagada THEN el sistema SHALL deshabilitar el botón "Registrar Pago"

### Requirement 8

**User Story:** Como comprador, quiero eliminar órdenes de compra, para mantener limpia la base de datos de órdenes no utilizadas.

#### Acceptance Criteria

1. WHEN un usuario con permiso `purchase_orders:Delete` hace clic en "Eliminar" THEN el sistema SHALL mostrar un diálogo de confirmación
2. WHEN el usuario confirma la eliminación THEN el sistema SHALL enviar una petición DELETE a `/tenant/purchase-orders/:id`
3. WHEN la eliminación es exitosa THEN el sistema SHALL redirigir a la lista y mostrar mensaje de confirmación
4. WHEN la orden tiene pagos registrados THEN el sistema SHALL prevenir la eliminación y mostrar mensaje explicativo
5. WHEN la orden está en estado "Recibida" THEN el sistema SHALL prevenir la eliminación y mostrar mensaje explicativo
6. WHEN la eliminación falla THEN el sistema SHALL mostrar un mensaje de error descriptivo

### Requirement 9

**User Story:** Como gerente de compras, quiero ver un dashboard con métricas de órdenes de compra, para tener visibilidad del estado general de las compras.

#### Acceptance Criteria

1. WHEN un usuario accede al módulo THEN el sistema SHALL mostrar un dashboard en la parte superior
2. WHEN se carga el dashboard THEN el sistema SHALL mostrar un gráfico circular "Por Estado" con distribución de órdenes
3. WHEN se carga el dashboard THEN el sistema SHALL mostrar un gráfico circular "Estado de Pago" con distribución de pagos
4. WHEN se carga el dashboard THEN el sistema SHALL calcular las métricas desde los datos cargados en la lista
5. WHEN el usuario aplica filtros THEN el sistema SHALL actualizar las métricas del dashboard según los filtros activos
6. WHEN no hay datos THEN el sistema SHALL mostrar los gráficos vacíos con mensaje apropiado

### Requirement 10

**User Story:** Como usuario del sistema, quiero que el módulo sea responsive, para poder acceder desde diferentes dispositivos.

#### Acceptance Criteria

1. WHEN el usuario accede desde desktop (>1024px) THEN el sistema SHALL mostrar la tabla completa con todas las columnas
2. WHEN el usuario accede desde tablet (768px-1024px) THEN el sistema SHALL ajustar el layout ocultando columnas secundarias
3. WHEN el usuario accede desde mobile (<768px) THEN el sistema SHALL mostrar las órdenes en formato de tarjetas
4. WHEN el usuario accede desde mobile THEN el sistema SHALL mantener accesibles todas las funcionalidades principales
5. WHEN se redimensiona la ventana THEN el sistema SHALL ajustar el layout dinámicamente
6. WHEN se muestra el formulario en mobile THEN el sistema SHALL usar controles apropiados para touch

### Requirement 11

**User Story:** Como usuario del sistema, quiero que los cálculos de impuestos sean precisos, para cumplir con las regulaciones fiscales.

#### Acceptance Criteria

1. WHEN se calcula el subtotal de una línea THEN el sistema SHALL usar la fórmula: quantity × unit_price
2. WHEN se calcula el IVA de una línea THEN el sistema SHALL usar la fórmula: subtotal × (iva_percentage / 100)
3. WHEN se calcula el IEPS de una línea THEN el sistema SHALL usar la fórmula: subtotal × (ieps_percentage / 100)
4. WHEN se calcula el total de una línea THEN el sistema SHALL usar la fórmula: subtotal + iva_amount + ieps_amount
5. WHEN se calculan los totales generales THEN el sistema SHALL sumar todos los subtotales, IVAs, IEPS y totales de línea
6. WHEN se modifican cantidades o precios THEN el sistema SHALL recalcular automáticamente todos los montos
7. WHEN se muestran montos THEN el sistema SHALL formatear con 2 decimales y símbolo de moneda
8. WHEN se envían datos al backend THEN el sistema SHALL enviar todos los montos calculados para validación

### Requirement 12

**User Story:** Como usuario del sistema, quiero que el módulo maneje errores de manera clara, para entender qué salió mal y cómo corregirlo.

#### Acceptance Criteria

1. WHEN ocurre un error de red THEN el sistema SHALL mostrar un mensaje: "Error de conexión. Por favor, verifica tu conexión a internet"
2. WHEN el backend retorna error 401 THEN el sistema SHALL redirigir al login
3. WHEN el backend retorna error 403 THEN el sistema SHALL mostrar: "No tienes permisos para realizar esta acción"
4. WHEN el backend retorna error 404 THEN el sistema SHALL mostrar: "Orden de compra no encontrada"
5. WHEN el backend retorna error 422 THEN el sistema SHALL mostrar los errores de validación específicos por campo
6. WHEN el backend retorna error 500 THEN el sistema SHALL mostrar: "Error del servidor. Por favor, intenta más tarde"
7. WHEN se muestra un error THEN el sistema SHALL usar un componente de notificación visible y accesible
8. WHEN se recupera de un error THEN el sistema SHALL limpiar los mensajes de error automáticamente

### Requirement 13

**User Story:** Como usuario del sistema, quiero que el módulo valide los datos antes de enviarlos, para prevenir errores y mejorar la experiencia de usuario.

#### Acceptance Criteria

1. WHEN el usuario intenta guardar sin seleccionar proveedor THEN el sistema SHALL mostrar error: "Proveedor es requerido"
2. WHEN el usuario intenta guardar sin seleccionar almacén THEN el sistema SHALL mostrar error: "Almacén es requerido"
3. WHEN el usuario intenta guardar sin fecha tentativa THEN el sistema SHALL mostrar error: "Fecha tentativa de recepción es requerida"
4. WHEN el usuario intenta guardar sin líneas de productos THEN el sistema SHALL mostrar error: "Debe agregar al menos un producto"
5. WHEN el usuario ingresa cantidad negativa o cero THEN el sistema SHALL mostrar error: "La cantidad debe ser mayor a cero"
6. WHEN el usuario ingresa precio negativo THEN el sistema SHALL mostrar error: "El precio debe ser mayor o igual a cero"
7. WHEN el usuario ingresa porcentajes de impuestos inválidos THEN el sistema SHALL mostrar error: "Los porcentajes deben estar entre 0 y 100"
8. WHEN hay errores de validación THEN el sistema SHALL deshabilitar el botón de guardar
9. WHEN se corrigen los errores THEN el sistema SHALL habilitar el botón de guardar automáticamente

### Requirement 14

**User Story:** Como administrador del sistema, quiero que el módulo respete los permisos RBAC, para controlar el acceso según roles de usuario.

#### Acceptance Criteria

1. WHEN un usuario sin permiso `purchase_orders:Read` intenta acceder THEN el sistema SHALL mostrar mensaje de acceso denegado
2. WHEN un usuario sin permiso `purchase_orders:Create` visualiza la lista THEN el sistema SHALL ocultar el botón "Crear"
3. WHEN un usuario sin permiso `purchase_orders:Update` visualiza el detalle THEN el sistema SHALL ocultar botones de edición
4. WHEN un usuario sin permiso `purchase_orders:Delete` visualiza el detalle THEN el sistema SHALL ocultar el botón eliminar
5. WHEN se verifica un permiso THEN el sistema SHALL consultar el token JWT del usuario actual
6. WHEN el token expira THEN el sistema SHALL redirigir al login automáticamente

### Requirement 15

**User Story:** Como usuario del sistema, quiero que el módulo tenga buen rendimiento, para trabajar de manera fluida sin esperas innecesarias.

#### Acceptance Criteria

1. WHEN se carga la lista inicial THEN el sistema SHALL mostrar un indicador de carga
2. WHEN se cargan datos THEN el sistema SHALL usar lazy loading para imágenes y componentes pesados
3. WHEN se aplican filtros THEN el sistema SHALL debounce las búsquedas de texto con 300ms de delay
4. WHEN se navega entre páginas THEN el sistema SHALL cachear las páginas visitadas recientemente
5. WHEN se calculan totales THEN el sistema SHALL optimizar los cálculos para evitar re-renders innecesarios
6. WHEN se cargan listas de selección THEN el sistema SHALL cachear las opciones de proveedores, productos y almacenes
7. WHEN hay muchas líneas de productos THEN el sistema SHALL usar virtual scrolling si excede 50 líneas

## Non-Functional Requirements

### Performance
- La lista de órdenes debe cargar en menos de 2 segundos
- Los cálculos de totales deben ser instantáneos (<100ms)
- El formulario debe responder a cambios en menos de 200ms

### Security
- Todas las peticiones deben incluir JWT Bearer Token
- Los permisos deben validarse en cada acción
- Los datos sensibles no deben exponerse en logs del cliente

### Usability
- El módulo debe seguir los patrones de diseño del sistema
- Los mensajes de error deben ser claros y accionables
- El flujo de trabajo debe ser intuitivo y requerir mínima capacitación

### Accessibility
- El módulo debe cumplir con WCAG 2.1 nivel AA
- Todos los controles deben ser accesibles por teclado
- Los lectores de pantalla deben poder navegar el contenido

### Maintainability
- El código debe seguir las convenciones de Angular
- Los componentes deben ser reutilizables y modulares
- El código debe estar documentado con comentarios JSDoc

## Assumptions and Constraints

### Assumptions
- El backend ya está implementado y funcionando correctamente
- Los módulos de Vendors, Products, Warehouses ya existen y están operativos
- El sistema de autenticación JWT ya está configurado
- El sistema RBAC ya está implementado

### Constraints
- Debe usar Angular 17+ con standalone components
- Debe usar PrimeNG o Angular Material para componentes UI
- Debe integrarse con el sistema de autenticación existente
- Debe seguir la estructura de carpetas del proyecto existente
- No debe modificar el backend existente

## Success Criteria

El módulo será considerado exitoso cuando:
1. Los usuarios puedan crear, editar, visualizar y eliminar órdenes de compra
2. Los cálculos de impuestos y totales sean precisos al 100%
3. La integración con inventario funcione automáticamente al recibir órdenes
4. El módulo sea responsive y funcione en todos los dispositivos
5. Los permisos RBAC se respeten correctamente
6. El rendimiento cumpla con los tiempos especificados
7. Los usuarios reporten satisfacción con la usabilidad del módulo

## Out of Scope

Los siguientes elementos están fuera del alcance de este módulo:
- Modificación del backend o APIs existentes
- Implementación de nuevos módulos de Vendors, Products o Warehouses
- Configuración de impuestos (se asume que viene del backend)
- Reportes y exportación de datos (será un módulo separado)
- Integración con sistemas externos de contabilidad
- Workflow de aprobaciones multinivel
- Notificaciones por email o push
