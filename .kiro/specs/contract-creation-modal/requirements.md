# Requisitos: Modal de Creación de Contratos

## 1. Descripción General

Crear un modal funcional y visualmente atractivo para la creación de nuevos contratos que permita buscar clientes, seleccionar lotes disponibles, y completar todos los campos necesarios del contrato.

## 2. User Stories

### 2.1 Como usuario, quiero buscar y seleccionar un cliente existente
Para poder asociar el contrato con un cliente registrado en el sistema.

**Criterios de Aceptación:**
- El modal debe incluir un campo de búsqueda de clientes con autocompletado
- La búsqueda debe funcionar por nombre, apellido o email del cliente
- Los resultados deben mostrarse en tiempo real mientras el usuario escribe
- Al seleccionar un cliente, sus datos deben mostrarse en el formulario
- El campo de cliente debe ser obligatorio

### 2.2 Como usuario, quiero crear un nuevo cliente desde el modal
Para poder crear contratos sin salir del flujo de creación cuando el cliente no existe.

**Criterios de Aceptación:**
- Debe existir un botón "Crear Cliente" visible en el campo de búsqueda
- Al hacer clic, debe abrirse un modal secundario para crear el cliente
- El modal de creación debe incluir campos: nombre, apellido, email, teléfono
- Al crear el cliente exitosamente, debe seleccionarse automáticamente en el formulario
- El modal de creación debe cerrarse y volver al modal de contrato

### 2.3 Como usuario, quiero buscar y seleccionar un lote disponible
Para asignar una propiedad específica al contrato.

**Criterios de Aceptación:**
- El modal debe incluir un campo de búsqueda de lotes con autocompletado
- La búsqueda debe funcionar por código, nombre o manzana del lote
- Solo deben mostrarse lotes con estado "disponible"
- Los resultados deben mostrar: código, nombre, manzana, área y precio
- Al seleccionar un lote, el precio total del contrato debe prellenarse automáticamente
- El campo de lote debe ser obligatorio

### 2.4 Como usuario, quiero completar todos los campos del contrato
Para registrar toda la información necesaria del acuerdo comercial.

**Criterios de Aceptación:**
- El formulario debe incluir los siguientes campos:
  - Número de contrato (obligatorio, único)
  - Fecha de contrato (obligatorio, por defecto fecha actual)
  - Precio total (obligatorio, prellenado desde el lote)
  - Enganche (obligatorio, mínimo 0)
  - Meses de pago (obligatorio, mínimo 1)
  - Fecha del primer pago (obligatorio)
  - Moneda (obligatorio, por defecto MXN)
  - Estado (obligatorio, por defecto "activo")
  - Notas (opcional, textarea)
- El saldo pendiente debe calcularse automáticamente: precio_total - enganche
- El pago mensual debe calcularse automáticamente: saldo_pendiente / meses_pago
- Todos los campos obligatorios deben validarse antes de enviar

### 2.5 Como usuario, quiero ver cálculos automáticos en tiempo real
Para entender el impacto financiero del contrato mientras lo configuro.

**Criterios de Aceptación:**
- Al cambiar el precio total o enganche, el saldo pendiente debe recalcularse
- Al cambiar el saldo pendiente o meses de pago, el pago mensual debe recalcularse
- Los cálculos deben mostrarse formateados con separadores de miles
- Los cálculos deben actualizarse inmediatamente sin necesidad de hacer clic

### 2.6 Como usuario, quiero crear el contrato y ver confirmación
Para guardar el contrato en el sistema y continuar trabajando.

**Criterios de Aceptación:**
- Debe existir un botón "Crear Contrato" en el footer del modal
- El botón debe estar deshabilitado si el formulario es inválido
- Al hacer clic, debe mostrarse un indicador de carga
- Si la creación es exitosa:
  - Debe mostrarse un mensaje de éxito
  - El modal debe cerrarse
  - La lista de contratos debe recargarse automáticamente
- Si hay un error:
  - Debe mostrarse un mensaje de error descriptivo
  - El modal debe permanecer abierto para correcciones

### 2.7 Como usuario, quiero cerrar el modal sin guardar
Para cancelar la creación del contrato si cambio de opinión.

**Criterios de Aceptación:**
- Debe existir un botón X en la esquina superior derecha
- Al hacer clic, el modal debe cerrarse sin guardar
- No debe mostrarse confirmación si no hay cambios en el formulario

## 3. Requisitos Técnicos

### 3.1 Componente
- Nombre: `ContractCreateModalComponent`
- Ubicación: `src/app/features/contracts/components/contract-create-modal/`
- Tipo: Standalone component
- Debe usar MatDialog para el modal

### 3.2 Servicios Requeridos
- `ContractService.createContract()` - Para crear el contrato
- `CustomerService.getCustomers()` - Para buscar clientes
- `CustomerService.createCustomer()` - Para crear nuevos clientes
- `PropertyService.getProperties()` - Para buscar lotes disponibles
- `InterceptorService.openSnackbar()` - Para notificaciones

### 3.3 Modelos
- `CreateContractDto` - Ya existe en `contract.model.ts`
- `Customer` - Para el autocompletado de clientes
- `Property` - Para el autocompletado de lotes

### 3.4 Componentes UI Custom
- `app-input` - Para campos de texto, número, fecha, textarea
- `app-select` - Para selects (moneda, estado)
- `app-button` - Para botones de acción
- Autocomplete custom o Material Autocomplete para búsquedas

### 3.5 Validaciones
- Número de contrato: requerido, único
- Cliente: requerido
- Lote: requerido
- Fecha de contrato: requerida, formato YYYY-MM-DD
- Precio total: requerido, número positivo
- Enganche: requerido, número >= 0, <= precio_total
- Meses de pago: requerido, entero >= 1
- Fecha primer pago: requerida, formato YYYY-MM-DD
- Moneda: requerida
- Estado: requerido

### 3.6 Estilos
- Ancho del modal: 900px
- Usar clases Tailwind para layout y estilos
- Botón primario: `bg-indigo-600`
- Grid de 2 columnas para campos del formulario
- Espaciado mínimo según preferencias del usuario

### 3.7 Integración
- El botón "Crear Contrato" en `contracts-list.component.ts` debe abrir este modal
- Al cerrar el modal con éxito, debe llamar `getContracts()` para recargar la lista
- Usar `clearCache()` si existe en el servicio antes de recargar

## 4. Consideraciones de UX

### 4.1 Flujo de Trabajo
1. Usuario hace clic en "Crear Contrato"
2. Se abre el modal con campos vacíos
3. Usuario busca y selecciona cliente (o crea uno nuevo)
4. Usuario busca y selecciona lote disponible
5. El precio total se prellena automáticamente
6. Usuario completa campos restantes
7. Usuario ve cálculos automáticos en tiempo real
8. Usuario hace clic en "Crear Contrato"
9. Se muestra confirmación y se cierra el modal

### 4.2 Mensajes de Error
- "El número de contrato ya existe"
- "Selecciona un cliente"
- "Selecciona un lote"
- "El enganche no puede ser mayor al precio total"
- "Completa todos los campos obligatorios"

### 4.3 Idioma
- Todo el texto debe estar en español
- Labels descriptivos y claros
- Placeholders útiles en campos de búsqueda

## 5. Casos Edge

### 5.1 No hay lotes disponibles
- El autocompletado debe mostrar "No hay lotes disponibles"
- Debe sugerirse crear un lote primero

### 5.2 Cliente sin resultados
- El autocompletado debe mostrar "No se encontraron clientes"
- Debe destacarse el botón "Crear Cliente"

### 5.3 Número de contrato duplicado
- El backend debe validar unicidad
- Mostrar error claro al usuario
- Mantener el formulario con los datos para corrección

### 5.4 Error de red
- Mostrar mensaje de error genérico
- Permitir reintentar la operación
- No cerrar el modal

## 6. Dependencias

### 6.1 Backend Endpoints
- `POST /api/tenant/contracts` - Crear contrato
- `GET /api/tenant/customers?search=` - Buscar clientes
- `POST /api/tenant/customers` - Crear cliente
- `GET /api/tenant/properties?status=disponible&search=` - Buscar lotes

### 6.2 Componentes Existentes
- `app-input` component
- `app-select` component
- `app-button` component
- `InterceptorService` para snackbars
- `LocalDatePipe` para formateo de fechas

## 7. Criterios de Éxito

- El usuario puede crear contratos completos desde el modal
- El flujo es intuitivo y no requiere salir del modal
- Los cálculos automáticos funcionan correctamente
- Las validaciones previenen datos incorrectos
- La integración con la lista de contratos funciona sin problemas
- El diseño es consistente con el resto de la aplicación
