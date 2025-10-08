# Configuración con Neon Database

Esta aplicación usa **Neon Database** (Postgres serverless) como base de datos.

## 🚀 Configuración Rápida

### 1. Crear Proyecto en Neon

1. Ve a https://console.neon.tech
2. Crea una cuenta o inicia sesión (gratis)
3. Click en **"Create a project"**
4. Dale un nombre (ej: `invitacion-boda`)
5. Selecciona la región más cercana (ej: `US East (Ohio)`)
6. Click en **"Create project"**

### 2. Obtener Connection String

Una vez creado el proyecto:

1. En el dashboard de Neon, verás tu **Connection String**
2. Copia la cadena que comienza con `postgresql://`
3. Se verá algo así:
   ```
   postgresql://user:password@ep-xxx-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

### 3. Configurar Variables de Entorno Locales

Para desarrollo local:

1. Crea un archivo `.env.local` en la raíz del proyecto:

```bash
DATABASE_URL="postgresql://user:password@ep-xxx-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require"
```

2. Reemplaza con tu connection string real de Neon

### 4. Instalar Dependencias

```bash
npm install
```

### 5. Crear la Tabla

```bash
npm run init-db
```

Deberías ver: `✅ Database initialized successfully!`

### 6. Generar Códigos de Invitación

```bash
npm run generate-codes 10
```

Esto generará 10 códigos únicos y un template SQL.

### 7. Insertar Invitaciones

Opción A: **Usando Neon Console (Recomendado)**

1. Ve a https://console.neon.tech
2. Abre tu proyecto
3. Click en **"SQL Editor"**
4. Copia y pega el SQL generado, modificando nombres:

```sql
INSERT INTO invitations (name, guests, code) VALUES
  ('Familia Pérez', 4, 'ABCDEF'),
  ('Juan y María', 2, 'GHIJKL'),
  ('Carlos Rodríguez', 1, 'MNOPQR');
```

5. Click en **"Run"**

Opción B: **Usando psql o cualquier cliente de Postgres**

Usa el connection string de Neon para conectarte.

### 8. Probar Localmente

```bash
npm run dev
```

Abre http://localhost:3000 e ingresa uno de los códigos que insertaste.

---

## 🌐 Deploy a Vercel

### 1. Subir a GitHub

```bash
git add .
git commit -m "feat: configuración con Neon Database"
git push
```

### 2. Importar en Vercel

1. Ve a https://vercel.com/new
2. Importa tu repositorio de GitHub
3. En **Environment Variables**, agrega:
   - **Key**: `DATABASE_URL`
   - **Value**: Tu connection string de Neon
4. Click en **"Deploy"**

### 3. ¡Listo!

Tu app estará disponible en tu URL de Vercel (ej: `https://tu-app.vercel.app`)

---

## 📊 Verificar y Consultar Datos

### Usando Neon SQL Editor

Ve a tu proyecto en Neon > **SQL Editor**

**Ver todas las invitaciones:**
```sql
SELECT * FROM invitations;
```

**Ver confirmaciones:**
```sql
SELECT 
  name,
  guests as max_invitados,
  confirmed as confirmados,
  message,
  confirmed_at
FROM invitations 
WHERE confirmed > 0
ORDER BY confirmed_at DESC;
```

**Estadísticas generales:**
```sql
SELECT 
  COUNT(*) as total_invitaciones,
  SUM(guests) as total_invitados,
  SUM(confirmed) as total_confirmados,
  COUNT(CASE WHEN confirmed > 0 THEN 1 END) as respuestas_recibidas
FROM invitations;
```

---

## ✨ Ventajas de Neon

- ✅ **Gratis para empezar** (1 proyecto gratis)
- ✅ **Serverless** (escala automáticamente)
- ✅ **Súper rápido** (cold start < 1s)
- ✅ **SQL Editor integrado** (no necesitas pgAdmin)
- ✅ **Branching** (puedes crear ramas de la DB para pruebas)
- ✅ **Backups automáticos**
- ✅ **Connection pooling incluido**

---

## 🔧 Solución de Problemas

### Error: "relation 'invitations' does not exist"

**Solución**: Ejecuta `npm run init-db` para crear la tabla.

### Error: "Connection string is missing"

**Solución**: Verifica que `DATABASE_URL` esté configurada en `.env.local` (local) o en Vercel Environment Variables (producción).

### Error: "password authentication failed"

**Solución**: 
1. Ve a Neon Console
2. Regenera el connection string
3. Actualiza tu `DATABASE_URL`

### La tabla está vacía

**Solución**: Inserta invitaciones usando el SQL Editor de Neon o ejecutando el script de generación de códigos.

---

## 📱 Ejemplo de Invitación

Una vez todo configurado, envía a tus invitados:

```
🎉 ¡Nos casamos!

Ale & Facu te invitan a su boda.

Visita: https://tu-app.vercel.app
Código: ABCDEF

¡Los esperamos!
```

---

## 🔄 Agregar Más Invitaciones

1. Genera más códigos: `npm run generate-codes 5`
2. Ve al SQL Editor en Neon
3. Ejecuta el INSERT con los nuevos códigos
4. ¡Listo!

---

## 🎯 Checklist de Configuración

- [ ] Proyecto creado en Neon
- [ ] Connection string copiado
- [ ] `.env.local` creado localmente
- [ ] Dependencias instaladas (`npm install`)
- [ ] Tabla creada (`npm run init-db`)
- [ ] Códigos generados (`npm run generate-codes`)
- [ ] Invitaciones insertadas en Neon SQL Editor
- [ ] Probado localmente (`npm run dev`)
- [ ] Código en GitHub
- [ ] Deployado en Vercel con `DATABASE_URL`
- [ ] Probado en producción

¡Todo listo para recibir confirmaciones! 🎊

