"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    //aqui se coloca la definicion de mis datos:
    nombre: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    tipoDocumento: {
        type: String,
        required: true,
    },
    numeroDocumento: {
        type: String,
        required: true,
        unique: true,
    },
    login: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    rol: {
        type: String,
        required: true,
        default: "admin",
    },
    estado: {
        type: Boolean,
        required: true,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});
const UserModel = (0, mongoose_1.model)("usuario", UserSchema);
exports.default = UserModel;
//# sourceMappingURL=user.model.js.map