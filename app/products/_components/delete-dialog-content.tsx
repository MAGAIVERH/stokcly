import { deleteProduct } from "@/app/_actions/product/delete-product";
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/app/_components/ui/alert-dialog";
import { toast } from "sonner";


interface DeleteProductDialogContentProps {
  productId: string;
}
const DeleteProductDialogContent = ({productId}: DeleteProductDialogContentProps ) => {

    const handleContinueClick = async () => {
      try {
        await deleteProduct({id: productId})
        toast.success("Product deleted successfully.")
      } catch (error) {
        toast.error("An error occurred while deleting the product.")
        console.error(error)
      }
    }
    return ( 
        <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. 
            This product will be permanently removed from your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleContinueClick}>Continue</AlertDialogAction>
        </AlertDialogFooter>
    </AlertDialogContent> 
     );
}
 
export default DeleteProductDialogContent;