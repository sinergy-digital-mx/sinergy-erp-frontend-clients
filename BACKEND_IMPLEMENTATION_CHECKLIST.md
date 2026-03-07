# Backend Implementation Checklist

## 📋 Database Schema

### ✅ Create fiscal_configurations Table

```sql
CREATE TABLE fiscal_configurations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
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
  
  CONSTRAINT valid_rfc CHECK (rfc ~ '^[A-ZÑ&]{3,4}[0-9]{6}[A-Z0-9]{3}$')
);

CREATE INDEX idx_fiscal_configurations_tenant_id ON fiscal_configurations(tenant_id);
CREATE INDEX idx_fiscal_configurations_status ON fiscal_configurations(status);
```

### ✅ Update warehouses Table

```sql
-- Add fiscal_configuration_id column
ALTER TABLE warehouses 
ADD COLUMN fiscal_configuration_id UUID REFERENCES fiscal_configurations(id) ON DELETE SET NULL;

-- Remove old fiscal fields if they exist
ALTER TABLE warehouses DROP COLUMN IF EXISTS razon_social;
ALTER TABLE warehouses DROP COLUMN IF EXISTS rfc;
ALTER TABLE warehouses DROP COLUMN IF EXISTS persona_type;
ALTER TABLE warehouses DROP COLUMN IF EXISTS phone;
ALTER TABLE warehouses DROP COLUMN IF EXISTS email;
ALTER TABLE warehouses DROP COLUMN IF EXISTS contact_person;

-- Create index for foreign key
CREATE INDEX idx_warehouses_fiscal_configuration_id ON warehouses(fiscal_configuration_id);
```

---

## 🔌 API Endpoints

### ✅ Fiscal Configuration Endpoints

#### 1. Create Fiscal Configuration
```
POST /api/tenant/fiscal-configurations
Authorization: Bearer {token}
Content-Type: application/json

Request:
{
  "razon_social": "GRUPO MINISTOP DE MEXICO",
  "rfc": "GMM140115PIA",
  "persona_type": "Persona Moral",
  "fiscal_regime": "601",
  "digital_seal": "...",
  "digital_seal_password": "...",
  "private_key": "...",
  "status": "active"
}

Response (201):
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

#### 2. Get Fiscal Configuration by ID
```
GET /api/tenant/fiscal-configurations/{id}
Authorization: Bearer {token}

Response (200):
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

#### 3. List Fiscal Configurations
```
GET /api/tenant/fiscal-configurations?page=1&limit=20&status=active
Authorization: Bearer {token}

Response (200):
{
  "data": [
    {
      "id": "fiscal-config-uuid",
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
```

#### 4. Update Fiscal Configuration
```
PUT /api/tenant/fiscal-configurations/{id}
Authorization: Bearer {token}
Content-Type: application/json

Request:
{
  "razon_social": "GRUPO MINISTOP DE MEXICO S.A.",
  "fiscal_regime": "603",
  "status": "active"
}

Response (200):
{
  "id": "fiscal-config-uuid",
  "tenant_id": "tenant-uuid",
  "razon_social": "GRUPO MINISTOP DE MEXICO S.A.",
  "rfc": "GMM140115PIA",
  "persona_type": "Persona Moral",
  "fiscal_regime": "603",
  "status": "active",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:35:00Z"
}
```

#### 5. Delete Fiscal Configuration
```
DELETE /api/tenant/fiscal-configurations/{id}
Authorization: Bearer {token}

Response (204 No Content)
```

### ✅ Update Warehouse Endpoints

#### Create Warehouse (Updated)
```
POST /api/tenant/warehouses
Authorization: Bearer {token}
Content-Type: application/json

Request:
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

Response (201):
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

#### Get Warehouse (Updated)
```
GET /api/tenant/warehouses/{id}
Authorization: Bearer {token}

Response (200):
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

#### Update Warehouse (Updated)
```
PUT /api/tenant/warehouses/{id}
Authorization: Bearer {token}
Content-Type: application/json

Request:
{
  "name": "Almacén Centro Actualizado",
  "fiscal_configuration_id": "new-fiscal-config-uuid",
  "status": "active"
}

Response (200):
{
  "id": "warehouse-uuid",
  "tenant_id": "tenant-uuid",
  "name": "Almacén Centro Actualizado",
  "fiscal_configuration_id": "new-fiscal-config-uuid",
  "status": "active",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:35:00Z"
}
```

---

## 🔐 RBAC Permissions

### ✅ Create Permissions

```sql
-- Create entity
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

### ✅ Assign to Admin Role

```sql
-- Get admin role ID for your tenant
-- Replace 'your-tenant-id' with actual tenant ID
INSERT INTO rbac_role_permissions (id, role_id, permission_id, created_at)
SELECT 
  gen_random_uuid(),
  (SELECT id FROM rbac_roles WHERE code = 'ADMIN' AND tenant_id = 'your-tenant-id'),
  p.id,
  NOW()
FROM rbac_permissions p
JOIN entity_registry er ON p.entity_registry_id = er.id
WHERE er.code = 'FiscalConfiguration'
ON CONFLICT DO NOTHING;
```

---

## ✅ Validation Rules

### RFC Validation
```
Pattern: ^[A-ZÑ&]{3,4}[0-9]{6}[A-Z0-9]{3}$
Length: 13 characters
Format: 3-4 letters + 6 digits + 3 alphanumeric
Examples:
  ✅ GMM140115PIA
  ✅ EMP123456ABC
  ❌ ALM12345ABC (only 12 chars)
  ❌ alm123456abc (lowercase)
```

### Persona Type Validation
```
Allowed values:
  - "Persona Física"
  - "Persona Moral"
```

### Fiscal Regime Validation
```
Allowed values: 601, 603, 605, 606, 607, 608, 609, 610, 611, 614, 616, 620, 621, 622, 623, 624, 625, 626, 627, 628, 629, 630
```

### Status Validation
```
Allowed values:
  - "active"
  - "inactive"
Default: "active"
```

---

## 🧪 Testing Checklist

- [ ] Create fiscal configuration with valid data
- [ ] Create fiscal configuration with invalid RFC format
- [ ] Create fiscal configuration with invalid persona_type
- [ ] Get fiscal configuration by ID
- [ ] List fiscal configurations with pagination
- [ ] Filter by status
- [ ] Update fiscal configuration
- [ ] Update with invalid RFC
- [ ] Delete fiscal configuration
- [ ] Create warehouse with fiscal configuration
- [ ] Create warehouse without fiscal configuration
- [ ] Update warehouse fiscal configuration
- [ ] Get warehouse with fiscal configuration populated
- [ ] Verify tenant isolation
- [ ] Verify permission checks
- [ ] Test cascade delete behavior
- [ ] Test concurrent requests
- [ ] Test error handling

---

## 🔄 Migration Steps

1. **Create Migration File**
   ```
   src/migrations/YYYYMMDD_create_fiscal_configurations.ts
   ```

2. **Run Migration**
   ```bash
   npm run typeorm migration:run
   ```

3. **Create RBAC Permissions**
   - Execute SQL scripts above
   - Verify permissions created

4. **Implement Backend**
   - Create FiscalConfigurationController
   - Create FiscalConfigurationService
   - Create FiscalConfigurationRepository
   - Implement all endpoints

5. **Update Warehouse Module**
   - Update WarehouseController
   - Update WarehouseService
   - Update WarehouseRepository
   - Add fiscal_configuration_id field

6. **Test All Endpoints**
   - Use Postman/Insomnia
   - Test all CRUD operations
   - Test error cases

7. **Deploy**
   - Deploy backend changes
   - Deploy frontend (already ready)
   - Verify in production

---

## 📝 Implementation Notes

1. **Tenant Isolation**
   - All queries must filter by tenant_id
   - Prevent cross-tenant data access

2. **Cascade Delete**
   - Decide: Delete warehouses when fiscal config deleted?
   - Current: SET NULL (warehouse keeps reference but config deleted)
   - Alternative: CASCADE (delete warehouse too)

3. **Sensitive Data**
   - Encrypt digital_seal_password at rest
   - Encrypt private_key at rest
   - Don't return in list endpoints (only in detail)

4. **Audit Logging**
   - Log all create/update/delete operations
   - Include user_id and timestamp
   - Track changes for compliance

5. **Validation**
   - RFC format validation
   - Email validation (if added)
   - Certificate validation (if needed)

---

## 🚀 Deployment Checklist

- [ ] Database migration tested in dev
- [ ] Database migration tested in staging
- [ ] Backend endpoints tested in dev
- [ ] Backend endpoints tested in staging
- [ ] RBAC permissions created
- [ ] Frontend deployed
- [ ] Backend deployed
- [ ] Smoke tests passed
- [ ] User acceptance testing completed
- [ ] Production deployment approved

---

## 📞 Support

For questions or issues during implementation:
1. Check FISCAL_CONFIGURATION_BACKEND_GUIDE.md
2. Review API endpoint specifications
3. Verify database schema
4. Check RBAC permissions
5. Review validation rules

---

**Status**: ✅ Ready for Backend Implementation
**Frontend**: ✅ Complete
**Backend**: ⏳ Pending Implementation
