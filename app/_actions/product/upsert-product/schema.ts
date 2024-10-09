import { z } from "zod"


export const upsertProductSchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string().trim().min(1, {
      message: "The product name is required."
    }),
  
    price: z.number().min(0.01, {
      message: "The product price is required."
    }),
    stock: z.coerce.number().int().min(0, {
      message: "The stock quantity is required."
    })
  })

export type UpsertProductSchema = z.infer<typeof upsertProductSchema>;