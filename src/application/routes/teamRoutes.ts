import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { create, findAllMenbers, findUnique, update } from "./schemas/team";
import { TeamController } from "../controller/teamController";

export async function TeamRoutes(server: FastifyInstance) {
     const controller = new TeamController()

     server.withTypeProvider<ZodTypeProvider>()
          .post("/teams/create",
               {
                    schema: create
               }
               , controller.create.bind(controller))

          .get("/teams",
               {
                    schema: {}
               }
               , controller.findAll.bind(controller))

          .get("/teams/:slug",
               {
                    schema: findUnique
               }
               , controller.findUnique.bind(controller))

          .get("/teams/:slug/members",
               {
                    schema: findAllMenbers
               }
               , controller.findAllMembers.bind(controller))

          .put("/teams/:slug/update",
               {
                    schema: update
               }
               , controller.update.bind(controller))
}