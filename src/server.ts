import express, { Application, Request, Response } from "express";
import { dbConnection } from "./database/connection";
import clienteRoutes from "./routes/client.route";
import userRoutes from "./routes/user.route";
import authRoutes from "./routes/auth.route";
import productRoutes from "./routes/product.route";
import cors from "cors";

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    cliente: "/api/v1/cliente",
    user: "/api/v1/user",
    auth: "/api/v1/auth",
    product: "/api/v1/product",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3000";

    // Base de datos
    dbConnection();

    // Métodos Iniciales
    this.middlewares();

    // Rutas
    this.routes();
  }

  miPrimeraApi() {
    this.app.get("/", (req: Request, res: Response) =>
      res.status(200).json({ msg: "Information" })
    );
  }

  middlewares() {
    this.app.use(cors()); // para el intercambio de recursos, permisos para poder consumir mi API
    // Lectura del Body - conviente lo que se vaya a enviar a formato json
    this.app.use(express.json());

    this.miPrimeraApi();
  }

  routes(): void {
    this.app.use(this.apiPaths.cliente, clienteRoutes);
    this.app.use(this.apiPaths.user, userRoutes);
    this.app.use(this.apiPaths.auth, authRoutes);
    this.app.use(this.apiPaths.product, productRoutes);
  }

  listen(): void {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en el puerto", this.port);
    });
  }
}

export default Server;
