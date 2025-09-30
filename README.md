# LibreMercado — Patch Frontend (Tailwind + Auth + Publish)

## Variables de entorno
Crea `.env` en el frontend:
```
VITE_APP_API_BASE_URL=https://TU-BACKEND.onrender.com
```

## Instalar / correr
```
npm install
npm run dev
```

## Build
```
npm run build
```

## Incluye
- Tailwind configurado
- Navbar moderno
- AuthContext con token en localStorage
- Home con productos de API y mock
- Login, Register
- Publicar producto con soporte de imagen (multipart)
- Perfil con productos propios
