# Configuración del Sistema de Invitaciones

## Estructura de la Base de Datos

La tabla `invitations` tiene la siguiente estructura:

```sql
CREATE TABLE invitations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,        -- Nombre del invitado/familia
  guests INTEGER NOT NULL,           -- Número máximo de invitados permitidos
  code VARCHAR(6) UNIQUE NOT NULL,   -- Código único de 6 letras mayúsculas
  confirmed INTEGER DEFAULT 0,       -- Número de invitados que confirmaron
  message TEXT,                      -- Mensaje opcional del invitado
  created_at TIMESTAMP DEFAULT NOW(),
  confirmed_at TIMESTAMP             -- Fecha y hora de confirmación
);
```

## Inicializar la Base de Datos

1. Asegúrate de tener configuradas las variables de entorno para Vercel Postgres
2. Ejecuta el script de inicialización:

```bash
npm run init-db
```

## Agregar Invitaciones

### Opción 1: Usando la Consola de Vercel Postgres

1. Ve a tu proyecto en Vercel
2. Abre la pestaña "Storage" > "Postgres"
3. Ejecuta queries SQL directamente

### Opción 2: Script SQL Manual

Crea invitaciones con el siguiente formato:

```sql
INSERT INTO invitations (name, guests, code) VALUES
  ('Familia Pérez', 4, 'FAMPZZ'),
  ('Juan y María García', 2, 'JMGZZZ'),
  ('Carlos Rodríguez', 1, 'CARXXX'),
  ('Ana y Pedro Martínez', 2, 'APMYYY');
```

**Importante**: 
- El código debe ser de **exactamente 6 letras mayúsculas**
- El código debe ser **único** para cada invitación
- El campo `guests` indica el **máximo** de invitados permitidos para esa invitación

## Generar Códigos Únicos

Puedes usar este pequeño script JavaScript para generar códigos:

```javascript
function generateCode(length = 6) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Generar 10 códigos
for (let i = 0; i < 10; i++) {
  console.log(generateCode());
}
```

## Flujo de Usuario

1. **Envío de invitación**: Envía a cada invitado un link con su código:
   ```
   https://tu-app.vercel.app/?code=ABCDEF
   ```
   O simplemente envíales el código y ellos lo ingresarán manualmente.

2. **Acceso a la invitación**: El invitado ingresa el código de 6 letras en la pantalla inicial

3. **Personalización**: La app obtiene los datos de la invitación y muestra:
   - El nombre del invitado/familia
   - El número máximo de invitados que pueden confirmar

4. **Confirmación**: El invitado confirma cuántos van a asistir (máximo el número permitido)

5. **Base de datos**: Se actualiza el registro con:
   - `confirmed`: número de invitados confirmados
   - `message`: mensaje opcional para los novios
   - `confirmed_at`: timestamp de la confirmación

## Consultar Confirmaciones

Para ver todas las confirmaciones:

```sql
SELECT 
  name,
  guests as max_guests,
  confirmed,
  message,
  confirmed_at,
  code
FROM invitations
WHERE confirmed > 0
ORDER BY confirmed_at DESC;
```

Para ver el total de invitados confirmados:

```sql
SELECT 
  COUNT(*) as total_invitations,
  SUM(guests) as total_invited,
  SUM(confirmed) as total_confirmed,
  COUNT(CASE WHEN confirmed > 0 THEN 1 END) as confirmations_received
FROM invitations;
```

## Ejemplo Completo

```sql
-- 1. Crear algunas invitaciones
INSERT INTO invitations (name, guests, code) VALUES
  ('Familia Segura', 5, 'SEGAZZ'),
  ('Los López', 3, 'LOPBBB'),
  ('María del Carmen', 1, 'MCARCC');

-- 2. Ver todas las invitaciones
SELECT * FROM invitations;

-- 3. Simular una confirmación (esto normalmente lo hace la app)
UPDATE invitations 
SET confirmed = 3, 
    message = '¡No podemos esperar!',
    confirmed_at = NOW()
WHERE code = 'SEGAZZ';

-- 4. Ver confirmaciones
SELECT name, confirmed, message FROM invitations WHERE confirmed > 0;
```

