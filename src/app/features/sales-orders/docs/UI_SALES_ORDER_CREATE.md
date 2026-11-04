# UI — Alta de orden de venta y cotización

## 2026-11-03

El producto no se agrega en otro modal. En la pestaña Productos, la búsqueda queda arriba. Al elegir un producto, unidad, lista, cantidad, precio, descuento e IVA salen debajo de esa búsqueda, en la misma franja.

1. Buscar por código, SKU o nombre. Enter toma el primer resultado.
2. Al elegir, el producto queda debajo de la búsqueda: nombre con código y disponible, y en la siguiente fila unidad, lista, cantidad, precio, descuento e IVA.
3. SKU y disponible van en el nombre, con badge. No son campos.
4. IVA son botones 0, 8 y 16. Si el producto trae otra tasa, esa también aparece.
5. Enter en cantidad, precio, descuento o IEPS agrega el renglón y regresa el foco a la búsqueda.
6. El mismo flujo vale para crear cotización. Un servicio sin stock sí se puede agregar; un producto sin stock en la sucursal, no.

La ventana de alta abre a 1200px para que esos campos quepan en una línea.

## 2026-11-04

Si el cliente tiene listas de precio, el selector Lista muestra solo esas. La predeterminada queda elegida al agregar un producto. Si el producto no tiene esa lista, se queda en Sugerido.
