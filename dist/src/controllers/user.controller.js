"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getaUser = exports.getAllUsers = exports.createUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { login, password, numeroDocumento } = body;
    console.log("Estoy en el controlador");
    try {
        const existLogin = yield user_model_1.default.findOne({
            login: login,
        });
        if (existLogin) {
            return res.status(409).json({
                ok: false,
                msg: `Ya existe un login ${login} creado`,
            });
        }
        const existDocument = yield user_model_1.default.findOne({
            numeroDocumento: numeroDocumento,
        });
        if (existDocument) {
            return res.status(409).json({
                ok: false,
                msg: `Ya existe un usuario con el documento ${numeroDocumento} creado`,
            });
        }
        const newUser = new user_model_1.default(Object.assign({}, body));
        const salt = bcryptjs_1.default.genSaltSync(10);
        newUser.password = bcryptjs_1.default.hashSync(password, salt);
        console.log("contaseña: ", newUser.password);
        const userCreate = yield newUser.save();
        res.status(200).json({
            ok: true,
            msg: "Usuario creado satisfactoriamente",
            userCreate,
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            ok: false,
            msg: "Error al crear el usuario, comuniquese con el administrador",
        });
    }
});
exports.createUser = createUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // El busca todos los usuarios
        const usuarios = yield user_model_1.default.find();
        res.json({
            ok: true,
            usuarios,
        });
    }
    catch (err) {
        res.status(500).json({
            ok: false,
            msg: "Error consultar los usuarios",
        });
    }
});
exports.getAllUsers = getAllUsers;
const getaUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        console.log(id);
        // El busca un usuario por id
        const usuario = yield user_model_1.default.findById({ _id: id });
        res.json({
            ok: true,
            usuario,
        });
    }
    catch (err) {
        res.status(500).json({
            ok: false,
            msg: "Error consultar los usuarios",
        });
    }
});
exports.getaUser = getaUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // id del usuario
        const id = req.params.id;
        const { body } = req;
        console.log(id);
        // El update del usuario - Actualizar el usuario
        const userActualizo = yield user_model_1.default.findByIdAndUpdate(id, body, {
            new: true,
        });
        res.json({
            ok: true,
            usuario: userActualizo,
        });
    }
    catch (err) {
        res.status(400).json({
            ok: false,
            msg: "Error consultar los usuarios",
        });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // id del usuario
        const id = req.params.id;
        const { body } = req;
        console.log(id);
        // la eliminacion del usuario
        const usuarioEliminado = yield user_model_1.default.findByIdAndDelete(id);
        res.json({
            ok: true,
            usuario: usuarioEliminado,
        });
    }
    catch (err) {
        res.status(400).json({
            ok: false,
            msg: "Error consultar los clientes",
        });
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.controller.js.map