import { prisma } from "@/infrastructure/connection/prisma";
import { server } from "@/index";
import fastify from "fastify";
import { describe, expect, test } from "vitest";



describe('Team Routes', async () => {
     server.listen({ port: 1011 })

     await server.inject({
          method: 'POST',
          url: '/register/technician',
          payload: {
               name: "edny",
               email: "test.edny@gmail.com",
               password: "1234",
               role: "TECHNIQUE"
          }
     })


     const responseLogin = await server.inject({
          method: 'POST',
          url: '/login',
          payload: {
               email: "test.edny@gmail.com",
               password: "1234",
          }
     })

     const token = responseLogin.headers["set-cookie"]


     test('POST /teams/create', async () => {
          const response = await server.inject({
               method: 'POST',
               url: '/teams/create',
               headers: { cookie: token },
               payload: {
                    name: "Super Nova"
               }
          })


          expect(response.statusCode).toBe(201)
     })

     test('GET /teams/', async () => {
          const response = await server.inject({
               method: 'GET',
               url: '/teams',
               headers: { cookie: token },
          })


          expect(response.statusCode).toBe(200)
     })

     test('GET /teams/:slug', async () => {
          const slug = 'super-nova'
          const response = await server.inject({
               method: 'GET',
               url: `/teams/${slug}`,
               headers: { cookie: token },
          })


          expect(response.statusCode).toBe(200)
     })

     test('GET /teams/:slug/members', async () => {
          const slug = 'super-nova'
          const response = await server.inject({
               method: 'GET',
               url: `/teams/${slug}/members`,
               headers: { cookie: token },
          })


          expect(response.statusCode).toBe(200)
     })
     test('PUT /teams/:slug/update', async () => {
          const slug = 'super-nova'
          const response = await server.inject({
               method: 'PUT',
               url: `/teams/${slug}/update`,
               headers: { cookie: token },
               payload: {
                    name: "Super Caxias"
               }
          })

          expect(response.statusCode).toBe(200)
     })

     test('', async () => {
          await prisma.technician.delete({ where: { email: "test.edny@gmail.com" } })
          await prisma.team.delete({ where: { slug: "super-caxias" } })
          server.close()
     })
})
