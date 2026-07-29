import swaggerJSDoc from "swagger-jsdoc";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - email
 *         - password
 *       properties:
 *         first_name:
 *           type: string
 *           description: El nombre del usuario
 *         last_name:
 *           type: string
 *           description: El apellido del usuario
 *         email:
 *           type: string
 *           description: El correo electrónico del usuario
 *         password:
 *           type: string
 *           description: La contraseña del usuario
 */

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Usuarios - AdoptMe",
      version: "1.0.0",
      description: "Documentación de la API de usuarios de AdoptMe",
    },
    servers: [
      {
        url: "http://localhost:8080/api",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
