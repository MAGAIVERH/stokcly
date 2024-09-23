
import "server-only";

import { db } from "@/app/_lib/prisma"
import { Product } from "@prisma/client"

export const GetProducts = async (): Promise<Product[]> => {
  return  await db.product.findMany({ })
}