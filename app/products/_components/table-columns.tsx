
"use client"

import { Badge } from "@/app/_components/ui/badge"
import { Product } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { CircleIcon, ClipboardCopyIcon, EditIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu"
import { Button } from "@/app/_components/ui/button"

import {
  AlertDialog,
  AlertDialogTrigger,
} from "@/app/_components/ui/alert-dialog"
import DeleteProductDialogContent from "./delete-dialog-content"
import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog"
import UpsertProductDialogContent from "./upsert-dialog-content"
import { useState } from "react"



const getStatusLabel = (status: string) => {
  if(status === "IN_STOCK") {
    return "In Stock"
  }
    return "Out of Stock"
}
export const productTableColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Product",
  },
  {
    accessorKey: "price",
    header: "Unit Price",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (row) => {
      const product = row.row.original;
      const label = getStatusLabel(product.status);
      return ( <Badge variant={label === "In Stock" ? "default" : "destructive"} className="gap-1.5">
        <CircleIcon size={12} className={`${label === 'In Stock' ? 'fill-primary-foreground' : 'fill-destructive-foreground'}`}/>
        {label}
        </Badge>
      )
    }
  },

  {
    accessorKey: "actions",
    header: "Actions",
    cell: (row) => {
      const [editDialogOpen, setEditDialogOpen] = useState(false);
      const product = row.row.original 
      return (
    <AlertDialog> 
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
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
           
           <DialogTrigger asChild>
              <DropdownMenuItem
                className="gap-1.5">
                  <EditIcon size={16}/>
                  Edit
              </DropdownMenuItem>
           </DialogTrigger>
           
            
          <AlertDialogTrigger asChild>
            <DropdownMenuItem className="gap-1.5">   
                  <TrashIcon size={16}/>
                  Delete
            </DropdownMenuItem>     
          </AlertDialogTrigger>
             
                 
          </DropdownMenuContent>
      </DropdownMenu>
      
      <UpsertProductDialogContent defaultValues={{
        id: product.id,
        name: product.name,
        price: Number(product.price),
        stock: product.stock,
      }}
      onSuccess={() => setEditDialogOpen(false)}/>
      <DeleteProductDialogContent productId={product.id}/>
      </Dialog> 
    </AlertDialog>
      )
    }
  }
]

  