# Backend API - Proyecto

Este repositorio contiene el backend del proyecto Text Generator simulando un generador de texto con IA. Esta API RESTful fue creada con Node.js, Express y Sequelize, y sirve como backend para la administración y manipulación de datos de [descripción breve del propósito de la API].

## Tabla de Contenidos

- [Características](#características)
- [Requisitos Previos](#requisitos-previos)
- [Configuración del Proyecto](#configuración-del-proyecto)
- [Scripts Disponibles](#scripts-disponibles)
- [Estructura de la Base de Datos](#estructura-de-la-base-de-datos)
- [Endpoints Principales](#endpoints-principales)
- [Licencia](#licencia)

## Características

- API RESTful desarrollada con Node.js y Express.
- Autenticación de usuarios con [JWT o cualquier método que uses].
- Integración de Sequelize para el manejo de la base de datos MySQL.
- Soporte para operaciones CRUD en los modelos principales (usuarios, prompts y textos generados).
- Configuración de CORS para comunicación con el frontend.
- Visualización de datos en **TablePlus**.

## Requisitos Previos

Para ejecutar este proyecto, necesitarás tener instalado:

- [Node.js](https://nodejs.org/) 
- [npm](https://www.npmjs.com/) 
- [MySQL](https://www.mysql.com/) como motor de base de datos
- [TablePlus](https://tableplus.com/) para visualizar la base de datos (opcional)

## Configuración del Proyecto

1. Clona el repositorio:

    ```bash
    git clone https://github.com/tuusuario/nombre-repo-backend.git
    cd nombre-repo-backend
    ```

2. Instala las dependencias:

    ```bash
    npm install
    ```

3. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:

    ```plaintext
    DB_HOST=
    DB_USER=
    DB_PASS=
    DB_NAME=
    DB_PORT=
    JWT_SECRET=
    PORT=
    ```

4. Crea la base de datos en MySQL:

    Accede a MySQL desde tu terminal o usa una herramienta como TablePlus para crear la base de datos:

    ```sql
    CREATE DATABASE nombre_de_base_de_datos;
    ```

5. Ejecuta las migraciones para configurar las tablas:

    ```bash
    npx sequelize db:migrate
    ```

6. (Opcional) Si tienes datos iniciales, puedes ejecutar los seeders:

    ```bash
    npx sequelize db:seed:all
    ```

7. **Visualización en TablePlus**:  
   Abre TablePlus y conéctalo a la base de datos MySQL utilizando las credenciales de `.env`. Una vez conectado, podrás ver y explorar la estructura de las tablas y los datos almacenados.

## Scripts Disponibles

- `npm start`: Inicia el servidor en modo de producción.
- `npm run dev`: Inicia el servidor en modo de desarrollo.
- `npm run migrate`: Ejecuta las migraciones de la base de datos.
- `npm run seed`: Inserta datos iniciales en la base de datos usando los seeders.
- `npm run lint`: Ejecuta el linter para revisar el código.

## Estructura de la Base de Datos

Este backend utiliza una estructura de base de datos con las siguientes tablas principales:

1. **Usuarios (`users`)**: Almacena los datos del usuario registrado.
2. **Prompts (`prompts`)**: Almacena los prompts ingresados por los usuarios.
3. **Textos Generados (`textGenerated`)**: Contiene los textos generados asociados a cada prompt.

### Relaciones

- Un **usuario** puede tener múltiples **prompts**.
- Cada **prompt** pertenece a un **usuario**.
- Cada **prompt** tiene un **texto generado** asociado.

## Endpoints Principales

| Método | Endpoint                   | Descripción                                 |
|--------|-----------------------------|---------------------------------------------|
| POST   | `/user/signup`              | Registra un nuevo usuario                   |
| POST   | `/user/login`               | Autentica un usuario                        |
| POST   | `/user/promptAndTextGenerated` | Crea un prompt y un texto generado asociado |
| GET    | `/user/prompts`             | Obtiene todos los prompts de un usuario     |
| GET    | `/user/history`             | Obtiene el historial de prompts y textos generados de un usuario |

Para obtener detalles específicos de cada endpoint, revisa la carpeta `routes` en el código fuente.

## Licencia

Este proyecto está licenciado bajo la [Licencia MIT](LICENSE).
