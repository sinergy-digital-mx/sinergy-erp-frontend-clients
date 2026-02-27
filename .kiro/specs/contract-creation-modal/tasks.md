# Plan de Implementación: Modal de Creación de Contratos

## Descripción General

Implementar el `ContractCreateModalComponent` como un componente standalone de Angular que permita crear contratos con autocompletado de clientes y propiedades, cálculos automáticos, y la capacidad de crear clientes sin salir del flujo.

## Tareas

- [x] 1. Crear estructura del componente y configuración inicial
  - Crear directorio `src/app/features/contracts/components/contract-create-modal/`
  - Crear archivos: component.ts, component.html, component.scss
  - Configurar imports standalone: CommonModule, ReactiveFormsModule, MatDialogModule, MatAutocompleteModule, LucideAngularModule
  - Importar componentes custom: InputComponent, SelectComponent, ButtonComponent
  - Configurar inyección de dependencias: FormBuilder, MatDialogRef, servicios (ContractService, CustomerService, PropertyService, InterceptorService), MatDialog
  - _Requisitos: 3.1, 3.2_

- [ ] 2. Implementar formulario reactivo y configuraciones de select
  - [x] 2.1 Crear FormGroup con todos los campos requeridos
    - Campos de búsqueda: customer_search, property_search
    - Campos de selección: customer_id (required), property_id (required)
    - Campos de contrato: contract_number (required), contract_date (required, default hoy)
    - Campos monetarios: total_price (required, min 0), down_payment (required, min 0)
    - Campos de pago: payment_months (required, min 1), first_payment_date (required)
    - Campos de configuración: currency (required, default 'MXN'), status (required, default 'activo')
    - Campo opcional: notes
    - Campos calculados (disabled): remaining_balance, monthly_payment
    - _Requisitos: 2.4.1, 3.5_
  
  - [x] 2.2 Configurar ISelect para moneda y estado
    - currencySelectConfig con opciones: MXN, USD, EUR
    - statusSelectConfig con opciones: activo, completado, cancelado, suspendido
    - Vincular form controls a las configuraciones
    - _Requisitos: 2.4.1, 3.4_

- [ ] 3. Implementar carga y filtrado de clientes
  - [x] 3.1 Implementar loadCustomers() y filterCustomers()
    - Llamar a customerService.getCustomers({}) en ngOnInit
    - Almacenar resultados en signal customers
    - Implementar filtrado por nombre, apellido o email (case-insensitive)
    - Actualizar signal filteredCustomers con resultados
    - Manejar errores con InterceptorService
    - _Requisitos: 2.1.1, 2.1.2_
  
  - [ ]* 3.2 Escribir prueba de propiedad para filtrado de clientes
    - **Propiedad 1: Búsqueda de clientes por múltiples campos**
    - **Valida: Requisitos 2.1.2**
  
  - [x] 3.3 Implementar onCustomerSelected()
    - Actualizar form.patchValue con customer_id del cliente seleccionado
    - _Requisitos: 2.1.4_
  
  - [ ]* 3.4 Escribir prueba de propiedad para selección de cliente
    - **Propiedad 2: Selección de cliente actualiza el formulario**
    - **Valida: Requisitos 2.1.4**
  
  - [x] 3.5 Implementar displayCustomer()
    - Formato: "Nombre Apellido (email)"
    - _Requisitos: 2.1.1_

- [ ] 4. Implementar carga y filtrado de propiedades
  - [x] 4.1 Implementar loadAvailableProperties() y filterProperties()
    - Llamar a propertyService.getProperties({ status: 'disponible' }) en ngOnInit
    - Almacenar resultados en signal properties
    - Implementar filtrado por código, nombre o manzana (case-insensitive)
    - Actualizar signal filteredProperties con resultados
    - Manejar errores con InterceptorService
    - _Requisitos: 2.3.1, 2.3.2, 2.3.3_
  
  - [ ]* 4.2 Escribir prueba de propiedad para filtrado de propiedades
    - **Propiedad 3: Búsqueda de propiedades por múltiples campos**
    - **Valida: Requisitos 2.3.2**
  
  - [ ]* 4.3 Escribir prueba de propiedad para filtrado por estado disponible
    - **Propiedad 4: Filtrado de propiedades disponibles**
    - **Valida: Requisitos 2.3.3**
  
  - [x] 4.4 Implementar displayProperty()
    - Formato: "Código - Nombre (Mz: Manzana, $Precio)"
    - Incluir código, nombre, manzana y precio formateado
    - _Requisitos: 2.3.4_
  
  - [ ]* 4.5 Escribir prueba de propiedad para display de propiedades
    - **Propiedad 5: Display de propiedades contiene información requerida**
    - **Valida: Requisitos 2.3.4**
  
  - [x] 4.6 Implementar onPropertySelected()
    - Actualizar form.patchValue con property_id y total_price de la propiedad seleccionada
    - _Requisitos: 2.3.5_
  
  - [ ]* 4.7 Escribir prueba de propiedad para selección de propiedad
    - **Propiedad 6: Selección de propiedad prellena el precio total**
    - **Valida: Requisitos 2.3.5**

- [x] 5. Checkpoint - Verificar autocompletados funcionando
  - Asegurar que todos los tests pasen, preguntar al usuario si surgen dudas.

- [ ] 6. Implementar cálculos automáticos
  - [x] 6.1 Implementar setupCalculations()
    - Usar combineLatest para observar cambios en total_price y down_payment
    - Llamar a calculateRemainingBalance() cuando cambien
    - Usar combineLatest para observar cambios en remaining_balance y payment_months
    - Llamar a calculateMonthlyPayment() cuando cambien
    - Incluir startWith para cálculo inicial
    - _Requisitos: 2.5.1, 2.5.2_
  
  - [x] 6.2 Implementar calculateRemainingBalance()
    - Fórmula: remaining_balance = total_price - down_payment
    - Actualizar campo disabled remaining_balance con setValue
    - _Requisitos: 2.4.2, 2.5.1_
  
  - [ ]* 6.3 Escribir prueba de propiedad para cálculo de saldo pendiente
    - **Propiedad 7: Cálculo automático del saldo pendiente**
    - **Valida: Requisitos 2.4.2, 2.5.1**
  
  - [x] 6.4 Implementar calculateMonthlyPayment()
    - Fórmula: monthly_payment = remaining_balance / payment_months
    - Validar payment_months > 0 para evitar división por cero
    - Actualizar campo disabled monthly_payment con setValue
    - _Requisitos: 2.4.3, 2.5.2_
  
  - [ ]* 6.5 Escribir prueba de propiedad para cálculo de pago mensual
    - **Propiedad 8: Cálculo automático del pago mensual**
    - **Valida: Requisitos 2.4.3, 2.5.2**
  
  - [x] 6.6 Implementar función de formateo de números
    - Usar toLocaleString() para separadores de miles
    - Aplicar en template para campos calculados
    - _Requisitos: 2.5.3_
  
  - [ ]* 6.7 Escribir prueba de propiedad para formateo de números
    - **Propiedad 10: Formateo de números con separadores de miles**
    - **Valida: Requisitos 2.5.3**

- [ ] 7. Implementar validaciones y submit
  - [x] 7.1 Implementar submit() con validaciones
    - Verificar form.invalid y marcar todos los campos como touched
    - Validar que down_payment <= total_price
    - Mostrar mensajes de error apropiados con InterceptorService
    - Construir payload CreateContractDto con valores del formulario
    - Establecer loading signal en true
    - Llamar a contractService.createContract(payload)
    - En éxito: mostrar snackbar de éxito, establecer loading en false, cerrar modal con dialogRef.close(true)
    - En error: mostrar snackbar de error con mensaje del servidor, establecer loading en false, mantener modal abierto
    - _Requisitos: 2.4.4, 2.6.1, 2.6.2, 2.6.3, 2.6.4, 2.6.5, 2.6.7, 2.6.8_
  
  - [ ]* 7.2 Escribir prueba de propiedad para validación de campos obligatorios
    - **Propiedad 9: Validación de campos obligatorios**
    - **Valida: Requisitos 2.4.4, 2.1.5, 2.3.6**
  
  - [ ]* 7.3 Escribir prueba de propiedad para validación de enganche
    - **Propiedad 12: Validación de enganche no mayor al precio total**
    - **Valida: Requisitos implícitos de validación de negocio**
  
  - [ ]* 7.4 Escribir prueba de propiedad para botón deshabilitado
    - **Propiedad 11: Botón deshabilitado con formulario inválido**
    - **Valida: Requisitos 2.6.2**
  
  - [x] 7.5 Implementar close()
    - Cerrar modal sin guardar con dialogRef.close()
    - _Requisitos: 2.7.2_

- [ ] 8. Implementar creación de cliente desde el modal
  - [x] 8.1 Implementar openCreateCustomerModal()
    - Abrir CustomerEditModalComponent con MatDialog
    - Configurar width: '600px'
    - Pasar data: { customer: null }
    - En afterClosed, si result es true, recargar clientes con loadCustomers()
    - _Requisitos: 2.2.1, 2.2.2_
  
  - [ ]* 8.2 Escribir pruebas unitarias para creación de cliente
    - Verificar que click en botón abre CustomerEditModalComponent
    - Verificar que afterClosed con true recarga clientes
    - _Requisitos: 2.2.2_

- [ ] 9. Implementar template HTML
  - [x] 9.1 Crear estructura del modal con header, body y footer
    - Header: título "Crear Contrato" y botón X con icono lucide
    - Body: formulario con secciones
    - Footer: botones Cancelar y Crear Contrato
    - _Requisitos: 2.6.1, 2.7.1_
  
  - [x] 9.2 Implementar sección de cliente con autocomplete
    - mat-form-field con input y matAutocomplete
    - Vincular a customer_search form control
    - mat-autocomplete con *ngFor sobre filteredCustomers signal
    - mat-option con displayCustomer()
    - Botón "Crear Cliente" junto al autocomplete
    - Mensaje "No se encontraron clientes" cuando filteredCustomers está vacío
    - _Requisitos: 2.1.1, 2.2.1_
  
  - [x] 9.3 Implementar sección de propiedad con autocomplete
    - mat-form-field con input y matAutocomplete
    - Vincular a property_search form control
    - mat-autocomplete con *ngFor sobre filteredProperties signal
    - mat-option con displayProperty()
    - Mensaje "No hay lotes disponibles" cuando filteredProperties está vacío
    - _Requisitos: 2.3.1_
  
  - [x] 9.4 Implementar sección de datos del contrato
    - Grid de 2 columnas con gap-4
    - app-input para: contract_number, contract_date (type="date"), total_price (type="number"), down_payment (type="number")
    - app-input readonly para: remaining_balance, monthly_payment (mostrar valores formateados)
    - app-input para: payment_months (type="number"), first_payment_date (type="date")
    - app-select para: currency, status
    - app-input type="textarea" para: notes (span completo de 2 columnas)
    - _Requisitos: 2.4.1_
  
  - [x] 9.5 Configurar botones del footer
    - Botón Cancelar: variant="secondary", (click)="close()"
    - Botón Crear Contrato: variant="primary", (click)="submit()", [disabled]="form.invalid || loading()", [loading]="loading()"
    - _Requisitos: 2.6.1, 2.6.2, 2.6.3_
  
  - [ ]* 9.6 Escribir pruebas unitarias para estructura de UI
    - Verificar que existen todos los campos del formulario
    - Verificar que existe botón "Crear Cliente"
    - Verificar que existe botón "Crear Contrato"
    - Verificar que existe botón X de cierre
    - _Requisitos: 2.1.1, 2.2.1, 2.3.1, 2.4.1, 2.6.1, 2.7.1_

- [ ] 10. Implementar estilos SCSS
  - [x] 10.1 Crear estilos para modal-container
    - width: 900px
    - max-height: 90vh
    - display: flex, flex-direction: column
    - _Requisitos: 3.6_
  
  - [x] 10.2 Crear estilos para modal-header
    - display: flex, justify-content: space-between, align-items: center
    - padding: 1.5rem
    - border-bottom: 1px solid #e5e7eb
    - Estilos para h2: font-size 1.5rem, font-weight 600
    - Estilos para botón X con hover
    - _Requisitos: 3.6_
  
  - [x] 10.3 Crear estilos para modal-body
    - flex: 1
    - overflow-y: auto
    - padding: 1.5rem
    - Estilos para secciones con margin-bottom
    - Estilos para h3 de secciones
    - Estilos para autocomplete-with-button (flex, gap, align-items)
    - _Requisitos: 3.6_
  
  - [x] 10.4 Crear estilos para modal-footer
    - display: flex, justify-content: flex-end, gap: 0.75rem
    - padding: 1.5rem
    - border-top: 1px solid #e5e7eb
    - _Requisitos: 3.6_
  
  - [x] 10.5 Crear estilos para mensajes de no-results
    - Centrado, padding, color de texto gris
    - _Requisitos: 5.1, 5.2_

- [x] 11. Checkpoint - Verificar UI completa
  - Asegurar que todos los tests pasen, preguntar al usuario si surgen dudas.

- [ ] 12. Implementar optimizaciones de rendimiento
  - [x] 12.1 Agregar debouncing a campos de búsqueda
    - Usar pipe(debounceTime(300), distinctUntilChanged()) en customer_search valueChanges
    - Usar pipe(debounceTime(300), distinctUntilChanged()) en property_search valueChanges
    - _Requisitos: 11.1_
  
  - [x] 12.2 Optimizar carga inicial con forkJoin
    - Usar forkJoin para cargar customers y properties en paralelo
    - Manejar errores globales
    - _Requisitos: 11.2_

- [ ] 13. Integrar modal en contracts-list.component
  - [x] 13.1 Agregar método openCreateContractModal()
    - Abrir ContractCreateModalComponent con MatDialog
    - Configurar width: '900px', disableClose: false
    - En afterClosed, si result es true, llamar a getContracts()
    - _Requisitos: 3.7_
  
  - [x] 13.2 Vincular botón "Crear Contrato" al método
    - Actualizar template para llamar a openCreateContractModal()
    - _Requisitos: 3.7_
  
  - [ ]* 13.3 Escribir pruebas de integración
    - Verificar que modal se abre correctamente
    - Verificar que afterClosed con true recarga contratos
    - _Requisitos: 3.7_

- [ ] 14. Implementar accesibilidad
  - [x] 14.1 Agregar atributos ARIA a campos de autocomplete
    - aria-label para inputs de búsqueda
    - aria-describedby para mensajes de ayuda
    - _Requisitos: 12.1_
  
  - [x] 14.2 Configurar navegación por teclado
    - Verificar que Tab navega entre campos
    - Verificar que Enter selecciona opciones de autocomplete
    - Verificar que Escape cierra modal
    - _Requisitos: 12.2_
  
  - [x] 14.3 Asociar mensajes de error con campos
    - Usar aria-describedby para vincular errores
    - _Requisitos: 12.3_

- [x] 15. Checkpoint final - Verificar funcionalidad completa
  - Asegurar que todos los tests pasen, preguntar al usuario si surgen dudas.

## Notas

- Las tareas marcadas con `*` son opcionales y pueden omitirse para un MVP más rápido
- Cada tarea referencia requisitos específicos para trazabilidad
- Los checkpoints aseguran validación incremental
- Las pruebas de propiedades validan propiedades de corrección universales
- Las pruebas unitarias validan ejemplos específicos y casos edge
- Usar fast-check para pruebas basadas en propiedades con mínimo 100 iteraciones
- Todos los textos deben estar en español
