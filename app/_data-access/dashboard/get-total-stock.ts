import "server-only"
import { db } from "@/app/_lib/prisma"

export const getTotalStock = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const totalStock = await db.product.aggregate({
        _sum: {
            stock: true,
        }
    })
    return  Number(totalStock._sum.stock);
}