
"use client"

import { Badge } from "@/app/_components/ui/badge"
import { ColumnDef } from "@tanstack/react-table"
import { CircleIcon } from "lucide-react"
import ProductTableDropdownMenu from "./table-dropdown-menu"
import { ProductDto } from "@/app/_data-access/product/get-products"





const getStatusLabel = (status: string) => {
  if(status === "IN_STOCK") {
    return "In Stock"
  }
    return "Out of Stock"
}
export const productTableColumns: ColumnDef<ProductDto>[] = [
  {
    accessorKey: "name",
    header: "Product",
  },
  {
    accessorKey: "price",
    header: "Unit Price",
    cell: (row) => {
      const product = row.row.original
      return Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD", 
      }).format (Number(product.price));
    }
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
    cell: (row) => <ProductTableDropdownMenu product={row.row.original} />
      
    
  }
]

  