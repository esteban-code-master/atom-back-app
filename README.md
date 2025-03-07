# Proyecto Backend con Node.js y Firebase Cloud Functions


Este proyecto es un backend desarrollado en Node.js que utiliza Firebase Cloud Functions para exponer APIs de manera escalable y eficiente.

## Tecnologías utilizadas
- **Node.js**
- **Firebase Cloud Functions**
- **Express.js**
- **Firestore** (Base de datos NoSQL de Firebase)
- **Firebase Authentication**

## Librerias princiales utilizadas
- **Inversify**
- **Husky**
- **Prettier**
- **Eslint**
  
## Instalación

### Prerrequisitos
1. Tener instalado [Node.js](https://nodejs.org/) (versión recomendada: LTS)
2. Instalar Firebase CLI:
   ```sh
   npm install -g firebase-tools
   ```
3. Iniciar sesión en Firebase:
   ```sh
   firebase login
   ```

### Clonar el repositorio
  ```sh
  git clone https://github.com/esteban-code-master/atom-back-app/
  ```

1. Instalar dependencias:
   ```sh
   npm install
   ```

## Desarrollo y despliegue

### Ejecutar en modo local
```sh
   npm run serve
```

O utilizando Firebase Emulator:
```sh
   firebase emulators:start
```

### Desplegar las funciones en Firebase
```sh
   firebase deploy --only functions
```

Integración Continua

Este proyecto cuenta con un archivo de configuración .github/workflows/node.js.yml para realizar despliegues continuos utilizando GitHub Actions.

## Estructura del proyecto - usando principios solid y arquitectura limpia

```
/ATOM-BACK-APP
│── functions/
│   ├── src/
│   │   ├── config/                              # Configuración global del proyecto
│   │   ├── modules/                             # Módulos de la aplicación siguiendo arquitectura limpia
│   │   │   ├── auth/                            # Módulo de autenticación
│   │   │   │   ├── aplication/
│   │   │   │   ├── domain/
│   │   │   │   ├── infraestructure/
│   │   │   │   ├── auth-module.ts              # Archivo princial para todas las dependencias de ese modulo
│   │   │   ├── task/                           # Módulo de tareas
│   │   │   ├── user/                           # Módulo de usuarios
│   │   ├── index.ts                            # Punto de entrada principal
│   ├── package.json                            # Configuración del proyecto
```

## RUN
Cloud funcion corriendo

![image](https://github.com/user-attachments/assets/f2dde64c-93eb-49b2-84c1-d22c694c0e22)



