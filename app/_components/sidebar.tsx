

import { LayoutGridIcon, PackageIcon, ShoppingBasketIcon } from "lucide-react"
import SidebarButton from "./sidebar-button";

const SideBar = () => {
    
    return ( 
       <div className="w-64 bg-white">
            {/*Image */}
            <div className="px-8 py-6">
                <h1 className="font-bold text-2xl">STOCKLY</h1>
            </div>

            {/*Buttons */}
            <div className="flex flex-col gap-2 p-2">
                <SidebarButton href="/">
                     <LayoutGridIcon  size={20}/>
                        Dashboard
                </SidebarButton>

               <SidebarButton href="/products">
                    <PackageIcon  size={20}/>
                        Products
               </SidebarButton>
            
              <SidebarButton href="/sales">
                    <ShoppingBasketIcon  size={20}/>
                        Sales
              </SidebarButton>
             
            </div>

       </div>
     );
}
 
export default SideBar;