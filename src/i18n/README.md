# Sistema de Internacionalización (i18n)

Este directorio contiene la implementación del sistema de traducciones para la aplicación de invitaciones de boda.

## Estructura

```
i18n/
├── locales/
│   ├── es.json  # Traducciones en español (idioma por defecto)
│   └── en.json  # Traducciones en inglés
├── context.tsx  # React Context Provider para i18n
└── README.md    # Este archivo
```

## Uso

### 1. Cambiar el idioma mediante URL

El idioma se detecta automáticamente desde el query parameter `?language` en la URL:

- Español: `?code=ABC123&language=es` (o sin especificar, es el idioma por defecto)
- Inglés: `?code=ABC123&language=en`

### 2. Usar traducciones en componentes

```tsx
import { useTranslation } from "@/i18n/context";

function MyComponent() {
  const { t, locale } = useTranslation();

  return (
    <div>
      <h1>{t("welcome.title")}</h1>
      <p>{t("welcome.message")}</p>
      <p>Idioma actual: {locale}</p>
    </div>
  );
}
```

## Agregar nuevas traducciones

1. Abre los archivos `locales/es.json` y `locales/en.json`
2. Agrega la nueva clave en ambos archivos:

```json
{
  "mySection": {
    "myKey": "Mi texto en español"
  }
}
```

3. Usa la traducción en tu componente:

```tsx
const { t } = useTranslation();
return <p>{t("mySection.myKey")}</p>;
```

## Estructura de las traducciones

Las traducciones están organizadas por secciones:

- `common`: Textos comunes (botones, etc.)
- `errors`: Mensajes de error
- `initial`: Pantalla inicial
- `welcome`: Pantalla de bienvenida
- `dateTime`: Información de fecha y ubicación
- `confirmation`: Formulario de confirmación
- `gifts`: Pantalla de regalos
- `bankAccounts`: Información bancaria
- `invitation`: Vista de invitación

## Notas importantes

- El idioma se detecta del query parameter `?language=en/es`
- Si no se especifica, el idioma por defecto es español (`es`)
- El idioma se detecta solo una vez al cargar la página
- No se persiste en localStorage para evitar confusiones entre usuarios

