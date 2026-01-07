# 🚗 Invitación Cumpleaños - Viaje en el Tiempo

Una invitación retro futurista inspirada en "Volver al Futuro" con diseño responsive y efectos visuales impresionantes.

## ✨ Características

- 🎨 Diseño retro futurista con efectos neón y animaciones
- 📱 Completamente responsive (móvil, tablet, desktop)
- ⚡ Panel de circuitos de tiempo animado
- 🌟 Efectos de partículas flotantes
- 🔥 Integración con Firebase para guardar confirmaciones
- ⏰ Reloj en tiempo real
- 🎯 Formulario de confirmación de asistencia

## 🚀 Configuración

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar Firebase

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Habilita Firestore Database
3. Obtén las credenciales de tu proyecto
4. Edita el archivo `src/environments/environment.ts` y reemplaza los valores:

```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: 'TU_API_KEY',
    authDomain: 'TU_AUTH_DOMAIN',
    projectId: 'TU_PROJECT_ID',
    storageBucket: 'TU_STORAGE_BUCKET',
    messagingSenderId: 'TU_MESSAGING_SENDER_ID',
    appId: 'TU_APP_ID'
  }
};
```

### 3. Configurar Firestore

En Firebase Console:
1. Ve a Firestore Database
2. Crea una colección llamada `confirmaciones`
3. Configura las reglas de seguridad (para desarrollo):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /confirmaciones/{document=**} {
      allow read, write: if true; // Solo para desarrollo
    }
  }
}
```

⚠️ **Importante**: Para producción, configura reglas de seguridad apropiadas.

## 🎮 Ejecutar el proyecto

### Servidor de desarrollo

```bash
npm start
# o
ng serve
```

Navega a `http://localhost:4200/`

### Compilar para producción

```bash
ng build
```

Los archivos compilados estarán en `dist/`

## 🎨 Personalización

### Cambiar la fecha del evento

Edita `src/app/app.html` y modifica la sección de información:

```html
<span class="info-value">26 de Octubre, 2025</span>
<span class="info-value">09:00 PM</span>
<span class="info-value">Hill Valley, 1985</span>
```

### Cambiar los colores

Los colores principales están definidos en `src/app/app.css`:
- Cian neón: `#00ffff`
- Magenta: `#ff00ff`
- Amarillo: `#ffea00`
- Naranja: `#ff6a00`
- Verde: `#00ff41`

## 📦 Estructura del proyecto

```
src/
├── app/
│   ├── app.ts          # Componente principal
│   ├── app.html        # Template HTML
│   └── app.css         # Estilos retro futuristas
├── environments/
│   └── environment.ts  # Configuración de Firebase
└── main.ts            # Bootstrap de la aplicación
```

## 🔧 Tecnologías utilizadas

- Angular 21
- Firebase / Firestore
- TypeScript
- CSS3 (Animaciones y efectos)
- Google Fonts (Orbitron, Rajdhani)

## 📝 Notas

- Las confirmaciones se guardan en Firestore con timestamp del servidor
- El diseño es completamente responsive
- Los efectos visuales están optimizados para rendimiento

## 🎉 ¡Disfruta tu fiesta!

¡Que tengas un cumpleaños increíble! 🎂🚗⏰
