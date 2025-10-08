# 💍 Invitación de Boda Digital - Ale & Facu

Aplicación web de invitación de boda personalizada con sistema de códigos únicos para cada invitado.

## ✨ Características

- 🎨 **Diseño elegante** con animaciones suaves usando Framer Motion
- 🎵 **Música de fondo** automática
- 🔐 **Códigos personalizados** de 6 letras para cada invitado/familia
- 📝 **Formulario de confirmación** con límite de invitados
- 💬 **Mensajes opcionales** para los novios
- 📍 **Información del evento** con ubicación
- 🎁 **Sección de regalos** con cuentas bancarias
- 📱 **100% Responsive** (funciona en móviles, tablets y desktop)

## 🚀 Inicio Rápido

### 1. Instalar Dependencias

```bash
npm install
```

### 2. Configurar Base de Datos

Crea un archivo `.env.local` en la raíz con tu connection string de Neon:

```env
DATABASE_URL="postgresql://user:password@ep-xxx.neon.tech/dbname?sslmode=require"
```

📖 **Ver guía detallada:** [NEON_SETUP.md](./NEON_SETUP.md)

### 3. Crear la Tabla

```bash
npm run init-db
```

### 4. Generar Códigos de Invitación

```bash
npm run generate-codes 10
```

### 5. Insertar Invitaciones

Copia el SQL generado y ejecútalo en [Neon SQL Editor](https://console.neon.tech)

### 6. Ejecutar en Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) y prueba con uno de tus códigos.

## 📚 Documentación

- 📘 [Configuración de Neon Database](./NEON_SETUP.md)
- 📗 [Gestión de Invitaciones](./INVITATIONS_SETUP.md)
- 📙 [Deploy a Vercel](./VERCEL_DEPLOY.md)

## 🛠️ Stack Tecnológico

- **Framework:** [Next.js 15](https://nextjs.org/) con App Router
- **Lenguaje:** TypeScript
- **Base de Datos:** [Neon Database](https://neon.tech/) (Postgres serverless)
- **Estilos:** Tailwind CSS 4
- **Animaciones:** Framer Motion
- **Hosting:** Vercel

## 📦 Scripts Disponibles

```bash
npm run dev          # Ejecutar en modo desarrollo
npm run build        # Construir para producción
npm run start        # Ejecutar build de producción
npm run init-db      # Crear tabla en la base de datos
npm run generate-codes # Generar códigos de invitación únicos
```

## 🗂️ Estructura del Proyecto

```
invitacion-ale-facu/
├── src/
│   ├── app/
│   │   ├── api/guests/     # API endpoints
│   │   ├── page.tsx        # Página principal
│   │   └── layout.tsx
│   ├── components/
│   │   ├── steps/          # Pasos de la invitación
│   │   └── ui/             # Componentes reutilizables
│   └── lib/
│       ├── db.ts           # Funciones de base de datos
│       └── wedding-config.ts
├── scripts/
│   ├── init-db.js          # Script de inicialización
│   └── generate-codes.js   # Generador de códigos
└── public/                 # Assets estáticos
```

## 🎯 Flujo de Usuario

1. Invitado recibe código de 6 letras por mensaje
2. Ingresa el código en la página inicial
3. Ve su invitación personalizada con su nombre
4. Navega por los pasos (bienvenida, fecha, confirmación, regalos)
5. Confirma asistencia indicando número de invitados
6. Deja un mensaje opcional para los novios
7. Confirmación guardada en base de datos

## 🌐 Deploy

### Vercel (Recomendado)

1. Sube tu código a GitHub
2. Importa el repositorio en [Vercel](https://vercel.com)
3. Agrega la variable `DATABASE_URL` en Environment Variables
4. Deploy automático

📖 **Guía completa:** [VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md)

## 🔧 Configuración

### Variables de Entorno

```env
DATABASE_URL="postgresql://..."  # Connection string de Neon
```

### Personalización

Edita `src/lib/wedding-config.ts` para cambiar:
- Fecha y hora de la boda
- Ubicación del evento
- Información de cuentas bancarias
- Límites de confirmación

## 📊 Monitoreo

Ver confirmaciones en tiempo real usando el SQL Editor de Neon:

```sql
SELECT name, confirmed, message, confirmed_at 
FROM invitations 
WHERE confirmed > 0
ORDER BY confirmed_at DESC;
```

## 👥 Autores

Desarrollado con 💝 para la boda de Ale & Facu

## 📄 Licencia

Este proyecto es de uso privado para la celebración de la boda.
