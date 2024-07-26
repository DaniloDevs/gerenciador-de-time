import { prisma } from "@/connection/prisma";
import { server } from "@/index";
import fastify from "fastify";
import { describe, expect, test } from "vitest";



describe('Auth Routes', () => {
     server.listen({ port: 1010 })
     test('POST /register/technician', async () => {
          const response = await server.inject({
               method: 'POST',
               url: '/register/technician',
               payload: {
                    name: "Cristian",
                    email: "test.cristian@gmail.com",
                    password: "1234",
                    role: "TECHNIQUE"
               }
          })
          expect(response.statusCode).toBe(201)
     })

     test('POST /Login', async () => {
          const response = await server.inject({
               method: 'POST',
               url: '/login',
               payload: {
                    email: "test.cristian@gmail.com",
                    password: "1234",
               }
          })

          expect(response.statusCode).toBe(202)

     })
     test('POST /logout', async () => {
          const response = await server.inject({
               method: 'POST',
               url: '/logout',
          })

          expect(response.statusCode).toBe(200)
     })

     test('', async () => {
          await prisma.technician.delete({ where: { email: "test.cristian@gmail.com" } })
          server.close()
     })
})