

# ITRock Mobile Challenge - Mateo Lorenzo

<div align="center">
  
  https://github.com/user-attachments/assets/38744b1c-e3a7-43dc-b5c2-8ebcb7971f1a
</div>


# 📱 Sobre el proyecto

Aplicación móvil desarrollada con React Native y Expo. Incluye autenticación, feed de reseñas, catálogo de productos con paginación infinita y pantalla de checkout.


## ✨ Características

- Autenticación persistente con AsyncStorage
- Feed de reseñas con paginación (source: mock local)
- Catálogo de productos con infinite scroll (source: Platzi Fake Store API)
- Formulario de pago con validación de tarjetas
- Skeleton loaders para mejor UX
- Navegación con tabs y efectos visuales

## 🛠️ Stack Tecnológico

- **React Native** 0.81.4 + **Expo SDK** ~54.0.13
- **TypeScript** ~5.9.2
- **Expo Router** - Navegación file-based
- **TanStack Query** - Manejo de datos y cache
- **Context API + useReducer** - Estado global
- **AsyncStorage** - Persistencia local
- **React Native Reanimated** - Animaciones de alto rendimiento

## 🚀 Instalación y Ejecución

### 1. Instalar dependencias

```bash
npm expo install
```

### 2. Ejecutar en emuladores

**Android:**

```bash
npm run android
```

**iOS (solo macOS):**

```bash
npm run ios
```

### 3. Correr la app en dispositivos fisicos

```bash
npm start
```

Escanear el codigo QR con la app de **Expo Go** ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) | [iOS](https://apps.apple.com/app/expo-go/id982107779))

## 📁 Estructura del Proyecto


```
itrock-marketplace/
├── app/                   # Expo Router (file-based routing)
│   ├── (app)/             # Rutas protegidas (requiere auth)
│   │   ├── (tabs)/        # Tab navigator (home, products)
│   │   └── checkout.tsx   # Pantalla de pago
│   └── auth/              # Rutas públicas (sign-in)
├── src/                   # Código fuente
│   ├── components/        # Componentes reutilizables
│   ├── contexts/          # Context providers (Auth, Query, Scroll)
│   ├── hooks/             # Custom hooks (useProducts)
│   ├── interfaces/        # TypeScript types
│   ├── types/             # Type declarations
│   └── constants/         # Constantes (Fonts)
└── assets/                # Fonts, icons, images, mock data
```


## 📝 Scripts Disponibles

```bash
npm start          # Inicia Expo
npm run android    # Abre app en Android
npm run ios        # Abre app en iOS
```

