# Fiscal Configuration - Module Structure

## 📊 Architecture Overview

```
Settings Feature
├── Warehouse Module (Simplified)
│   ├── Model: Warehouse (location info only)
│   ├── Service: WarehouseService
│   ├── Components:
│   │   ├── WarehouseListComponent
│   │   └── WarehouseDetailModalComponent
│   └── Route: /settings/warehouses
│
└── Fiscal Configuration Module (NEW)
    ├── Model: FiscalConfiguration (fiscal info)
    ├── Service: FiscalConfigurationService
    ├── Components:
    │   ├── FiscalConfigurationListComponent
    │   └── FiscalConfigurationModalComponent
    └── Route: /settings/fiscal-configurations
```

---

## 🏗️ Data Model Relationship

```
┌─────────────────────────────────────────────────────────────┐
│                        Warehouse                             │
├─────────────────────────────────────────────────────────────┤
│ id (UUID)                                                    │
│ tenant_id (UUID)                                             │
│ name (string) ✅ REQUIRED                                    │
│ code (string)                                                │
│ description (string)                                         │
│ street (string)                                              │
│ city (string)                                                │
│ state (string)                                               │
│ zip_code (string)                                            │
│ country (string)                                             │
│ status (active/inactive)                                     │
│ created_at, updated_at                                       │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ 1:1 relationship
                            │ (warehouse_id)
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  FiscalConfiguration                         │
├─────────────────────────────────────────────────────────────┤
│ id (UUID)                                                    │
│ tenant_id (UUID)                                             │
│ warehouse_id (UUID) ✅ REQUIRED (FK)                         │
│ razon_social (string) ✅ REQUIRED                            │
│ rfc (string) ✅ REQUIRED                                     │
│ persona_type (Física/Moral) ✅ REQUIRED                      │
│ fiscal_regime (string)                                       │
│ digital_seal (text)                                          │
│ digital_seal_password (string)                               │
│ private_key (text)                                           │
│ status (active/inactive)                                     │
│ created_at, updated_at                                       │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Component Interaction Flow

### Create Workflow
```
User clicks "Nueva Configuración"
    ↓
FiscalConfigurationListComponent opens modal
    ↓
FiscalConfigurationModalComponent loads warehouses
    ↓
User selects warehouse and fills form
    ↓
FiscalConfigurationService.createFiscalConfiguration()
    ↓
API POST /api/tenant/fiscal-configurations
    ↓
Success: Reload list, show snackbar
```

### Edit Workflow
```
User clicks edit icon on row
    ↓
FiscalConfigurationListComponent opens modal with data
    ↓
FiscalConfigurationModalComponent pre-fills form
    ↓
User modifies fields
    ↓
FiscalConfigurationService.updateFiscalConfiguration()
    ↓
API PUT /api/tenant/fiscal-configurations/{id}
    ↓
Success: Reload list, show snackbar
```

### Delete Workflow
```
User clicks delete icon on row
    ↓
AlertDialogComponent shows confirmation
    ↓
User confirms deletion
    ↓
FiscalConfigurationService.deleteFiscalConfiguration()
    ↓
API DELETE /api/tenant/fiscal-configurations/{id}
    ↓
Success: Reload list, show snackbar
```

---

## 📱 UI Components

### Warehouse Form (Simplified)
```
┌─────────────────────────────────────────┐
│ Nuevo Almacén                        [X] │
├─────────────────────────────────────────┤
│                                         │
│ Nombre *                                │
│ [_____________________________]          │
│                                         │
│ Código              Status              │
│ [__________]        [Activo ▼]          │
│                                         │
│ Descripción                             │
│ [_____________________________]          │
│ [_____________________________]          │
│                                         │
│ Calle                                   │
│ [_____________________________]          │
│                                         │
│ Ciudad              Estado              │
│ [__________]        [__________]        │
│                                         │
│ País                CP                  │
│ [Selecciona ▼]      [__________]        │
│                                         │
├─────────────────────────────────────────┤
│                    [Cancelar] [Guardar] │
└─────────────────────────────────────────┘
```

### Fiscal Configuration Form
```
┌─────────────────────────────────────────┐
│ Nueva Configuración Fiscal           [X] │
├─────────────────────────────────────────┤
│                                         │
│ Almacén *                               │
│ [Selecciona un almacén ▼]               │
│                                         │
│ Razón Social *                          │
│ [_____________________________]          │
│                                         │
│ RFC *               Tipo de Persona *   │
│ [__________]        [Persona Moral ▼]   │
│                                         │
│ Régimen Fiscal                          │
│ [Selecciona régimen ▼]                  │
│                                         │
│ Sello Digital                           │
│ [_____________________________]          │
│ [_____________________________]          │
│ [_____________________________]          │
│                                         │
│ Contraseña del Sello Digital            │
│ [_____________________________]          │
│                                         │
│ Llave Privada                           │
│ [_____________________________]          │
│ [_____________________________]          │
│ [_____________________________]          │
│                                         │
│ Status                                  │
│ [Activo ▼]                              │
│                                         │
├─────────────────────────────────────────┤
│                    [Cancelar] [Crear]   │
└─────────────────────────────────────────┘
```

### Fiscal Configuration List
```
┌─────────────────────────────────────────────────────────────┐
│ Configuraciones Fiscales    [Nueva Configuración]           │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ Almacén | Razón Social | RFC | Tipo | Status | Acciones   │
├─────────────────────────────────────────────────────────────┤
│ ALM-001 | GRUPO MIN... | GMM... | Moral | Activo | [✎][🗑] │
│ ALM-002 | EMPRESA S.A. | EMP... | Física| Activo | [✎][🗑] │
│ ALM-003 | COMERCIO... | COM... | Moral | Inactivo| [✎][🗑]│
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ Mostrando 1 a 3 de 3 configuraciones                        │
│                    [Anterior] Página 1 de 1 [Siguiente]    │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔐 Permissions Required

```
fiscal_configurations:Create  - Create new fiscal configurations
fiscal_configurations:Read    - View fiscal configurations
fiscal_configurations:Update  - Edit fiscal configurations
fiscal_configurations:Delete  - Delete fiscal configurations
```

---

## 📡 API Endpoints

### Create
```
POST /api/tenant/fiscal-configurations
Content-Type: application/json

{
  "warehouse_id": "uuid",
  "razon_social": "string",
  "rfc": "string",
  "persona_type": "Persona Física|Persona Moral",
  "fiscal_regime": "string",
  "digital_seal": "string",
  "digital_seal_password": "string",
  "private_key": "string",
  "status": "active|inactive"
}
```

### Read
```
GET /api/tenant/fiscal-configurations/{id}
GET /api/tenant/fiscal-configurations/warehouse/{warehouseId}
```

### List
```
GET /api/tenant/fiscal-configurations?page=1&limit=20&warehouse_id=uuid&status=active
```

### Update
```
PUT /api/tenant/fiscal-configurations/{id}
Content-Type: application/json

{
  "razon_social": "string",
  "rfc": "string",
  "persona_type": "Persona Física|Persona Moral",
  "fiscal_regime": "string",
  "digital_seal": "string",
  "digital_seal_password": "string",
  "private_key": "string",
  "status": "active|inactive"
}
```

### Delete
```
DELETE /api/tenant/fiscal-configurations/{id}
```

---

## 🎯 Settings Menu

```
┌─────────────────────────────────────────────────────────────┐
│ Configuración                                               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ ┌──────────────┐  ┌──────────────┐                         │
│ │ 👥 Usuarios  │  │ 🔐 Roles     │                         │
│ │ Gestiona...  │  │ Crea y...    │                         │
│ └──────────────┘  └──────────────┘                         │
│                                                             │
│ ┌──────────────┐  ┌──────────────┐                         │
│ │ 🏢 Proveedores│ │ 🏭 Almacenes │                         │
│ │ Gestiona...  │  │ Gestiona...  │                         │
│ └──────────────┘  └──────────────┘                         │
│                                                             │
│ ┌──────────────────────────────────┐                       │
│ │ 📋 Configuración Fiscal          │                       │
│ │ Gestiona la información fiscal   │                       │
│ │ de tus almacenes...              │                       │
│ └──────────────────────────────────┘                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## ✅ Implementation Checklist

- [x] Warehouse model updated (removed fiscal fields)
- [x] Warehouse form simplified
- [x] Fiscal Configuration model created
- [x] Fiscal Configuration service created
- [x] Fiscal Configuration modal component created
- [x] Fiscal Configuration list component created
- [x] Routes configured
- [x] Settings menu updated
- [x] Module exports updated
- [x] All components compile without errors
- [ ] Backend API endpoints implemented
- [ ] Database migration created
- [ ] RBAC permissions configured
- [ ] Integration testing completed

---

**Status**: ✅ Frontend Implementation Complete
