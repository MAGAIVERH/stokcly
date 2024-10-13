import { getMostSoldProducts } from "@/app/_data-access/dashboard/get-most-sold-products";
import MostSoldProductItem from "./most-sold-product-item";


const MostSoldProductCard = async () => {
    const mostSoldProducts = await getMostSoldProducts()
    return ( 
        <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white">
              <p className="text-lg font-semibold text-slate-900 p-6"> Best Selling Products </p>

              <div className="overflow-y-auto space-y-7 pb-6 px-6">
                {mostSoldProducts.map((product) => (
                  <MostSoldProductItem key={product.productId} product={product}/>
                ))}
              </div>
        </div>
     );
}
 
export default MostSoldProductCard;