
import "server-only";

import { db } from "@/app/_lib/prisma"
import { Product } from "@prisma/client"
import { unstable_cache } from "next/cache";

export const GetProducts = async (): Promise<Product[]> => {
  return  await db.product.findMany({ })
}

export const cachedGetProducts = unstable_cache(GetProducts, ["GetProducts"], 
  {
    tags: ["Get-Products"],
    revalidate: 60,
  }
)