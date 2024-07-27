import { errorHandler } from "@/infrastructure/errors/errorHandler";
import { FastifyInstance } from "fastify";
import { Authoutes } from "./routes/authRoutes";
import { TeamRoutes } from "./routes/teamRoutes";
import { AthleteRoutes } from "./routes/athleteRoutes";


export async function Routes(server: FastifyInstance) {
     server.setErrorHandler(errorHandler)
     server.get('/', () => "Server Running")

     //! Rotas
     server.register(Authoutes)
     server.register(TeamRoutes)
     server.register(AthleteRoutes)
}