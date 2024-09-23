import { PlusIcon } from "lucide-react";
import { Button } from "../_components/ui/button";
import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { productTableColumns } from "./_components/table-columns";


const ProductsPage = async () => {

    const products = await db.product.findMany({ })
    return ( 
        <div className="w-full space-y-8 m-8 rounded-lg p-8 bg-white">
            {/* Left */}
            <div className="flex w-full items-center justify-between">
                <div className="space-y-1">
                    <span className="text-xs font-semibold text-slate-500">Product Management</span>
                    <h2 className="text-xl font-semibold">Products</h2>
                </div>

                <Button className="gap-2">
                    <PlusIcon  size={20}/>
                    New Product
                </Button>
            </div>
            
            <DataTable columns={productTableColumns} data={products}/>
        </div>
     );
}
 
export default ProductsPage;