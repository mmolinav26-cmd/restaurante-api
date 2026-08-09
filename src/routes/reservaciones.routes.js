import express from "express";

const router = express.Router();


// RUTAS DE RESERVACIONES
// Obtener reservaciones
router.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Listado de reservaciones funcionando correctamente"
    });
});

// Crear reservación
router.post("/", (req, res) => {
    res.status(201).json({
        success: true,
        message: "Reservación creada correctamente"
    });
});


// EXPORTAR ROUTER
export default router;
