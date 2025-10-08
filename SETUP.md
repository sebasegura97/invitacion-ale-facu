# Configuración de la Invitación Digital

## ✨ Nueva UX de Navegación por Pasos

La invitación ahora cuenta con una experiencia de usuario mejorada:

- **6 pasos interactivos** con transiciones suaves
- **Navegación secuencial** con botones "Anterior" y "Continuar"
- **Animaciones fluidas** entre pasos
- **Indicador de progreso** visual
- **Diseño responsive** optimizado para móviles

### Pasos de la Invitación:
1. **Bienvenida** - Mensaje de los novios
2. **Fecha y Hora** - Con botón de Google Calendar
3. **Ubicación** - Con enlaces a Google Maps
4. **Dress Code** - Código de vestimenta con sugerencias
5. **Regalos** - Información bancaria con copia rápida
6. **Confirmación** - Formulario de asistencia

## Variables de Entorno Requeridas

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
# Database
DATABASE_URL="your_DATABASE_url_here"
DATABASE_PRISMA_URL="your_DATABASE_prisma_url_here"
DATABASE_URL_NON_POOLING="your_DATABASE_non_pooling_url_here"
DATABASE_USER="your_DATABASE_user"
DATABASE_HOST="your_DATABASE_host"
DATABASE_PASSWORD="your_DATABASE_password"
DATABASE_DATABASE="your_DATABASE_database"

# Google Maps API (opcional - para mapas mejorados)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="your_google_maps_api_key_here"
```

## Configuración de Vercel Postgres

1. Ve a tu dashboard de Vercel
2. Selecciona tu proyecto
3. Ve a la pestaña "Storage"
4. Crea una nueva base de datos Postgres
5. Copia las variables de entorno que Vercel te proporciona

## Configuración de Google Maps (Opcional)

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la API de Google Maps Embed
4. Crea credenciales (API Key)
5. Agrega la API Key a tu archivo `.env.local`

## Scripts Disponibles

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Ejecutar en producción
npm start

# Inicializar base de datos (después de configurar variables de entorno)
npm run init-db
```

## Deployment en Vercel

1. Conecta tu repositorio a Vercel
2. Asegúrate de que las variables de entorno estén configuradas
3. Deploy automáticamente

## Estructura del Proyecto

```
src/
├── app/
│   ├── api/guests/route.ts    # API para manejar invitados
│   ├── layout.tsx             # Layout principal
│   └── page.tsx              # Página principal con navegación por pasos
├── components/
│   ├── StepContainer.tsx     # Contenedor de pasos con navegación
│   ├── ConfirmationForm.tsx  # Formulario de confirmación
│   ├── GoogleMaps.tsx        # Componente de mapas
│   ├── WeddingInfo.tsx      # Información de la boda (legacy)
│   └── steps/                # Componentes de cada paso
│       ├── WelcomeStep.tsx      # Paso 1: Bienvenida
│       ├── DateTimeStep.tsx     # Paso 2: Fecha y hora
│       ├── LocationStep.tsx     # Paso 3: Ubicación
│       ├── DressCodeStep.tsx    # Paso 4: Dress code
│       ├── GiftsStep.tsx        # Paso 5: Regalos
│       └── ConfirmationStep.tsx  # Paso 6: Confirmación
└── lib/
    ├── db.ts                 # Conexión a base de datos
    └── wedding-config.ts    # Configuración estática
```
