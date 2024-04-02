// esta ruta toma el path de cliente (Path: /api/v1/cliente)

import { Router } from "express";
import {
  createClients,
  deleteClient,
  getClientes,
  getaClient,
  updateClient,
  updateStateClient,
} from "../controllers/clients.controller";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import validateJWT from "../middlewares/validate-jwt";

const router = Router();
// post permite crear, put permite actualizar, get permite traer el dato, delete permite borrar
router.post(
  "/",
  validateJWT,
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("direccion", "La direccion es obligatorio").not().isEmpty(),
    check("telefono", "El telefono es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").not().isEmpty().isEmail(),
    check("tipoDocumento", "El tipo de documento es obligatorio")
      .not()
      .isEmpty(),
    check("numeroDocumento", "El numero de documento es obligatorio")
      .not()
      .isEmpty(),
    validateFields,
  ],
  createClients
);
router.get("/", /* validateJWT, */ getClientes);
router.get("/:id", validateJWT, getaClient);
router.put("/:id", validateJWT, updateClient);
router.delete("/:id", validateJWT, deleteClient);
router.put("/estado/:id", validateJWT, updateStateClient);

export default router;
