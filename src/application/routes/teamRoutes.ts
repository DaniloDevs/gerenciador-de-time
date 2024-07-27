import { prisma } from "@/infrastructure/connection/prisma";
import { createSlug } from "@/infrastructure/utils/createSlug";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { findUnique, findAllMenbers, update, create } from "./schemas/team";

export async function TeamRoutes(server: FastifyInstance) {
     server.withTypeProvider<ZodTypeProvider>()
          .post("/teams/create",
               {
                    schema: create
               }
               , async (request, reply) => {
                    const { token } = request.cookies as { token: string }

                    if (!token) {
                         return reply.status(400).send({ Message: "Unable to find token" })
                    }

                    if (!server.jwt.verify(token)) {
                         return reply.status(400).send({ Message: "Invalid token" })
                    }

                    const { id, role } = server.jwt.decode(token) as { id: string, role: string }
                    const technician = await prisma.technician.findUnique({ where: { id } })

                    if (role === "ATHLETE") {
                         return reply.status(400).send({ Message: "Athletes cannot create a team" })
                    }
                    if (!technician) {
                         return reply.status(400).send({ Message: "The technician who is logged in does not exist" })
                    }

                    const { name } = request.body

                    const team = await prisma.team.create({
                         data: {
                              name,
                              slug: createSlug(name),
                              Technician: {
                                   connect: {
                                        id
                                   }
                              }
                         }
                    })


                    return reply.status(201).send({
                         Message: `Team ${team.name} was created successfully`,
                         team: team
                    })
               })

          .get("/teams", async (request, reply) => {

               const teams = await prisma.team.findMany()

               return reply.status(200).send({
                    Message: 'All teams have been listed',
                    Teams: teams
               })
          })

          .get("/teams/:slug",
               {
                    schema: findUnique
               }
               , async (request, reply) => {
                    const { slug } = request.params

                    const team = await prisma.team.findUnique({ where: { slug } })

                    if (!team) {
                         return reply.status(400).send({ Message: "Team not found" })
                    }

                    return reply.status(200).send({
                         Message: `team ${team.name} has been successfully listed`,
                         Team: team
                    })
               })

          .get("/teams/:slug/members",
               {
                    schema: findAllMenbers
               }
               , async (request, reply) => {
                    const { slug } = request.params
                    const team = await prisma.team.findUnique({ where: { slug } })

                    const members = await prisma.team.findUnique({
                         where: { slug },
                         select: {
                              members: {
                                   select: {
                                        name: true,
                                        position: true,
                                        shirtNmber: true
                                   }
                              }
                         }
                    })

                    if (!team) {
                         return reply.status(400).send({ Message: "Team not found" })
                    }

                    return reply.status(200).send({
                         Message: `All athletes from team ${team.name} have been successfully listed`,
                         Menbers: members
                    })

               })

          .put("/teams/:slug/update",
               {
                    schema: update
               }
               , async (request, reply) => {
                    const { token } = request.cookies as { token: string }

                    if (!token) {
                         return reply.status(400).send({ Message: "Unable to find token" })
                    }

                    if (!server.jwt.verify(token)) {
                         return reply.status(400).send({ Message: "Invalid token" })
                    }

                    const { id, role } = server.jwt.decode(token) as { id: string, role: string }
                    const technician = await prisma.technician.findUnique({ where: { id } })

                    if (role === "ATHLETE") {
                         return reply.status(400).send({ Message: "Athletes cannot create a team" })
                    }

                    if (!technician) {
                         return reply.status(400).send({ Message: "The technician who is logged in does not exist" })
                    }

                    const { slug } = request.params as { slug: string }

                    const { name } = request.body

                    const team = await prisma.team.update({
                         where: { slug },
                         data: {
                              name,
                              slug: createSlug(name)
                         }
                    })


                    return reply.status(200).send({
                         Message: `The ${team.name} team was successfully updated`,
                         team: team
                    })
               })

}