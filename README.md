# 🍽️ Restaurante API

🚀 API REST para la gestión de **autenticación, mesas y reservaciones** de un restaurante, desarrollada con **Node.js y Express**.

## 🛠️ Tecnologías

* 🟢 Node.js
* ⚡ Express
* 🐘 PostgreSQL
* 📚 Swagger / OpenAPI
* 🔐 Middleware de autenticación y roles
* 🌐 CORS
* 🔄 Nodemon
* 🌱 dotenv

## 📂 Estructura del proyecto

```text
restaurante-api/
├── 📁 src/
│   ├── ⚙️ config/
│   │   ├── db.js
│   │   └── swagger.js
│   │
│   ├── 🎮 controllers/
│   │   ├── auth.controller.js
│   │   ├── mesas.controller.js
│   │   └── reservaciones.controller.js
│   │
│   ├── 🛡️ middlewares/
│   │   ├── auth.middleware.js
│   │   └── role.middleware.js
│   │
│   ├── 🛣️ routes/
│   │   ├── auth.routes.js
│   │   ├── mesas.routes.js
│   │   └── reservaciones.routes.js
│   │
│   └── 🚀 app.js
│
└── 📄 README.md
```


## 🌐 Endpoints

| 🔧 Módulo        | 📍 Endpoint          |
| ---------------- | -------------------- |
| 🔐 Auth          | `/api/auth`          |
| 🪑 Mesas         | `/api/mesas`         |
| 📅 Reservaciones | `/api/reservaciones` |
| 📚 Swagger       | `/api-docs`          |

## 📚 Documentación

Swagger UI:

```text
http://localhost:3000/api-docs
```

## 👨‍💻 Autor

**Manfredy Alberto Molina Villegas**

⭐ **Restaurante API**
