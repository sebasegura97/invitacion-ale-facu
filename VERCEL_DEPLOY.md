# Guía de Deploy a Vercel

## 📋 Pre-requisitos

- Cuenta en Vercel (https://vercel.com)
- Git instalado
- Código en un repositorio Git (GitHub, GitLab, o Bitbucket)

## 🚀 Paso 1: Subir el código a Git

Si aún no tienes el código en un repositorio:

```bash
# Si no has inicializado git
git init

# Agregar todos los archivos
git add .

# Hacer commit
git commit -m "feat: sistema de invitaciones con códigos personalizados"

# Crear repositorio en GitHub y conectarlo
# Ve a GitHub.com > New Repository > crea "invitacion-ale-facu"
# Luego ejecuta:
git remote add origin https://github.com/TU_USUARIO/invitacion-ale-facu.git
git branch -M main
git push -u origin main
```

## 🌐 Paso 2: Importar Proyecto a Vercel

1. Ve a https://vercel.com/new
2. Click en "Import Project"
3. Selecciona tu repositorio de GitHub
4. Vercel detectará automáticamente que es un proyecto Next.js
5. **NO hagas deploy todavía**, primero configura la base de datos

## 💾 Paso 3: Crear Base de Datos Postgres

### Opción A: Desde el Dashboard de Vercel (Recomendado)

1. En tu proyecto de Vercel, ve a la pestaña **"Storage"**
2. Click en **"Create Database"**
3. Selecciona **"Postgres"**
4. Elige un nombre (ej: `invitaciones-db`)
5. Selecciona la región más cercana a tus usuarios
6. Click en **"Create"**

### Opción B: Durante el Deploy

1. Durante el proceso de import, Vercel te preguntará si quieres agregar integrations
2. Selecciona "Create Postgres Database"
3. Sigue los pasos en pantalla

## 🔑 Paso 4: Conectar Base de Datos al Proyecto

Una vez creada la base de datos:

1. Ve a **Storage** > Tu base de datos
2. Ve a la pestaña **"Settings"**
3. En **"Project"**, conecta tu proyecto si no está conectado
4. Vercel automáticamente agregará las variables de entorno necesarias:
   - `DATABASE_URL`
   - `DATABASE_PRISMA_URL`
   - `DATABASE_URL_NON_POOLING`
   - `DATABASE_USER`
   - `DATABASE_HOST`
   - `DATABASE_PASSWORD`
   - `DATABASE_DATABASE`

## 📤 Paso 5: Deploy Inicial

1. En la pantalla de configuración del proyecto, asegúrate de que:
   - **Framework Preset**: Next.js (detectado automáticamente)
   - **Build Command**: `next build --turbopack` (o déjalo por defecto)
   - **Output Directory**: `.next` (default)
   
2. Click en **"Deploy"**

3. Espera a que termine el deploy (2-5 minutos)

## 🗄️ Paso 6: Inicializar la Base de Datos

Una vez deployado, necesitas crear la tabla. Tienes dos opciones:

### Opción A: Usar la Query Tool de Vercel (Más fácil)

1. Ve a **Storage** > Tu base de datos
2. Click en la pestaña **"Query"**
3. Copia y pega este SQL:

```sql
CREATE TABLE IF NOT EXISTS invitations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  guests INTEGER NOT NULL,
  code VARCHAR(6) UNIQUE NOT NULL,
  confirmed INTEGER DEFAULT 0,
  message TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  confirmed_at TIMESTAMP
);
```

4. Click en **"Run Query"**
5. Deberías ver: "CREATE TABLE" como resultado

### Opción B: Desde tu Computadora Local

1. Instala las dependencias si no lo has hecho:
```bash
npm install
```

2. Copia las variables de entorno de Vercel:
   - Ve a tu proyecto en Vercel > **Settings** > **Environment Variables**
   - Descarga el archivo `.env.local` o copia las variables

3. Crea un archivo `.env.local` en la raíz del proyecto:
```bash
# .env.local
DATABASE_URL="postgresql://..."
DATABASE_PRISMA_URL="postgresql://..."
# ... resto de variables
```

4. Ejecuta el script de inicialización:
```bash
npm run init-db
```

## 👥 Paso 7: Insertar Invitaciones

### Generar Códigos

En tu computadora local:
```bash
npm run generate-codes 20
```

Esto te generará 20 códigos únicos y un template SQL.

### Insertar en la Base de Datos

**Opción A: Vercel Query Tool**

1. Ve a **Storage** > Tu base de datos > **Query**
2. Copia el SQL que generó el script anterior
3. Modifica los nombres y cantidad de invitados:

```sql
INSERT INTO invitations (name, guests, code) VALUES
  ('Familia Pérez López', 5, 'ABCDEF'),
  ('Juan y María García', 2, 'GHIJKL'),
  ('Carlos Rodríguez', 1, 'MNOPQR'),
  ('Ana y Pedro Martínez', 3, 'STUVWX');
```

4. Click en **"Run Query"**

**Opción B: Desde un archivo SQL**

Puedes crear un archivo `invitations.sql` y ejecutarlo:

```sql
-- invitations.sql
INSERT INTO invitations (name, guests, code) VALUES
  ('Familia Pérez López', 5, 'ABCDEF'),
  ('Juan y María García', 2, 'GHIJKL'),
  ('Carlos Rodríguez', 1, 'MNOPQR'),
  ('Ana y Pedro Martínez', 3, 'STUVWX');
```

Luego en Vercel Query Tool, pega el contenido y ejecuta.

## ✅ Paso 8: Verificar el Deploy

1. Vercel te dará una URL (ej: `https://invitacion-ale-facu.vercel.app`)
2. Abre la URL en tu navegador
3. Prueba con uno de los códigos que insertaste
4. Deberías ver la invitación personalizada

## 🔍 Verificar Invitaciones en la Base de Datos

En Vercel Query Tool:

```sql
-- Ver todas las invitaciones
SELECT * FROM invitations;

-- Ver solo las confirmadas
SELECT name, confirmed, message, confirmed_at 
FROM invitations 
WHERE confirmed > 0;

-- Ver estadísticas
SELECT 
  COUNT(*) as total_invitaciones,
  SUM(guests) as total_invitados,
  SUM(confirmed) as total_confirmados
FROM invitations;
```

## 🔧 Troubleshooting

### Error: "Failed to fetch invitation"

**Solución**: Verifica que:
1. Las variables de entorno estén configuradas en Vercel
2. La base de datos esté conectada al proyecto
3. La tabla `invitations` exista (ejecuta el SQL de creación)

### Error: "Invitation not found"

**Solución**: 
1. Verifica que el código exista en la base de datos
2. Recuerda que los códigos deben ser exactamente 6 letras mayúsculas

### Los cambios no se reflejan

**Solución**:
1. Haz commit y push a Git
2. Vercel automáticamente desplegará los cambios
3. O fuerza un nuevo deploy desde el dashboard

## 🔄 Actualizar el Deploy

Cada vez que hagas cambios:

```bash
git add .
git commit -m "descripción de cambios"
git push
```

Vercel desplegará automáticamente los cambios en 1-2 minutos.

## 🌐 Configurar Dominio Personalizado (Opcional)

1. Ve a tu proyecto en Vercel > **Settings** > **Domains**
2. Agrega tu dominio (ej: `boda-ale-facu.com`)
3. Sigue las instrucciones para configurar DNS
4. Vercel automáticamente configurará HTTPS

## 📱 Compartir Invitaciones

Una vez todo esté funcionando, envía a cada invitado:

```
🎉 ¡Nos casamos!

Ale & Facu te invitan a su boda.

Ingresa tu código de invitación aquí:
https://invitacion-ale-facu.vercel.app

Tu código: ABCDEF

¡Los esperamos!
```

## 🎯 Checklist Final

- [ ] Código en GitHub
- [ ] Proyecto importado en Vercel
- [ ] Base de datos Postgres creada
- [ ] Variables de entorno conectadas
- [ ] Deploy exitoso
- [ ] Tabla `invitations` creada
- [ ] Invitaciones insertadas
- [ ] Prueba con al menos 1 código
- [ ] Confirmación funciona correctamente
- [ ] Links preparados para enviar

## 📊 Monitorear Confirmaciones

Para ver quién ha confirmado en tiempo real:

1. Ve a **Storage** > Tu base de datos > **Query**
2. Ejecuta:

```sql
SELECT 
  name,
  guests as invitados_max,
  confirmed as confirmados,
  CASE 
    WHEN confirmed = 0 THEN '⏳ Pendiente'
    WHEN confirmed > 0 THEN '✅ Confirmado'
  END as estado,
  confirmed_at,
  message
FROM invitations
ORDER BY confirmed_at DESC NULLS LAST;
```

¡Listo! Tu aplicación de invitaciones está en producción 🎊

