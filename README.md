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

### Configuración del CI/CD con GitHub Actions
El siguiente archivo de configuración permite el despliegue automático de Firebase Functions cuando se cierra un _pull request_ en la rama `main`:

```yaml
name: Deploy Atom task api

on:
  pull_request:
    types:
      - closed
    branches:
      - main

jobs:
  deploy:
    name: Deploy Firebase Functions
    runs-on: ubuntu-latest

    steps:
      - name: 📥 Checkout Code
        uses: actions/checkout@v3

      - name: ⚙️ Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: 🚀 Install Firebase CLI
        run: npm install -g firebase-tools

      - name: 🔑 Authenticate with Firebase
        run: |
          echo '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}' > $HOME/firebase_service_account.json
          echo "FIREBASE_CREDENTIALS_SON=$HOME/firebase_service_account.json" >> $GITHUB_ENV
          export GOOGLE_APPLICATION_CREDENTIALS="$HOME/firebase_service_account.json"

      - name: 📦 Install Dependencies
        run: |
          cd functions
          npm install

      - name: 🛠️ Build TypeScript files
        run: |
          cd functions
          npm run build

      - name: 🚀 Deploy to Firebase
        run: |
          export GOOGLE_APPLICATION_CREDENTIALS="$HOME/firebase_service_account.json"
          firebase deploy --only functions --project ${{ vars.FIREBASE_PROJECT_ID }}

      - name: 🧹 Clean Up Credentials
        if: always()
        run: rm -f $HOME/firebase_service_account.json
```

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



