// ARCHIVO GENERADO. No editar a mano.
// Fuentes (backend): src/api/whatsapp/docs/EXTERNAL_INTEGRATION_GUIDE.md y WAHA_DIRECT_IMPLEMENTATION.md
// Regenerar: node scripts/generate-whatsapp-guide.js

export type GuideBlock =
  | { t: 'h3' | 'h4' | 'p' | 'quote'; text: string }
  | { t: 'ul' | 'ol'; items: { text: string; children: string[] }[] }
  | { t: 'code'; lang: string; code: string }
  | { t: 'table'; head: string[]; rows: string[][] };

export interface GuideSection {
  id: string;
  title: string;
  blocks: GuideBlock[];
}

export interface Guide {
  id: string;
  title: string;
  intro: GuideBlock[];
  sections: GuideSection[];
}

export const WHATSAPP_GUIDES: Guide[] = [
  {
    "id": "general",
    "title": "Guía general (Modo A y Modo B)",
    "intro": [
      {
        "t": "p",
        "text": "Cómo enviar WhatsApp desde **otro sistema** (otro backend y otro frontend) reutilizando lo que ya existe en Pollux ERP, **sin que los usuarios del otro sistema tengan cuenta ni sesión en Pollux**."
      }
    ],
    "sections": [
      {
        "id": "general-1",
        "title": "Qué modo elegir",
        "blocks": [
          {
            "t": "table",
            "head": [
              "",
              "**Modo A — API de Pollux**",
              "**Modo B — WAHA directo**"
            ],
            "rows": [
              [
                "Quién envía",
                "El número de WhatsApp de **una** organización de Pollux",
                "El número de **cada cliente** del otro proyecto"
              ],
              [
                "Sesiones (QR)",
                "Una, ya conectada en Pollux",
                "Una por cliente, las crea y administra el otro proyecto"
              ],
              [
                "Qué necesita el otro backend",
                "URL de Pollux + email/contraseña de un usuario de servicio",
                "URL de WAHA + `WAHA_API_KEY`"
              ],
              [
                "Cola anti-bloqueo, límite diario, historial, confirmaciones",
                "Ya los hace Pollux",
                "Hay que implementarlos (código de referencia abajo)"
              ],
              [
                "Archivos",
                "Solo por URL `https` pública",
                "URL pública **o** base64"
              ],
              [
                "Esfuerzo",
                "Bajo (1 cliente HTTP)",
                "Medio-alto (módulo completo)"
              ],
              [
                "Riesgo de seguridad",
                "Bajo: el usuario solo tiene permisos de WhatsApp",
                "**Alto** si comparte el WAHA de Pollux (la API key controla todas las sesiones)"
              ]
            ]
          },
          {
            "t": "p",
            "text": "Regla práctica:"
          },
          {
            "t": "ul",
            "items": [
              {
                "text": "¿Solo necesitas **mandar avisos** desde un número (el de una empresa tuya)? → **Modo A**.",
                "children": []
              },
              {
                "text": "¿Cada cliente del otro proyecto debe usar **su propio número** con su propio QR? → **Modo B**, idealmente con un **WAHA propio**.",
                "children": []
              }
            ]
          },
          {
            "t": "quote",
            "text": "Importante: el navegador del otro proyecto **nunca** habla con Pollux ni con WAHA. Siempre va `Front → Backend del otro proyecto → Pollux / WAHA`. Así ni la contraseña del usuario de servicio ni la API key de WAHA salen del servidor."
          }
        ]
      },
      {
        "id": "general-2",
        "title": "Modo A — API de Pollux (usuario de servicio)",
        "blocks": [
          {
            "t": "p",
            "text": "Pollux no tiene API keys: toda la API usa JWT (`Authorization: Bearer <token>`). Para que nadie del otro proyecto se autentique en Pollux, **el backend del otro proyecto inicia sesión por su cuenta** con un usuario técnico y guarda el token. Los usuarios finales del otro proyecto no ven ni saben nada de Pollux."
          },
          {
            "t": "h3",
            "text": "2.1 Preparación en Pollux (una sola vez)"
          },
          {
            "t": "ol",
            "items": [
              {
                "text": "En el panel de módulos, **habilitar el módulo `whatsapp`** en la organización que enviará (el módulo no viene activo por defecto).",
                "children": []
              },
              {
                "text": "En **Configuración → WhatsApp**, pulsar **Generar nuevo QR** y escanearlo con el teléfono. Debe quedar en **Conectado**.",
                "children": []
              },
              {
                "text": "Crear un **rol** (ej. `Integración WhatsApp`) solo con estos permisos del módulo `whatsapp`:",
                "children": [
                  "`Read` (estado e historial)",
                  "`Create` (enviar)",
                  "`Update` solo si el otro proyecto debe conectar/reiniciar la sesión (normalmente **no**)"
                ]
              },
              {
                "text": "Crear un **usuario** (ej. `integraciones@tuempresa.com`) con ese rol, contraseña larga y aleatoria, **sin** acceso a otros módulos.",
                "children": []
              },
              {
                "text": "Probar el login (sección 2.3).",
                "children": []
              }
            ]
          },
          {
            "t": "p",
            "text": "Cuando cambias los permisos de ese usuario, su token deja de servir (`PERMISSIONS_CHANGED`); ver 2.6."
          },
          {
            "t": "h3",
            "text": "2.2 URL base"
          },
          {
            "t": "table",
            "head": [
              "Entorno",
              "URL base de la API"
            ],
            "rows": [
              [
                "Producción",
                "`https://sapi.sinergydigital.mx/api`"
              ],
              [
                "Local",
                "`http://localhost:3001/api`"
              ]
            ]
          },
          {
            "t": "p",
            "text": "Todas las rutas de WhatsApp cuelgan de `{BASE}/tenant/whatsapp` (el segmento `tenant` es parte de la ruta, no se cambia)."
          },
          {
            "t": "h3",
            "text": "2.3 Login y token"
          },
          {
            "t": "code",
            "lang": "bash",
            "code": "curl -X POST \"https://sapi.sinergydigital.mx/api/auth/login\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"email\":\"integraciones@tuempresa.com\",\"password\":\"********\"}'"
          },
          {
            "t": "p",
            "text": "Respuesta (resumen):"
          },
          {
            "t": "code",
            "lang": "json",
            "code": "{\n  \"access_token\": \"eyJhbGciOi...\",\n  \"user\": { \"id\": \"uuid\", \"tenant_id\": \"uuid\", \"roles\": [\"Integración WhatsApp\"], \"permissions\": { } }\n}"
          },
          {
            "t": "ul",
            "items": [
              {
                "text": "El token dura **30 días**.",
                "children": []
              },
              {
                "text": "Se manda en cada llamada: `Authorization: Bearer <access_token>`.",
                "children": []
              },
              {
                "text": "No hay que mandar el id de la organización: sale del token.",
                "children": []
              },
              {
                "text": "`POST /auth/refresh` (con el token vigente) devuelve un token nuevo con los permisos actuales.",
                "children": []
              }
            ]
          },
          {
            "t": "h3",
            "text": "2.4 Endpoints"
          },
          {
            "t": "p",
            "text": "Todos bajo `{BASE}/tenant/whatsapp`."
          },
          {
            "t": "table",
            "head": [
              "Método",
              "Ruta",
              "Permiso",
              "Uso"
            ],
            "rows": [
              [
                "`GET`",
                "`/session`",
                "Read",
                "Estado de la conexión. Revisar `state === \"connected\"` antes de enviar"
              ],
              [
                "`GET`",
                "`/groups`",
                "Read",
                "Grupos de la sesión. `{ data: [{ id, name, description }] }`. `id` termina en `@g.us`"
              ],
              [
                "`POST`",
                "`/messages/text`",
                "Create",
                "Enviar texto (responde **202**). Body: `phone` o `group_id`"
              ],
              [
                "`POST`",
                "`/messages/file`",
                "Create",
                "Enviar archivo por URL `https` pública (responde **202**)"
              ],
              [
                "`GET`",
                "`/messages`",
                "Read",
                "Historial paginado. Filtros: `page`, `limit`, `status`, `phone`, `reference_type`, `reference_id`"
              ],
              [
                "`GET`",
                "`/messages/:id`",
                "Read",
                "Estado de un mensaje"
              ],
              [
                "`POST`",
                "`/session/connect` · `GET /session/qr` · `POST /session/pairing-code` · `POST /session/restart` · `POST /session/logout` · `DELETE /session`",
                "Update / Delete",
                "Administrar la conexión. No usarlos desde integraciones salvo que sea necesario"
              ]
            ]
          },
          {
            "t": "h4",
            "text": "Enviar texto"
          },
          {
            "t": "code",
            "lang": "bash",
            "code": "curl -X POST \"$BASE/tenant/whatsapp/messages/text\" \\\n  -H \"Authorization: Bearer $TOKEN\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\n    \"phone\": \"5512345678\",\n    \"text\": \"Hola, tu pedido #1234 va en camino.\",\n    \"reference_type\": \"order\",\n    \"reference_id\": \"1234\"\n  }'"
          },
          {
            "t": "p",
            "text": "Body:"
          },
          {
            "t": "table",
            "head": [
              "Campo",
              "Tipo",
              "Obligatorio",
              "Notas"
            ],
            "rows": [
              [
                "`phone`",
                "string (máx. 32)",
                "Sí, si no hay `group_id`",
                "Ver reglas de teléfono (2.5)"
              ],
              [
                "`group_id`",
                "string (máx. 80)",
                "Sí, si no hay `phone`",
                "`120363…@g.us`. Si vienen los dos, gana el grupo"
              ],
              [
                "`text`",
                "string (máx. 4096)",
                "Sí",
                "No puede quedar vacío"
              ],
              [
                "`reference_type`",
                "string (máx. 60)",
                "No",
                "Etiqueta tu documento (ej. `order`) para filtrar después"
              ],
              [
                "`reference_id`",
                "string (máx. 36)",
                "No",
                "Id de tu documento"
              ]
            ]
          },
          {
            "t": "p",
            "text": "Respuesta **202** (el mensaje entra a la cola, aún no se envió):"
          },
          {
            "t": "code",
            "lang": "json",
            "code": "{\n  \"id\": \"uuid-del-mensaje\",\n  \"to_phone\": \"525512345678\",\n  \"type\": \"text\",\n  \"body\": \"Hola, tu pedido #1234 va en camino.\",\n  \"file_name\": null,\n  \"status\": \"queued\",\n  \"error_message\": null,\n  \"reference_type\": \"order\",\n  \"reference_id\": \"1234\",\n  \"sent_at\": null,\n  \"delivered_at\": null,\n  \"read_at\": null,\n  \"created_by\": \"uuid\",\n  \"created_at\": \"2026-10-21T21:30:00.000Z\"\n}"
          },
          {
            "t": "h4",
            "text": "Enviar archivo"
          },
          {
            "t": "code",
            "lang": "bash",
            "code": "curl -X POST \"$BASE/tenant/whatsapp/messages/file\" \\\n  -H \"Authorization: Bearer $TOKEN\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\n    \"phone\": \"+14155550123\",\n    \"file_url\": \"https://midominio.com/facturas/1234.pdf\",\n    \"file_name\": \"Factura-1234.pdf\",\n    \"mimetype\": \"application/pdf\",\n    \"caption\": \"Tu factura\"\n  }'"
          },
          {
            "t": "ul",
            "items": [
              {
                "text": "`file_url`: **https** y pública (se rechazan `localhost`, IPs, `.local`, `.internal`). WAHA descarga el archivo desde esa URL.",
                "children": []
              },
              {
                "text": "`mimetype` (opcional): si empieza con `image/` sale como **foto**; cualquier otro, como **documento**.",
                "children": []
              },
              {
                "text": "`file_name`, `caption`: opcionales.",
                "children": []
              },
              {
                "text": "Si el backend se reinicia con archivos en cola, esos mensajes pasan a `failed` y hay que reenviarlos. Los textos se reencolan solos.",
                "children": []
              }
            ]
          },
          {
            "t": "h4",
            "text": "Seguimiento del estado"
          },
          {
            "t": "p",
            "text": "El envío es **asíncrono**. Consulta `GET /messages/:id` (por ejemplo cada 3–5 s, máx. 1–2 min):"
          },
          {
            "t": "p",
            "text": "`queued` → `sending` → `sent` → `delivered` → `read` · o `failed` (con `error_message`)."
          },
          {
            "t": "p",
            "text": "Los estados `delivered`/`read` dependen de que Pollux tenga configurado `WAHA_WEBHOOK_BASE_URL`."
          },
          {
            "t": "h3",
            "text": "2.5 Reglas de teléfono"
          },
          {
            "t": "ul",
            "items": [
              {
                "text": "10 dígitos → se toma como **México** (`+52`).",
                "children": []
              },
              {
                "text": "`521` + 10 dígitos → se convierte a `52` + 10 dígitos.",
                "children": []
              },
              {
                "text": "Otro país: escribirlo con código (`+14155550123`, `0034…`). Se aceptan espacios, guiones y paréntesis; se limpian.",
                "children": []
              },
              {
                "text": "Debe quedar entre 11 y 15 dígitos.",
                "children": []
              },
              {
                "text": "Antes de enviar se verifica que el número tenga WhatsApp; si no, el mensaje queda `failed` con «El número no tiene WhatsApp…».",
                "children": []
              }
            ]
          },
          {
            "t": "h3",
            "text": "2.6 Cliente de ejemplo para el backend del otro proyecto (TypeScript, Node 18+)"
          },
          {
            "t": "p",
            "text": "Maneja login, token en memoria y re-login automático si el token expira o cambian los permisos."
          },
          {
            "t": "code",
            "lang": "typescript",
            "code": "// pollux-whatsapp.client.ts\nconst BASE = process.env.POLLUX_API_URL!; // https://sapi.sinergydigital.mx/api\nconst EMAIL = process.env.POLLUX_SERVICE_EMAIL!;\nconst PASSWORD = process.env.POLLUX_SERVICE_PASSWORD!;\n\nexport interface PolluxWhatsappMessage {\n  id: string;\n  to_phone: string;\n  status: 'queued' | 'sending' | 'sent' | 'delivered' | 'read' | 'failed';\n  error_message: string | null;\n}\n\nexport class PolluxHttpError extends Error {\n  constructor(readonly status: number, message: string) {\n    super(message);\n  }\n}\n\nlet token: string | null = null;\nlet loginInFlight: Promise<string> | null = null;\n\nasync function login(): Promise<string> {\n  // Evita varios logins simultáneos\n  loginInFlight ??= fetch(`${BASE}/auth/login`, {\n    method: 'POST',\n    headers: { 'Content-Type': 'application/json' },\n    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),\n    signal: AbortSignal.timeout(15000),\n  })\n    .then(async (res) => {\n      if (!res.ok) throw new PolluxHttpError(res.status, 'No se pudo iniciar sesión en Pollux');\n      const json = (await res.json()) as { access_token: string };\n      token = json.access_token;\n      return token;\n    })\n    .finally(() => {\n      loginInFlight = null;\n    });\n  return loginInFlight;\n}\n\nasync function call<T>(method: string, path: string, body?: unknown, retry = true): Promise<T> {\n  const bearer = token ?? (await login());\n  const res = await fetch(`${BASE}/tenant/whatsapp${path}`, {\n    method,\n    headers: {\n      Authorization: `Bearer ${bearer}`,\n      ...(body ? { 'Content-Type': 'application/json' } : {}),\n    },\n    body: body ? JSON.stringify(body) : undefined,\n    signal: AbortSignal.timeout(20000),\n  });\n\n  // Token vencido o permisos cambiados (PERMISSIONS_CHANGED): se vuelve a entrar una vez\n  if (res.status === 401 && retry) {\n    token = null;\n    return call<T>(method, path, body, false);\n  }\n  if (!res.ok) {\n    const err = (await res.json().catch(() => ({}))) as { message?: string | string[] };\n    const message = Array.isArray(err.message) ? err.message[0] : err.message;\n    throw new PolluxHttpError(res.status, message ?? `Pollux respondió ${res.status}`);\n  }\n  return (await res.json()) as T;\n}\n\nexport const polluxWhatsapp = {\n  status: () => call<{ state: string; phone_number: string | null }>('GET', '/session'),\n  sendText: (phone: string, text: string, ref?: { type: string; id: string }) =>\n    call<PolluxWhatsappMessage>('POST', '/messages/text', {\n      phone,\n      text,\n      reference_type: ref?.type,\n      reference_id: ref?.id,\n    }),\n  sendFile: (phone: string, fileUrl: string, opts: { name?: string; mimetype?: string; caption?: string } = {}) =>\n    call<PolluxWhatsappMessage>('POST', '/messages/file', {\n      phone,\n      file_url: fileUrl,\n      file_name: opts.name,\n      mimetype: opts.mimetype,\n      caption: opts.caption,\n    }),\n  getMessage: (id: string) => call<PolluxWhatsappMessage>('GET', `/messages/${id}`),\n};"
          },
          {
            "t": "p",
            "text": "Variables del otro backend:"
          },
          {
            "t": "code",
            "lang": "env",
            "code": "POLLUX_API_URL=https://sapi.sinergydigital.mx/api\nPOLLUX_SERVICE_EMAIL=integraciones@tuempresa.com\nPOLLUX_SERVICE_PASSWORD=********"
          },
          {
            "t": "h3",
            "text": "2.7 Arquitectura (otro proyecto)"
          },
          {
            "t": "code",
            "lang": "",
            "code": "Navegador (otro front)\n   │  POST /api/notifications/whatsapp   (con la sesión del otro proyecto)\n   ▼\nBackend del otro proyecto  ── valida su propio usuario/permisos\n   │  Bearer <token del usuario de servicio>\n   ▼\nPollux  /api/tenant/whatsapp/messages/text\n   ▼\nWAHA → WhatsApp"
          },
          {
            "t": "p",
            "text": "El front del otro proyecto **solo** conoce los endpoints de su propio backend. Ejemplo de endpoint propio (NestJS):"
          },
          {
            "t": "code",
            "lang": "typescript",
            "code": "@Post('notifications/whatsapp')\n@UseGuards(MiPropioAuthGuard)\nasync send(@Body() dto: { phone: string; text: string; orderId?: string }) {\n  const status = await polluxWhatsapp.status();\n  if (status.state !== 'connected') throw new ServiceUnavailableException('WhatsApp no está disponible.');\n  return polluxWhatsapp.sendText(dto.phone, dto.text, dto.orderId ? { type: 'order', id: dto.orderId } : undefined);\n}"
          },
          {
            "t": "h3",
            "text": "2.8 Errores"
          },
          {
            "t": "table",
            "head": [
              "HTTP",
              "Causa",
              "Qué hacer"
            ],
            "rows": [
              [
                "400",
                "Teléfono inválido, texto vacío, URL no `https`/pública, WhatsApp no conectado",
                "Corregir datos. «WhatsApp no está conectado…» → escanear QR en Pollux"
              ],
              [
                "401",
                "Token vencido o `PERMISSIONS_CHANGED`",
                "Re-login (el cliente de ejemplo lo hace solo). Si persiste: credenciales mal"
              ],
              [
                "403",
                "El usuario de servicio no tiene el permiso, o el módulo `whatsapp` no está habilitado en su organización",
                "Revisar rol y módulo"
              ],
              [
                "429",
                "Se alcanzó el límite diario de la organización (por defecto 1000, **compartido** con el ERP)",
                "Esperar al día siguiente o pedir subir `WHATSAPP_DAILY_LIMIT`"
              ],
              [
                "502/503",
                "WAHA no responde o no está configurado",
                "Reintentar con espera; avisar a soporte"
              ]
            ]
          },
          {
            "t": "p",
            "text": "Errores de validación llegan como `{ \"statusCode\": 400, \"message\": [\"...\"], \"error\": \"Bad Request\" }`."
          },
          {
            "t": "h3",
            "text": "2.9 Limitaciones del Modo A"
          },
          {
            "t": "ul",
            "items": [
              {
                "text": "Solo hay **un número** por organización de Pollux: todo sale desde él.",
                "children": []
              },
              {
                "text": "El límite diario (1000) y la cola serial (2–5 s entre mensajes) son **compartidos** con lo que envíe el ERP.",
                "children": []
              },
              {
                "text": "Los mensajes aparecen en el historial de esa organización en Pollux (usa `reference_type`/`reference_id` para distinguirlos).",
                "children": []
              },
              {
                "text": "Si necesitas un número distinto por cliente, usa el **Modo B**, o una organización de Pollux por cliente con su propio usuario de servicio.",
                "children": []
              },
              {
                "text": "No hay API keys ni tokens de servicio permanentes: si algún día se requiere, hay que construir esa función en Pollux (hoy se usa email/contraseña + JWT).",
                "children": []
              },
              {
                "text": "Mientras la contraseña del usuario de servicio sea válida, cualquiera que la tenga puede enviar. Guárdala solo como secreto del servidor y rótala si se filtra.",
                "children": []
              }
            ]
          }
        ]
      },
      {
        "id": "general-3",
        "title": "Modo B — WAHA directo",
        "blocks": [
          {
            "t": "quote",
            "text": "La implementación completa paso a paso (autenticación de WAHA, módulo de backend y pantalla de frontend) está en [WAHA_DIRECT_IMPLEMENTATION.md](./WAHA_DIRECT_IMPLEMENTATION.md). En el ERP: pestaña «Implementar WAHA directo»."
          },
          {
            "t": "p",
            "text": "El otro proyecto habla **directamente con [WAHA](https://waha.devlike.pro/)** (el mismo servidor que usa Pollux o uno propio), crea **una sesión por cliente** y administra su propio QR, cola y webhooks. No interviene Pollux."
          },
          {
            "t": "h3",
            "text": "3.1 Seguridad: léelo antes de empezar"
          },
          {
            "t": "ul",
            "items": [
              {
                "text": "`WAHA_API_KEY` es **global**: quien la tenga puede listar, borrar, reiniciar y enviar con **cualquier** sesión del servidor, incluidas las del ERP (`erp_<id>`).",
                "children": []
              },
              {
                "text": "**Recomendado:** levantar un **WAHA propio** (otro servicio en Railway/Docker) para el otro proyecto. Así no hay riesgo cruzado y se puede reiniciar sin afectar al ERP.",
                "children": []
              },
              {
                "text": "Si se comparte el WAHA de Pollux: usar un prefijo propio de sesiones (`miapp_<idCliente>`), **nunca** listar/borrar/reiniciar sesiones que no empiecen con tu prefijo, y avisar al administrador (comparten límite de recursos).",
                "children": []
              },
              {
                "text": "La API key y la URL de WAHA viven **solo** en variables de entorno del backend. Nunca en el front, nunca en el repo, nunca en logs ni en mensajes de error al cliente.",
                "children": []
              },
              {
                "text": "No devuelvas al usuario final el error crudo de WAHA (puede revelar URLs internas): traduce a mensajes propios.",
                "children": []
              }
            ]
          },
          {
            "t": "h3",
            "text": "3.2 Servidor WAHA propio (resumen)"
          },
          {
            "t": "p",
            "text": "Variables del servicio WAHA (verificar nombres contra la versión instalada):"
          },
          {
            "t": "table",
            "head": [
              "Variable",
              "Valor"
            ],
            "rows": [
              [
                "`WAHA_API_KEY`",
                "Llave larga y aleatoria"
              ],
              [
                "`WAHA_DASHBOARD_USERNAME` / `WAHA_DASHBOARD_PASSWORD`",
                "Acceso al dashboard"
              ],
              [
                "`WHATSAPP_SWAGGER_USERNAME` / `WHATSAPP_SWAGGER_PASSWORD`",
                "Acceso al Swagger"
              ],
              [
                "`WHATSAPP_DEFAULT_ENGINE`",
                "`NOWEB` (no abre un Chromium por sesión; mucho más ligero)"
              ],
              [
                "`WHATSAPP_RESTART_ALL_SESSIONS`",
                "`True` (reinicia sesiones guardadas al arrancar)"
              ]
            ]
          },
          {
            "t": "ul",
            "items": [
              {
                "text": "**Volumen persistente** montado en `/app/.sessions`. Sin volumen, cada redeploy borra las sesiones y todos los clientes tendrían que volver a escanear el QR.",
                "children": []
              },
              {
                "text": "WAHA **2026.6.1 o posterior**: sesiones ilimitadas y multimedia en Core (gratis). En versiones anteriores Core solo tiene la sesión `default` (un cliente).",
                "children": []
              }
            ]
          },
          {
            "t": "h3",
            "text": "3.3 Variables del backend del otro proyecto"
          },
          {
            "t": "table",
            "head": [
              "Variable",
              "Obligatoria",
              "Descripción"
            ],
            "rows": [
              [
                "`WAHA_BASE_URL`",
                "Sí",
                "URL de WAHA sin `/` final"
              ],
              [
                "`WAHA_API_KEY`",
                "Sí",
                "Se manda en el header `X-Api-Key`"
              ],
              [
                "`WAHA_WEBHOOK_BASE_URL`",
                "Para estados/acks",
                "URL pública de **tu** backend"
              ],
              [
                "`WAHA_WEBHOOK_SECRET`",
                "Recomendada",
                "Secreto maestro para derivar la llave HMAC de cada sesión"
              ],
              [
                "`WHATSAPP_DEFAULT_COUNTRY_CODE`",
                "No",
                "Lada para teléfonos de 10 dígitos (`52`)"
              ],
              [
                "`WHATSAPP_DAILY_LIMIT`",
                "No",
                "Mensajes por día por cliente (`1000`)"
              ],
              [
                "`WHATSAPP_MIN_DELAY_MS` / `WHATSAPP_MAX_DELAY_MS`",
                "No",
                "Pausa entre mensajes de una sesión (2000–5000)"
              ]
            ]
          },
          {
            "t": "h3",
            "text": "3.4 Endpoints de WAHA que se usan"
          },
          {
            "t": "p",
            "text": "Todos con header `X-Api-Key: <WAHA_API_KEY>`. Cuerpo JSON."
          },
          {
            "t": "table",
            "head": [
              "Acción",
              "Método y ruta",
              "Body / query"
            ],
            "rows": [
              [
                "Versión del servidor",
                "`GET /api/server/version`",
                "—"
              ],
              [
                "Ver sesión",
                "`GET /api/sessions/{name}`",
                "404 si no existe"
              ],
              [
                "Crear e iniciar",
                "`POST /api/sessions`",
                "`{ name, start: true, config }`"
              ],
              [
                "Actualizar config",
                "`PUT /api/sessions/{name}`",
                "`{ name, config }` (no hacerlo con la sesión activa: WAHA la reinicia)"
              ],
              [
                "Iniciar / detener / reiniciar",
                "`POST /api/sessions/{name}/start` · `/stop` · `/restart`",
                "—"
              ],
              [
                "Desvincular teléfono",
                "`POST /api/sessions/{name}/logout`",
                "—"
              ],
              [
                "Borrar sesión",
                "`DELETE /api/sessions/{name}`",
                "—"
              ],
              [
                "QR",
                "`GET /api/{name}/auth/qr?format=image` con `Accept: application/json`",
                "→ `{ mimetype, data }` (base64)"
              ],
              [
                "Código por teléfono",
                "`POST /api/{name}/auth/request-code`",
                "`{ phoneNumber }` → `{ code }` (8 caracteres)"
              ],
              [
                "¿Tiene WhatsApp?",
                "`GET /api/contacts/check-exists?phone=<digits>&session=<name>`",
                "→ `{ numberExists, chatId }`"
              ],
              [
                "«Escribiendo…»",
                "`POST /api/startTyping` · `/api/stopTyping`",
                "`{ session, chatId }`"
              ],
              [
                "Texto",
                "`POST /api/sendText`",
                "`{ session, chatId, text }`"
              ],
              [
                "Documento",
                "`POST /api/sendFile`",
                "`{ session, chatId, file: { url | data, filename, mimetype }, caption? }`"
              ],
              [
                "Foto",
                "`POST /api/sendImage`",
                "igual que `sendFile`"
              ]
            ]
          },
          {
            "t": "p",
            "text": "Notas:"
          },
          {
            "t": "ul",
            "items": [
              {
                "text": "`chatId` = el que devuelve `check-exists` (`chatId`) o `<digits>@c.us`.",
                "children": []
              },
              {
                "text": "`file.data` es base64 **sin** el prefijo `data:`. Con `file.url` WAHA descarga el archivo (solo `https` público).",
                "children": []
              },
              {
                "text": "Estados de sesión (`status`): `STOPPED`, `STARTING`, `SCAN_QR_CODE`, `WORKING`, `FAILED`. Se puede enviar solo en `WORKING`.",
                "children": []
              },
              {
                "text": "El QR solo existe con `status = SCAN_QR_CODE`, y WAHA lo renueva cada pocos segundos.",
                "children": []
              },
              {
                "text": "Código de error 422/409 de WAHA al enviar = sesión no iniciada o sin vincular. 404 = la sesión no existe (p. ej. se reinstaló WAHA sin volumen).",
                "children": []
              }
            ]
          },
          {
            "t": "h3",
            "text": "3.5 Flujo de conexión (QR)"
          },
          {
            "t": "ol",
            "items": [
              {
                "text": "`POST /api/sessions` con nombre propio, `start: true` y webhook (sección 3.8). Si ya existe y está `STOPPED`/`FAILED`: `PUT` de config y luego `POST .../start`. **Idempotente**.",
                "children": []
              },
              {
                "text": "El front consulta **tu** `GET /whatsapp/session/qr` cada ~3 s. Cuando `state = waiting_qr` devuelves `qr_data_url = \"data:image/png;base64,...\"`.",
                "children": []
              },
              {
                "text": "El usuario escanea: WhatsApp → Dispositivos vinculados → Vincular dispositivo. El estado pasa a `WORKING` (por webhook o por el siguiente sondeo).",
                "children": []
              },
              {
                "text": "Si expira, volver a `failed/disconnected` y ofrecer «Generar nuevo QR».",
                "children": []
              },
              {
                "text": "Sin cámara: `request-code` con el teléfono del WhatsApp que se va a vincular → mostrar el código → «Vincular con número de teléfono».",
                "children": []
              }
            ]
          },
          {
            "t": "p",
            "text": "Mapa de estados para tu UI:"
          },
          {
            "t": "table",
            "head": [
              "WAHA `status`",
              "`state` de tu API"
            ],
            "rows": [
              [
                "(sin registro)",
                "`not_configured`"
              ],
              [
                "`STOPPED`",
                "`disconnected`"
              ],
              [
                "`STARTING`",
                "`starting`"
              ],
              [
                "`SCAN_QR_CODE`",
                "`waiting_qr`"
              ],
              [
                "`WORKING`",
                "`connected`"
              ],
              [
                "`FAILED`",
                "`failed`"
              ]
            ]
          },
          {
            "t": "h3",
            "text": "3.6 Cliente WAHA de referencia (TypeScript, Node 18+)"
          },
          {
            "t": "code",
            "lang": "typescript",
            "code": "// waha.client.ts\nconst baseUrl = () => (process.env.WAHA_BASE_URL ?? '').trim().replace(/\\/+$/, '');\n\nexport class WahaError extends Error {\n  constructor(message: string, readonly status: number) {\n    super(message);\n  }\n  get isNotFound() { return this.status === 404; }\n  get isSessionUnavailable() { return this.status === 422 || this.status === 409; }\n}\n\nasync function raw(method: string, path: string, body?: unknown, headers: Record<string, string> = {}) {\n  let res: Response;\n  try {\n    res = await fetch(`${baseUrl()}${path}`, {\n      method,\n      headers: {\n        Accept: 'application/json',\n        'X-Api-Key': process.env.WAHA_API_KEY!.trim(),\n        ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),\n        ...headers,\n      },\n      body: body !== undefined ? JSON.stringify(body) : undefined,\n      signal: AbortSignal.timeout(30000),\n    });\n  } catch {\n    throw new WahaError('El servicio de WhatsApp no respondió. Intenta de nuevo.', 503);\n  }\n  if (!res.ok) throw new WahaError(`WAHA respondió ${res.status}`, res.status);\n  return res;\n}\n\nasync function request<T = unknown>(method: string, path: string, body?: unknown): Promise<T> {\n  const text = await (await raw(method, path, body)).text();\n  if (!text) return undefined as T;\n  try { return JSON.parse(text) as T; } catch { return text as unknown as T; }\n}\n\nconst s = encodeURIComponent;\n\nexport const waha = {\n  getSession: (name: string) => request<{ name: string; status: string; me?: { id?: string; pushName?: string } }>('GET', `/api/sessions/${s(name)}`),\n  createSession: (name: string, config: unknown) => request('POST', '/api/sessions', { name, start: true, config }),\n  updateSession: (name: string, config: unknown) => request('PUT', `/api/sessions/${s(name)}`, { name, config }),\n  start: (name: string) => request('POST', `/api/sessions/${s(name)}/start`),\n  restart: (name: string) => request('POST', `/api/sessions/${s(name)}/restart`),\n  logout: (name: string) => request('POST', `/api/sessions/${s(name)}/logout`),\n  delete: (name: string) => request('DELETE', `/api/sessions/${s(name)}`),\n\n  async qr(name: string): Promise<{ mimetype: string; data: string }> {\n    const res = await raw('GET', `/api/${s(name)}/auth/qr?format=image`, undefined, { Accept: 'application/json' });\n    const type = res.headers.get('content-type') ?? '';\n    if (type.startsWith('image/')) {\n      return { mimetype: type.split(';')[0], data: Buffer.from(await res.arrayBuffer()).toString('base64') };\n    }\n    const json = (await res.json()) as { mimetype?: string; data?: string };\n    if (!json.data) throw new WahaError('Respuesta de QR inválida.', 502);\n    return { mimetype: json.mimetype || 'image/png', data: json.data };\n  },\n\n  async pairingCode(name: string, phoneNumber: string): Promise<string> {\n    const r = await request<{ code?: string }>('POST', `/api/${s(name)}/auth/request-code`, { phoneNumber });\n    if (!r?.code) throw new WahaError('WAHA no devolvió el código.', 502);\n    return r.code;\n  },\n\n  checkExists: (session: string, phone: string) =>\n    request<{ numberExists: boolean; chatId?: string | null }>(\n      'GET',\n      `/api/contacts/check-exists?${new URLSearchParams({ phone, session })}`,\n    ),\n  startTyping: (session: string, chatId: string) => request('POST', '/api/startTyping', { session, chatId }),\n  stopTyping: (session: string, chatId: string) => request('POST', '/api/stopTyping', { session, chatId }),\n  sendText: (session: string, chatId: string, text: string) => request('POST', '/api/sendText', { session, chatId, text }),\n  sendFile: (session: string, chatId: string, file: { url?: string; data?: string; filename?: string; mimetype?: string }, caption?: string) =>\n    request('POST', '/api/sendFile', { session, chatId, file, ...(caption ? { caption } : {}) }),\n  sendImage: (session: string, chatId: string, file: { url?: string; data?: string; filename?: string; mimetype?: string }, caption?: string) =>\n    request('POST', '/api/sendImage', { session, chatId, file, ...(caption ? { caption } : {}) }),\n};"
          },
          {
            "t": "h3",
            "text": "3.7 Nombre de sesión, teléfonos, cola y límites"
          },
          {
            "t": "p",
            "text": "**Nombre de sesión** (único por cliente, solo `[A-Za-z0-9_]`):"
          },
          {
            "t": "code",
            "lang": "typescript",
            "code": "export const buildSessionName = (customerId: string) => `miapp_${customerId.replace(/[^a-zA-Z0-9]/g, '')}`;"
          },
          {
            "t": "p",
            "text": "El nombre se calcula **siempre en el servidor** a partir del usuario autenticado. El front jamás manda ni elige el nombre de sesión."
          },
          {
            "t": "p",
            "text": "**Teléfono**:"
          },
          {
            "t": "code",
            "lang": "typescript",
            "code": "export function normalizePhone(raw: string, defaultCountry = '52'): string | null {\n  let d = String(raw ?? '').replace(/\\D/g, '');\n  if (d.startsWith('00')) d = d.slice(2);\n  if (!d) return null;\n  if (d.length === 10) d = `${defaultCountry}${d}`;\n  if (d.startsWith('521') && d.length === 13) d = `52${d.slice(3)}`;\n  return d.length >= 11 && d.length <= 15 ? d : null;\n}"
          },
          {
            "t": "p",
            "text": "**Cola anti-bloqueo** (importante para no perder el número):"
          },
          {
            "t": "ol",
            "items": [
              {
                "text": "Guardar el mensaje en BD como `queued` y responder **202** de inmediato.",
                "children": []
              },
              {
                "text": "Procesar en una **cola serial por sesión** (un mensaje a la vez).",
                "children": []
              },
              {
                "text": "Entre mensajes: pausa **aleatoria** de 2–5 s.",
                "children": []
              },
              {
                "text": "Antes de cada envío: `check-exists`; si `numberExists = false` → `failed`.",
                "children": []
              },
              {
                "text": "Texto: `startTyping` → esperar `min(4000, 800 + largo*25)` ms → `stopTyping` → `sendText`. (Los errores de typing se ignoran.)",
                "children": []
              },
              {
                "text": "Reclamo atómico `UPDATE ... SET status='sending' WHERE id=? AND status='queued'` para que, con varias instancias, solo una envíe.",
                "children": []
              },
              {
                "text": "Límite diario por cliente (por defecto 1000); al excederlo → **429**.",
                "children": []
              },
              {
                "text": "Al arrancar el backend: reencolar `queued` de las últimas 24 h; marcar `failed` los `sending` viejos (>2 min) y los archivos pendientes (la URL/base64 solo vivía en memoria).",
                "children": []
              }
            ]
          },
          {
            "t": "p",
            "text": "Estados del mensaje: `queued → sending → sent → delivered → read` o `failed`. Un ack tardío nunca regresa un estado."
          },
          {
            "t": "h3",
            "text": "3.8 Webhook (estados y confirmaciones)"
          },
          {
            "t": "p",
            "text": "Al crear la sesión, mandar en `config`:"
          },
          {
            "t": "code",
            "lang": "json",
            "code": "{\n  \"metadata\": { \"app.customer_id\": \"<id>\" },\n  \"webhooks\": [\n    {\n      \"url\": \"https://api.tuproyecto.com/api/webhooks/whatsapp/waha\",\n      \"events\": [\"session.status\", \"message.ack\"],\n      \"hmac\": { \"key\": \"<llave derivada de la sesión>\" },\n      \"retries\": { \"policy\": \"exponential\", \"delaySeconds\": 2, \"attempts\": 6 }\n    }\n  ]\n}"
          },
          {
            "t": "p",
            "text": "**Llave HMAC por sesión** (no se guarda en BD; se deriva):"
          },
          {
            "t": "code",
            "lang": "typescript",
            "code": "import * as crypto from 'crypto';\nexport const deriveWebhookKey = (secret: string, sessionName: string) =>\n  crypto.createHmac('sha256', secret).update(sessionName).digest('hex');"
          },
          {
            "t": "p",
            "text": "Así una firma válida de una sesión no sirve para otra."
          },
          {
            "t": "p",
            "text": "**Receptor** (ruta pública, sin tu autenticación; la seguridad es la firma). Necesita el **cuerpo crudo** (`rawBody: true` en NestJS):"
          },
          {
            "t": "code",
            "lang": "typescript",
            "code": "export function verifyHmac(rawBody: Buffer | string, key: string, received?: string, algorithm = 'sha512'): boolean {\n  if (!received) return false;\n  const algo = algorithm.toLowerCase() === 'sha256' ? 'sha256' : 'sha512';\n  const expected = Buffer.from(crypto.createHmac(algo, key).update(rawBody).digest('hex'));\n  const got = Buffer.from(received.trim().toLowerCase());\n  return expected.length === got.length && crypto.timingSafeEqual(expected, got);\n}"
          },
          {
            "t": "p",
            "text": "Headers de WAHA: `X-Webhook-Hmac` (firma) y `X-Webhook-Hmac-Algorithm` (por defecto `sha512`). Flujo:"
          },
          {
            "t": "ol",
            "items": [
              {
                "text": "Leer `body.session`; si falta o no hay secreto → 401.",
                "children": []
              },
              {
                "text": "`key = deriveWebhookKey(secret, body.session)`; si la firma no coincide → **401**.",
                "children": []
              },
              {
                "text": "Resolver al cliente **por el nombre de sesión**, nunca por datos del body.",
                "children": []
              },
              {
                "text": "Eventos:",
                "children": [
                  "`session.status`: **no confiar en el estado del evento** (los reintentos llegan desordenados: un `FAILED` viejo después de `WORKING`). Consultar `GET /api/sessions/{name}` y guardar ese estado; usar el del evento solo si WAHA no responde. Si `WORKING`: guardar `me.id` (teléfono, sin `@c.us`) y `me.pushName`.",
                  "`message.ack`: ignorar si `payload.fromMe === false`. Buscar el mensaje por `session_name + payload.id` y avanzar el estado."
                ]
              }
            ]
          },
          {
            "t": "p",
            "text": "Mapa de acks:"
          },
          {
            "t": "table",
            "head": [
              "`ackName`",
              "`ack`",
              "Estado"
            ],
            "rows": [
              [
                "`ERROR`",
                "`-1`",
                "`failed`"
              ],
              [
                "`PENDING`",
                "`0`",
                "(ignorar)"
              ],
              [
                "`SERVER`",
                "`1`",
                "`sent`"
              ],
              [
                "`DEVICE`",
                "`2`",
                "`delivered`"
              ],
              [
                "`READ` / `PLAYED`",
                "`3` / `4`",
                "`read`"
              ]
            ]
          },
          {
            "t": "p",
            "text": "Sin `WAHA_WEBHOOK_BASE_URL`, la conexión y los envíos funcionan, pero no se actualizan «Entregado/Leído» ni las desconexiones."
          },
          {
            "t": "p",
            "text": "**ID del mensaje de WAHA** (`waha_message_id`): cambia de forma según el motor. Buscarlo en `result.id` (string), `result.id._serialized`/`result.id.id`, o `result._data.id._serialized`."
          },
          {
            "t": "h3",
            "text": "3.9 Tablas sugeridas"
          },
          {
            "t": "ul",
            "items": [
              {
                "text": "`whatsapp_sessions`: `customer_id` (**UNIQUE**), `session_name` (**UNIQUE**), `status`, `phone_number`, `push_name`, `connected_at`, `last_status_at`, `last_error`, `created_by`, `updated_by`.",
                "children": []
              },
              {
                "text": "`whatsapp_messages`: `customer_id`, `session_name`, `to_phone`, `chat_id`, `type` (`text`/`file`), `body`, `file_name`, `file_mimetype`, `status`, `waha_message_id`, `error_message`, `reference_type`, `reference_id`, `sent_at`, `delivered_at`, `read_at`, `created_by`, `created_at`, `updated_at`.",
                "children": []
              },
              {
                "text": "Índices: `(session_name, waha_message_id)`, `(customer_id, created_at)`, `(status, created_at)`.",
                "children": []
              },
              {
                "text": "**Todas** las consultas filtran por `customer_id`.",
                "children": []
              }
            ]
          },
          {
            "t": "p",
            "text": "Referencia directa: migración `src/database/migrations/1793000000000-create-whatsapp.ts` y entidades en `src/entities/whatsapp/`."
          },
          {
            "t": "h3",
            "text": "3.10 Qué copiar de este repo (backend)"
          },
          {
            "t": "p",
            "text": "Carpeta `src/api/whatsapp/` completa:"
          },
          {
            "t": "table",
            "head": [
              "Archivo",
              "Qué hace"
            ],
            "rows": [
              [
                "`services/waha-client.service.ts`",
                "Cliente HTTP de WAHA"
              ],
              [
                "`services/whatsapp-session.service.ts`",
                "Conectar, QR, código, reiniciar, desvincular, estado"
              ],
              [
                "`services/whatsapp-message.service.ts`",
                "Cola serial, límites, historial, `sendBuffer`"
              ],
              [
                "`services/whatsapp-webhook.service.ts` + `whatsapp-webhook.controller.ts`",
                "Receptor firmado"
              ],
              [
                "`utils/whatsapp.util.ts` (+ `.spec.ts`) · `utils/whatsapp-errors.ts`",
                "Teléfonos, HMAC, acks, URL segura, errores amigables"
              ],
              [
                "`dto/whatsapp.dto.ts` · `whatsapp.constants.ts` · `whatsapp.controller.ts` · `whatsapp.module.ts`",
                "API REST"
              ]
            ]
          },
          {
            "t": "p",
            "text": "Adaptaciones al copiar:"
          },
          {
            "t": "ol",
            "items": [
              {
                "text": "Reemplazar `tenant_id`/`TenantContextService` por el id de cliente de tu proyecto (en este repo es la organización).",
                "children": []
              },
              {
                "text": "Cambiar `buildSessionName` (prefijo `erp_` → el tuyo) y `metadata['erp.tenant_id']`.",
                "children": []
              },
              {
                "text": "Cambiar `WAHA_WEBHOOK_PATH` si tu prefijo global no es `api`.",
                "children": []
              },
              {
                "text": "Cambiar `JwtAuthGuard`/`PermissionGuard`/`RequirePermissions` por los de tu proyecto.",
                "children": []
              },
              {
                "text": "Activar `rawBody` en `main.ts`: `NestFactory.create(AppModule, { rawBody: true })`.",
                "children": []
              },
              {
                "text": "Registrar entidades y correr la migración.",
                "children": []
              }
            ]
          }
        ]
      },
      {
        "id": "general-4",
        "title": "Frontend del otro proyecto (Angular)",
        "blocks": [
          {
            "t": "p",
            "text": "El front **solo** llama a **tu** backend (que a su vez usa Modo A o B). Nunca a Pollux ni a WAHA."
          },
          {
            "t": "p",
            "text": "Archivos de referencia en el frontend de Pollux:"
          },
          {
            "t": "table",
            "head": [
              "Archivo",
              "Contenido"
            ],
            "rows": [
              [
                "`src/app/features/settings/services/whatsapp.service.ts`",
                "Servicio HTTP"
              ],
              [
                "`src/app/features/settings/models/whatsapp.model.ts`",
                "Tipos"
              ],
              [
                "`src/app/features/settings/pages/whatsapp-settings/whatsapp-settings.component.{ts,html}`",
                "Pantalla de conexión (QR, código, mensaje de prueba, historial)"
              ],
              [
                "`src/app/features/settings/config/whatsapp-permissions.config.ts`",
                "Permisos de pantalla"
              ]
            ]
          },
          {
            "t": "h3",
            "text": "4.1 Modo A (solo enviar)"
          },
          {
            "t": "p",
            "text": "No hay pantalla de QR: la conexión se administra en Pollux. En tu front basta un servicio que llame a tu endpoint de envío:"
          },
          {
            "t": "code",
            "lang": "typescript",
            "code": "@Injectable({ providedIn: 'root' })\nexport class NotificationsService {\n  private readonly api = `${environment.api}/notifications/whatsapp`;\n  constructor(private http: HttpClient) {}\n\n  sendWhatsapp(payload: { phone: string; text: string; orderId?: string }) {\n    return this.http.post<{ id: string; status: string }>(this.api, payload);\n  }\n}"
          },
          {
            "t": "p",
            "text": "Mostrar «En cola» al recibir 202 y, si quieres seguimiento, consultar tu propio `GET .../:id`."
          },
          {
            "t": "h3",
            "text": "4.2 Modo B (conexión por cliente)"
          },
          {
            "t": "p",
            "text": "Copiar el servicio, modelo y componente de conexión, y apuntar `api` a **tu** backend. Contrato que debe exponer tu backend (mismo que el de Pollux, sin `tenant/`):"
          },
          {
            "t": "table",
            "head": [
              "Método",
              "Ruta",
              "Respuesta"
            ],
            "rows": [
              [
                "`GET`",
                "`/whatsapp/session`",
                "`{ configured, service_available, state, status, phone_number, push_name, connected_at, last_status_at, last_error }`"
              ],
              [
                "`POST`",
                "`/whatsapp/session/connect`",
                "igual que arriba"
              ],
              [
                "`GET`",
                "`/whatsapp/session/qr`",
                "igual + `qr_data_url`"
              ],
              [
                "`POST`",
                "`/whatsapp/session/pairing-code`",
                "`{ code }`"
              ],
              [
                "`POST`",
                "`/whatsapp/session/restart` · `/logout`",
                "estado"
              ],
              [
                "`DELETE`",
                "`/whatsapp/session`",
                "`{ ok: true }`"
              ],
              [
                "`POST`",
                "`/whatsapp/messages/text` · `/messages/file`",
                "mensaje en `queued` (202)"
              ],
              [
                "`GET`",
                "`/whatsapp/messages` · `/messages/:id`",
                "historial / detalle"
              ]
            ]
          },
          {
            "t": "p",
            "text": "Reglas de la pantalla (ya implementadas en el componente de Pollux):"
          },
          {
            "t": "ul",
            "items": [
              {
                "text": "Al entrar: `GET /session`. Si `waiting_qr` o `starting`, iniciar sondeo.",
                "children": []
              },
              {
                "text": "Sondeo de `GET /session/qr` cada **3 s**; mostrar `qr_data_url` solo en `waiting_qr`; detener al llegar a `connected`/`failed`/`disconnected`.",
                "children": []
              },
              {
                "text": "Detener el sondeo tras **5 errores seguidos** y ofrecer «Generar nuevo QR».",
                "children": []
              },
              {
                "text": "Limpiar teléfonos al pegar (quitar espacios, guiones y paréntesis; conservar un `+` inicial).",
                "children": []
              },
              {
                "text": "Avisar que 10 dígitos = México; para otro país, escribir `+código`.",
                "children": []
              },
              {
                "text": "Ocultar botones según permisos (`Update` conectar/reiniciar/desvincular, `Delete` eliminar, `Create` enviar).",
                "children": []
              },
              {
                "text": "Mostrar `last_error` solo cuando `state !== 'connected'`.",
                "children": []
              }
            ]
          }
        ]
      },
      {
        "id": "general-5",
        "title": "Pruebas rápidas (checklist)",
        "blocks": [
          {
            "t": "h3",
            "text": "Modo A"
          },
          {
            "t": "code",
            "lang": "bash",
            "code": "BASE=https://sapi.sinergydigital.mx/api\nTOKEN=$(curl -s -X POST $BASE/auth/login -H \"Content-Type: application/json\" \\\n  -d '{\"email\":\"integraciones@tuempresa.com\",\"password\":\"********\"}' | jq -r .access_token)\n\ncurl -s $BASE/tenant/whatsapp/session -H \"Authorization: Bearer $TOKEN\"          # state: connected\ncurl -s -X POST $BASE/tenant/whatsapp/messages/text -H \"Authorization: Bearer $TOKEN\" \\\n  -H \"Content-Type: application/json\" -d '{\"phone\":\"5512345678\",\"text\":\"Prueba\"}'  # 202 queued\ncurl -s \"$BASE/tenant/whatsapp/messages?limit=5\" -H \"Authorization: Bearer $TOKEN\""
          },
          {
            "t": "h3",
            "text": "Modo B (directo a WAHA)"
          },
          {
            "t": "code",
            "lang": "bash",
            "code": "WAHA=https://tu-waha.up.railway.app\nKEY=tu_api_key\n\ncurl -s $WAHA/api/server/version -H \"X-Api-Key: $KEY\"\ncurl -s -X POST $WAHA/api/sessions -H \"X-Api-Key: $KEY\" -H \"Content-Type: application/json\" \\\n  -d '{\"name\":\"miapp_prueba\",\"start\":true,\"config\":{}}'\ncurl -s \"$WAHA/api/miapp_prueba/auth/qr?format=image\" -H \"X-Api-Key: $KEY\" -H \"Accept: application/json\"   # {mimetype,data}\ncurl -s \"$WAHA/api/contacts/check-exists?phone=525512345678&session=miapp_prueba\" -H \"X-Api-Key: $KEY\"\ncurl -s -X POST $WAHA/api/sendText -H \"X-Api-Key: $KEY\" -H \"Content-Type: application/json\" \\\n  -d '{\"session\":\"miapp_prueba\",\"chatId\":\"525512345678@c.us\",\"text\":\"Prueba\"}'\ncurl -s -X DELETE $WAHA/api/sessions/miapp_prueba -H \"X-Api-Key: $KEY\"    # limpiar la sesión de prueba"
          }
        ]
      },
      {
        "id": "general-6",
        "title": "Problemas frecuentes",
        "blocks": [
          {
            "t": "table",
            "head": [
              "Síntoma",
              "Causa probable",
              "Solución"
            ],
            "rows": [
              [
                "`401` en todas las llamadas (A)",
                "Credenciales del usuario de servicio incorrectas o usuario inactivo",
                "Probar el login con curl"
              ],
              [
                "`401 PERMISSIONS_CHANGED` (A)",
                "Cambiaron los permisos del usuario",
                "Re-login (o `POST /auth/refresh`)"
              ],
              [
                "`403` (A)",
                "Falta permiso `whatsapp` o el módulo no está habilitado en la organización",
                "Revisar rol y panel de módulos"
              ],
              [
                "«WhatsApp no está conectado»",
                "La sesión no está en `WORKING`",
                "Escanear QR / reiniciar"
              ],
              [
                "Mensaje `failed`: «El número no tiene WhatsApp»",
                "Número sin WhatsApp o lada incorrecta",
                "Verificar número; otro país con `+código`"
              ],
              [
                "`429`",
                "Límite diario alcanzado",
                "Esperar o subir el límite"
              ],
              [
                "Todo `queued` y nada sale",
                "Sesión caída o cola atorada",
                "Ver estado de la sesión; reiniciar"
              ],
              [
                "Se pierden todas las sesiones tras un deploy de WAHA",
                "Sin volumen en `/app/.sessions`",
                "Montar volumen persistente"
              ],
              [
                "`delivered/read` nunca aparecen",
                "Falta `WAHA_WEBHOOK_BASE_URL` o el webhook no es alcanzable",
                "Configurar URL pública; revisar firma HMAC (401 en tu receptor)"
              ],
              [
                "Webhook responde 401",
                "`rawBody` no activo, secreto distinto o nombre de sesión distinto",
                "Activar `rawBody`; mismo `WAHA_WEBHOOK_SECRET` al crear la sesión y al verificar"
              ],
              [
                "Número bloqueado por WhatsApp",
                "Envíos masivos o sin pausa",
                "Respetar cola serial, pausas 2–5 s, `check-exists`, límites; no enviar spam"
              ]
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "waha",
    "title": "Implementar WAHA directo",
    "intro": [
      {
        "t": "p",
        "text": "Paso a paso para que **otro proyecto** (NestJS + TypeORM + Angular, igual que Pollux) hable **directo con WAHA**: cómo funciona la autenticación de WAHA, cómo levantarlo, y el módulo completo de backend y frontend para que cada cliente conecte **su propio número** con su QR."
      }
    ],
    "sections": [
      {
        "id": "waha-1",
        "title": "Cómo se autentica todo (las 4 llaves)",
        "blocks": [
          {
            "t": "p",
            "text": "Con WAHA directo hay **cuatro mecanismos distintos**. Confundirlos es el error más común."
          },
          {
            "t": "table",
            "head": [
              "#",
              "Qué protege",
              "Quién lo manda",
              "Dónde se configura",
              "Cómo se ve"
            ],
            "rows": [
              [
                "1",
                "**API REST de WAHA** (crear sesiones, enviar mensajes)",
                "Tu **backend** → WAHA",
                "`WAHA_API_KEY` en el servicio WAHA",
                "Header `X-Api-Key: <llave>`"
              ],
              [
                "2",
                "**Dashboard** de WAHA (panel web)",
                "Una persona en el navegador",
                "`WAHA_DASHBOARD_USERNAME` / `WAHA_DASHBOARD_PASSWORD`",
                "Login del panel"
              ],
              [
                "3",
                "**Swagger** de WAHA (documentación interactiva)",
                "Una persona en el navegador",
                "`WHATSAPP_SWAGGER_USERNAME` / `WHATSAPP_SWAGGER_PASSWORD`",
                "Login básico del Swagger"
              ],
              [
                "4",
                "**Webhook** WAHA → tu backend",
                "**WAHA** → tu backend",
                "`hmac.key` dentro de la config de cada sesión",
                "Header `X-Webhook-Hmac`"
              ]
            ]
          },
          {
            "t": "p",
            "text": "Y aparte, la **vinculación del teléfono** (no es una llave): el cliente escanea el QR (o usa el código por número) y WAHA queda ligado a ese WhatsApp."
          },
          {
            "t": "h3",
            "text": "1.1 La API key (la que más importa)"
          },
          {
            "t": "ul",
            "items": [
              {
                "text": "Es **una sola llave para todo el servidor**: quien la tenga puede crear, listar, reiniciar, borrar y enviar con **cualquier** sesión.",
                "children": []
              },
              {
                "text": "Se manda **solo desde el backend** en cada petición:",
                "children": []
              }
            ]
          },
          {
            "t": "code",
            "lang": "bash",
            "code": "curl https://tu-waha.up.railway.app/api/sessions -H \"X-Api-Key: TU_LLAVE\""
          },
          {
            "t": "ul",
            "items": [
              {
                "text": "Sin llave o con llave incorrecta WAHA responde **401**.",
                "children": []
              },
              {
                "text": "Genera una llave larga y aleatoria:",
                "children": []
              }
            ]
          },
          {
            "t": "code",
            "lang": "bash",
            "code": "openssl rand -hex 32\n# o, con Node:\nnode -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\""
          },
          {
            "t": "ul",
            "items": [
              {
                "text": "WAHA también admite guardar la llave en el servidor como **hash** (`WAHA_API_KEY=sha512:<hash>`); tu backend sigue mandando la llave **en claro**. Verifica el formato exacto en la documentación de seguridad de tu versión de WAHA.",
                "children": []
              },
              {
                "text": "**Nunca** la pongas en el frontend, en el repositorio, en logs ni en mensajes de error.",
                "children": []
              },
              {
                "text": "Rotarla: cambia `WAHA_API_KEY` en WAHA y en el backend a la vez, y reinicia ambos. Las sesiones (teléfonos vinculados) **no se pierden**.",
                "children": []
              }
            ]
          },
          {
            "t": "h3",
            "text": "1.2 Dashboard y Swagger"
          },
          {
            "t": "p",
            "text": "Son para humanos (soporte/desarrollo). Ponles usuario y contraseña **distintos** a la API key. En Swagger, el botón **Authorize** pide la API key para probar los endpoints. Si WAHA es público, considera restringir el dashboard por IP o dejarlo detrás de una VPN."
          },
          {
            "t": "h3",
            "text": "1.3 El webhook (WAHA → tu backend)"
          },
          {
            "t": "p",
            "text": "Aquí los papeles se invierten: WAHA llama a **tu** backend, y tu backend no puede confiar en quien llame. Por eso cada sesión lleva una **llave HMAC propia** y WAHA firma el cuerpo de cada evento. Tu receptor recalcula la firma; si no coincide, responde **401**. Detalle en la sección 6."
          },
          {
            "t": "h3",
            "text": "1.4 Dónde poner WAHA en la red"
          },
          {
            "t": "ul",
            "items": [
              {
                "text": "Lo ideal: WAHA **sin exposición pública**, accesible solo por la red interna (misma red de Docker / red privada de Railway). Tu backend lo llama por URL interna (`http://waha:3000`).",
                "children": []
              },
              {
                "text": "Si debe ser público (Railway con dominio), la API key es lo único que lo protege: llave larga, HTTPS obligatorio, y dashboard/Swagger con contraseña.",
                "children": []
              },
              {
                "text": "El **webhook sí necesita** que WAHA pueda llegar a tu backend (URL pública o red interna). En desarrollo local, WAHA en Docker no ve `localhost` de tu PC: usa un túnel (ngrok, cloudflared) o `host.docker.internal`.",
                "children": []
              }
            ]
          }
        ]
      },
      {
        "id": "waha-2",
        "title": "Levantar tu servidor WAHA",
        "blocks": [
          {
            "t": "h3",
            "text": "2.1 Docker Compose (local o VPS)"
          },
          {
            "t": "code",
            "lang": "yaml",
            "code": "services:\n  waha:\n    image: devlikeapro/waha:latest\n    restart: always\n    ports:\n      - '3000:3000'\n    environment:\n      WAHA_API_KEY: ${WAHA_API_KEY}\n      WAHA_DASHBOARD_USERNAME: admin\n      WAHA_DASHBOARD_PASSWORD: ${WAHA_DASHBOARD_PASSWORD}\n      WHATSAPP_SWAGGER_USERNAME: admin\n      WHATSAPP_SWAGGER_PASSWORD: ${WAHA_SWAGGER_PASSWORD}\n      WHATSAPP_DEFAULT_ENGINE: NOWEB\n      WHATSAPP_RESTART_ALL_SESSIONS: 'True'\n    volumes:\n      - ./waha-sessions:/app/.sessions"
          },
          {
            "t": "p",
            "text": "Los nombres de variables pueden cambiar entre versiones: verifícalos contra la versión instalada."
          },
          {
            "t": "h3",
            "text": "2.2 Railway"
          },
          {
            "t": "ol",
            "items": [
              {
                "text": "Nuevo servicio desde la imagen `devlikeapro/waha:latest`.",
                "children": []
              },
              {
                "text": "Variables: las mismas de arriba.",
                "children": []
              },
              {
                "text": "**Volumen persistente** montado en `/app/.sessions` (sin esto, cada redeploy borra los QR de todos los clientes).",
                "children": []
              },
              {
                "text": "Dominio público solo si tu backend no está en la misma red privada.",
                "children": []
              }
            ]
          },
          {
            "t": "h3",
            "text": "2.3 Qué versión"
          },
          {
            "t": "ul",
            "items": [
              {
                "text": "**2026.6.1 o posterior**: sesiones ilimitadas y multimedia gratis. Es lo que asume esta guía (una sesión por cliente).",
                "children": []
              },
              {
                "text": "**Anteriores** (Core): solo existe la sesión `default` → solo un cliente.",
                "children": []
              },
              {
                "text": "Motor `NOWEB`: no abre Chromium por sesión; mucho más ligero con muchos clientes.",
                "children": []
              }
            ]
          },
          {
            "t": "h3",
            "text": "2.4 Verificar que la autenticación funciona"
          },
          {
            "t": "code",
            "lang": "bash",
            "code": "WAHA=https://tu-waha.up.railway.app\nKEY=TU_LLAVE\n\ncurl -i $WAHA/api/server/version                      # esperado: 401\ncurl -i $WAHA/api/server/version -H \"X-Api-Key: $KEY\" # esperado: 200 con la versión\ncurl -s $WAHA/api/sessions -H \"X-Api-Key: $KEY\"       # lista de sesiones ([] si es nuevo)"
          },
          {
            "t": "p",
            "text": "Si con la llave sigue dando 401: la variable `WAHA_API_KEY` del servicio no coincide, el servicio no se reinició tras cambiarla, o hay un proxy que quita el header `X-Api-Key`."
          }
        ]
      },
      {
        "id": "waha-3",
        "title": "Diseño del módulo en el otro proyecto",
        "blocks": [
          {
            "t": "p",
            "text": "Cambia solo un concepto respecto a Pollux: la «organización» (`tenant_id`) pasa a ser **el dueño de la sesión** en tu proyecto. En el código de abajo se llama `owner_id`: puede ser el id del cliente, empresa o cuenta. Una sesión de WhatsApp por `owner_id`."
          },
          {
            "t": "code",
            "lang": "",
            "code": "Front ─► Backend del otro proyecto ─► WAHA ─► WhatsApp\n          │  (auth propia: JWT/sesión)   ▲\n          │  owner_id sale del usuario   │ webhook firmado (HMAC)\n          ▼                              │\n        BD: whatsapp_sessions / whatsapp_messages"
          },
          {
            "t": "p",
            "text": "Reglas de oro:"
          },
          {
            "t": "ol",
            "items": [
              {
                "text": "El nombre de sesión **se calcula en el servidor** (`miapp_<owner_id sin guiones>`). El front nunca lo manda.",
                "children": []
              },
              {
                "text": "`owner_id` sale del usuario autenticado, **nunca** del body ni de la URL.",
                "children": []
              },
              {
                "text": "Toda consulta filtra por `owner_id`.",
                "children": []
              },
              {
                "text": "La API key vive solo en variables de entorno del backend.",
                "children": []
              }
            ]
          },
          {
            "t": "p",
            "text": "Estructura de archivos:"
          },
          {
            "t": "code",
            "lang": "",
            "code": "src/api/whatsapp/\n├── dto/whatsapp.dto.ts\n├── services/\n│   ├── waha-client.ts              (de «Modo B», sección 3.6)\n│   ├── whatsapp-session.service.ts\n│   ├── whatsapp-message.service.ts\n│   └── whatsapp-webhook.service.ts\n├── utils/whatsapp.util.ts\n├── whatsapp.constants.ts\n├── whatsapp.controller.ts\n├── whatsapp-webhook.controller.ts\n└── whatsapp.module.ts\nsrc/entities/whatsapp/\n├── whatsapp-session.entity.ts\n└── whatsapp-message.entity.ts"
          }
        ]
      },
      {
        "id": "waha-4",
        "title": "Backend — paso a paso",
        "blocks": [
          {
            "t": "h3",
            "text": "Paso 1. Variables de entorno"
          },
          {
            "t": "code",
            "lang": "env",
            "code": "WAHA_BASE_URL=http://waha:3000\nWAHA_API_KEY=<llave larga>\nWAHA_WEBHOOK_BASE_URL=https://api.tuproyecto.com\nWAHA_WEBHOOK_SECRET=<otro secreto largo, distinto de la API key>\nWHATSAPP_DEFAULT_COUNTRY_CODE=52\nWHATSAPP_DAILY_LIMIT=1000\nWHATSAPP_MIN_DELAY_MS=2000\nWHATSAPP_MAX_DELAY_MS=5000"
          },
          {
            "t": "p",
            "text": "`WAHA_WEBHOOK_SECRET` es el secreto maestro del que se **deriva** la llave HMAC de cada sesión. No lo reutilices como API key."
          },
          {
            "t": "h3",
            "text": "Paso 2. Activar el cuerpo crudo (rawBody)"
          },
          {
            "t": "p",
            "text": "El HMAC se calcula sobre el cuerpo **exacto** que mandó WAHA. En `main.ts`:"
          },
          {
            "t": "code",
            "lang": "typescript",
            "code": "const app = await NestFactory.create(AppModule, { rawBody: true });\napp.setGlobalPrefix('api');"
          },
          {
            "t": "p",
            "text": "Si no activas `rawBody`, todas las firmas fallarán (401)."
          },
          {
            "t": "h3",
            "text": "Paso 3. Tablas y entidades"
          },
          {
            "t": "p",
            "text": "Migración (MySQL; adapta tipos si usas PostgreSQL):"
          },
          {
            "t": "code",
            "lang": "sql",
            "code": "CREATE TABLE whatsapp_sessions (\n  id varchar(36) NOT NULL,\n  owner_id varchar(36) NOT NULL,\n  session_name varchar(80) NOT NULL,\n  status varchar(32) NOT NULL DEFAULT 'STOPPED',\n  phone_number varchar(32) NULL,\n  push_name varchar(255) NULL,\n  connected_at timestamp NULL,\n  last_status_at timestamp NULL,\n  last_error varchar(500) NULL,\n  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,\n  updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,\n  PRIMARY KEY (id),\n  UNIQUE KEY uq_whatsapp_sessions_owner (owner_id),\n  UNIQUE KEY uq_whatsapp_sessions_name (session_name)\n);\n\nCREATE TABLE whatsapp_messages (\n  id varchar(36) NOT NULL,\n  owner_id varchar(36) NOT NULL,\n  session_name varchar(80) NOT NULL,\n  to_phone varchar(32) NOT NULL,\n  chat_id varchar(64) NULL,\n  type varchar(16) NOT NULL DEFAULT 'text',\n  body text NULL,\n  file_name varchar(255) NULL,\n  file_mimetype varchar(120) NULL,\n  status varchar(16) NOT NULL DEFAULT 'queued',\n  error_message varchar(500) NULL,\n  waha_message_id varchar(190) NULL,\n  reference_type varchar(60) NULL,\n  reference_id varchar(36) NULL,\n  sent_at timestamp NULL,\n  delivered_at timestamp NULL,\n  read_at timestamp NULL,\n  created_by varchar(36) NOT NULL,\n  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,\n  updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,\n  PRIMARY KEY (id),\n  KEY idx_whatsapp_messages_owner_created (owner_id, created_at),\n  KEY idx_whatsapp_messages_owner_status (owner_id, status),\n  KEY idx_whatsapp_messages_waha_id (session_name, waha_message_id),\n  KEY idx_whatsapp_messages_reference (owner_id, reference_type, reference_id)\n);"
          },
          {
            "t": "p",
            "text": "Entidades (TypeORM):"
          },
          {
            "t": "code",
            "lang": "typescript",
            "code": "// entities/whatsapp/whatsapp-session.entity.ts\n@Entity('whatsapp_sessions')\n@Index('uq_whatsapp_sessions_owner', ['owner_id'], { unique: true })\n@Index('uq_whatsapp_sessions_name', ['session_name'], { unique: true })\nexport class WhatsappSession {\n  @PrimaryGeneratedColumn('uuid') id: string;\n  @Column({ type: 'varchar', length: 36 }) owner_id: string;\n  @Column({ type: 'varchar', length: 80 }) session_name: string;\n  @Column({ type: 'varchar', length: 32, default: 'STOPPED' }) status: string;\n  @Column({ type: 'varchar', length: 32, nullable: true }) phone_number: string | null;\n  @Column({ type: 'varchar', length: 255, nullable: true }) push_name: string | null;\n  @Column({ type: 'timestamp', nullable: true }) connected_at: Date | null;\n  @Column({ type: 'timestamp', nullable: true }) last_status_at: Date | null;\n  @Column({ type: 'varchar', length: 500, nullable: true }) last_error: string | null;\n  @CreateDateColumn({ type: 'timestamp' }) created_at: Date;\n  @UpdateDateColumn({ type: 'timestamp' }) updated_at: Date;\n}\n\n// entities/whatsapp/whatsapp-message.entity.ts\n@Entity('whatsapp_messages')\n@Index('idx_whatsapp_messages_owner_created', ['owner_id', 'created_at'])\n@Index('idx_whatsapp_messages_waha_id', ['session_name', 'waha_message_id'])\nexport class WhatsappMessage {\n  @PrimaryGeneratedColumn('uuid') id: string;\n  @Column({ type: 'varchar', length: 36 }) owner_id: string;\n  @Column({ type: 'varchar', length: 80 }) session_name: string;\n  @Column({ type: 'varchar', length: 32 }) to_phone: string;\n  @Column({ type: 'varchar', length: 64, nullable: true }) chat_id: string | null;\n  @Column({ type: 'varchar', length: 16, default: 'text' }) type: string;\n  @Column({ type: 'text', nullable: true }) body: string | null;\n  @Column({ type: 'varchar', length: 255, nullable: true }) file_name: string | null;\n  @Column({ type: 'varchar', length: 120, nullable: true }) file_mimetype: string | null;\n  @Column({ type: 'varchar', length: 16, default: 'queued' }) status: string;\n  @Column({ type: 'varchar', length: 500, nullable: true }) error_message: string | null;\n  @Column({ type: 'varchar', length: 190, nullable: true }) waha_message_id: string | null;\n  @Column({ type: 'varchar', length: 60, nullable: true }) reference_type: string | null;\n  @Column({ type: 'varchar', length: 36, nullable: true }) reference_id: string | null;\n  @Column({ type: 'timestamp', nullable: true }) sent_at: Date | null;\n  @Column({ type: 'timestamp', nullable: true }) delivered_at: Date | null;\n  @Column({ type: 'timestamp', nullable: true }) read_at: Date | null;\n  @Column({ type: 'varchar', length: 36 }) created_by: string;\n  @CreateDateColumn({ type: 'timestamp' }) created_at: Date;\n  @UpdateDateColumn({ type: 'timestamp' }) updated_at: Date;\n}"
          },
          {
            "t": "h3",
            "text": "Paso 4. Cliente WAHA"
          },
          {
            "t": "p",
            "text": "Copia **tal cual** el cliente de la pestaña «Modo B — WAHA directo», sección 3.6 (`waha.client.ts`, objeto `waha` y clase `WahaError`). Es el único lugar que conoce `WAHA_BASE_URL` y `WAHA_API_KEY`:"
          },
          {
            "t": "ul",
            "items": [
              {
                "text": "Manda `X-Api-Key` en **todas** las peticiones.",
                "children": []
              },
              {
                "text": "Timeout de 30 s.",
                "children": []
              },
              {
                "text": "Convierte fallos de red en `WahaError(503)`.",
                "children": []
              },
              {
                "text": "Nunca incluye URL ni llave en el mensaje del error.",
                "children": []
              }
            ]
          },
          {
            "t": "h3",
            "text": "Paso 5. Constantes y utilidades"
          },
          {
            "t": "code",
            "lang": "typescript",
            "code": "// whatsapp.constants.ts\nexport const WAHA_WEBHOOK_PATH = '/api/webhooks/whatsapp/waha';\nexport const WAHA_WEBHOOK_EVENTS = ['session.status', 'message.ack'];\nexport const WHATSAPP_TEXT_MAX_LENGTH = 4096;\n\nexport type WhatsappConnectionState =\n  | 'not_configured' | 'disconnected' | 'starting' | 'waiting_qr' | 'connected' | 'failed';\nexport type WhatsappMessageStatus = 'queued' | 'sending' | 'sent' | 'delivered' | 'read' | 'failed';"
          },
          {
            "t": "code",
            "lang": "typescript",
            "code": "// utils/whatsapp.util.ts\nimport * as crypto from 'crypto';\n\nexport const buildSessionName = (ownerId: string) => `miapp_${ownerId.replace(/[^a-zA-Z0-9]/g, '')}`;\n\n// normalizePhone, deriveWebhookKey y verifyHmac: copiarlos de «Modo B» (secciones 3.7 y 3.8)\n\nexport function toConnectionState(status?: string | null): WhatsappConnectionState {\n  switch (status) {\n    case 'WORKING': return 'connected';\n    case 'SCAN_QR_CODE': return 'waiting_qr';\n    case 'STARTING': return 'starting';\n    case 'FAILED': return 'failed';\n    case 'STOPPED': return 'disconnected';\n    default: return 'not_configured';\n  }\n}\n\nexport function phoneFromWahaId(id?: string | null): string | null {\n  return id ? id.split('@')[0]?.split(':')[0] || null : null;\n}\n\nexport function ackToMessageStatus(ack?: number | string | null, ackName?: string | null): WhatsappMessageStatus | null {\n  const name = String(ackName ?? '').toUpperCase();\n  if (name === 'ERROR') return 'failed';\n  if (name === 'PENDING') return null;\n  if (name === 'SERVER') return 'sent';\n  if (name === 'DEVICE') return 'delivered';\n  if (name === 'READ' || name === 'PLAYED') return 'read';\n  const value = Number(ack);\n  if (!Number.isFinite(value)) return null;\n  if (value < 0) return 'failed';\n  if (value === 1) return 'sent';\n  if (value === 2) return 'delivered';\n  if (value >= 3) return 'read';\n  return null;\n}\n\nconst RANK: Record<WhatsappMessageStatus, number> = { queued: 0, sending: 1, sent: 2, delivered: 3, read: 4, failed: 5 };\n\n/** Un ack tardío nunca regresa un mensaje a un estado anterior. */\nexport function shouldAdvanceStatus(current: WhatsappMessageStatus, next: WhatsappMessageStatus): boolean {\n  if (current === 'read') return false;\n  if (next === 'failed') return current === 'queued' || current === 'sending' || current === 'sent';\n  if (current === 'failed') return false;\n  return RANK[next] > RANK[current];\n}\n\n/** El id del mensaje cambia de forma según el motor de WAHA. */\nexport function extractWahaMessageId(payload: any): string | null {\n  const id = payload?.id;\n  if (typeof id === 'string' && id) return id;\n  const nested = id?._serialized ?? id?.id ?? payload?._data?.id?._serialized;\n  return typeof nested === 'string' && nested ? nested : null;\n}\n\n/** Solo URLs https públicas: evita que WAHA descargue recursos de la red interna. */\nexport function isSafePublicHttpsUrl(value: string): boolean {\n  let url: URL;\n  try { url = new URL(value); } catch { return false; }\n  if (url.protocol !== 'https:') return false;\n  const host = url.hostname.toLowerCase();\n  return (\n    host.includes('.') && host !== 'localhost' && !host.endsWith('.local') && !host.endsWith('.internal') &&\n    !/^\\d{1,3}(\\.\\d{1,3}){3}$/.test(host) && !host.startsWith('[')\n  );\n}\n\nexport const randomDelay = (min: number, max: number) => Math.floor(min + Math.random() * Math.max(0, max - min));"
          },
          {
            "t": "h3",
            "text": "Paso 6. DTOs"
          },
          {
            "t": "code",
            "lang": "typescript",
            "code": "// dto/whatsapp.dto.ts\nclass SendBaseDto {\n  @IsString() @IsNotEmpty() @MaxLength(32) phone: string;\n  @IsOptional() @IsString() @MaxLength(60) reference_type?: string;\n  @IsOptional() @IsString() @MaxLength(36) reference_id?: string;\n}\nexport class SendWhatsappTextDto extends SendBaseDto {\n  @IsString() @IsNotEmpty() @MaxLength(4096) text: string;\n}\nexport class SendWhatsappFileDto extends SendBaseDto {\n  @IsString() @IsNotEmpty() @MaxLength(2048) file_url: string;\n  @IsOptional() @IsString() @MaxLength(255) file_name?: string;\n  @IsOptional() @Matches(/^[\\w.+-]+\\/[\\w.+-]+$/) mimetype?: string;\n  @IsOptional() @IsString() @MaxLength(4096) caption?: string;\n}\nexport class WhatsappPairingCodeDto {\n  @IsString() @IsNotEmpty() @MaxLength(32) phone: string;\n}\nexport class QueryWhatsappMessagesDto {\n  @IsOptional() @Type(() => Number) @IsInt() @Min(1) page?: number = 1;\n  @IsOptional() @Type(() => Number) @IsInt() @Min(1) @Max(100) limit?: number = 20;\n  @IsOptional() @IsIn(['queued', 'sending', 'sent', 'delivered', 'read', 'failed']) status?: string;\n  @IsOptional() @IsString() reference_type?: string;\n  @IsOptional() @IsString() reference_id?: string;\n}"
          },
          {
            "t": "h3",
            "text": "Paso 7. Servicio de sesión (conexión y QR)"
          },
          {
            "t": "code",
            "lang": "typescript",
            "code": "// services/whatsapp-session.service.ts\n@Injectable()\nexport class WhatsappSessionService {\n  private readonly logger = new Logger(WhatsappSessionService.name);\n\n  constructor(@InjectRepository(WhatsappSession) private readonly repo: Repository<WhatsappSession>) {}\n\n  /** Estado de la conexión. Sincroniza con WAHA; si WAHA no responde, devuelve el último estado guardado. */\n  async getStatus(ownerId: string) {\n    const row = await this.repo.findOne({ where: { owner_id: ownerId } });\n    if (!row) return this.emptyView();\n    try {\n      const live = await this.fetch(row.session_name);\n      if (live) await this.apply(row, live);\n      else await this.markStopped(row);\n      return this.toView(row, true);\n    } catch {\n      return this.toView(row, false);\n    }\n  }\n\n  /** Crea (si no existe) e inicia la sesión. Idempotente. */\n  async connect(ownerId: string) {\n    try {\n      const row = await this.ensureRow(ownerId);\n      const config = this.sessionConfig(row);\n      let live = await this.fetch(row.session_name);\n      if (!live) {\n        live = await waha.createSession(row.session_name, config);\n      } else if (live.status === 'STOPPED' || live.status === 'FAILED') {\n        // Reaplica webhook y metadatos antes de arrancar. Con la sesión activa NO se hace: WAHA la reiniciaría.\n        await waha.updateSession(row.session_name, config).catch(() => undefined);\n        await waha.start(row.session_name);\n        live = (await this.fetch(row.session_name)) ?? live;\n      }\n      await this.apply(row, live);\n      return this.toView(row, true);\n    } catch (error) {\n      throw toHttpException(error);\n    }\n  }\n\n  /** QR vigente. El front lo consulta cada ~3 s hasta quedar conectado. */\n  async qr(ownerId: string) {\n    const row = await this.requireRow(ownerId);\n    try {\n      const live = await this.fetch(row.session_name);\n      if (!live) {\n        await this.markStopped(row);\n        return { ...this.toView(row, true), qr_data_url: null };\n      }\n      await this.apply(row, live);\n      let qr_data_url: string | null = null;\n      if (live.status === 'SCAN_QR_CODE') {\n        const qr = await waha.qr(row.session_name);\n        qr_data_url = `data:${qr.mimetype};base64,${qr.data}`;\n      }\n      return { ...this.toView(row, true), qr_data_url };\n    } catch (error) {\n      throw toHttpException(error);\n    }\n  }\n\n  /** Alternativa sin cámara: código de 8 caracteres para «Vincular con número de teléfono». */\n  async pairingCode(ownerId: string, phone: string) {\n    const row = await this.requireRow(ownerId);\n    const normalized = normalizePhone(phone);\n    if (!normalized) throw new BadRequestException('Indica un número de teléfono válido.');\n    try {\n      const live = await this.fetch(row.session_name);\n      if (live?.status !== 'SCAN_QR_CODE') {\n        throw new BadRequestException('Primero inicia la conexión y espera a que aparezca el código QR.');\n      }\n      return { code: await waha.pairingCode(row.session_name, normalized) };\n    } catch (error) {\n      throw toHttpException(error);\n    }\n  }\n\n  async restart(ownerId: string) {\n    const row = await this.requireRow(ownerId);\n    try {\n      await waha.restart(row.session_name);\n      const live = await this.fetch(row.session_name);\n      if (live) await this.apply(row, live);\n      return this.toView(row, true);\n    } catch (error) {\n      throw toHttpException(error);\n    }\n  }\n\n  /** Desvincula el teléfono; conserva la sesión para volver a escanear. */\n  async logout(ownerId: string) {\n    const row = await this.requireRow(ownerId);\n    try {\n      await waha.logout(row.session_name).catch((e) => {\n        if (!(e instanceof WahaError && (e.isNotFound || e.isSessionUnavailable))) throw e;\n      });\n    } catch (error) {\n      throw toHttpException(error);\n    }\n    await this.markStopped(row);\n    return this.toView(row, true);\n  }\n\n  /** Borra la sesión en WAHA y en BD. */\n  async remove(ownerId: string) {\n    const row = await this.repo.findOne({ where: { owner_id: ownerId } });\n    if (!row) return;\n    try {\n      await waha.logout(row.session_name).catch(() => undefined);\n      await waha.delete(row.session_name).catch((e) => {\n        if (!(e instanceof WahaError && e.isNotFound)) throw e;\n      });\n    } catch (error) {\n      throw toHttpException(error);\n    }\n    await this.repo.remove(row);\n  }\n\n  async requireConnected(ownerId: string): Promise<WhatsappSession> {\n    const row = await this.repo.findOne({ where: { owner_id: ownerId } });\n    if (!row || row.status !== 'WORKING') {\n      throw new BadRequestException('WhatsApp no está conectado. Escanea el código QR en Configuración.');\n    }\n    return row;\n  }\n\n  findBySessionName(name: string) {\n    return this.repo.findOne({ where: { session_name: name } });\n  }\n\n  /** Estado recibido por webhook. Se confirma en WAHA: los reintentos llegan desordenados. */\n  async applyWebhookStatus(sessionName: string, status?: string, me?: { id?: string; pushName?: string } | null) {\n    if (!status) return;\n    const row = await this.findBySessionName(sessionName);\n    if (!row) return;\n    try {\n      const live = await this.fetch(sessionName);\n      if (live) return void (await this.apply(row, live));\n    } catch {\n      /* sin respuesta: se usa el estado del evento */\n    }\n    await this.apply(row, { name: sessionName, status, me });\n  }\n\n  async markUnavailable(sessionName: string, reason: string) {\n    await this.repo.update(\n      { session_name: sessionName },\n      { status: 'STOPPED', connected_at: null, last_error: reason.slice(0, 500) },\n    );\n  }\n\n  // ---------------------------------------------------------------------------\n\n  private async ensureRow(ownerId: string): Promise<WhatsappSession> {\n    const existing = await this.repo.findOne({ where: { owner_id: ownerId } });\n    if (existing) return existing;\n    try {\n      return await this.repo.save(\n        this.repo.create({ owner_id: ownerId, session_name: buildSessionName(ownerId), status: 'STOPPED' }),\n      );\n    } catch (error) {\n      // Doble clic simultáneo: la otra petición ya creó el registro.\n      const created = await this.repo.findOne({ where: { owner_id: ownerId } });\n      if (created) return created;\n      throw error;\n    }\n  }\n\n  private async requireRow(ownerId: string) {\n    const row = await this.repo.findOne({ where: { owner_id: ownerId } });\n    if (!row) throw new BadRequestException('Primero conecta WhatsApp en Configuración.');\n    return row;\n  }\n\n  private async fetch(name: string) {\n    try {\n      return await waha.getSession(name);\n    } catch (error) {\n      if (error instanceof WahaError && error.isNotFound) return null;\n      throw error;\n    }\n  }\n\n  private async markStopped(row: WhatsappSession) {\n    row.status = 'STOPPED';\n    row.phone_number = null;\n    row.push_name = null;\n    row.connected_at = null;\n    row.last_status_at = new Date();\n    await this.repo.save(row);\n  }\n\n  private async apply(row: WhatsappSession, live: { status: string; me?: { id?: string; pushName?: string } | null }) {\n    const previous = row.status;\n    row.status = live.status;\n    row.last_status_at = new Date();\n    if (live.status === 'WORKING') {\n      row.phone_number = phoneFromWahaId(live.me?.id) ?? row.phone_number;\n      row.push_name = live.me?.pushName ?? row.push_name;\n      if (previous !== 'WORKING' || !row.connected_at) row.connected_at = new Date();\n      row.last_error = null;\n    } else {\n      row.connected_at = null;\n      if (live.status === 'SCAN_QR_CODE') {\n        row.phone_number = null;\n        row.push_name = null;\n      }\n      row.last_error = live.status === 'FAILED' ? 'La sesión de WhatsApp falló. Vuelve a conectar.' : null;\n    }\n    await this.repo.save(row);\n  }\n\n  /** Configuración de la sesión en WAHA: metadatos y webhook firmado con la llave propia de la sesión. */\n  private sessionConfig(row: WhatsappSession) {\n    const config: Record<string, unknown> = { metadata: { 'app.owner_id': row.owner_id } };\n    const baseUrl = (process.env.WAHA_WEBHOOK_BASE_URL ?? '').trim().replace(/\\/+$/, '');\n    const secret = (process.env.WAHA_WEBHOOK_SECRET ?? '').trim();\n    if (baseUrl && secret) {\n      config.webhooks = [\n        {\n          url: `${baseUrl}${WAHA_WEBHOOK_PATH}`,\n          events: WAHA_WEBHOOK_EVENTS,\n          hmac: { key: deriveWebhookKey(secret, row.session_name) },\n          retries: { policy: 'exponential', delaySeconds: 2, attempts: 6 },\n        },\n      ];\n    } else {\n      this.logger.warn('Sin WAHA_WEBHOOK_BASE_URL o WAHA_WEBHOOK_SECRET: no habrá estados ni confirmaciones.');\n    }\n    return config;\n  }\n\n  private emptyView() {\n    return { configured: false, service_available: true, state: 'not_configured' as WhatsappConnectionState,\n      status: null, phone_number: null, push_name: null, connected_at: null, last_status_at: null, last_error: null };\n  }\n\n  private toView(row: WhatsappSession, serviceAvailable: boolean) {\n    return {\n      configured: true,\n      service_available: serviceAvailable,\n      state: toConnectionState(row.status),\n      status: row.status,\n      phone_number: row.phone_number,\n      push_name: row.push_name,\n      connected_at: row.connected_at,\n      last_status_at: row.last_status_at,\n      last_error: row.last_error,\n    };\n  }\n}"
          },
          {
            "t": "p",
            "text": "Mapeo de errores (`toHttpException`), para que el cliente nunca vea URLs ni llaves:"
          },
          {
            "t": "code",
            "lang": "typescript",
            "code": "export function toHttpException(error: unknown): HttpException {\n  if (error instanceof HttpException) return error;\n  if (error instanceof WahaError) {\n    if (error.status === 503) return new ServiceUnavailableException(error.message);\n    if (error.isSessionUnavailable) {\n      return new BadRequestException('WhatsApp no está conectado. Escanea el código QR en Configuración.');\n    }\n  }\n  return new BadGatewayException('No se pudo comunicar con WhatsApp.');\n}"
          },
          {
            "t": "h3",
            "text": "Paso 8. Servicio de mensajes (cola anti-bloqueo)"
          },
          {
            "t": "code",
            "lang": "typescript",
            "code": "// services/whatsapp-message.service.ts\nconst RECOVERY_WINDOW_MS = 24 * 60 * 60 * 1000;\nconst STALE_SENDING_MS = 2 * 60 * 1000;\nconst sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));\n\n@Injectable()\nexport class WhatsappMessageService implements OnApplicationBootstrap {\n  private readonly logger = new Logger(WhatsappMessageService.name);\n  /** Cola serial por sesión: un mensaje a la vez, con pausa aleatoria entre ellos. */\n  private readonly chains = new Map<string, Promise<void>>();\n  /** Archivo pendiente de cada mensaje. Solo vive en memoria (no se guarda en BD). */\n  private readonly files = new Map<string, { url?: string; data?: string }>();\n\n  constructor(\n    @InjectRepository(WhatsappMessage) private readonly repo: Repository<WhatsappMessage>,\n    private readonly sessions: WhatsappSessionService,\n  ) {}\n\n  onApplicationBootstrap() {\n    setTimeout(() => this.recover().catch((e) => this.logger.warn(e?.message)), 5000);\n  }\n\n  sendText(ownerId: string, userId: string, dto: SendWhatsappTextDto) {\n    const text = dto.text.trim();\n    if (!text) throw new BadRequestException('El mensaje no puede estar vacío.');\n    return this.enqueue(ownerId, userId, { type: 'text', phone: dto.phone, body: text, ...refs(dto) });\n  }\n\n  sendFile(ownerId: string, userId: string, dto: SendWhatsappFileDto) {\n    if (!isSafePublicHttpsUrl(dto.file_url)) {\n      throw new BadRequestException('La URL del archivo debe ser https y pública.');\n    }\n    return this.enqueue(ownerId, userId, {\n      type: 'file', phone: dto.phone, body: dto.caption?.trim() || null, file: { url: dto.file_url },\n      file_name: dto.file_name ?? null, file_mimetype: dto.mimetype ?? null, ...refs(dto),\n    });\n  }\n\n  /** Para tus otros módulos: manda un archivo generado (PDF/foto) sin URL pública. */\n  sendBuffer(ownerId: string, userId: string, input: { phone: string; data: Buffer; file_name: string; mimetype: string; caption?: string }) {\n    return this.enqueue(ownerId, userId, {\n      type: 'file', phone: input.phone, body: input.caption ?? null, file: { data: input.data.toString('base64') },\n      file_name: input.file_name, file_mimetype: input.mimetype,\n    });\n  }\n\n  async list(ownerId: string, q: QueryWhatsappMessagesDto) {\n    const page = Math.max(1, Number(q.page) || 1);\n    const limit = Math.min(100, Math.max(1, Number(q.limit) || 20));\n    const qb = this.repo.createQueryBuilder('m').where('m.owner_id = :ownerId', { ownerId });\n    if (q.status) qb.andWhere('m.status = :status', { status: q.status });\n    if (q.reference_type) qb.andWhere('m.reference_type = :rt', { rt: q.reference_type });\n    if (q.reference_id) qb.andWhere('m.reference_id = :ri', { ri: q.reference_id });\n    qb.orderBy('m.created_at', 'DESC');\n    const total = await qb.getCount();\n    const data = await qb.skip((page - 1) * limit).take(limit).getMany();\n    const totalPages = Math.ceil(total / limit);\n    return { data, total, page, limit, totalPages, hasNext: page < totalPages, hasPrev: page > 1 };\n  }\n\n  async findOne(ownerId: string, id: string) {\n    const row = await this.repo.findOne({ where: { id, owner_id: ownerId } });\n    if (!row) throw new NotFoundException('Mensaje no encontrado.');\n    return row;\n  }\n\n  /** Confirmación de entrega/lectura que llega por webhook. */\n  async applyAck(sessionName: string, wahaMessageId: string, next: WhatsappMessageStatus) {\n    const row = await this.repo.findOne({ where: { session_name: sessionName, waha_message_id: wahaMessageId } });\n    if (!row || !shouldAdvanceStatus(row.status as WhatsappMessageStatus, next)) return;\n    const now = new Date();\n    row.status = next;\n    if (next === 'delivered' || next === 'read') row.delivered_at = row.delivered_at ?? now;\n    if (next === 'read') row.read_at = row.read_at ?? now;\n    if (next === 'failed') row.error_message = 'WhatsApp no pudo entregar el mensaje.';\n    await this.repo.save(row);\n  }\n\n  // ---------------------------------------------------------------------------\n\n  private async enqueue(ownerId: string, userId: string, input: EnqueueInput) {\n    const session = await this.sessions.requireConnected(ownerId);\n    const phone = normalizePhone(input.phone, process.env.WHATSAPP_DEFAULT_COUNTRY_CODE || '52');\n    if (!phone) throw new BadRequestException('El número de teléfono no es válido.');\n    await this.assertDailyLimit(ownerId);\n\n    const saved = await this.repo.save(\n      this.repo.create({\n        owner_id: ownerId, session_name: session.session_name, to_phone: phone, type: input.type,\n        body: input.body ?? null, file_name: input.file_name ?? null, file_mimetype: input.file_mimetype ?? null,\n        status: 'queued', reference_type: input.reference_type ?? null, reference_id: input.reference_id ?? null,\n        created_by: userId,\n      }),\n    );\n    if (input.file) this.files.set(saved.id, input.file);\n    this.schedule(session.session_name, saved.id);\n    return saved; // el controlador responde 202\n  }\n\n  private async assertDailyLimit(ownerId: string) {\n    const limit = Number(process.env.WHATSAPP_DAILY_LIMIT) || 1000;\n    const startOfDay = new Date();\n    startOfDay.setHours(0, 0, 0, 0);\n    const sentToday = await this.repo\n      .createQueryBuilder('m')\n      .where('m.owner_id = :ownerId', { ownerId })\n      .andWhere('m.created_at >= :since', { since: startOfDay })\n      .andWhere(\"m.status <> 'failed'\")\n      .getCount();\n    if (sentToday >= limit) {\n      throw new HttpException(`Alcanzaste el límite diario de ${limit} mensajes de WhatsApp.`, HttpStatus.TOO_MANY_REQUESTS);\n    }\n  }\n\n  private schedule(sessionName: string, messageId: string) {\n    const previous = this.chains.get(sessionName) ?? Promise.resolve();\n    const next = previous.then(async () => {\n      try {\n        await this.process(messageId);\n      } catch (e) {\n        this.logger.error(`Fallo inesperado enviando ${messageId}: ${(e as Error)?.message}`);\n      }\n      const min = Number(process.env.WHATSAPP_MIN_DELAY_MS) || 2000;\n      const max = Number(process.env.WHATSAPP_MAX_DELAY_MS) || 5000;\n      await sleep(randomDelay(min, max));\n    });\n    this.chains.set(sessionName, next);\n    void next.finally(() => {\n      if (this.chains.get(sessionName) === next) this.chains.delete(sessionName);\n    });\n  }\n\n  private async process(messageId: string) {\n    // Reclamo atómico: con varias instancias del backend, solo una envía el mensaje.\n    const claim = await this.repo.update({ id: messageId, status: 'queued' }, { status: 'sending' });\n    if (!claim.affected) return;\n    const message = await this.repo.findOne({ where: { id: messageId } });\n    if (!message) return;\n\n    const session = await this.sessions.findBySessionName(message.session_name);\n    if (!session || session.status !== 'WORKING') {\n      return this.fail(message, 'WhatsApp no está conectado. Escanea el código QR en Configuración.');\n    }\n\n    try {\n      // 1) ¿El número tiene WhatsApp?\n      const check = await waha.checkExists(message.session_name, message.to_phone);\n      if (!check?.numberExists) {\n        return this.fail(message, 'El número no tiene WhatsApp. Si es de otro país, escríbelo con su código (por ejemplo +1).');\n      }\n      const chatId = check.chatId || `${message.to_phone}@c.us`;\n\n      // 2) Enviar\n      let result: unknown;\n      if (message.type === 'file') {\n        const source = this.files.get(message.id);\n        if (!source) return this.fail(message, 'No se pudo recuperar el archivo. Vuelve a enviarlo.');\n        const file = { ...source, filename: message.file_name ?? undefined, mimetype: message.file_mimetype ?? undefined };\n        const asImage = (message.file_mimetype ?? '').startsWith('image/');\n        result = asImage\n          ? await waha.sendImage(message.session_name, chatId, file, message.body ?? undefined)\n          : await waha.sendFile(message.session_name, chatId, file, message.body ?? undefined);\n      } else {\n        await this.simulateTyping(message.session_name, chatId, message.body?.length ?? 0);\n        result = await waha.sendText(message.session_name, chatId, message.body ?? '');\n      }\n\n      await this.repo.update(\n        { id: message.id, status: 'sending' },\n        { status: 'sent', chat_id: chatId, waha_message_id: extractWahaMessageId(result), sent_at: new Date(), error_message: null },\n      );\n    } catch (error) {\n      if (error instanceof WahaError && (error.isNotFound || error.isSessionUnavailable)) {\n        await this.sessions.markUnavailable(message.session_name, 'WhatsApp no está conectado.');\n      }\n      await this.fail(message, 'No se pudo enviar el mensaje por WhatsApp.');\n    } finally {\n      this.files.delete(message.id);\n    }\n  }\n\n  /** Imita escritura humana. Es opcional: cualquier error se ignora. */\n  private async simulateTyping(session: string, chatId: string, length: number) {\n    try {\n      await waha.startTyping(session, chatId);\n      await sleep(Math.min(4000, 800 + length * 25));\n      await waha.stopTyping(session, chatId);\n    } catch {\n      /* sin efecto sobre el envío */\n    }\n  }\n\n  private fail(message: WhatsappMessage, reason: string) {\n    return this.repo.update({ id: message.id }, { status: 'failed', error_message: reason.slice(0, 500) });\n  }\n\n  /** Tras un reinicio del backend: cierra lo que quedó a medias y reencola lo pendiente. */\n  private async recover() {\n    await this.repo\n      .createQueryBuilder()\n      .update(WhatsappMessage)\n      .set({ status: 'failed', error_message: 'El envío se interrumpió. Verifica en WhatsApp antes de reintentar.' })\n      .where(\"status = 'sending'\")\n      .andWhere('updated_at < :before', { before: new Date(Date.now() - STALE_SENDING_MS) })\n      .execute();\n\n    const pending = await this.repo.find({\n      where: { status: 'queued', created_at: MoreThanOrEqual(new Date(Date.now() - RECOVERY_WINDOW_MS)) },\n      order: { created_at: 'ASC' },\n    });\n    for (const m of pending) {\n      if (m.type === 'file') {\n        await this.fail(m, 'El envío se interrumpió. Vuelve a enviar el archivo.'); // el archivo vivía en memoria\n        continue;\n      }\n      this.schedule(m.session_name, m.id);\n    }\n  }\n}\n\nconst refs = (dto: { reference_type?: string; reference_id?: string }) => ({\n  reference_type: dto.reference_type ?? null,\n  reference_id: dto.reference_id ?? null,\n});"
          },
          {
            "t": "p",
            "text": "`EnqueueInput` = `{ type: 'text' | 'file'; phone: string; body?: string | null; file?: { url?: string; data?: string }; file_name?: string | null; file_mimetype?: string | null; reference_type?: string | null; reference_id?: string | null }`."
          },
          {
            "t": "h3",
            "text": "Paso 9. Webhook (WAHA → tu backend)"
          },
          {
            "t": "code",
            "lang": "typescript",
            "code": "// services/whatsapp-webhook.service.ts\n@Injectable()\nexport class WhatsappWebhookService {\n  private readonly logger = new Logger(WhatsappWebhookService.name);\n\n  constructor(\n    private readonly sessions: WhatsappSessionService,\n    private readonly messages: WhatsappMessageService,\n  ) {}\n\n  async handle(body: any, rawBody: Buffer | string, hmac?: string, algorithm?: string) {\n    const sessionName = typeof body?.session === 'string' ? body.session : '';\n    const secret = (process.env.WAHA_WEBHOOK_SECRET ?? '').trim();\n    if (!sessionName || !secret) throw new UnauthorizedException('Firma inválida.');\n\n    // La llave se deriva del nombre de sesión: una firma válida de una sesión no sirve para otra.\n    const key = deriveWebhookKey(secret, sessionName);\n    if (!verifyHmac(rawBody, key, hmac, algorithm)) {\n      this.logger.warn(`Webhook con firma inválida para la sesión ${sessionName}`);\n      throw new UnauthorizedException('Firma inválida.');\n    }\n\n    switch (body.event) {\n      case 'session.status':\n        await this.sessions.applyWebhookStatus(sessionName, body.payload?.status, body.me);\n        break;\n      case 'message.ack': {\n        const p = body.payload ?? {};\n        if (typeof p.id !== 'string' || p.fromMe === false) break;\n        const next = ackToMessageStatus(p.ack, p.ackName);\n        if (next) await this.messages.applyAck(sessionName, p.id, next);\n        break;\n      }\n    }\n  }\n}"
          },
          {
            "t": "code",
            "lang": "typescript",
            "code": "// whatsapp-webhook.controller.ts — ruta pública: NO lleva tu guard de autenticación\n@ApiExcludeController()\n@Controller('webhooks/whatsapp')\nexport class WhatsappWebhookController {\n  constructor(private readonly service: WhatsappWebhookService) {}\n\n  @Post('waha')\n  @HttpCode(200)\n  async receive(\n    @Req() req: RawBodyRequest<Request>,\n    @Body() body: Record<string, unknown>,\n    @Headers('x-webhook-hmac') hmac?: string,\n    @Headers('x-webhook-hmac-algorithm') algorithm?: string,\n  ) {\n    await this.service.handle(body, req.rawBody ?? JSON.stringify(body), hmac, algorithm);\n    return { ok: true };\n  }\n}"
          },
          {
            "t": "p",
            "text": "La ruta del webhook debe **excluirse** de tu middleware/guard global de autenticación, de rate limiting agresivo y de CORS estricto: WAHA no manda tu JWT. Su seguridad es la firma HMAC."
          },
          {
            "t": "h3",
            "text": "Paso 10. Controlador (lo que consume tu frontend)"
          },
          {
            "t": "code",
            "lang": "typescript",
            "code": "// whatsapp.controller.ts\n@Controller('whatsapp')\n@UseGuards(MiAuthGuard) // tu guard de autenticación\nexport class WhatsappController {\n  constructor(private readonly sessions: WhatsappSessionService, private readonly messages: WhatsappMessageService) {}\n\n  // owner_id y user_id SIEMPRE salen del usuario autenticado\n  private owner(req: any) { return req.user.ownerId as string; }\n  private user(req: any) { return req.user.id as string; }\n\n  @Get('session')                    status(@Req() req) { return this.sessions.getStatus(this.owner(req)); }\n  @Post('session/connect') @HttpCode(200)   connect(@Req() req) { return this.sessions.connect(this.owner(req)); }\n  @Get('session/qr')                 qr(@Req() req) { return this.sessions.qr(this.owner(req)); }\n  @Post('session/pairing-code') @HttpCode(200) pairing(@Req() req, @Body() dto: WhatsappPairingCodeDto) { return this.sessions.pairingCode(this.owner(req), dto.phone); }\n  @Post('session/restart') @HttpCode(200)   restart(@Req() req) { return this.sessions.restart(this.owner(req)); }\n  @Post('session/logout') @HttpCode(200)    logout(@Req() req) { return this.sessions.logout(this.owner(req)); }\n  @Delete('session')                 async remove(@Req() req) { await this.sessions.remove(this.owner(req)); return { ok: true }; }\n\n  @Post('messages/text') @HttpCode(202)  sendText(@Req() req, @Body() dto: SendWhatsappTextDto) { return this.messages.sendText(this.owner(req), this.user(req), dto); }\n  @Post('messages/file') @HttpCode(202)  sendFile(@Req() req, @Body() dto: SendWhatsappFileDto) { return this.messages.sendFile(this.owner(req), this.user(req), dto); }\n  @Get('messages')                   list(@Req() req, @Query() q: QueryWhatsappMessagesDto) { return this.messages.list(this.owner(req), q); }\n  @Get('messages/:id')               one(@Req() req, @Param('id') id: string) { return this.messages.findOne(this.owner(req), id); }\n}"
          },
          {
            "t": "p",
            "text": "Agrega tus permisos por acción (leer / enviar / conectar / eliminar) con el mecanismo que use tu proyecto. Recomendado: solo administradores pueden conectar, reiniciar, desvincular y eliminar."
          },
          {
            "t": "h3",
            "text": "Paso 11. Módulo"
          },
          {
            "t": "code",
            "lang": "typescript",
            "code": "@Module({\n  imports: [TypeOrmModule.forFeature([WhatsappSession, WhatsappMessage]) /*, tu AuthModule */],\n  controllers: [WhatsappController, WhatsappWebhookController],\n  providers: [WhatsappSessionService, WhatsappMessageService, WhatsappWebhookService],\n  exports: [WhatsappMessageService, WhatsappSessionService], // para enviar desde otros módulos\n})\nexport class WhatsappModule {}"
          },
          {
            "t": "p",
            "text": "Registrar `WhatsappModule` en `AppModule` y las dos entidades en TypeORM."
          },
          {
            "t": "h3",
            "text": "Paso 12. Enviar desde otros módulos del backend"
          },
          {
            "t": "code",
            "lang": "typescript",
            "code": "@Injectable()\nexport class OrdersService {\n  constructor(private readonly whatsapp: WhatsappMessageService) {}\n\n  async notifyShipped(order: Order, userId: string) {\n    await this.whatsapp.sendText(order.owner_id, userId, {\n      phone: order.customer_phone,\n      text: `Hola ${order.customer_name}, tu pedido #${order.number} va en camino.`,\n      reference_type: 'order',\n      reference_id: order.id,\n    });\n  }\n\n  async sendInvoicePdf(order: Order, pdf: Buffer, userId: string) {\n    await this.whatsapp.sendBuffer(order.owner_id, userId, {\n      phone: order.customer_phone,\n      data: pdf,\n      file_name: `Factura-${order.number}.pdf`,\n      mimetype: 'application/pdf',\n      caption: 'Tu factura',\n    });\n  }\n}"
          },
          {
            "t": "p",
            "text": "Envuelve estas llamadas en `try/catch` si WhatsApp no debe bloquear el flujo principal (por ejemplo, un cobro): si el cliente no tiene WhatsApp conectado, `sendText` lanza 400."
          }
        ]
      },
      {
        "id": "waha-5",
        "title": "Frontend (Angular) — paso a paso",
        "blocks": [
          {
            "t": "p",
            "text": "El front **solo** llama a tu backend (`/whatsapp/...`). No conoce WAHA, ni su URL, ni su llave."
          },
          {
            "t": "h3",
            "text": "Paso 1. Modelo"
          },
          {
            "t": "code",
            "lang": "typescript",
            "code": "// whatsapp.model.ts\nexport type WhatsappConnectionState = 'not_configured' | 'disconnected' | 'starting' | 'waiting_qr' | 'connected' | 'failed';\nexport type WhatsappMessageStatus = 'queued' | 'sending' | 'sent' | 'delivered' | 'read' | 'failed';\n\nexport interface WhatsappSession {\n  configured: boolean; service_available: boolean; state: WhatsappConnectionState; status: string | null;\n  phone_number: string | null; push_name: string | null; connected_at: string | null;\n  last_status_at: string | null; last_error: string | null;\n}\nexport interface WhatsappQrResponse extends WhatsappSession { qr_data_url: string | null; }\nexport interface WhatsappMessage {\n  id: string; to_phone: string; type: 'text' | 'file'; body: string | null; file_name: string | null;\n  status: WhatsappMessageStatus; error_message: string | null; created_at: string;\n}\nexport interface WhatsappMessagesPage { data: WhatsappMessage[]; total: number; page: number; limit: number; totalPages: number; hasNext: boolean; hasPrev: boolean; }"
          },
          {
            "t": "h3",
            "text": "Paso 2. Servicio HTTP"
          },
          {
            "t": "code",
            "lang": "typescript",
            "code": "@Injectable({ providedIn: 'root' })\nexport class WhatsappService {\n  private readonly api = `${environment.api}/whatsapp`;\n  constructor(private http: HttpClient) {}\n\n  status() { return this.http.get<WhatsappSession>(`${this.api}/session`); }\n  connect() { return this.http.post<WhatsappSession>(`${this.api}/session/connect`, {}); }\n  qr() { return this.http.get<WhatsappQrResponse>(`${this.api}/session/qr`); }\n  pairingCode(phone: string) { return this.http.post<{ code: string }>(`${this.api}/session/pairing-code`, { phone }); }\n  restart() { return this.http.post<WhatsappSession>(`${this.api}/session/restart`, {}); }\n  logout() { return this.http.post<WhatsappSession>(`${this.api}/session/logout`, {}); }\n  remove() { return this.http.delete<{ ok: boolean }>(`${this.api}/session`); }\n  sendText(payload: { phone: string; text: string; reference_type?: string; reference_id?: string }) {\n    return this.http.post<WhatsappMessage>(`${this.api}/messages/text`, payload);\n  }\n  messages(page = 1, limit = 10) {\n    return this.http.get<WhatsappMessagesPage>(`${this.api}/messages`, { params: { page, limit } });\n  }\n}"
          },
          {
            "t": "h3",
            "text": "Paso 3. Pantalla de conexión (lógica clave)"
          },
          {
            "t": "p",
            "text": "La pantalla completa está en el frontend de Pollux: `settings/pages/whatsapp-settings/whatsapp-settings.component.{ts,html}`. Cópiala y cambia el servicio. La lógica que no debes perder:"
          },
          {
            "t": "code",
            "lang": "typescript",
            "code": "const POLL_INTERVAL_MS = 3000;\nconst MAX_POLL_ERRORS = 5;\n\nsession = signal<WhatsappSession | null>(null);\nqrDataUrl = signal<string | null>(null);\nprivate pollTimer: ReturnType<typeof setInterval> | null = null;\nprivate pollErrors = 0;\n\nngOnInit() { this.loadStatus(); }\nngOnDestroy() { this.stopPolling(); } // IMPORTANTE: si no, el sondeo sigue al salir de la pantalla\n\nconnect() {\n  this.whatsapp.connect().subscribe((s) => { this.applySession(s); this.refreshQr(); });\n}\n\n/** Cambia de estado y enciende/apaga el sondeo del QR. */\nprivate applySession(session: WhatsappSession) {\n  this.session.set(session);\n  if (session.state !== 'waiting_qr') this.qrDataUrl.set(null);\n  if (session.state === 'starting' || session.state === 'waiting_qr') this.startPolling();\n  else this.stopPolling();\n}\n\nprivate startPolling() {\n  if (this.pollTimer) return;\n  this.pollErrors = 0;\n  this.pollTimer = setInterval(() => this.refreshQr(), POLL_INTERVAL_MS);\n}\nprivate stopPolling() {\n  if (this.pollTimer) clearInterval(this.pollTimer);\n  this.pollTimer = null;\n}\n\nprivate refreshQr() {\n  this.whatsapp.qr().subscribe({\n    next: ({ qr_data_url, ...session }) => {\n      this.pollErrors = 0;\n      this.applySession(session);\n      this.qrDataUrl.set(session.state === 'waiting_qr' ? qr_data_url : null);\n    },\n    error: () => {\n      if (++this.pollErrors >= MAX_POLL_ERRORS) this.stopPolling(); // y avisar: «Pulsa Generar nuevo QR»\n    },\n  });\n}"
          },
          {
            "t": "p",
            "text": "Plantilla mínima del QR:"
          },
          {
            "t": "code",
            "lang": "html",
            "code": "<ng-container *ngIf=\"state === 'waiting_qr' || state === 'starting'\">\n  <ol>\n    <li>Abre WhatsApp en tu teléfono.</li>\n    <li>Ve a <strong>Ajustes → Dispositivos vinculados</strong>.</li>\n    <li>Toca <strong>Vincular un dispositivo</strong> y escanea este código.</li>\n  </ol>\n  <img *ngIf=\"qrDataUrl() as qr\" [src]=\"qr\" alt=\"Código QR de WhatsApp\" width=\"256\" height=\"256\" />\n  <p *ngIf=\"!qrDataUrl()\">Generando código QR…</p>\n  <p>El código se actualiza solo. Mantén esta pantalla abierta hasta que conecte.</p>\n</ng-container>"
          },
          {
            "t": "p",
            "text": "Detalles de UX que ya resolvió Pollux:"
          },
          {
            "t": "ul",
            "items": [
              {
                "text": "Estados en español: `not_configured` «Sin conectar», `waiting_qr` «Esperando que escanees el QR», `connected` «Conectado», `failed` «Falló la conexión».",
                "children": []
              },
              {
                "text": "Al pegar un teléfono, limpiarlo (quitar espacios, guiones, paréntesis; conservar un `+` inicial).",
                "children": []
              },
              {
                "text": "Texto de ayuda: «10 dígitos = México; para otro país escribe `+código`».",
                "children": []
              },
              {
                "text": "Mostrar `last_error` solo si `state !== 'connected'`.",
                "children": []
              },
              {
                "text": "Confirmar con `confirm(...)` antes de desvincular o eliminar.",
                "children": []
              },
              {
                "text": "Alternativa sin cámara: pedir el teléfono del WhatsApp a vincular → `pairingCode` → mostrar el código de 8 caracteres.",
                "children": []
              }
            ]
          },
          {
            "t": "h3",
            "text": "Paso 4. Botón de envío en tus pantallas"
          },
          {
            "t": "code",
            "lang": "typescript",
            "code": "sendWhatsapp(order: Order) {\n  this.whatsapp.sendText({\n    phone: order.customer_phone,\n    text: `Hola, tu pedido #${order.number} va en camino.`,\n    reference_type: 'order',\n    reference_id: order.id,\n  }).subscribe({\n    next: () => this.toast('En cola', 'El mensaje se enviará en unos segundos'), // responde 202: aún no salió\n    error: (err) => this.toast('Error', err?.error?.message ?? 'No se pudo enviar el mensaje'),\n  });\n}"
          },
          {
            "t": "p",
            "text": "El envío es asíncrono: el estado real (`sent`, `delivered`, `read`, `failed`) se ve consultando `messages` o `messages/:id`."
          }
        ]
      },
      {
        "id": "waha-6",
        "title": "Webhook: cómo se firma y se valida",
        "blocks": [
          {
            "t": "ol",
            "items": [
              {
                "text": "Al crear la sesión mandas a WAHA `config.webhooks[0].hmac.key = HMAC-SHA256(WAHA_WEBHOOK_SECRET, session_name)`.",
                "children": []
              },
              {
                "text": "Cada vez que ocurre un evento, WAHA hace `POST` a tu URL con el cuerpo JSON y los headers `X-Webhook-Hmac` (firma) y `X-Webhook-Hmac-Algorithm` (por defecto `sha512`).",
                "children": []
              },
              {
                "text": "Tu backend recalcula `HMAC-<algoritmo>(llave de esa sesión, cuerpo crudo)` y compara en tiempo constante.",
                "children": []
              },
              {
                "text": "Coincide → procesas. No coincide → **401**, sin procesar nada.",
                "children": []
              }
            ]
          },
          {
            "t": "p",
            "text": "Por qué es seguro:"
          },
          {
            "t": "ul",
            "items": [
              {
                "text": "Nadie puede inventar eventos sin la llave de esa sesión.",
                "children": []
              },
              {
                "text": "La llave no se guarda en BD: se deriva del secreto maestro y del nombre de sesión.",
                "children": []
              },
              {
                "text": "Una firma válida de la sesión A no sirve para la B.",
                "children": []
              },
              {
                "text": "El cliente se identifica por el **nombre de sesión**, nunca por datos del cuerpo.",
                "children": []
              }
            ]
          },
          {
            "t": "p",
            "text": "Si cambias `WAHA_WEBHOOK_SECRET`, las sesiones existentes siguen firmando con la llave vieja: vuelve a ejecutar `connect` (sesión `STOPPED`/`FAILED`) o actualiza su config para regenerar el webhook."
          },
          {
            "t": "p",
            "text": "Eventos que se usan:"
          },
          {
            "t": "table",
            "head": [
              "Evento",
              "Para qué",
              "Importante"
            ],
            "rows": [
              [
                "`session.status`",
                "Saber si conectó, se desconectó o falló",
                "Confirmar el estado real con `GET /api/sessions/{name}`; los reintentos llegan desordenados"
              ],
              [
                "`message.ack`",
                "Pasar el mensaje a `delivered` / `read`",
                "Ignorar si `payload.fromMe === false`; nunca retroceder estados"
              ]
            ]
          }
        ]
      },
      {
        "id": "waha-7",
        "title": "Prueba de punta a punta",
        "blocks": [
          {
            "t": "ol",
            "items": [
              {
                "text": "**WAHA vivo y llave correcta:** los `curl` de la sección 2.4.",
                "children": []
              },
              {
                "text": "**Backend arriba:** `GET /api/whatsapp/session` → `state: \"not_configured\"`.",
                "children": []
              },
              {
                "text": "**Conectar:** desde el front pulsa «Generar nuevo QR» → debe aparecer el QR en 2–5 s.",
                "children": []
              },
              {
                "text": "**Escanear** con un teléfono de prueba → estado «Conectado» y número visible.",
                "children": []
              },
              {
                "text": "**Enviar** un texto a otro número → `202` con `status: \"queued\"` → en segundos pasa a `sent`.",
                "children": []
              },
              {
                "text": "**Confirmaciones:** abre el chat en el otro teléfono → `delivered`; léelo → `read` (requiere webhook alcanzable).",
                "children": []
              },
              {
                "text": "**Fallos esperados:**",
                "children": [
                  "Número sin WhatsApp → `failed` «El número no tiene WhatsApp…».",
                  "Desvincular desde el teléfono → `failed`/`disconnected` por webhook.",
                  "Reiniciar el backend con mensajes `queued` → se reencolan.",
                  "Reiniciar WAHA → la sesión vuelve sola (`WHATSAPP_RESTART_ALL_SESSIONS=True`)."
                ]
              },
              {
                "text": "**Aislamiento:** con dos clientes distintos, cada uno ve **solo** su estado, QR e historial.",
                "children": []
              }
            ]
          }
        ]
      },
      {
        "id": "waha-8",
        "title": "Puesta en producción (checklist)",
        "blocks": [
          {
            "t": "ul",
            "items": [
              {
                "text": "[ ] WAHA 2026.6.1+ con motor `NOWEB`.",
                "children": []
              },
              {
                "text": "[ ] Volumen persistente en `/app/.sessions`.",
                "children": []
              },
              {
                "text": "[ ] `WAHA_API_KEY` larga y aleatoria; dashboard y Swagger con contraseñas distintas.",
                "children": []
              },
              {
                "text": "[ ] WAHA en red privada o, si es público, solo HTTPS.",
                "children": []
              },
              {
                "text": "[ ] `WAHA_API_KEY` y `WAHA_WEBHOOK_SECRET` solo en variables del backend; distintas entre sí.",
                "children": []
              },
              {
                "text": "[ ] `rawBody: true` en el backend.",
                "children": []
              },
              {
                "text": "[ ] Webhook alcanzable desde WAHA; ruta excluida del guard de autenticación.",
                "children": []
              },
              {
                "text": "[ ] `owner_id` siempre desde el usuario autenticado.",
                "children": []
              },
              {
                "text": "[ ] Permisos: solo administradores conectan/desvinculan/eliminan.",
                "children": []
              },
              {
                "text": "[ ] Límite diario y pausa 2–5 s activos.",
                "children": []
              },
              {
                "text": "[ ] Mensajes de error al usuario sin URLs, llaves ni respuestas crudas de WAHA.",
                "children": []
              },
              {
                "text": "[ ] Respaldo del volumen de sesiones (opcional pero recomendable).",
                "children": []
              },
              {
                "text": "[ ] Monitoreo: alerta si `GET /api/server/version` falla o si muchas sesiones pasan a `FAILED`.",
                "children": []
              }
            ]
          }
        ]
      },
      {
        "id": "waha-9",
        "title": "Buenas prácticas para no perder números",
        "blocks": [
          {
            "t": "ul",
            "items": [
              {
                "text": "Enviar solo a personas que esperan el mensaje (clientes, pedidos, recordatorios). Nada de envíos masivos ni de spam: WhatsApp bloquea números por reportes.",
                "children": []
              },
              {
                "text": "Mantener la cola serial y las pausas aleatorias. No «saltarse» la cola para enviar más rápido.",
                "children": []
              },
              {
                "text": "Verificar que el número tenga WhatsApp antes de enviar (ya incluido).",
                "children": []
              },
              {
                "text": "Variar el texto (nombre, folio, fecha) en lugar de mandar el mismo mensaje idéntico a cientos de personas.",
                "children": []
              },
              {
                "text": "Tener un teléfono físico dedicado y con WhatsApp abierto de vez en cuando; una sesión vinculada que no se usa puede cerrarse.",
                "children": []
              },
              {
                "text": "Aceptar que WhatsApp no es un canal garantizado: guardar siempre el historial y ofrecer un canal alterno (correo/SMS) para avisos críticos.",
                "children": []
              }
            ]
          }
        ]
      },
      {
        "id": "waha-10",
        "title": "Errores frecuentes con WAHA",
        "blocks": [
          {
            "t": "table",
            "head": [
              "Síntoma",
              "Causa",
              "Solución"
            ],
            "rows": [
              [
                "401 de WAHA en todo",
                "`X-Api-Key` ausente o distinta",
                "Revisar `WAHA_API_KEY` en ambos lados y reiniciar"
              ],
              [
                "422/409 al enviar",
                "Sesión no iniciada o sin vincular",
                "Reconectar; el backend la marca `STOPPED`"
              ],
              [
                "404 al consultar sesión",
                "La sesión no existe (WAHA reinstalado sin volumen)",
                "`connect` la recrea; el cliente vuelve a escanear"
              ],
              [
                "QR siempre `null`",
                "La sesión aún no está en `SCAN_QR_CODE`",
                "Esperar unos segundos; revisar el estado"
              ],
              [
                "QR no se renueva",
                "Se detuvo el sondeo del front",
                "«Generar nuevo QR»"
              ],
              [
                "Webhook responde 401",
                "`rawBody` apagado, secreto distinto o nombre de sesión distinto",
                "Activar `rawBody`; mismo `WAHA_WEBHOOK_SECRET`; regenerar config de la sesión"
              ],
              [
                "Nunca llegan `delivered`/`read`",
                "WAHA no alcanza tu backend",
                "URL pública/túnel; revisar logs de WAHA"
              ],
              [
                "Mensajes `queued` que no salen",
                "Sesión caída o proceso reiniciado",
                "Ver estado de la sesión; la recuperación al arrancar los reencola"
              ],
              [
                "Tras redeploy de WAHA todos piden QR",
                "Sin volumen persistente",
                "Montar `/app/.sessions`"
              ],
              [
                "Número bloqueado por WhatsApp",
                "Envíos masivos / sin pausas / spam",
                "Aplicar las buenas prácticas de la sección 9"
              ]
            ]
          }
        ]
      }
    ]
  }
];
