
import Header, { HeaderLeft, HeaderRight, HeaderSubtitle, HeaderTitle } from "../_components/header";
import { ComboboxOption } from "../_components/ui/combobox";
import { DataTable } from "../_components/ui/data-table";
import { GetProducts } from "../_data-access/product/get-products";
import { getSales } from "../_data-access/sale/get-sales";
import CreateSaleButton from "./_components/create-sale-button";
import { saleTableColumns } from "./_components/table-columns";


const SalesPage = async () => {
    const sales = await getSales();
    const products = await GetProducts();
    const productOptions: ComboboxOption[] = products.map((product) => ({
        label: product.name,
        value: product.id,
}))
    return (  
        <div className="w-full space-y-8 m-8 rounded-lg p-8 bg-white overflow-auto">

            <Header>
                <HeaderLeft> 
                    <HeaderSubtitle>Sales Management</HeaderSubtitle>
                    <HeaderTitle>Sales</HeaderTitle>
                </HeaderLeft>

                <HeaderRight>
                   <CreateSaleButton  products={products} productOptions={productOptions}/>
                </HeaderRight>
            </Header>
    
         <DataTable columns={saleTableColumns} data={sales}/>  
    </div>
    );
}
 
export default SalesPage;