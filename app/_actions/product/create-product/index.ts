"use server"

import { db } from "@/app/_lib/prisma"
import { revalidatePath } from "next/cache"
import { CreateProductSchema, createProductSchema } from "./schema";



export const CreateProduct = async (data: CreateProductSchema ) => {
    createProductSchema.parse(data);
    await db.product.create({
        data,
    });
    revalidatePath("/products");
}