"use client"

import { Button } from "@/app/_components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/app/_components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/app/_components/ui/form"
  import { Input } from "@/app/_components/ui/input"
import { NumericFormat } from "react-number-format";
 


const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: "The product name is required."
  }),

  price: z.number().min(0.01, {
    message: "The product price is required."
  }),
  stock: z.coerce.number().positive({
    message: "The stock quantity must be positive"
  }).int().min(0, {
    message: "The stock quantity is required."
  })
})

 
type FormSchema = z.infer<typeof formSchema>;

const AddProductButton = () => {
       const form = useForm<FormSchema>({
        shouldUnregister: true,
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            price: 0,
            stock: 1,
        }
    })

    const onSubmit = (data: FormSchema) => {
        console.log({data})
    }
    return ( 
        <Dialog>
        <DialogTrigger asChild>
            <Button className="gap-2">
               <PlusIcon  size={20}/>
               New Product
            </Button>
        </DialogTrigger>

        <DialogContent>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <DialogHeader>
                    <DialogTitle>
                        Create Product
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
                           <Input placeholder="Enter the product NAME" {...field} />
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

                    <Button type= "submit">Save</Button>
                </DialogFooter>
            </form>    
            </Form>
           
        </DialogContent>
    </Dialog>
     );
}
 
export default AddProductButton;