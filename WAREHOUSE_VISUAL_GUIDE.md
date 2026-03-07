# 🎨 Warehouse Module - Visual Guide

## 📊 Estructura Visual

```
┌─────────────────────────────────────────────────────────────────┐
│                   WAREHOUSE MODULE STRUCTURE                     │
└─────────────────────────────────────────────────────────────────┘

src/app/features/warehouses/
│
├─ 📁 models/
│  └─ warehouse.model.ts
│     ├─ Warehouse (interface)
│     ├─ CreateWarehouseDto
│     ├─ UpdateWarehouseDto
│     ├─ WarehouseListResponse
│     └─ WarehouseQueryParams
│
├─ 📁 services/
│  └─ warehouse.service.ts
│     ├─ getWarehouses()
│     ├─ getWarehouse()
│     ├─ createWarehouse()
│     ├─ updateWarehouse()
│     └─ deleteWarehouse()
│
├─ 📁 components/
│  ├─ 📁 warehouse-list/
│  │  ├─ warehouse-list.component.ts
│  │  ├─ warehouse-list.component.html
│  │  └─ warehouse-list.component.scss
│  │
│  ├─ 📁 warehouse-detail-modal/
│  │  ├─ warehouse-detail-modal.component.ts
│  │  ├─ warehouse-detail-modal.component.html
│  │  └─ warehouse-detail-modal.component.scss
│  │
│  └─ index.ts
│
├─ index.ts
├─ README.md
├─ WAREHOUSE_SETUP.md
├─ INTEGRATION_EXAMPLE.md
├─ ARCHITECTURE.md
├─ QUICK_REFERENCE.md
└─ VERIFICATION_CHECKLIST.md
```

---

## 🔄 Flujo de Datos

```
┌──────────────────────────────────────────────────────────────┐
│                      USER INTERFACE                          │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  WarehouseListComponent                                │  │
│  │  ┌──────────────────────────────────────────────────┐  │  │
│  │  │  [Nuevo Almacén]  [Buscar...]  [Filtros]        │  │  │
│  │  │  ┌──────────────────────────────────────────────┐ │  │
│  │  │  │ Tabla de Almacenes                           │ │  │
│  │  │  │ ┌─────────────────────────────────────────┐  │ │  │
│  │  │  │ │ Nombre │ Código │ RFC │ Ciudad │ Estado│  │ │  │
│  │  │  │ ├─────────────────────────────────────────┤  │ │  │
│  │  │  │ │ Almacén Central │ ALM-001 │ ... │ CDMX │  │ │  │
│  │  │  │ │ Almacén Zona Norte │ ALM-ZN-001 │ ... │  │ │  │
│  │  │  │ └─────────────────────────────────────────┘  │ │  │
│  │  │  └──────────────────────────────────────────────┘ │  │
│  │  └────────────────────────────────────────────────────┘  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│                    MODAL (Crear/Editar)                      │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  WarehouseDetailModalComponent                         │  │
│  │  ┌──────────────────────────────────────────────────┐  │  │
│  │  │ Nombre: [_________________]                      │  │  │
│  │  │ Código: [_________________]                      │  │  │
│  │  │ RFC: [_________________]                         │  │  │
│  │  │ Calle: [_________________]                       │  │  │
│  │  │ Ciudad: [_________________]                      │  │  │
│  │  │ Estado: [_________________]                      │  │  │
│  │  │ País: [Selecciona...]                            │  │  │
│  │  │ Teléfono: [_________________]                    │  │  │
│  │  │ Email: [_________________]                       │  │  │
│  │  │ [Cancelar] [Guardar]                             │  │  │
│  │  └──────────────────────────────────────────────────┘  │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│                    SERVICE LAYER                             │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  WarehouseService                                      │  │
│  │  ├─ getWarehouses(params)                             │  │
│  │  ├─ getWarehouse(id)                                  │  │
│  │  ├─ createWarehouse(data)                             │  │
│  │  ├─ updateWarehouse(id, data)                         │  │
│  │  └─ deleteWarehouse(id)                               │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│                    HTTP CLIENT                               │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  POST   /tenant/warehouses                            │  │
│  │  GET    /tenant/warehouses                            │  │
│  │  GET    /tenant/warehouses/:id                        │  │
│  │  PUT    /tenant/warehouses/:id                        │  │
│  │  DELETE /tenant/warehouses/:id                        │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│                    BACKEND API                               │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  ✓ Validación de datos                               │  │
│  │  ✓ Autenticación JWT                                 │  │
│  │  ✓ Autorización RBAC                                 │  │
│  │  ✓ Aislamiento por tenant                            │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│                    DATABASE                                  │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Table: warehouses                                    │  │
│  │  ├─ id (UUID)                                         │  │
│  │  ├─ tenant_id (UUID)                                  │  │
│  │  ├─ name, code, rfc, etc.                             │  │
│  │  ├─ created_at, updated_at                            │  │
│  │  └─ Índices: tenant_id, status, code                  │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

---

## 🎯 Casos de Uso

### Caso 1: Crear Almacén

```
Usuario
   │
   ├─ Click [Nuevo Almacén]
   │
   ▼
Modal abierto
   │
   ├─ Completa formulario
   │
   ▼
Click [Crear Almacén]
   │
   ├─ Validación frontend ✓
   │
   ▼
WarehouseService.createWarehouse()
   │
   ├─ HttpClient.post()
   │
   ▼
Backend
   │
   ├─ Validación backend ✓
   ├─ Verificar permisos ✓
   ├─ Guardar en BD ✓
   │
   ▼
Response: Warehouse
   │
   ├─ Modal cierra
   ├─ Tabla se actualiza
   ├─ Snackbar: "Creado correctamente"
   │
   ▼
✅ Almacén creado
```

### Caso 2: Editar Almacén

```
Usuario
   │
   ├─ Click en fila de tabla
   │
   ▼
Modal abierto con datos
   │
   ├─ Modifica campos
   │
   ▼
Click [Guardar Cambios]
   │
   ├─ Validación frontend ✓
   │
   ▼
WarehouseService.updateWarehouse()
   │
   ├─ HttpClient.put()
   │
   ▼
Backend
   │
   ├─ Validación backend ✓
   ├─ Verificar permisos ✓
   ├─ Actualizar en BD ✓
   │
   ▼
Response: Warehouse
   │
   ├─ Modal cierra
   ├─ Tabla se actualiza
   ├─ Snackbar: "Actualizado correctamente"
   │
   ▼
✅ Almacén actualizado
```

### Caso 3: Eliminar Almacén

```
Usuario
   │
   ├─ Click botón Eliminar
   │
   ▼
Diálogo de confirmación
   │
   ├─ Usuario confirma
   │
   ▼
WarehouseService.deleteWarehouse()
   │
   ├─ HttpClient.delete()
   │
   ▼
Backend
   │
   ├─ Verificar permisos ✓
   ├─ Eliminar de BD ✓
   │
   ▼
Response: void
   │
   ├─ Tabla se actualiza
   ├─ Snackbar: "Eliminado correctamente"
   │
   ▼
✅ Almacén eliminado
```

---

## 📋 Campos del Formulario

```
┌─────────────────────────────────────────────────────────────┐
│                  WAREHOUSE FORM FIELDS                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  INFORMACIÓN BÁSICA                                          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Nombre *                    │ Código *               │   │
│  │ [Almacén Central]           │ [ALM-001]              │   │
│  │                                                      │   │
│  │ Descripción                                          │   │
│  │ [Almacén principal de la empresa]                    │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  INFORMACIÓN FISCAL                                          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ RFC *                       │ Razón Social *         │   │
│  │ [ALM123456ABC]              │ [EMPRESA SA]           │   │
│  │                                                      │   │
│  │ Tipo de Persona *                                    │   │
│  │ [Persona Moral ▼]                                    │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  UBICACIÓN                                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Calle *                                              │   │
│  │ [Calle Principal 123]                                │   │
│  │                                                      │   │
│  │ Ciudad *                    │ Estado *               │   │
│  │ [México]                    │ [CDMX]                 │   │
│  │                                                      │   │
│  │ País *                      │ CP *                   │   │
│  │ [México ▼]                  │ [06500]                │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  CONTACTO                                                    │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Teléfono                    │ Email                  │   │
│  │ [+52 55 1234 5678]          │ [almacen@empresa.com]  │   │
│  │                                                      │   │
│  │ Persona de Contacto                                  │   │
│  │ [Juan Pérez]                                         │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ESTADO                                                      │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Status *                                             │   │
│  │ [Activo ▼]                                           │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  [Cancelar]                                    [Guardar]    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔐 Seguridad

```
┌─────────────────────────────────────────────────────────────┐
│                    SECURITY LAYERS                           │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  FRONTEND                                                    │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ ✓ Validación de formulario                          │   │
│  │ ✓ Validación de RFC (patrón)                        │   │
│  │ ✓ Validación de email                               │   │
│  │ ✓ Confirmación de eliminación                       │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  TRANSPORT                                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ ✓ HTTPS (TLS/SSL)                                   │   │
│  │ ✓ JWT Token en header                               │   │
│  │ ✓ CORS validado                                     │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  BACKEND                                                     │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ ✓ Autenticación JWT                                 │   │
│  │ ✓ Autorización RBAC                                 │   │
│  │ ✓ Validación de datos                               │   │
│  │ ✓ Aislamiento por tenant                            │   │
│  │ ✓ Rate limiting                                     │   │
│  │ ✓ Logging de auditoría                              │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  DATABASE                                                    │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ ✓ Encriptación en reposo                            │   │
│  │ ✓ Backups automáticos                               │   │
│  │ ✓ Índices para performance                          │   │
│  │ ✓ Constraints de integridad                         │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 📊 Tabla de Almacenes

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        WAREHOUSE LIST TABLE                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  [Nuevo Almacén]  [Buscar...]  [Filtros]                                   │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │ Nombre │ Código │ RFC │ Ciudad │ Estado │ País │ Tipo │ Status │ ... │   │
│  ├──────────────────────────────────────────────────────────────────────┤   │
│  │ Almacén Central │ ALM-001 │ ALM123456ABC │ México │ CDMX │ México │ ... │   │
│  │ Almacén Zona Norte │ ALM-ZN-001 │ MZN123456ABC │ Monterrey │ NL │ ... │   │
│  │ Almacén Zona Sur │ ALM-ZS-001 │ MZS123456ABC │ Guadalajara │ JAL │ ... │   │
│  │ Almacén Zona Occidente │ ALM-ZO-001 │ MZO123456ABC │ Cancún │ QR │ ... │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  Mostrando 1-4 de 4 almacenes                                               │
│  [◄ Anterior] [1] [Siguiente ►]                                             │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🎨 Estados Visuales

```
┌─────────────────────────────────────────────────────────────┐
│                    VISUAL STATES                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  LOADING                                                     │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  ⟳ Cargando almacenes...                            │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  SUCCESS                                                     │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  ✓ Almacén creado correctamente                     │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ERROR                                                       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  ✗ Error al crear almacén: RFC inválido             │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  EMPTY STATE                                                 │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                                                      │   │
│  │              📦 Sin resultados                       │   │
│  │                                                      │   │
│  │  No se encontraron almacenes                        │   │
│  │  [Crear Nuevo Almacén]                              │   │
│  │                                                      │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  CONFIRMATION DIALOG                                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  ⚠️  Eliminar Almacén                               │   │
│  │                                                      │   │
│  │  ¿Estás seguro de que deseas eliminar               │   │
│  │  "Almacén Central"?                                 │   │
│  │                                                      │   │
│  │  Esta acción no se puede deshacer.                  │   │
│  │                                                      │   │
│  │  [Cancelar]  [Eliminar]                             │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Ciclo de Vida

```
┌─────────────────────────────────────────────────────────────┐
│              COMPONENT LIFECYCLE                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  WarehouseListComponent                                      │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                                                      │   │
│  │  constructor()                                       │   │
│  │      ↓                                               │   │
│  │  ngOnInit()                                          │   │
│  │      ↓                                               │   │
│  │  loadWarehouses()                                    │   │
│  │      ↓                                               │   │
│  │  Componente renderizado                             │   │
│  │      ↓                                               │   │
│  │  Usuario interactúa                                 │   │
│  │      ↓                                               │   │
│  │  ngOnDestroy()                                       │   │
│  │      ↓                                               │   │
│  │  Limpiar suscripciones                              │   │
│  │                                                      │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  WarehouseDetailModalComponent                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                                                      │   │
│  │  constructor()                                       │   │
│  │      ↓                                               │   │
│  │  createForm()                                        │   │
│  │      ↓                                               │   │
│  │  Modal renderizado                                  │   │
│  │      ↓                                               │   │
│  │  Usuario completa formulario                        │   │
│  │      ↓                                               │   │
│  │  save() o close()                                   │   │
│  │      ↓                                               │   │
│  │  Modal cierra                                       │   │
│  │                                                      │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 📈 Escalabilidad

```
┌─────────────────────────────────────────────────────────────┐
│                  SCALABILITY FEATURES                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  FRONTEND                                                    │
│  ✓ Lazy loading de componentes                             │
│  ✓ Paginación en tabla                                     │
│  ✓ Búsqueda en backend                                     │
│  ✓ Unsubscribe automático                                  │
│  ✓ Standalone components                                   │
│                                                              │
│  BACKEND                                                     │
│  ✓ Índices en base de datos                                │
│  ✓ Paginación de resultados                                │
│  ✓ Filtrado en backend                                     │
│  ✓ Caché de datos                                          │
│  ✓ Rate limiting                                           │
│                                                              │
│  DATABASE                                                    │
│  ✓ Índices: tenant_id, status, code                        │
│  ✓ Particionamiento por tenant                             │
│  ✓ Backups automáticos                                     │
│  ✓ Replicación                                             │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 Integración Rápida

```
┌─────────────────────────────────────────────────────────────┐
│              QUICK INTEGRATION STEPS                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  PASO 1: Agregar Ruta (1 minuto)                           │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ // app.routes.ts                                    │   │
│  │ import { WarehouseListComponent } from '...';       │   │
│  │ { path: 'warehouses', component: WarehouseList... } │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  PASO 2: Agregar Menú (1 minuto)                           │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ <a routerLink="/warehouses">Almacenes</a>           │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  PASO 3: Configurar Backend (15 minutos)                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Ver: WAREHOUSE_SETUP.md                             │   │
│  │ - Crear tabla                                       │   │
│  │ - Crear permisos                                    │   │
│  │ - Crear endpoints                                   │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ✅ LISTO EN 17 MINUTOS                                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

**Versión:** 1.0.0  
**Última actualización:** 2024  
**Estado:** ✅ Listo para usar
