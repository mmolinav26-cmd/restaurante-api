import express from "express";

const router = express.Router();

// RUTA DE PRUEBA - AUTENTICACIÓN
router.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Módulo de autenticación funcionando correctamente"
    });
});


// EXPORTAR ROUTER
export default router;
