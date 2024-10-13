import { db } from "@/app/_lib/prisma";

export const getTotalSales = async (): Promise<number>  => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const totalSales = await db.sale.count();

    return totalSales;
}