import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { AuthController } from "../controller/authController";
import { login, registerAthlete, registerTechnique } from "./schemas/auth";


export async function Authoutes(server: FastifyInstance) {
     const controller = new AuthController()

     server.withTypeProvider<ZodTypeProvider>()
          .post('/register/technician',
               {
                    schema: registerTechnique
               }
               , controller.registerTechnician.bind(controller))

          .post('/register/athlete',
               {
                    schema: registerAthlete
               },
               controller.registerAthlete.bind(controller))

          .post('/login',
               {
                    schema: login
               }
               , controller.login.bind(controller))

          .post('/logout',
               {
                    schema: {}
               }
               , controller.logout.bind(controller))
}

