# Fiscal Configuration - Updated Flow

## 🔄 New Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Settings Menu                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────┐  ┌──────────────────────────────┐   │
│  │ 🏭 Almacenes     │  │ 📋 Configuración Fiscal      │   │
│  │ (Warehouses)     │  │ (Fiscal Configurations)      │   │
│  └──────────────────┘  └──────────────────────────────┘   │
│         │                           │                      │
│         │                           │                      │
│         ▼                           ▼                      │
│  ┌──────────────────┐  ┌──────────────────────────────┐   │
│  │ Warehouse List   │  │ Fiscal Config List           │   │
│  │ - Create         │  │ - Create                     │   │
│  │ - Edit           │  │ - Edit                       │   │
│  │ - Delete         │  │ - Delete                     │   │
│  └──────────────────┘  └──────────────────────────────┘   │
│         │                           │                      │
│         │ (selecciona)              │ (crea)              │
│         │ Fiscal Config             │ Fiscal Config       │
│         │                           │                      │
│         └───────────────────────────┘                      │
│                     │                                      │
│                     ▼                                      │
│         ┌──────────────────────────┐                      │
│         │ Warehouse con            │                      │
│         │ Fiscal Configuration ID  │                      │
│         └──────────────────────────┘                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 📋 Workflow Steps

### Step 1: Create Fiscal Configuration (Independent)
1. Go to **Settings → Configuración Fiscal** (📋)
2. Click **Nueva Configuración**
3. Fill in:
   - **Razón Social** (required)
   - **RFC** (required)
   - **Tipo de Persona** (required)
   - **Régimen Fiscal** (optional)
   - **Sello Digital** (optional)
   - **Contraseña Sello** (optional)
   - **Llave Privada** (optional)
4. Click **Crear Configuración**
5. Fiscal Configuration is now available for warehouses

### Step 2: Create Warehouse with Fiscal Configuration
1. Go to **Settings → Almacenes** (🏭)
2. Click **Nuevo Almacén**
3. Fill in:
   - **Nombre** (required)
   - **Código** (optional)
   - **Descripción** (optional)
   - **Dirección** (optional)
   - **Status** (optional)
   - **Configuración Fiscal** (optional) ← Select from dropdown
4. Click **Crear Almacén**
5. Warehouse is created with reference to Fiscal Configuration

### Step 3: Edit Warehouse Fiscal Configuration
1. Go to **Settings → Almacenes**
2. Click edit icon on warehouse row
3. Change **Configuración Fiscal** dropdown
4. Click **Guardar Cambios**
5. Warehouse now references new Fiscal Configuration

---

## 🏗️ Data Model

### Warehouse Model
```typescript
interface Warehouse {
  id: string;
  tenant_id: string;
  name: string;                    // Required
  code?: string;
  description?: string;
  street?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  country?: string;
  fiscal_configuration_id?: string; // NEW: Reference to Fiscal Config
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}
```

### Fiscal Configuration Model
```typescript
interface FiscalConfiguration {
  id: string;
  tenant_id: string;
  razon_social: string;            // Required
  rfc: string;                      // Required
  persona_type: string;             // Required
  fiscal_regime?: string;
  digital_seal?: string;
  digital_seal_password?: string;
  private_key?: string;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}
```

### Relationship
```
Warehouse (many) ──→ FiscalConfiguration (one)
  - fiscal_configuration_id (optional foreign key)
  - A warehouse can have 0 or 1 fiscal configuration
  - A fiscal configuration can be used by multiple warehouses
```

---

## 📱 UI Components

### Warehouse Form - New Field
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
│ Configuración Fiscal                    │
│ [Selecciona una configuración...]  ▼   │
│   - GRUPO MINISTOP - GMM140115PIA       │
│   - EMPRESA SA - EMP123456ABC           │
│   - COMERCIO LTDA - COM987654XYZ        │
│                                         │
├─────────────────────────────────────────┤
│                    [Cancelar] [Guardar] │
└─────────────────────────────────────────┘
```

### Fiscal Configuration Form (Unchanged)
```
┌─────────────────────────────────────────┐
│ Nueva Configuración Fiscal           [X] │
├─────────────────────────────────────────┤
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
│                                         │
│ Contraseña del Sello Digital            │
│ [_____________________________]          │
│                                         │
│ Llave Privada                           │
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

---

## 🔗 API Endpoints

### Warehouse Endpoints
```
POST   /api/tenant/warehouses
GET    /api/tenant/warehouses
GET    /api/tenant/warehouses/{id}
PUT    /api/tenant/warehouses/{id}
DELETE /api/tenant/warehouses/{id}
```

### Fiscal Configuration Endpoints
```
POST   /api/tenant/fiscal-configurations
GET    /api/tenant/fiscal-configurations
GET    /api/tenant/fiscal-configurations/{id}
PUT    /api/tenant/fiscal-configurations/{id}
DELETE /api/tenant/fiscal-configurations/{id}
```

---

## 📊 Request/Response Examples

### Create Fiscal Configuration
```bash
POST /api/tenant/fiscal-configurations
{
  "razon_social": "GRUPO MINISTOP DE MEXICO",
  "rfc": "GMM140115PIA",
  "persona_type": "Persona Moral",
  "fiscal_regime": "601",
  "status": "active"
}

Response:
{
  "id": "fiscal-config-uuid",
  "tenant_id": "tenant-uuid",
  "razon_social": "GRUPO MINISTOP DE MEXICO",
  "rfc": "GMM140115PIA",
  "persona_type": "Persona Moral",
  "fiscal_regime": "601",
  "status": "active",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

### Create Warehouse with Fiscal Configuration
```bash
POST /api/tenant/warehouses
{
  "name": "Almacén Centro",
  "code": "ALM-001",
  "description": "Almacén principal",
  "street": "Calle Principal 123",
  "city": "México",
  "state": "CDMX",
  "zip_code": "06500",
  "country": "México",
  "fiscal_configuration_id": "fiscal-config-uuid",
  "status": "active"
}

Response:
{
  "id": "warehouse-uuid",
  "tenant_id": "tenant-uuid",
  "name": "Almacén Centro",
  "code": "ALM-001",
  "description": "Almacén principal",
  "street": "Calle Principal 123",
  "city": "México",
  "state": "CDMX",
  "zip_code": "06500",
  "country": "México",
  "fiscal_configuration_id": "fiscal-config-uuid",
  "status": "active",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

### Get Warehouse with Fiscal Configuration
```bash
GET /api/tenant/warehouses/warehouse-uuid

Response:
{
  "id": "warehouse-uuid",
  "tenant_id": "tenant-uuid",
  "name": "Almacén Centro",
  "code": "ALM-001",
  "fiscal_configuration_id": "fiscal-config-uuid",
  "fiscal_configuration": {
    "id": "fiscal-config-uuid",
    "razon_social": "GRUPO MINISTOP DE MEXICO",
    "rfc": "GMM140115PIA",
    "persona_type": "Persona Moral",
    "fiscal_regime": "601",
    "status": "active"
  },
  "status": "active",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

---

## ✅ Key Points

1. **Fiscal Configuration is Independent**
   - Created separately in Settings → Configuración Fiscal
   - Can exist without being assigned to any warehouse
   - Can be reused by multiple warehouses

2. **Warehouse References Fiscal Configuration**
   - Optional field: `fiscal_configuration_id`
   - Can be null (warehouse without fiscal config)
   - Can be changed at any time

3. **Dropdown in Warehouse Form**
   - Shows all active fiscal configurations
   - Loads dynamically from API
   - Optional selection (can leave empty)
   - Displays: "Razón Social - RFC"

4. **Separation of Concerns**
   - Warehouse = Location & Basic Info
   - Fiscal Configuration = Tax & Legal Info
   - Independent lifecycle management

---

## 🎯 Frontend Implementation Status

- ✅ Warehouse model updated with `fiscal_configuration_id`
- ✅ Warehouse form includes fiscal configuration selector
- ✅ Fiscal configurations loaded dynamically
- ✅ Fiscal Configuration module created (independent)
- ✅ All components compile without errors

---

## 🚀 Backend Implementation Required

1. Add `fiscal_configuration_id` column to warehouses table
2. Create foreign key constraint
3. Update warehouse endpoints to accept/return `fiscal_configuration_id`
4. Optionally include fiscal configuration data in warehouse response
5. Implement cascade behavior (optional: delete warehouse if fiscal config deleted)

---

## 📝 Notes

- Fiscal configurations are managed independently
- Warehouses can be created without fiscal configuration
- Fiscal configuration can be assigned/changed after warehouse creation
- Multiple warehouses can share the same fiscal configuration
- Deleting a fiscal configuration doesn't delete warehouses (optional behavior)

---

**Status**: ✅ Frontend Updated - Ready for Backend Integration
