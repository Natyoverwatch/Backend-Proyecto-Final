import { Request, Response } from "express";
import ClienteModel from "../models/client.model";

// aca va la logica de la data - crear, actualizar, etc.
export const createClients = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const clienteNuevo = new ClienteModel(body);
    const clienteCreado = await clienteNuevo.save();

    res.status(200).json({
      ok: true,
      msg: "Usuario registrado",
      cliente: clienteCreado,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: "Error al crear el cliente",
    });
  }
};

export const getClientes = async (req: Request, res: Response) => {
  try {
    // El busca todos los clientes
    const clientes = await ClienteModel.find();
    res.json({
      ok: true,
      clientes,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      msg: "Error consultar los clientes",
    });
  }
};

export const getaClient = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    console.log(id);
    // El busca todos los clientes
    const clientes = await ClienteModel.findById({ _id: id });
    res.json({
      ok: true,
      clientes,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      msg: "Error consultar los clientes",
    });
  }
};

export const updateClient = async (req: Request, res: Response) => {
  try {
    // id del cliente
    const id = req.params.id;
    const body = req.body; // const {body} = req;

    console.log(id);
    // El update del cliente - Actualizar el cliente
    const clienteActualizo = await ClienteModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    res.json({
      ok: true,
      cliente: clienteActualizo,
    });
  } catch (err) {
    res.status(400).json({
      ok: false,
      msg: "Error consultar los clientes",
    });
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  try {
    // id del cliente
    const id = req.params.id;
    const body = req.body; // const {body} = req;

    console.log(id);
    // la eliminacion del cliente - Actualizar el cliente
    const clienteElimino = await ClienteModel.findByIdAndDelete(id);
    res.json({
      ok: true,
      cliente: clienteElimino,
    });
  } catch (err) {
    res.status(400).json({
      ok: false,
      msg: "Error consultar los clientes",
    });
  }
};

export const updateStateClient = async (req: Request, res: Response) => {
  try {
    // id del cliente
    const id = req.params.id;
    const body = req.body; // const {body} = req;
    console.log(body);
    // El update del cliente - Actualizar el cliente
    const clienteActualizo = await ClienteModel.findByIdAndUpdate(
      id,
      { estado: false },
      {
        new: true,
      }
    );
    res.json({
      ok: true,
      cliente: clienteActualizo,
    });
  } catch (err) {
    res.status(400).json({
      ok: false,
      msg: "Error consultar los clientes",
    });
  }
};
