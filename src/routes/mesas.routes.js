import express from "express";

const router = express.Router();


// RUTAS DE MESAS
// Obtener todas las mesas
router.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Listado de mesas funcionando correctamente"
    });
});

// Crear una mesa
router.post("/", (req, res) => {
    res.status(201).json({
        success: true,
        message: "Mesa creada correctamente"
    });
});


// EXPORTAR ROUTER
export default router;
