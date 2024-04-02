// esta ruta toma el path de user (Path: /api/v1/user)

import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getaUser,
  updateUser,
} from "../controllers/user.controller";
import validateJWT from "../middlewares/validate-jwt";

const router = Router();
// post permite crear, put permite actualizar, get permite traer el dato, delete permite borrar
router.post(
  "/",
  validateJWT,
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").not().isEmpty().isEmail(),
    check("tipoDocumento", "El tipo de documento es obligatorio")
      .not()
      .isEmpty(),
    check("numeroDocumento", "El numero de documento es obligatorio")
      .not()
      .isEmpty(),
    check("login", "El login es obligatorio").not().isEmpty(),
    check("password", "El password es obligatorio").not().isEmpty(),
    validateFields,
  ],
  createUser
);
router.get("/", validateJWT, getAllUsers);
router.get("/:id", validateJWT, getaUser);
router.put("/:id", validateJWT, updateUser);
router.delete("/:id", validateJWT, deleteUser);

export default router;
