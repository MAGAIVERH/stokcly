
"use client"

import { Badge } from "@/app/_components/ui/badge"
import { Product } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { CircleIcon } from "lucide-react"

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
      return <Badge variant={label === "In Stock" ? "default" : "destructive"} className="gap-1.5">
        <CircleIcon size={12} className={`${label === 'In Stock' ? 'fill-primary-foreground' : 'fill-destructive-foreground'}`}/>
        {label}
        </Badge>
    }
  },
]

  