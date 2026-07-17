# Cálculo conforme a la Ley Federal del Trabajo

Implementado en `utils/mexican-labor.util.ts`. El backend es la **fuente de
verdad**; estas fórmulas solo alimentan el preview en vivo del modal de usuario.

## Vacaciones (reforma "Vacaciones Dignas", art. 76 LFT)

| Años cumplidos | Días de vacaciones |
|----------------|--------------------|
| 1              | 12                 |
| 2              | 14                 |
| 3              | 16                 |
| 4              | 18                 |
| 5              | 20                 |
| 6 – 10         | 22                 |
| 11 – 15        | 24                 |
| 16 – 20        | 26                 |
| 21 – 25        | 28                 |
| …              | +2 por cada 5 años |

A partir del año 6 se suman **2 días por cada bloque de 5 años**:

```
extraBlocks = floor((años - 1) / 5)
días = 20 + extraBlocks * 2
```

`getYearsOfService(hireDate)` calcula los años cumplidos entre la fecha de
ingreso y hoy.

## Nómina

Derivada del salario mensual (`calculatePayroll`):

```
salario_diario   = mensual / 30
salario_semanal  = diario * 7
pago_quincenal   = mensual / 2
salario_anual    = mensual * 12
```

### Salario Diario Integrado (SDI)

```
factor_integración = 1 + (15 + vacaciones * 0.25) / 365
SDI                = salario_diario * factor_integración
```

- 15 = días de aguinaldo (mínimo legal).
- 25% = prima vacacional sobre los días de vacaciones que correspondan.

## Días de una solicitud

`getInclusiveDays(start, end)` cuenta días naturales **inclusivos** (del primer
al último día). El backend recalcula `days` al registrar la solicitud.
