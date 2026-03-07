# Fiscal Configuration - Quick Start Guide

## 🚀 What's New?

The Warehouse module has been simplified and fiscal information is now managed in a separate **Fiscal Configuration** module.

---

## 📋 Warehouse Form - What Changed?

### ✅ KEPT Fields
- **Nombre** (Name) - Required
- **Código** (Code) - Optional
- **Descripción** (Description) - Optional
- **Calle** (Street) - Optional
- **Ciudad** (City) - Optional
- **Estado** (State) - Optional
- **CP** (Postal Code) - Optional
- **País** (Country) - Optional
- **Status** - Optional (active/inactive)

### ❌ REMOVED Fields
- RFC
- Razón Social
- Tipo de Persona
- Sello Digital
- Contraseña del Sello Digital
- Llave Privada
- Teléfono
- Email
- Persona de Contacto

---

## 🏛️ New Fiscal Configuration Module

### Location
Navigate to: **Settings → Configuración Fiscal** (📋 icon)

### What You Can Do
1. **Create** fiscal configurations for your warehouses
2. **Edit** existing fiscal configurations
3. **Delete** fiscal configurations
4. **View** all fiscal configurations in a table

### Required Fields
- **Almacén** - Select the warehouse
- **Razón Social** - Legal business name
- **RFC** - Tax ID (format: 3-4 letters + 6 digits + 3 alphanumeric)
- **Tipo de Persona** - "Persona Física" or "Persona Moral"

### Optional Fields
- **Régimen Fiscal** - Tax regime (30 options available)
- **Sello Digital** - Digital certificate
- **Contraseña del Sello** - Certificate password
- **Llave Privada** - Private key
- **Status** - active/inactive

---

## 🔄 Workflow Example

### Step 1: Create a Warehouse
1. Go to **Settings → Almacenes**
2. Click **Nuevo Almacén**
3. Fill in:
   - Nombre: "Almacén Centro"
   - Código: "ALM-001"
   - Dirección info (optional)
4. Click **Crear Almacén**

### Step 2: Create Fiscal Configuration
1. Go to **Settings → Configuración Fiscal**
2. Click **Nueva Configuración**
3. Select the warehouse you just created
4. Fill in:
   - Razón Social: "GRUPO MINISTOP DE MEXICO"
   - RFC: "GMM140115PIA"
   - Tipo de Persona: "Persona Moral"
   - Régimen Fiscal: "601" (optional)
5. Click **Crear Configuración**

### Step 3: View & Manage
- All fiscal configurations appear in the table
- Click the edit icon (✎) to modify
- Click the delete icon (🗑) to remove

---

## 📊 Settings Menu Structure

```
Configuración
├── 👥 Usuarios
├── 🔐 Roles y Permisos
├── 🏢 Proveedores
├── 🏭 Almacenes
└── 📋 Configuración Fiscal (NEW)
```

---

## 🎯 Key Points

✅ **Warehouse** = Location & Basic Info
✅ **Fiscal Configuration** = Tax & Legal Info

Each warehouse can have ONE fiscal configuration linked to it.

---

## 🔐 Permissions

You need these permissions to use Fiscal Configuration:
- `fiscal_configurations:Create`
- `fiscal_configurations:Read`
- `fiscal_configurations:Update`
- `fiscal_configurations:Delete`

(Automatically assigned to Admin role)

---

## 📱 UI Navigation

### From Settings Menu
```
Settings Home
    ↓
Click "Configuración Fiscal" card
    ↓
Fiscal Configuration List
    ↓
Click "Nueva Configuración" or edit/delete existing
```

### From Warehouse List
```
Warehouse List
    ↓
(Future: Click "Configurar Facturación" button)
    ↓
Fiscal Configuration Modal
```

---

## ✨ Features

### Fiscal Configuration List
- ✅ Table view with all configurations
- ✅ Shows warehouse name and code
- ✅ Shows RFC and legal name
- ✅ Status indicator (Active/Inactive)
- ✅ Edit and delete actions
- ✅ Pagination support
- ✅ Loading states

### Fiscal Configuration Form
- ✅ Warehouse dropdown (auto-loaded)
- ✅ RFC validation
- ✅ 30 fiscal regime options
- ✅ Digital certificate fields
- ✅ Form validation
- ✅ Error handling
- ✅ Success notifications

---

## 🔗 API Endpoints (Backend)

```
POST   /api/tenant/fiscal-configurations
GET    /api/tenant/fiscal-configurations
GET    /api/tenant/fiscal-configurations/{id}
GET    /api/tenant/fiscal-configurations/warehouse/{warehouseId}
PUT    /api/tenant/fiscal-configurations/{id}
DELETE /api/tenant/fiscal-configurations/{id}
```

---

## 📝 Fiscal Regimes Available

- 601 - Régimen General de Ley Personas Morales
- 603 - Personas Morales con Régimen de Intereses
- 605 - Personas Morales con Régimen de Actividades Agrícolas
- 606 - Personas Morales con Régimen de Actividades Ganaderas
- 607 - Personas Morales con Régimen de Actividades Pesqueras
- 608 - Personas Morales con Régimen de Actividades Silvícolas
- 609 - Personas Morales con Régimen de Actividades Forestales
- 610 - Personas Morales con Régimen de Actividades Mineras
- 611 - Personas Morales con Régimen de Actividades Petroleras
- 614 - Personas Morales con Régimen de Actividades de Transporte
- 616 - Personas Morales con Régimen de Actividades de Telecomunicaciones
- 620 - Personas Morales con Régimen de Actividades de Servicios Financieros
- 621 - Personas Morales con Régimen de Actividades de Seguros
- 622 - Personas Morales con Régimen de Actividades de Fianzas
- 623 - Personas Morales con Régimen de Actividades de Fondos de Pensiones
- 624 - Personas Morales con Régimen de Actividades de Administración de Fondos
- 625 - Personas Morales con Régimen de Actividades de Sociedades de Inversión
- 626 - Personas Morales con Régimen de Actividades de Sociedades de Crédito
- 627 - Personas Morales con Régimen de Actividades de Uniones de Crédito
- 628 - Personas Morales con Régimen de Actividades de Instituciones de Crédito
- 629 - Personas Morales con Régimen de Actividades de Casas de Bolsa
- 630 - Personas Morales con Régimen de Actividades de Mercados de Futuros

---

## ❓ FAQ

**Q: Can I have multiple fiscal configurations per warehouse?**
A: No, each warehouse has one fiscal configuration.

**Q: What if I delete a warehouse?**
A: Its fiscal configuration will also be deleted (cascade delete).

**Q: Can I edit the warehouse after creating fiscal config?**
A: Yes, warehouse and fiscal config are independent.

**Q: Is RFC validation required?**
A: Yes, RFC must follow the pattern: 3-4 letters + 6 digits + 3 alphanumeric.

**Q: Can I leave digital certificate fields empty?**
A: Yes, all certificate fields are optional.

---

## 🆘 Troubleshooting

**Issue**: "Almacén requerido" error
- **Solution**: Make sure you select a warehouse from the dropdown

**Issue**: "RFC inválido" error
- **Solution**: RFC must be 13 characters: 3-4 letters + 6 digits + 3 alphanumeric (e.g., GMM140115PIA)

**Issue**: Can't see warehouses in dropdown
- **Solution**: Create warehouses first in Settings → Almacenes

**Issue**: Fiscal configurations not loading
- **Solution**: Check that you have `fiscal_configurations:Read` permission

---

**Status**: ✅ Ready to Use
