# Limit Parameter - Fixed

## ✅ Issue Fixed

**Problema**: El backend rechaza `limit=1000` con error "limit must not be greater than 100"

**Solución**: Actualizado todos los componentes para usar `limit=100` en lugar de `limit=1000`

---

## 🔧 Changes Made

### 1. Warehouse Detail Modal Component
**File**: `src/app/features/settings/components/warehouse-detail-modal/warehouse-detail-modal.component.ts`

**Changed**:
```typescript
// Before
this.fiscalConfigService.listFiscalConfigurations({ limit: 1000, status: 'active' })

// After
this.fiscalConfigService.listFiscalConfigurations({ limit: 100, status: 'active' })
```

### 2. Fiscal Configuration List Component
**File**: `src/app/features/settings/components/fiscal-configuration-list/fiscal-configuration-list.component.ts`

**Changed**:
```typescript
// Before
this.warehouseService.getWarehouses({ limit: 1000 })

// After
this.warehouseService.getWarehouses({ limit: 100 })
```

---

## 📝 Backend Constraint

El backend tiene un límite máximo de 100 registros por página:
- ✅ `limit=100` - Permitido
- ❌ `limit=1000` - Rechazado (400 Bad Request)

---

## ✅ Compilation Status

- ✅ No errors
- ✅ All components compile
- ✅ Ready to use

---

## 🚀 Impact

- Warehouse Detail Modal: Carga máximo 100 configuraciones fiscales
- Fiscal Configuration List: Carga máximo 100 almacenes
- Ambos componentes funcionan correctamente con el límite

---

**Status**: ✅ Fixed and Ready
