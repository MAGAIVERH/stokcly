
import { DataTable } from "../_components/ui/data-table";
import { productTableColumns } from "./_components/table-columns";
import { GetProducts } from "../_data-access/product/get-products";
import CreateProductButton from "./_components/create-product-button";
import Header, { HeaderLeft, HeaderRight, HeaderSubtitle, HeaderTitle } from "../_components/header";
    
const ProductsPage = async () => {

    const products = await GetProducts();

    return ( 
        <div className="w-full space-y-8 m-8 rounded-lg p-8 bg-white">

            <Header>
                <HeaderLeft> 
                    <HeaderSubtitle>Product Management</HeaderSubtitle>
                    <HeaderTitle>Products</HeaderTitle>
                </HeaderLeft>

                <HeaderRight>
                   <CreateProductButton/>
                </HeaderRight>
            </Header>
         
             <DataTable columns={productTableColumns} data={products}/>  
        </div>
     );
}
 
export default ProductsPage;