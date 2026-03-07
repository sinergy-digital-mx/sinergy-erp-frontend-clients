# Fiscal Configuration - Backend Implementation Guide

## 📋 Overview

This guide provides the backend implementation requirements for the Fiscal Configuration module.

---

## 🗄️ Database Schema

### fiscal_configurations Table

```sql
CREATE TABLE fiscal_configurations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  warehouse_id UUID NOT NULL REFERENCES warehouses(id) ON DELETE CASCADE,
  razon_social VARCHAR(255) NOT NULL,
  rfc VARCHAR(13) NOT NULL,
  persona_type VARCHAR(50) NOT NULL CHECK (persona_type IN ('Persona Física', 'Persona Moral')),
  fiscal_regime VARCHAR(10),
  digital_seal TEXT,
  digital_seal_password VARCHAR(255),
  private_key TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  metadata JSONB,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  -- Constraints
  UNIQUE(tenant_id, warehouse_id),
  CONSTRAINT valid_rfc CHECK (rfc ~ '^[A-ZÑ&]{3,4}[0-9]{6}[A-Z0-9]{3}$')
);

-- Indexes
CREATE INDEX idx_fiscal_configurations_tenant_id ON fiscal_configurations(tenant_id);
CREATE INDEX idx_fiscal_configurations_warehouse_id ON fiscal_configurations(warehouse_id);
CREATE INDEX idx_fiscal_configurations_status ON fiscal_configurations(status);
CREATE INDEX idx_fiscal_configurations_tenant_warehouse ON fiscal_configurations(tenant_id, warehouse_id);
```

### Update warehouses Table

```sql
-- Remove fiscal fields from warehouses table if they exist
ALTER TABLE warehouses DROP COLUMN IF EXISTS razon_social;
ALTER TABLE warehouses DROP COLUMN IF EXISTS rfc;
ALTER TABLE warehouses DROP COLUMN IF EXISTS persona_type;
ALTER TABLE warehouses DROP COLUMN IF EXISTS phone;
ALTER TABLE warehouses DROP COLUMN IF EXISTS email;
ALTER TABLE warehouses DROP COLUMN IF EXISTS contact_person;
```

---

## 🔌 API Endpoints

### 1. Create Fiscal Configuration

```
POST /api/tenant/fiscal-configurations
Authorization: Bearer {token}
Content-Type: application/json

Request Body:
{
  "warehouse_id": "550e8400-e29b-41d4-a716-446655440000",
  "razon_social": "GRUPO MINISTOP DE MEXICO",
  "rfc": "GMM140115PIA",
  "persona_type": "Persona Moral",
  "fiscal_regime": "601",
  "digital_seal": "-----BEGIN CERTIFICATE-----...",
  "digital_seal_password": "password123",
  "private_key": "-----BEGIN PRIVATE KEY-----...",
  "status": "active"
}

Response (201 Created):
{
  "id": "660e8400-e29b-41d4-a716-446655440001",
  "tenant_id": "tenant-uuid",
  "warehouse_id": "550e8400-e29b-41d4-a716-446655440000",
  "razon_social": "GRUPO MINISTOP DE MEXICO",
  "rfc": "GMM140115PIA",
  "persona_type": "Persona Moral",
  "fiscal_regime": "601",
  "digital_seal": "-----BEGIN CERTIFICATE-----...",
  "digital_seal_password": "password123",
  "private_key": "-----BEGIN PRIVATE KEY-----...",
  "status": "active",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}

Error Responses:
- 400: Invalid RFC format, warehouse_id not found, duplicate warehouse_id
- 401: Unauthorized
- 403: Forbidden (missing fiscal_configurations:Create permission)
- 409: Warehouse already has fiscal configuration
```

### 2. Get Fiscal Configuration by ID

```
GET /api/tenant/fiscal-configurations/{id}
Authorization: Bearer {token}

Response (200 OK):
{
  "id": "660e8400-e29b-41d4-a716-446655440001",
  "tenant_id": "tenant-uuid",
  "warehouse_id": "550e8400-e29b-41d4-a716-446655440000",
  "razon_social": "GRUPO MINISTOP DE MEXICO",
  "rfc": "GMM140115PIA",
  "persona_type": "Persona Moral",
  "fiscal_regime": "601",
  "digital_seal": "-----BEGIN CERTIFICATE-----...",
  "digital_seal_password": "password123",
  "private_key": "-----BEGIN PRIVATE KEY-----...",
  "status": "active",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}

Error Responses:
- 401: Unauthorized
- 403: Forbidden (missing fiscal_configurations:Read permission)
- 404: Not found
```

### 3. Get Fiscal Configuration by Warehouse

```
GET /api/tenant/fiscal-configurations/warehouse/{warehouseId}
Authorization: Bearer {token}

Response (200 OK):
{
  "id": "660e8400-e29b-41d4-a716-446655440001",
  "tenant_id": "tenant-uuid",
  "warehouse_id": "550e8400-e29b-41d4-a716-446655440000",
  "razon_social": "GRUPO MINISTOP DE MEXICO",
  "rfc": "GMM140115PIA",
  "persona_type": "Persona Moral",
  "fiscal_regime": "601",
  "digital_seal": "-----BEGIN CERTIFICATE-----...",
  "digital_seal_password": "password123",
  "private_key": "-----BEGIN PRIVATE KEY-----...",
  "status": "active",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}

Error Responses:
- 401: Unauthorized
- 403: Forbidden (missing fiscal_configurations:Read permission)
- 404: Not found
```

### 4. List Fiscal Configurations

```
GET /api/tenant/fiscal-configurations?page=1&limit=20&warehouse_id=uuid&status=active
Authorization: Bearer {token}

Query Parameters:
- page: number (default: 1)
- limit: number (default: 20, max: 100)
- warehouse_id: string (optional, filter by warehouse)
- status: string (optional, 'active' or 'inactive')

Response (200 OK):
{
  "data": [
    {
      "id": "660e8400-e29b-41d4-a716-446655440001",
      "tenant_id": "tenant-uuid",
      "warehouse_id": "550e8400-e29b-41d4-a716-446655440000",
      "razon_social": "GRUPO MINISTOP DE MEXICO",
      "rfc": "GMM140115PIA",
      "persona_type": "Persona Moral",
      "fiscal_regime": "601",
      "status": "active",
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 20,
  "totalPages": 1,
  "hasNext": false,
  "hasPrev": false
}

Error Responses:
- 401: Unauthorized
- 403: Forbidden (missing fiscal_configurations:Read permission)
```

### 5. Update Fiscal Configuration

```
PUT /api/tenant/fiscal-configurations/{id}
Authorization: Bearer {token}
Content-Type: application/json

Request Body (all fields optional):
{
  "razon_social": "GRUPO MINISTOP DE MEXICO S.A.",
  "rfc": "GMM140115PIA",
  "persona_type": "Persona Moral",
  "fiscal_regime": "603",
  "digital_seal": "-----BEGIN CERTIFICATE-----...",
  "digital_seal_password": "newpassword",
  "private_key": "-----BEGIN PRIVATE KEY-----...",
  "status": "active"
}

Response (200 OK):
{
  "id": "660e8400-e29b-41d4-a716-446655440001",
  "tenant_id": "tenant-uuid",
  "warehouse_id": "550e8400-e29b-41d4-a716-446655440000",
  "razon_social": "GRUPO MINISTOP DE MEXICO S.A.",
  "rfc": "GMM140115PIA",
  "persona_type": "Persona Moral",
  "fiscal_regime": "603",
  "digital_seal": "-----BEGIN CERTIFICATE-----...",
  "digital_seal_password": "newpassword",
  "private_key": "-----BEGIN PRIVATE KEY-----...",
  "status": "active",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:35:00Z"
}

Error Responses:
- 400: Invalid RFC format
- 401: Unauthorized
- 403: Forbidden (missing fiscal_configurations:Update permission)
- 404: Not found
```

### 6. Delete Fiscal Configuration

```
DELETE /api/tenant/fiscal-configurations/{id}
Authorization: Bearer {token}

Response (204 No Content)

Error Responses:
- 401: Unauthorized
- 403: Forbidden (missing fiscal_configurations:Delete permission)
- 404: Not found
```

---

## 🔐 RBAC Permissions

### Create Permissions

```sql
-- Get the entity ID
SELECT id INTO entity_id FROM entity_registry WHERE code = 'FiscalConfiguration';

-- If not exists, create it
INSERT INTO entity_registry (code, name) 
VALUES ('FiscalConfiguration', 'Fiscal Configuration Management')
ON CONFLICT DO NOTHING;

-- Create permissions
INSERT INTO rbac_permissions (id, entity_registry_id, action, description, is_system_permission, created_at, updated_at)
SELECT 
  gen_random_uuid(),
  (SELECT id FROM entity_registry WHERE code = 'FiscalConfiguration'),
  action,
  description,
  true,
  NOW(),
  NOW()
FROM (VALUES
  ('Create', 'Create new fiscal configurations'),
  ('Read', 'View fiscal configurations'),
  ('Update', 'Edit fiscal configurations'),
  ('Delete', 'Delete fiscal configurations')
) AS perms(action, description)
ON CONFLICT DO NOTHING;
```

### Assign to Admin Role

```sql
-- Get admin role ID for your tenant
SELECT id INTO admin_role_id FROM rbac_roles WHERE code = 'ADMIN' AND tenant_id = 'your-tenant-id';

-- Assign permissions
INSERT INTO rbac_role_permissions (id, role_id, permission_id, created_at)
SELECT 
  gen_random_uuid(),
  admin_role_id,
  p.id,
  NOW()
FROM rbac_permissions p
JOIN entity_registry er ON p.entity_registry_id = er.id
WHERE er.code = 'FiscalConfiguration'
ON CONFLICT DO NOTHING;
```

---

## 🔍 Validation Rules

### RFC Validation
```
Pattern: ^[A-ZÑ&]{3,4}[0-9]{6}[A-Z0-9]{3}$
Length: 13 characters
Format: 3-4 letters + 6 digits + 3 alphanumeric
Example: GMM140115PIA
```

### Persona Type
```
Allowed values:
- "Persona Física"
- "Persona Moral"
```

### Fiscal Regime
```
Allowed values: 601, 603, 605, 606, 607, 608, 609, 610, 611, 614, 616, 620, 621, 622, 623, 624, 625, 626, 627, 628, 629, 630
```

### Status
```
Allowed values:
- "active"
- "inactive"
Default: "active"
```

---

## 🔗 Relationships

### Warehouse Relationship
```
fiscal_configurations.warehouse_id → warehouses.id
- Foreign key constraint
- Cascade delete (if warehouse deleted, fiscal config deleted)
- Unique constraint: (tenant_id, warehouse_id)
```

### Tenant Isolation
```
All queries must filter by tenant_id
- fiscal_configurations.tenant_id = current_user.tenant_id
- Prevents cross-tenant data access
```

---

## 📊 Query Examples

### Get all fiscal configurations for a tenant
```sql
SELECT * FROM fiscal_configurations 
WHERE tenant_id = $1 
ORDER BY created_at DESC;
```

### Get fiscal configuration for a specific warehouse
```sql
SELECT * FROM fiscal_configurations 
WHERE tenant_id = $1 AND warehouse_id = $2;
```

### Get active fiscal configurations
```sql
SELECT * FROM fiscal_configurations 
WHERE tenant_id = $1 AND status = 'active' 
ORDER BY created_at DESC;
```

### Get fiscal configurations with warehouse info
```sql
SELECT 
  fc.*,
  w.name as warehouse_name,
  w.code as warehouse_code
FROM fiscal_configurations fc
JOIN warehouses w ON fc.warehouse_id = w.id
WHERE fc.tenant_id = $1
ORDER BY fc.created_at DESC;
```

---

## 🧪 Testing Checklist

- [ ] Create fiscal configuration with valid data
- [ ] Create fiscal configuration with invalid RFC format
- [ ] Create fiscal configuration with non-existent warehouse
- [ ] Create duplicate fiscal configuration for same warehouse
- [ ] Get fiscal configuration by ID
- [ ] Get fiscal configuration by warehouse ID
- [ ] List fiscal configurations with pagination
- [ ] Filter by status
- [ ] Filter by warehouse_id
- [ ] Update fiscal configuration
- [ ] Update with invalid RFC
- [ ] Delete fiscal configuration
- [ ] Verify tenant isolation
- [ ] Verify permission checks
- [ ] Verify cascade delete when warehouse deleted

---

## 🚀 Deployment Steps

1. **Create migration** for fiscal_configurations table
2. **Run migration** in development environment
3. **Create RBAC permissions** in database
4. **Assign permissions** to Admin role
5. **Deploy backend** with new endpoints
6. **Test all endpoints** with Postman/Insomnia
7. **Deploy frontend** (already ready)
8. **Verify integration** in production

---

## 📝 Notes

- All timestamps are in UTC
- Sensitive fields (digital_seal_password, private_key) should be encrypted at rest
- Consider implementing audit logging for fiscal configuration changes
- RFC validation should be case-insensitive on input but stored uppercase
- Digital certificates should be validated before storing
- Consider implementing backup/restore for fiscal configurations

---

**Status**: ✅ Backend Implementation Ready
