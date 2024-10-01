import { Button } from "../_components/ui/button";
import { ComboboxOption } from "../_components/ui/combobox";
import { Sheet, SheetTrigger } from "../_components/ui/sheet";
import { GetProducts } from "../_data-access/product/get-products";
import UpsertSheetContent from "./_components/upsert-sheet-content";

const SalesPage = async () => {
    const products = await GetProducts();
    const productOptions: ComboboxOption[] = products.map((product) => ({
        label: product.name,
        value: product.id,
}))
    return (  
        <div className="w-full space-y-8 m-8 rounded-lg p-8 bg-white">
        <div className="flex w-full items-center justify-between">
            <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-500">
                    Sales Management
                </span>
                <h2 className="text-xl font-semibold">
                    Sales
                </h2>
            </div>
            <Sheet>
                <SheetTrigger asChild>
                    <Button>New Sale</Button>
                </SheetTrigger>

                <UpsertSheetContent products={products} productOptions={productOptions}/>
            </Sheet>
            
           
        </div>
         {/* <DataTable columns={productTableColumns} data={products}/>   */}
    </div>
    );
}
 
export default SalesPage;