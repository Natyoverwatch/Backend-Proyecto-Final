"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = require("./database/connection");
const client_route_1 = __importDefault(require("./routes/client.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const product_route_1 = __importDefault(require("./routes/product.route"));
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        this.apiPaths = {
            cliente: "/api/v1/cliente",
            user: "/api/v1/user",
            auth: "/api/v1/auth",
            product: "/api/v1/product",
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "3000";
        // Base de datos
        (0, connection_1.dbConnection)();
        // Métodos Iniciales
        this.middlewares();
        // Rutas
        this.routes();
    }
    miPrimeraApi() {
        this.app.get("/", (req, res) => res.status(200).json({ msg: "Information" }));
    }
    middlewares() {
        this.app.use((0, cors_1.default)()); // para el intercambio de recursos, permisos para poder consumir mi API
        // Lectura del Body - conviente lo que se vaya a enviar a formato json
        this.app.use(express_1.default.json());
        this.miPrimeraApi();
    }
    routes() {
        this.app.use(this.apiPaths.cliente, client_route_1.default);
        this.app.use(this.apiPaths.user, user_route_1.default);
        this.app.use(this.apiPaths.auth, auth_route_1.default);
        this.app.use(this.apiPaths.product, product_route_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en el puerto", this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map