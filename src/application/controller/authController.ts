import { server } from "@/index";
import { prisma } from "@/infrastructure/connection/prisma";
import { Athlete, Technician } from "@prisma/client";
import bcrypt from "bcrypt";
import { FastifyReply, FastifyRequest } from "fastify";

interface IAtucController {
     registerTechnician(request: FastifyRequest, reply: FastifyReply): Promise<void>
     login(request: FastifyRequest, reply: FastifyReply): Promise<void>
     logout(request: FastifyRequest, reply: FastifyReply): Promise<void>
}

export class AuthController implements IAtucController {

     async registerTechnician(request: FastifyRequest, reply: FastifyReply): Promise<void> {
          const { name, email, password, role } = request.body as Technician
          const existUser = await prisma.technician.findUnique({ where: { email } })

          if (existUser) {
               reply.status(400).send({
                    Message: "The email is already being used!"
               })
          }

          const technician = await prisma.technician.create({
               data: {
                    name,
                    email,
                    password: bcrypt.hashSync(password, 10),
                    role
               },
          })

          return reply.status(201).send({
               Message: `Technician ${technician.name} was created successfully`,
               Technician: technician
          })
     }

     async registerAthlete(request: FastifyRequest, reply: FastifyReply): Promise<void> {
          const { name, email, password, shirtNmber, position, role } = request.body as Athlete
          const existUser = await prisma.athlete.findUnique({ where: { email } })

          if (existUser) {
               reply.status(400).send({
                    Message: "The email is already being used!"
               })
          }

          const athlete = await prisma.athlete.create({
               data: {
                    name,
                    email,
                    password: bcrypt.hashSync(password, 10),
                    position,
                    shirtNmber,
                    role
               },
          })


          return reply.status(201).send({
               Message: `Athlete ${athlete.name} was created successfully`,
               Athlete: athlete
          })
     }

     async login(request: FastifyRequest, reply: FastifyReply): Promise<void> {
          const { email, password } = request.body as { email: string, password: string }

          const user =
               (await prisma.technician.findUnique({ where: { email } })) ??
               (await prisma.athlete.findUnique({ where: { email } })) as Technician | Athlete

          if (!user) {
               reply.status(404).send({
                    Message: "This email does not belong to any user"
               })
          }

          if (bcrypt.compareSync(password, user.password)) {
               const token = server.jwt.sign({
                    id: user.id,
                    role: user.role
               })

               reply.setCookie('token', token, {
                    maxAge: 60 * 60 * 24
               })


               return reply.status(202).send({
                    Message: "Authorized access",
                    User: user.name,
                    Token: token
               })
          } else {
               return reply.status(401).send({
                    Message: "Unauthorized access"
               })
          }
     }

     async logout(request: FastifyRequest, reply: FastifyReply): Promise<void> {
          reply.clearCookie("token")

          return reply.status(200).send({
               Message: "Logout completed successfully"
          })
     }
}