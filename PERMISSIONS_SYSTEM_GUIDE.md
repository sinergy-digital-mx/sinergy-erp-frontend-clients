# Sistema de Permisos - Guía de Uso

## 📋 Resumen

Sistema completo de permisos con:
- ✅ Catálogos centralizados por módulo
- ✅ Directiva `*hasPermission` para templates
- ✅ Guard `permissionGuard` para rutas
- ✅ Refresh automático cuando permisos cambian
- ✅ Filtrado automático del sidebar

---

## 🗂️ Estructura de Archivos

```
src/app/
├── core/
│   ├── config/
│   │   └── permissions.config.ts          ← Catálogo central (importa todos)
│   ├── directives/
│   │   └── has-permission.directive.ts    ← Directiva *hasPermission
│   ├── guards/
│   │   └── permission.guard.ts            ← Guard para rutas
│   ├── interceptors/
│   │   └── auth.interceptor.ts            ← Detecta PERMISSIONS_CHANGED
│   └── services/
│       └── auth.service.ts                ← Métodos: hasPermission(), refresh()
│
└── features/
    ├── contracts/config/permissions.config.ts
    ├── customers/config/permissions.config.ts
    ├── leads/config/permissions.config.ts
    ├── properties/config/permissions.config.ts
    ├── settings/config/permissions.config.ts
    ├── inventory/config/permissions.config.ts
    ├── marketing/config/permissions.config.ts
    ├── pos/config/permissions.config.ts
    ├── purchase-orders/config/permissions.config.ts
    └── sales-orders/config/permissions.config.ts
```

---

## 🎯 Uso en Componentes (TypeScript)

### Opción 1: Importar catálogo específico

```typescript
import { CONTRACT_PERMISSIONS } from '../config/permissions.config';

export class ContractsListComponent {
  constructor(private authService: AuthService) {}
  
  // Variables booleanas para usar en lógica
  canCreate = this.authService.hasPermission(CONTRACT_PERMISSIONS.create);
  canExport = this.authService.hasPermission(CONTRACT_PERMISSIONS.export);
  canDelete = this.authService.hasPermission(CONTRACT_PERMISSIONS.delete);
  
  downloadReport() {
    if (!this.canExport) {
      alert('No tienes permiso para exportar');
      return;
    }
    // ... lógica de descarga
  }
}
```

### Opción 2: Importar catálogo central

```typescript
import { PERMISSIONS } from '@core/config/permissions.config';

export class DashboardComponent {
  constructor(private authService: AuthService) {}
  
  canViewContracts = this.authService.hasPermission(PERMISSIONS.contracts.viewList);
  canViewCustomers = this.authService.hasPermission(PERMISSIONS.customers.viewList);
  canViewLeads = this.authService.hasPermission(PERMISSIONS.leads.viewList);
}
```

---

## 🎨 Uso en Templates (HTML)

### Directiva `*hasPermission`

```html
<!-- Botón simple (un permiso) -->
<button *hasPermission="'contracts:Create'" (click)="create()">
  Crear Contrato
</button>

<!-- Usando constante del catálogo (recomendado) -->
<button *hasPermission="CONTRACT_PERMISSIONS.create" (click)="create()">
  Crear Contrato
</button>

<!-- Múltiples permisos (TODOS requeridos) -->
<button *hasPermission="['contracts:Read', 'contracts:Update']" (click)="bulkEdit()">
  Editar Múltiples
</button>

<!-- Múltiples permisos (CUALQUIERA requerido) -->
<button *hasPermission="['contracts:Create', 'contracts:Update']; mode: 'any'" (click)="edit()">
  Crear o Editar
</button>

<!-- Sección completa -->
<div *hasPermission="CONTRACT_PERMISSIONS.viewStats">
  <h3>Estadísticas</h3>
  <!-- ... contenido de stats -->
</div>
```

### Usando variables del componente

```html
<!-- En el componente -->
canDownload = this.authService.hasPermission(CONTRACT_PERMISSIONS.export);

<!-- En el template -->
<button *ngIf="canDownload" (click)="download()">
  Descargar Reporte
</button>
```

---

## 🛣️ Uso en Rutas

### Guard en rutas

```typescript
import { permissionGuard } from '@core/guards/permission.guard';
import { PERMISSIONS } from '@core/config/permissions.config';

export const CUSTOMER_ROUTES: Routes = [
  {
    path: '',
    component: CustomersListComponent,
    canActivate: [permissionGuard],
    data: { 
      permissions: [PERMISSIONS.customers.viewList]
    }
  },
  {
    path: 'create',
    component: CustomerCreateComponent,
    canActivate: [permissionGuard],
    data: { 
      permissions: [PERMISSIONS.customers.create]
    }
  },
  {
    path: ':id/edit',
    component: CustomerEditComponent,
    canActivate: [permissionGuard],
    data: { 
      // Múltiples permisos (TODOS requeridos por defecto)
      permissions: [PERMISSIONS.customers.update, PERMISSIONS.customers.viewDetail]
    }
  },
  {
    path: 'bulk-edit',
    component: CustomerBulkEditComponent,
    canActivate: [permissionGuard],
    data: { 
      // Múltiples permisos (CUALQUIERA requerido)
      permissions: [PERMISSIONS.customers.update, PERMISSIONS.customers.create],
      permissionMode: 'any'
    }
  }
];
```

---

## 🔄 Sistema de Refresh Automático

### Cómo Funciona

1. **Admin cambia permisos** de un usuario en el backend
2. **Backend incrementa** `permissions_version` en la BD
3. **Usuario hace una petición** HTTP (cualquiera)
4. **Backend detecta** que el token tiene versión antigua
5. **Backend responde** `401 { error: "PERMISSIONS_CHANGED" }`
6. **Interceptor detecta** el error automáticamente
7. **Interceptor llama** a `POST /auth/refresh`
8. **Backend devuelve** nuevo token con permisos actualizados
9. **Interceptor guarda** el nuevo token
10. **Interceptor reintenta** la petición original
11. **Usuario ve** notificación: "Tus permisos han sido actualizados"
12. **UI se actualiza** automáticamente (botones aparecen/desaparecen, menú se filtra)

### Todo es Automático

- ❌ No requiere logout/login
- ❌ No requiere refresh de página
- ❌ No requiere intervención del usuario
- ✅ Completamente transparente
- ✅ La petición original se completa exitosamente

---

## 📝 Ejemplos Completos

### Ejemplo 1: Contracts List Component

```typescript
// contracts-list.component.ts
import { CONTRACT_PERMISSIONS } from '../config/permissions.config';
import { HasPermissionDirective } from '@core/directives/has-permission.directive';

@Component({
  selector: 'app-contracts-list',
  imports: [HasPermissionDirective, ...],
  templateUrl: './contracts-list.component.html'
})
export class ContractsListComponent {
  // Exponer permisos para usar en template
  readonly PERMISSIONS = CONTRACT_PERMISSIONS;
  
  // Variables booleanas para lógica
  canCreate = this.authService.hasPermission(CONTRACT_PERMISSIONS.create);
  canExport = this.authService.hasPermission(CONTRACT_PERMISSIONS.export);
  
  constructor(private authService: AuthService) {}
  
  downloadReport() {
    if (!this.canExport) {
      this.showError('No tienes permiso para exportar');
      return;
    }
    // ... lógica
  }
}
```

```html
<!-- contracts-list.component.html -->
<div class="header">
  <h1>Contratos</h1>
  
  <!-- Botón crear (solo si tiene permiso) -->
  <button *hasPermission="PERMISSIONS.create" (click)="create()">
    Crear Contrato
  </button>
  
  <!-- Botón exportar (solo si tiene permiso) -->
  <button *hasPermission="PERMISSIONS.export" (click)="downloadReport()">
    Descargar Reporte
  </button>
</div>

<!-- Tabla de contratos -->
<table>
  <tr *ngFor="let contract of contracts">
    <td>{{ contract.contract_number }}</td>
    
    <!-- Botón editar (solo si tiene permiso) -->
    <td>
      <button *hasPermission="PERMISSIONS.update" (click)="edit(contract)">
        Editar
      </button>
    </td>
    
    <!-- Botón eliminar (solo si tiene permiso) -->
    <td>
      <button *hasPermission="PERMISSIONS.delete" (click)="delete(contract)">
        Eliminar
      </button>
    </td>
  </tr>
</table>
```

### Ejemplo 2: Settings Module (Sub-módulos)

```typescript
// settings.component.ts
import { SETTINGS_PERMISSIONS } from '../config/permissions.config';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent {
  readonly PERMISSIONS = SETTINGS_PERMISSIONS;
  
  constructor(private authService: AuthService) {}
  
  // Verificar acceso a sub-módulos
  canViewProducts = this.authService.hasPermission(SETTINGS_PERMISSIONS.products.view);
  canViewVendors = this.authService.hasPermission(SETTINGS_PERMISSIONS.vendors.view);
  canViewWarehouses = this.authService.hasPermission(SETTINGS_PERMISSIONS.warehouses.view);
}
```

```html
<!-- settings.component.html -->
<div class="settings-menu">
  <!-- Sub-módulo Products -->
  <a *hasPermission="PERMISSIONS.products.view" routerLink="/settings/products">
    Productos
  </a>
  
  <!-- Sub-módulo Vendors -->
  <a *hasPermission="PERMISSIONS.vendors.view" routerLink="/settings/vendors">
    Proveedores
  </a>
  
  <!-- Sub-módulo Warehouses -->
  <a *hasPermission="PERMISSIONS.warehouses.view" routerLink="/settings/warehouses">
    Almacenes
  </a>
</div>
```

---

## 🎨 Mejores Prácticas

### ✅ DO (Hacer)

1. **Usar constantes del catálogo**
   ```typescript
   *hasPermission="CONTRACT_PERMISSIONS.create"  // ✅ Bueno
   ```

2. **Importar directiva en componentes standalone**
   ```typescript
   imports: [HasPermissionDirective, ...]
   ```

3. **Validar permisos en lógica Y en template**
   ```typescript
   // En TypeScript
   if (!this.canDelete) return;
   
   // En HTML
   <button *hasPermission="PERMISSIONS.delete">
   ```

4. **Usar guards en rutas sensibles**
   ```typescript
   canActivate: [permissionGuard]
   ```

### ❌ DON'T (No hacer)

1. **No usar strings hardcodeados**
   ```typescript
   *hasPermission="'contracts:Create'"  // ❌ Malo
   ```

2. **No duplicar validaciones innecesariamente**
   ```typescript
   // ❌ Malo - validación redundante
   <button *ngIf="canCreate" *hasPermission="PERMISSIONS.create">
   
   // ✅ Bueno - solo una validación
   <button *hasPermission="PERMISSIONS.create">
   ```

3. **No olvidar importar la directiva**
   ```typescript
   // ❌ Malo - falta importar
   imports: [CommonModule]
   
   // ✅ Bueno
   imports: [CommonModule, HasPermissionDirective]
   ```

---

## 🔍 Debugging

### Ver permisos actuales del usuario

```typescript
// En cualquier componente
constructor(private authService: AuthService) {
  // Ver todos los permisos
  this.authService.permissions$.subscribe(permissions => {
    console.log('Permisos actuales:', Array.from(permissions));
  });
}
```

### Ver si tiene un permiso específico

```typescript
const hasPermission = this.authService.hasPermission('contracts:Create');
console.log('Tiene permiso contracts:Create?', hasPermission);
```

### Ver información del token

```typescript
console.log('User info:', this.authService.user_info);
console.log('Token:', this.authService.token);
```

---

## 📚 Referencia Rápida

### AuthService Methods

```typescript
// Verificar un permiso
hasPermission(permission: string): boolean

// Verificar acción en entidad
can(action: string, entity: string): boolean

// Métodos de conveniencia
canRead(entity: string): boolean
canCreate(entity: string): boolean
canUpdate(entity: string): boolean
canDelete(entity: string): boolean

// Refresh token (automático, no llamar manualmente)
refresh(): Observable<any>
```

### Directiva *hasPermission

```html
<!-- Un permiso -->
*hasPermission="'entity:Action'"

<!-- Múltiples (TODOS) -->
*hasPermission="['entity:Read', 'entity:Update']"

<!-- Múltiples (CUALQUIERA) -->
*hasPermission="['entity:Create', 'entity:Update']; mode: 'any'"
```

### Guard permissionGuard

```typescript
// En routes
data: { 
  permissions: ['entity:Action'],
  permissionMode: 'all' | 'any'  // opcional, default: 'all'
}
```

---

## 🚀 Próximos Pasos

1. Actualizar componentes existentes para usar los catálogos
2. Agregar guards a rutas sensibles
3. Reemplazar `*ngIf` con `*hasPermission` donde corresponda
4. Crear tests unitarios para permisos
5. Documentar permisos específicos de cada módulo

---

## 📞 Soporte

Si tienes dudas sobre permisos:
1. Revisa el catálogo del módulo en `features/{module}/config/permissions.config.ts`
2. Revisa esta guía
3. Consulta con el equipo de backend sobre permisos disponibles
