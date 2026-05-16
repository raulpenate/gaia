# Gaia 🌱

**El suelo que ya no puede sanar solo.**

Una plataforma de diagnóstico médico para el suelo latinoamericano — cruza datos satelitales con reportes de agricultores y comunidades rurales para generar alertas con IA cuando el suelo entra en "estado crítico."

> La mayoría de apps climáticas miran el cielo — temperatura, aire, lluvia. Casi nadie mira hacia abajo. Gaia trata al suelo como un paciente: un expediente médico con historial, síntomas y pronóstico.

**Read this in English:** [README.md](./README.md)

---

## Stack

| Capa            | Elección                                 |
| --------------- | ---------------------------------------- |
| Framework       | [Next.js 15](https://nextjs.org) (App Router) |
| Lenguaje        | TypeScript (strict)                      |
| Estilos         | [Tailwind CSS v4](https://tailwindcss.com) |
| i18n            | [next-intl](https://next-intl.dev) — `es` (default), `en` |
| Lint / Formato  | [Biome](https://biomejs.dev)             |
| Gestor de pkgs  | [pnpm](https://pnpm.io)                  |

---

## Empezar

```bash
pnpm install
pnpm dev
```

Abre:

- <http://localhost:3000> → redirige a `/es`
- <http://localhost:3000/en> → inglés
- <http://localhost:3000/api/health> → healthcheck en JSON

---

## Scripts

| Comando           | Qué hace                              |
| ----------------- | ------------------------------------- |
| `pnpm dev`        | Servidor de desarrollo en `:3000`     |
| `pnpm build`      | Build de producción                   |
| `pnpm start`      | Ejecuta el build de producción        |
| `pnpm lint`       | Lint + verificación de formato (Biome)|
| `pnpm lint:fix`   | Auto-fix con Biome                    |
| `pnpm format`     | Solo formato con Biome                |
| `pnpm typecheck`  | `tsc --noEmit`                        |

---

## Estructura de carpetas

```
gaia/
├── messages/                # textos i18n (en.json, es.json)
├── public/                  # assets estáticos
└── src/
    ├── middleware.ts        # routing de locales con next-intl
    ├── i18n/                # configuración de routing y mensajes
    ├── app/
    │   ├── [locale]/        # páginas por locale
    │   └── api/             # route handlers
    ├── components/          # UI compartida
    ├── lib/                 # utilidades, clientes
    └── types/               # tipos compartidos
```

---

## Agregar traducciones

1. Abre `messages/es.json` y `messages/en.json`
2. Agrega la misma clave en ambos archivos, dentro del namespace correcto
3. Úsala en un componente (server o client):

```tsx
import { useTranslations } from "next-intl";

export default function Componente() {
  const t = useTranslations("Home");
  return <h1>{t("title")}</h1>;
}
```

---

## Roadmap (aún no implementado)

- Modelo de datos del "expediente médico" del suelo y persistencia
- Flujo de reportes para agricultores / comunidades
- Pipeline de ingesta de datos satelitales
- Capa de visualización tipo radiografía / ecografía
- Cruce con IA de señales satelitales + comunitarias
- Autenticación para miembros de la comunidad
