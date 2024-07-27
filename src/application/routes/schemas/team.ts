import { z } from "zod";

export const create =  {
     body: z.object({
          name: z.string()
     })
}

export const findUnique =  {
     params: z.object({
          slug: z.string()
     })
}

export const findAllAthlete =  {
     params: z.object({
          slug: z.string()
     })
}

export const update = {
     params: z.object({
          slug: z.string()
     }),
     body: z.object({
          name: z.string()
     })
}