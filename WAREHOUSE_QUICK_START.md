# ⚡ Warehouse Module - Quick Start (5 minutos)

## 🎯 Objetivo
Integrar el módulo de Warehouse Management en tu aplicación Angular.

---

## 📦 ¿Qué se creó?

✅ **Componentes**
- Tabla de almacenes con búsqueda y paginación
- Modal para crear/editar almacenes

✅ **Servicio**
- CRUD completo (Create, Read, Update, Delete)
- Búsqueda y filtrado

✅ **Modelos**
- Interfaces TypeScript completamente tipadas

✅ **Documentación**
- 6 archivos de documentación completa

---

## 🚀 3 Pasos para Integrar

### Paso 1: Agregar Ruta (1 minuto)

Abre `src/app/app.routes.ts` y agrega:

```typescript
import { WarehouseListComponent } from './features/warehouses';

export const routes: Routes = [
  // ... tus otras rutas
  {
    path: 'warehouses',
    component: WarehouseListComponent,
    data: { title: 'Almacenes' }
  }
];
```

### Paso 2: Agregar Menú (1 minuto)

En tu componente de navegación, agrega:

```html
<a routerLink="/warehouses" routerLinkActive="active">
  <span>Almacenes</span>
</a>
```

### Paso 3: Configurar Backend (15 minutos)

Lee `src/app/features/warehouses/WAREHOUSE_SETUP.md` y ejecuta:

1. **SQL para crear tabla**
   ```sql
   CREATE TABLE warehouses (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     tenant_id UUID NOT NULL REFERENCES tenants(id),
     name VARCHAR(255) NOT NULL,
     code VARCHAR(50) NOT NULL,
     -- ... más campos
   );
   ```

2. **Crear permisos RBAC**
   ```sql
   INSERT INTO rbac_permissions ...
   ```

3. **Crear endpoints API**
   ```
   POST   /tenant/warehouses
   GET    /tenant/warehouses
   GET    /tenant/warehouses/:id
   PUT    /tenant/warehouses/:id
   DELETE /tenant/warehouses/:id
   ```

---

## ✅ Verificación

Después de integrar, verifica que:

- [ ] Ruta `/warehouses` funciona
- [ ] Tabla se carga sin errores
- [ ] Puedes crear un almacén
- [ ] Puedes editar un almacén
- [ ] Puedes eliminar un almacén

---

## 📚 Documentación

| Archivo | Propósito |
|---------|-----------|
| `README.md` | Documentación completa |
| `WAREHOUSE_SETUP.md` | Configuración backend |
| `INTEGRATION_EXAMPLE.md` | Ejemplos de uso |
| `QUICK_REFERENCE.md` | Referencia rápida |
| `ARCHITECTURE.md` | Arquitectura del módulo |
| `VERIFICATION_CHECKLIST.md` | Checklist de verificación |

---

## 🔧 Uso Básico

### Importar Componente
```typescript
import { WarehouseListComponent } from './features/warehouses';
```

### Usar Servicio
```typescript
import { WarehouseService } from './features/warehouses';

constructor(private warehouseService: WarehouseService) {}

this.warehouseService.getWarehouses().subscribe(res => {
  console.log(res.data);
});
```

### Usar Modal
```typescript
import { WarehouseDetailModalComponent } from './features/warehouses';
import { MatDialog } from '@angular/material/dialog';

constructor(private dialog: MatDialog) {}

this.dialog.open(WarehouseDetailModalComponent, {
  data: { warehouse: null }
});
```

---

## 📋 Campos del Almacén

**Requeridos:**
- Nombre, Código, RFC, Razón Social
- Calle, Ciudad, Estado, País, CP
- Tipo de Persona (Física/Moral)

**Opcionales:**
- Descripción, Teléfono, Email, Persona de Contacto

---

## 🔐 Permisos

```
warehouses:Create   - Crear almacenes
warehouses:Read     - Leer almacenes
warehouses:Update   - Actualizar almacenes
warehouses:Delete   - Eliminar almacenes
```

---

## 🐛 Problemas Comunes

| Problema | Solución |
|----------|----------|
| "Cannot find module" | Verificar ruta de importación |
| "MatDialog not provided" | Importar en app.config.ts |
| "API endpoint not found" | Crear endpoints en backend |
| "Unauthorized" | Verificar token JWT |

---

## 📞 Soporte

1. Lee `README.md` en el módulo
2. Lee `WAREHOUSE_SETUP.md` para backend
3. Lee `QUICK_REFERENCE.md` para referencia rápida

---

## 🎉 ¡Listo!

Tu módulo de Warehouse Management está listo para usar.

**Próximo paso:** Sigue los 3 pasos de integración arriba.

---

**Versión:** 1.0.0  
**Estado:** ✅ Listo para usar  
**Tiempo de integración:** ~17 minutos
