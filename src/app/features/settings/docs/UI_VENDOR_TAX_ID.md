# UI — ID fiscal del proveedor (opcional)

El campo **ID fiscal** (`tax_id`) no se quita. Deja de ser obligatorio.

Es el identificador tributario **extranjero**. Solo se pinta si el proveedor es **internacional**. En nacional el equivalente es **RFC** (`rfc`), también opcional.

## Formulario Crear / Editar

Visible solo con `vendor_type === 'INTERNATIONAL'`. Sin asterisco, sin `required`, no bloquea Crear/Guardar.

| UI | Body | Cuándo | Obligatorio |
|----|------|--------|-------------|
| RFC | `rfc` | Nacional | No |
| ID fiscal | `tax_id` | Internacional | **No** |
| Nombre legal | `legal_name` | Internacional | Sí |
| País | `country` | Internacional | Sí |

Vacío = omitir o mandar `null`. En edición, `null` borra el valor. Sin validación de formato.

GET `tax_id` null → input vacío. Listado: vacío → `—`.
