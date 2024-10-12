
"use client"

import { ColumnDef } from "@tanstack/react-table"
import ProductTableDropdownMenu from "./table-dropdown-menu"
import { ProductDto } from "@/app/_data-access/product/get-products"
import ProductStatusBadge from "@/app/_components/product-status-badge"




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
    cell: ({ row: {original: product}}) => {
      return ( 
        <ProductStatusBadge status={product.status}/>
      )
    }
  },

  {
    accessorKey: "actions",
    header: "Actions",
    cell: (row) => <ProductTableDropdownMenu product={row.row.original} />
      
    
  }
]

  