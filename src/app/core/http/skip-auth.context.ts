import { HttpContext, HttpContextToken, HttpRequest } from '@angular/common/http';

/** Marca peticiones del portal público para no enviar Bearer ni reaccionar a 401. */
export const SKIP_AUTH = new HttpContextToken<boolean>(() => false);

export function skipAuthContext(): HttpContext {
  return new HttpContext().set(SKIP_AUTH, true);
}

export function isPublicApiRequest(req: HttpRequest<unknown>): boolean {
  if (req.context.get(SKIP_AUTH)) {
    return true;
  }
  return /\/public\/self-invoice(?:\/|$|\?)/.test(req.url ?? '');
}
