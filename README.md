# Prueba Frontend – Biblioteca Orbital

Interfaz futurista basada en Next.js 16 (App Router) que consume el endpoint real de Digital College y muestra la biblioteca orbital del estudiante con filtros, animaciones y diseño responsive.

## Requisitos previos

- Node.js ≥ 18.18 (se recomienda 20 LTS). Puedes instalarlo con [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) y luego ejecutar:
  ```bash
  nvm install 20
  nvm use 20
  ```
- npm 9+ (incluido con las versiones recomendadas de Node.js).
- Acceso a Internet para consumir los servicios de Digital College.

## Instalación y ejecución

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repo>
   cd resolucionPruebaFrontend/prueba-frontend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Levantar el entorno de desarrollo**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

4. **(Opcional) Ejecutar linting antes de hacer commit**
   ```bash
   npm run lint
   ```

No se requieren variables de entorno adicionales; la configuración ya incorpora la autenticación de prueba y los dominios remotos para las imágenes servidas por la API.
