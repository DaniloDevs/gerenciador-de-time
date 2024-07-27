import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { AthleteController } from "../controller/athleteController";
import { findUnique } from "./schemas/athletes";

export async function AthleteRoutes(server: FastifyInstance) {
     const controller = new AthleteController()
     server.withTypeProvider<ZodTypeProvider>()
          .get('/athletes',
               {
                    schema: {}
               }
               , controller.findAll.bind(controller))
          .get('/athletes/:id',
               {
                    schema: findUnique
               }
               , controller.findUnique.bind(controller))
}