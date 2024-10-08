"use client"

import { Button } from "@/app/_components/ui/button";
import { DialogClose, 
        DialogContent, 
        DialogDescription, 
        DialogFooter, 
        DialogHeader, 
        DialogTitle 
    } from "@/app/_components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/app/_components/ui/form"

import { Input } from "@/app/_components/ui/input"
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { upsertProductSchema, UpsertProductSchema } from "@/app/_actions/product/upsert-product/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { upsertProduct } from "@/app/_actions/product/upsert-product";


interface UpsertProductDialogContentProps {
    defaultValues?: UpsertProductSchema; 
    onSuccess?: () => void
}

const UpsertProductDialogContent = ({defaultValues, onSuccess}: UpsertProductDialogContentProps ) => {
   
    const form = useForm<UpsertProductSchema>({
        shouldUnregister: true,
        resolver: zodResolver(upsertProductSchema),
        defaultValues: defaultValues ?? {
            name: "",
            price: 0,
            stock: 1,
        }
    })

    const isEditng = !!defaultValues;

    const onSubmit = async (data: UpsertProductSchema) => {
        try {
            await upsertProduct({...data, id: defaultValues?.id})
            onSuccess?.()
        } catch (error) {
            console.error(error)
        }
    }


    return ( 
        <DialogContent>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <DialogHeader>
                <DialogTitle>
                    {isEditng ? "Edit " : "Create "}
                     Product
                </DialogTitle>
                <DialogDescription>
                    Enter the Information Below.
                </DialogDescription>
            </DialogHeader>

            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                       <Input placeholder="Enter the product Name" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>The Product Price</FormLabel>
                    <FormControl>
                    <NumericFormat
                       thousandSeparator="."
                       decimalSeparator=","
                       fixedDecimalScale
                       decimalScale={2}
                       prefix="$"
                       allowNegative={false}
                       customInput={Input}
                       onValueChange={(values) => field.onChange(values.floatValue)}
                       {...field}
                       onChange={() => {}}
                       />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                        <Input 
                            type="number"
                            placeholder="Enter the product stock" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />

            <DialogFooter>
                <DialogClose asChild>
                    <Button variant= "secondary" type= "reset"> Cancel</Button>
                </DialogClose>

                <Button type= "submit" disabled= {form.formState.isSubmitting} className="gap-1.5">
                    {form.formState.isSubmitting && (
                        <Loader2Icon className="animate-spin" size={16} />
                    )}
                    Save
                </Button>
            </DialogFooter>
        </form>    
        </Form>
       
    </DialogContent>
     );
}
 
export default UpsertProductDialogContent;