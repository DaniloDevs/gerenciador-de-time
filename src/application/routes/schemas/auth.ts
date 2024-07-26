import { z } from "zod";

export const registerTechnique = {
     body: z.object({
          name: z.string(),
          email: z.string(),
          password: z.string(),
          role: z.enum(["ATHLETE", "TECHNIQUE"]),
     })
}

export const registerAthlete =  {
     body: z.object({
          name: z.string(),
          email: z.string(),
          password: z.string(),
          shirtNmber: z.number(),
          position: z.string(),
          role: z.enum(["ATHLETE", "TECHNIQUE"]),
     })
}

export const login = {
     body: z.object({
          email: z.string(),
          password: z.string(),
     })
}
