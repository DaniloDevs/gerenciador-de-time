import { z } from "zod";

export const findUnique = {
     params: z.object({
          id: z.string().uuid()
     })
}