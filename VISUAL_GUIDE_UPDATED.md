# Visual Guide - Fiscal Configuration Updated Flow

## 🎯 Settings Menu

```
┌─────────────────────────────────────────────────────────────┐
│                    Configuración                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────┐  ┌──────────────────┐               │
│  │ 👥 Usuarios      │  │ 🔐 Roles         │               │
│  │ Gestiona...      │  │ Crea y...        │               │
│  └──────────────────┘  └──────────────────┘               │
│                                                             │
│  ┌──────────────────┐  ┌──────────────────┐               │
│  │ 🏢 Proveedores   │  │ 🏭 Almacenes     │               │
│  │ Gestiona...      │  │ Gestiona...      │               │
│  └──────────────────┘  └──────────────────┘               │
│                                                             │
│  ┌──────────────────────────────────────┐                 │
│  │ 📋 Configuración Fiscal              │                 │
│  │ Gestiona la información fiscal...    │                 │
│  └──────────────────────────────────────┘                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Complete Workflow

### Phase 1: Create Fiscal Configuration

```
Settings Menu
    ↓
Click "Configuración Fiscal" (📋)
    ↓
┌─────────────────────────────────────────┐
│ Configuraciones Fiscales                │
│ [Nueva Configuración]                   │
├─────────────────────────────────────────┤
│ Almacén | Razón Social | RFC | Status   │
│ (empty table)                           │
└─────────────────────────────────────────┘
    ↓
Click "Nueva Configuración"
    ↓
┌─────────────────────────────────────────┐
│ Nueva Configuración Fiscal           [X] │
├─────────────────────────────────────────┤
│ Razón Social *                          │
│ [GRUPO MINISTOP DE MEXICO]              │
│                                         │
│ RFC *               Tipo de Persona *   │
│ [GMM140115PIA]      [Persona Moral ▼]   │
│                                         │
│ Régimen Fiscal                          │
│ [601 - Régimen General ▼]               │
│                                         │
│ Sello Digital                           │
│ [-----BEGIN CERTIFICATE-----...]        │
│                                         │
│ Contraseña del Sello Digital            │
│ [••••••••••]                            │
│                                         │
│ Llave Privada                           │
│ [-----BEGIN PRIVATE KEY-----...]        │
│                                         │
│ Status                                  │
│ [Activo ▼]                              │
├─────────────────────────────────────────┤
│                    [Cancelar] [Crear]   │
└─────────────────────────────────────────┘
    ↓
Click "Crear Configuración"
    ↓
✅ Success: "Configuración fiscal creada correctamente"
    ↓
Fiscal Configuration created and available for warehouses
```

### Phase 2: Create Warehouse with Fiscal Configuration

```
Settings Menu
    ↓
Click "Almacenes" (🏭)
    ↓
┌─────────────────────────────────────────┐
│ Almacenes                               │
│ [Nuevo Almacén]                         │
├─────────────────────────────────────────┤
│ Nombre | Código | Status | Acciones     │
│ (empty table)                           │
└─────────────────────────────────────────┘
    ↓
Click "Nuevo Almacén"
    ↓
┌─────────────────────────────────────────┐
│ Nuevo Almacén                        [X] │
├─────────────────────────────────────────┤
│ Nombre *                                │
│ [Almacén Centro]                        │
│                                         │
│ Código              Status              │
│ [ALM-001]           [Activo ▼]          │
│                                         │
│ Descripción                             │
│ [Almacén principal de la empresa]       │
│                                         │
│ Calle                                   │
│ [Calle Principal 123]                   │
│                                         │
│ Ciudad              Estado              │
│ [México]            [CDMX]              │
│                                         │
│ País                CP                  │
│ [México ▼]          [06500]             │
│                                         │
│ Configuración Fiscal                    │
│ [Selecciona una configuración...]  ▼   │
│   ✓ GRUPO MINISTOP - GMM140115PIA       │
│   - EMPRESA SA - EMP123456ABC           │
│   - COMERCIO LTDA - COM987654XYZ        │
│                                         │
├─────────────────────────────────────────┤
│                    [Cancelar] [Crear]   │
└─────────────────────────────────────────┘
    ↓
Select "GRUPO MINISTOP - GMM140115PIA"
    ↓
Click "Crear Almacén"
    ↓
✅ Success: "Almacén creado correctamente"
    ↓
Warehouse created with Fiscal Configuration reference
```

### Phase 3: View Warehouse with Fiscal Configuration

```
Settings → Almacenes
    ↓
┌─────────────────────────────────────────────────────────┐
│ Almacenes                                               │
│ [Nuevo Almacén]                                         │
├─────────────────────────────────────────────────────────┤
│ Nombre | Código | Status | Configuración | Acciones    │
├─────────────────────────────────────────────────────────┤
│ Almacén Centro | ALM-001 | Activo | GRUPO MINISTOP | [✎][🗑]
└─────────────────────────────────────────────────────────┘
    ↓
Click edit icon (✎)
    ↓
┌─────────────────────────────────────────┐
│ Editar Almacén                       [X] │
├─────────────────────────────────────────┤
│ Nombre *                                │
│ [Almacén Centro]                        │
│                                         │
│ ... (other fields)                      │
│                                         │
│ Configuración Fiscal                    │
│ [GRUPO MINISTOP - GMM140115PIA]    ▼   │
│   ✓ GRUPO MINISTOP - GMM140115PIA       │
│   - EMPRESA SA - EMP123456ABC           │
│   - COMERCIO LTDA - COM987654XYZ        │
│                                         │
├─────────────────────────────────────────┤
│                    [Cancelar] [Guardar] │
└─────────────────────────────────────────┘
    ↓
Can change Fiscal Configuration or leave as is
    ↓
Click "Guardar Cambios"
    ↓
✅ Success: "Almacén actualizado correctamente"
```

---

## 📊 Data Flow Diagram

```
┌──────────────────────────────────────────────────────────────┐
│                    Fiscal Configuration                      │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ id: fiscal-config-uuid                                 │  │
│  │ razon_social: "GRUPO MINISTOP DE MEXICO"               │  │
│  │ rfc: "GMM140115PIA"                                    │  │
│  │ persona_type: "Persona Moral"                          │  │
│  │ fiscal_regime: "601"                                   │  │
│  │ status: "active"                                       │  │
│  └────────────────────────────────────────────────────────┘  │
│                           ▲                                   │
│                           │ (referenced by)                   │
│                           │                                   │
│  ┌────────────────────────┴────────────────────────────────┐  │
│  │                    Warehouse                            │  │
│  │  ┌──────────────────────────────────────────────────┐  │  │
│  │  │ id: warehouse-uuid                               │  │  │
│  │  │ name: "Almacén Centro"                           │  │  │
│  │  │ code: "ALM-001"                                  │  │  │
│  │  │ street: "Calle Principal 123"                    │  │  │
│  │  │ city: "México"                                   │  │  │
│  │  │ state: "CDMX"                                    │  │  │
│  │  │ zip_code: "06500"                                │  │  │
│  │  │ country: "México"                                │  │  │
│  │  │ fiscal_configuration_id: "fiscal-config-uuid"    │  │  │
│  │  │ status: "active"                                 │  │  │
│  │  └──────────────────────────────────────────────────┘  │  │
│  └─────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

---

## 🔗 Relationship Visualization

```
Fiscal Configurations Table
┌─────────────────────────────────────────────────────────┐
│ id | razon_social | rfc | persona_type | status         │
├─────────────────────────────────────────────────────────┤
│ fc-1 | GRUPO MINISTOP | GMM140115PIA | Moral | active  │
│ fc-2 | EMPRESA SA | EMP123456ABC | Moral | active      │
│ fc-3 | COMERCIO LTDA | COM987654XYZ | Física | active  │
└─────────────────────────────────────────────────────────┘
       ▲                    ▲                    ▲
       │                    │                    │
       │ (referenced by)    │ (referenced by)    │ (referenced by)
       │                    │                    │
Warehouses Table
┌──────────────────────────────────────────────────────────────┐
│ id | name | code | fiscal_configuration_id | status          │
├──────────────────────────────────────────────────────────────┤
│ w-1 | Almacén Centro | ALM-001 | fc-1 | active              │
│ w-2 | Almacén Norte | ALM-002 | fc-1 | active               │
│ w-3 | Almacén Sur | ALM-003 | fc-2 | active                 │
│ w-4 | Almacén Este | ALM-004 | NULL | active                │
└──────────────────────────────────────────────────────────────┘

Note: 
- w-1 and w-2 share the same fiscal configuration (fc-1)
- w-4 has no fiscal configuration assigned
```

---

## 🎯 Key UI Elements

### Fiscal Configuration Selector in Warehouse Form

```
┌─────────────────────────────────────────┐
│ Configuración Fiscal                    │
│ [Selecciona una configuración...]  ▼   │
│                                         │
│ When clicked, shows:                    │
│   ✓ GRUPO MINISTOP - GMM140115PIA       │
│   - EMPRESA SA - EMP123456ABC           │
│   - COMERCIO LTDA - COM987654XYZ        │
│                                         │
│ Format: "Razón Social - RFC"            │
│ Optional: Can leave empty               │
└─────────────────────────────────────────┘
```

### Fiscal Configuration List Table

```
┌──────────────────────────────────────────────────────────────┐
│ Configuraciones Fiscales    [Nueva Configuración]            │
├──────────────────────────────────────────────────────────────┤
│ Razón Social | RFC | Tipo | Status | Acciones               │
├──────────────────────────────────────────────────────────────┤
│ GRUPO MINISTOP | GMM140115PIA | Moral | ✓ Activo | [✎][🗑]  │
│ EMPRESA SA | EMP123456ABC | Moral | ✓ Activo | [✎][🗑]      │
│ COMERCIO LTDA | COM987654XYZ | Física | ✓ Activo | [✎][🗑]  │
├──────────────────────────────────────────────────────────────┤
│ Mostrando 1 a 3 de 3 configuraciones                         │
│                    [Anterior] Página 1 de 1 [Siguiente]     │
└──────────────────────────────────────────────────────────────┘
```

---

## ✨ Features Highlighted

### ✅ Independent Fiscal Configuration Management
- Create fiscal configurations separately
- Manage without creating warehouses
- Reuse across multiple warehouses

### ✅ Optional Assignment
- Warehouses can exist without fiscal configuration
- Fiscal configuration can be assigned later
- Can change fiscal configuration anytime

### ✅ User-Friendly Interface
- Dropdown selector in warehouse form
- Display format: "Razón Social - RFC"
- Dynamic loading from API
- Clear separation of concerns

### ✅ Complete CRUD Operations
- Create new fiscal configurations
- View all configurations in table
- Edit existing configurations
- Delete with confirmation

### ✅ Proper Error Handling
- Validation messages
- Snackbar notifications
- Loading states
- Empty state messages

---

## 🚀 User Journey

```
User wants to set up fiscal information for warehouses

Step 1: Create Fiscal Configuration
  Settings → Configuración Fiscal → Nueva Configuración
  Fill form → Create
  ✅ Fiscal Configuration ready

Step 2: Create Warehouse
  Settings → Almacenes → Nuevo Almacén
  Fill form → Select Fiscal Configuration → Create
  ✅ Warehouse created with fiscal info

Step 3: Manage
  Can edit warehouse and change fiscal configuration
  Can edit fiscal configuration independently
  Can delete either independently
```

---

**Status**: ✅ Complete - Ready for Backend Integration
