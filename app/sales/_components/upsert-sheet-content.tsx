"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/_components/ui/form";
import { SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/app/_components/ui/sheet";
import { Input } from "@/app/_components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Combobox, ComboboxOption } from "@/app/_components/ui/combobox";
import { Button } from "@/app/_components/ui/button";
import { CheckIcon, PlusIcon } from "lucide-react";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { Product } from "@prisma/client";
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter } from "@/app/_components/ui/table";
import { formatCurrency } from "@/app/_helpers/currency";
import UpsertSalesTableDropdownMenu from "./upsert-table-dropdown-menu";
import { createSale } from "@/app/_actions/product/sale/create-sale";
import { toast } from "sonner";




const formSchema = z.object({
    productId: z.string().uuid({
        message: "The product is mandatory"
    }),
    quantity: z.coerce.number().int().positive(),
})

type FormSchema = z.infer<typeof formSchema>;

interface UpsertSheetContentProps {
    products: Product[];
    productOptions: ComboboxOption[];
    setSheetIsOpen: Dispatch<SetStateAction<boolean>>

}

interface SelectProduct {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

const UpsertSheetContent = ({products,  productOptions, setSheetIsOpen }:UpsertSheetContentProps ) => {

    const [selectedProducts, setSelectedProducts] = useState<SelectProduct[]>([]);

    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            productId: "",
            quantity: 1,
      }
    })

    const onSubmit = (data: FormSchema ) => {
       const selectedProduct = products.find(
        (product) => product.id === data.productId
    );
       if (!selectedProduct) return;

         setSelectedProducts((currentProducts) => {
         const existingProduct = currentProducts.find(
                (product) => product.id === selectedProduct.id
            );
            
            if(existingProduct) {
              const productIsOutOfStock = 
                existingProduct.quantity + data.quantity > selectedProduct.stock;

                if(productIsOutOfStock ){
                    form.setError("quantity", {
                        message: "Quantity unavailable in stock."
                    })
                    return currentProducts;
                }
      
                form.reset()
                return currentProducts.map((product) => {
                    if(product.id ===selectedProduct.id) {
                        return {
                            ...product,
                            quantity: product.quantity + data.quantity,
                        }
                    }
                    return product;
                })
                }
                
                const productIsOutOfStock = 
                 data.quantity > selectedProduct.stock
                 if(productIsOutOfStock ){
                    form.setError("quantity", {
                        message: "Quantity unavailable in stock.",
                    })
                    return currentProducts;
                 }
                form.reset()

            return [...currentProducts, {...selectedProduct, price: Number(selectedProduct.price), quantity: data.quantity}];
       })
       
    }

    const productsTotal = useMemo(() => {
        return selectedProducts.reduce((acc, product) => {
            return acc + product.price * product.quantity
        }, 0)
    }, [selectedProducts])

    const onDelete = (productId: string) => {
        setSelectedProducts((currentProducts) => {
            return currentProducts.filter((product) => product.id !== productId)
        })
    }

    const onSubmitSale =  async () => {
        try {
            await createSale({
                products: selectedProducts.map((product) => ({
                    id: product.id,
                    quantity: product.quantity
                }))
            })
            toast.success("Sale successfully completed")
            setSheetIsOpen(false)
        } catch (error) {
            toast.error("Error when making the sale")
        }
    }

    return ( 
    <SheetContent className="!max-w-[700px]">
        <SheetHeader>
            <SheetTitle>New Sale</SheetTitle>
                <SheetDescription>
                   Enter your sales information below.
                </SheetDescription>
        </SheetHeader>

        <Form {...form}>
            <form className="space-y-6 py-6" onSubmit = {form.handleSubmit(onSubmit)}>
            <FormField
                control={form.control}
                name="productId"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Product</FormLabel>
                    <FormControl>
                   
                        <Combobox placeholder="Enter the Product" options={productOptions}{...field} />
                           
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                       <Input type="number" placeholder="Enter the quantity " {...field}/>
                           
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />   

            <Button type="submit" className="w-full gap-2" variant="secondary">
                <PlusIcon size={20} />
                Add product for sale
            </Button>
            </form>
        </Form>

            <Table>
                    <TableCaption>List of products added for sale.</TableCaption>
                    <TableHeader>
                        <TableRow>
                        <TableHead >Product</TableHead>
                        <TableHead >Unit Price</TableHead>
                        <TableHead >Quantity</TableHead>
                        <TableHead >Total</TableHead>
                        <TableHead >Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {selectedProducts.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell >{product.name}</TableCell>
                            <TableCell>{formatCurrency(product.price)}</TableCell>
                            <TableCell>{product.quantity}</TableCell>
                            <TableCell >{formatCurrency(product.price * product.quantity)}</TableCell>
                            <TableCell >
                              <UpsertSalesTableDropdownMenu product={product}  onDelete={onDelete}/>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                        <TableCell colSpan={3}>Total</TableCell>
                        <TableCell >{formatCurrency(productsTotal)}</TableCell>
                        <TableCell ></TableCell>
                        </TableRow>
                    </TableFooter>
            </Table>

            <SheetFooter className="pt-6">
                <Button className="w-full gap-2" disabled={selectedProducts.length === 0 } onClick={onSubmitSale}>
                    <CheckIcon size={20}/>
                    Finalize Sale
                </Button>
            </SheetFooter>
        </SheetContent>
     );
}
 
export default UpsertSheetContent;