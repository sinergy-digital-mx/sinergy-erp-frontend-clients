// ARCHIVO GENERADO. No editar a mano.
// Fuente: sinergy-erp-backend-clients/src/api/whatsapp/docs/EXTERNAL_INTEGRATION_GUIDE.md
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

export const WHATSAPP_GUIDE_INTRO: GuideBlock[] = [
  {
    "t": "p",
    "text": "Cómo enviar WhatsApp desde **otro sistema** (otro backend y otro frontend) reutilizando lo que ya existe en Pollux ERP, **sin que los usuarios del otro sistema tengan cuenta ni sesión en Pollux**."
  }
];

export const WHATSAPP_GUIDE_SECTIONS: GuideSection[] = [
  {
    "id": "s1",
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
    "id": "s2",
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
            "`POST`",
            "`/messages/text`",
            "Create",
            "Enviar texto (responde **202**)"
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
            "Sí",
            "Ver reglas de teléfono (2.5)"
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
    "id": "s3",
    "title": "Modo B — WAHA directo",
    "blocks": [
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
    "id": "s4",
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
    "id": "s5",
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
    "id": "s6",
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
];
