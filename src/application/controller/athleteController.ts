import { prisma } from "@/infrastructure/connection/prisma";
import { FastifyReply, FastifyRequest } from "fastify";


export interface IAthleteController {
     findAll(request: FastifyRequest, reply: FastifyReply): Promise<void>
     findUnique(request: FastifyRequest, reply: FastifyReply): Promise<void>
}

export class AthleteController implements IAthleteController {

     async findAll(request: FastifyRequest, reply: FastifyReply): Promise<void> {
          const athletes = await prisma.athlete.findMany({})

          return reply.status(200).send({
               Message: `All athletes were listed`,
               Athletes: athletes
          })
     }

     async findUnique(request: FastifyRequest, reply: FastifyReply): Promise<void> {
          const { id } = request.params as { id: string }

          const athletes = await prisma.athlete.findUniqueOrThrow({ where: { id } })

          return reply.status(200).send({
               Message: `The athlete was successfully listed`,
               Athletes: athletes
          })
     }

}
