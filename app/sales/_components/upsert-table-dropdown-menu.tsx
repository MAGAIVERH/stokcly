import { Button } from "@/app/_components/ui/button";


import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/app/_components/ui/dropdown-menu";
import { MoreHorizontalIcon, ClipboardCopyIcon,TrashIcon } from "lucide-react";
import { Product } from "@prisma/client";


interface UpsertSaleTableDropdownMenuProps {
    product: Pick<Product, 'id'>;
    onDelete: (productId: string) => void
}
const UpsertSaleTableDropdownMenu = ({product, onDelete}:UpsertSaleTableDropdownMenuProps) => {
    return ( 
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                  <MoreHorizontalIcon  size={16}/>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
  
              <DropdownMenuSeparator />
  
              <DropdownMenuItem 
                className="gap-1.5" 
                onClick={() => navigator.clipboard.writeText(product.id)}>
                <ClipboardCopyIcon size={16}/>
                  Copy ID
              </DropdownMenuItem>
                      
              <DropdownMenuItem className="gap-1.5" onClick={() => onDelete(product.id)}>   
                    <TrashIcon size={16}/>
                    Delete
              </DropdownMenuItem>          
                   
            </DropdownMenuContent>
        </DropdownMenu>       
    );
}
 
export default UpsertSaleTableDropdownMenu;