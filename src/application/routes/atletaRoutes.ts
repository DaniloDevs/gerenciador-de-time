import { prisma } from "@/infrastructure/connection/prisma";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export async function AthleteRoutes(server: FastifyInstance) {
     server.withTypeProvider<ZodTypeProvider>()
          .get('/athletes', async (reuqest, reply) => {
               const athletes = await prisma.athlete.findMany({})

               return reply.status(200).send({
                    Message: `All athletes were listed`,
                    Athletes: athletes
               })
          })
          .get('/athletes/:id',
               {
                    schema: {
                         params: z.object({
                              id: z.string().uuid()
                         })
                    }
               }
               , async (request, reply) => {
                    const { id } = request.params

                    const athletes = await prisma.athlete.findUniqueOrThrow({ where: { id } })

                    return reply.status(200).send({
                         Message: `The athlete was successfully listed`,
                         Athletes: athletes
                    })
               })
}