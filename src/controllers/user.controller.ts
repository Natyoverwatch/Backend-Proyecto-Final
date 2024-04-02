import { Request, Response } from "express";
import UserModel from "../models/user.model";
import bcrypt from "bcryptjs";

export const createUser = async (req: Request, res: Response) => {
  const { body } = req;
  const { login, password, numeroDocumento } = body;
  console.log("Estoy en el controlador");
  try {
    const existLogin = await UserModel.findOne({
      login: login,
    });
    if (existLogin) {
      return res.status(409).json({
        ok: false,
        msg: `Ya existe un login ${login} creado`,
      });
    }

    const existDocument = await UserModel.findOne({
      numeroDocumento: numeroDocumento,
    });
    if (existDocument) {
      return res.status(409).json({
        ok: false,
        msg: `Ya existe un usuario con el documento ${numeroDocumento} creado`,
      });
    }

    const newUser = new UserModel({
      ...body,
    });

    const salt = bcrypt.genSaltSync(10);
    newUser.password = bcrypt.hashSync(password, salt);

    console.log("contaseña: ", newUser.password);
    const userCreate = await newUser.save();

    res.status(200).json({
      ok: true,
      msg: "Usuario creado satisfactoriamente",
      userCreate,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      ok: false,
      msg: "Error al crear el usuario, comuniquese con el administrador",
    });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    // El busca todos los usuarios
    const usuarios = await UserModel.find();
    res.json({
      ok: true,
      usuarios,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      msg: "Error consultar los usuarios",
    });
  }
};

export const getaUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    console.log(id);
    // El busca un usuario por id
    const usuario = await UserModel.findById({ _id: id });
    res.json({
      ok: true,
      usuario,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      msg: "Error consultar los usuarios",
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    // id del usuario
    const id = req.params.id;
    const { body } = req;

    console.log(id);
    // El update del usuario - Actualizar el usuario
    const userActualizo = await UserModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    res.json({
      ok: true,
      usuario: userActualizo,
    });
  } catch (err) {
    res.status(400).json({
      ok: false,
      msg: "Error consultar los usuarios",
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    // id del usuario
    const id = req.params.id;
    const { body } = req;

    console.log(id);
    // la eliminacion del usuario
    const usuarioEliminado = await UserModel.findByIdAndDelete(id);
    res.json({
      ok: true,
      usuario: usuarioEliminado,
    });
  } catch (err) {
    res.status(400).json({
      ok: false,
      msg: "Error consultar los clientes",
    });
  }
};
