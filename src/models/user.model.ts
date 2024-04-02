import { Model, Schema, model } from "mongoose";

const UserSchema = new Schema({
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

const UserModel: Model<any> = model("usuario", UserSchema);

export default UserModel;
