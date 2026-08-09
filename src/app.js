import "dotenv/config";
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

import authRoutes from "./routes/auth.routes.js";
import mesasRoutes from "./routes/mesas.routes.js";
import reservacionesRoutes from "./routes/reservaciones.routes.js";

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());


// SWAGGER
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);


// RUTAS
app.use("/api/auth", authRoutes);
app.use("/api/mesas", mesasRoutes);
app.use("/api/reservaciones", reservacionesRoutes);


// RUTA PRINCIPAL
app.get("/", (req, res) => {
    res.send(
        "API REST de Restaurante está Activa. La ruta /api-docs para ver la documentación interactiva."
    );
});


// SERVIDOR
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor iniciado en http://localhost:${PORT}`);
    console.log(`📚 Swagger disponible en http://localhost:${PORT}/api-docs`);
});


