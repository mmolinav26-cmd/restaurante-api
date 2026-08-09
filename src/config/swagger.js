
import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "API REST - Sistema de Reservaciones",
        version: "1.0.0",
        description: "API para gestionar usuarios, mesas y reservaciones de un restaurante",
    },
    servers: [
        {
            url: "http://localhost:3000",
            description: "Servidor local",
        },
    ],
};

const swaggerOptions = {
    definition: swaggerDefinition,
    apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;

