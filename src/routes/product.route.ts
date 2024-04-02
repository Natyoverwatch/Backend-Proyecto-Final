// esta ruta toma el path de cliente (Path: /api/v1/cliente)

import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import validateJWT from "../middlewares/validate-jwt";
import { createProduct, getProductos } from "../controllers/product.controller";

const router = Router();
// post permite crear, put permite actualizar, get permite traer el dato, delete permite borrar
router.post(
  "/",
  validateJWT,
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("precio", "El precio es obligatorio").not().isEmpty(),
    check("categoria", "La categoria es obligatorio").not().isEmpty(),
    validateFields,
  ],
  createProduct
);
router.get("/", validateJWT, getProductos);

export default router;
