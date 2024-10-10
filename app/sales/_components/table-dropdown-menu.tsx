import { deleteSale } from "@/app/_actions/product/sale/delete-sale";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/app/_components/ui/dropdown-menu";
import { Sale } from "@prisma/client";
import { MoreHorizontalIcon, ClipboardCopyIcon,  TrashIcon } from "lucide-react";
import { toast } from "sonner";
import {useAction} from "next-safe-action/hooks";


interface SalesTableDropdownMenuProps {
    sale: Pick<Sale, 'id'>
}


const SalesTableDropdownMenu = ({sale}: SalesTableDropdownMenuProps) => {

    const {execute} = useAction(deleteSale, {
        onSuccess: () => {
            toast.success("Sale deleted successfully.")
        },
        onError: () => {
            toast.error("Error deleting sale.")
        }
    })

    const handleCopyToClipboardClick = () => {
        navigator.clipboard.writeText(sale.id)
        toast.success("ID copied to clipboard.")
    }

    const handleConfirmDeleteClick = () => execute({ id: sale.id});

    return ( 
        <AlertDialog> 
        
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
                onClick={handleCopyToClipboardClick}>
                <ClipboardCopyIcon size={16}/>
                  Copy ID
              </DropdownMenuItem>
              
              
            
            <AlertDialogTrigger asChild>
              <DropdownMenuItem className="gap-1.5">   
                    <TrashIcon size={16}/>
                    Delete
              </DropdownMenuItem>     
            </AlertDialogTrigger>
                            
            </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. 
            This sale will be permanently removed from your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirmDeleteClick}>Continue</AlertDialogAction>
        </AlertDialogFooter>
    </AlertDialogContent> 
       
      </AlertDialog>
     );
}
 
export default SalesTableDropdownMenu;

