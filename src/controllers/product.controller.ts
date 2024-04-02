import { Request, Response } from "express";
import ProductoModel from "../models/product.model";
import { CustomRequest } from "../middlewares/validate-jwt";

// aca va la logica de la data - crear, actualizar, etc.
export const createProduct = async (req: CustomRequest, res: Response) => {
  const { body } = req;
  const id = req._id;

  console.log("El id del usuario autenticado: ", id);
  try {
    const productNuevo = new ProductoModel({ usuario: id, ...body });
    const productCreado = await productNuevo.save();

    res.status(200).json({
      ok: true,
      msg: "Usuario registrado",
      producto: productCreado,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: "Error al crear el producto",
    });
  }
};

export const getProductos = async (req: Request, res: Response) => {
  try {
    // devuelve todo el listado de productos con la información que el usuario creó
    const productos = await ProductoModel.find().populate({
      path: "usuario",
      select: "nombre, numeroDocumento, email",
    });
    res.json({
      ok: true,
      productos,
    });
  } catch (error) {
    res.json({
      ok: false,
      error,
    });
  }
};
