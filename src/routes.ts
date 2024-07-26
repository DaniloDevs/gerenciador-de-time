import { errorHandler } from "@/errors/errorHandler";
import { FastifyInstance, FastifyRequest } from "fastify";
import { Authoutes } from "./routes/authRoutes";
import { TeamRoutes } from "./routes/teamRoutes";


export async function Routes(server: FastifyInstance) {
     server.setErrorHandler(errorHandler)
     server.get('/', () => "Server Running")

     //! Rotas
     server.register(Authoutes)
     server.register(TeamRoutes)
}