import { z } from "zod"


export const createProductSchema = z.object({
    name: z.string().trim().min(1, {
      message: "The product name is required."
    }),
  
    price: z.number().min(0.01, {
      message: "The product price is required."
    }),
    stock: z.coerce.number().positive({
      message: "The stock quantity must be positive"
    }).int().min(0, {
      message: "The stock quantity is required."
    })
  })

export type CreateProductSchema = z.infer<typeof createProductSchema>;