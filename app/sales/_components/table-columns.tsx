"use client"


import { SaleDto } from "@/app/_data-access/sale/get-sales";
import { formatCurrency } from "@/app/_helpers/currency";
import { ColumnDef } from "@tanstack/react-table";
import SalesTableDropdownMenu from "./table-dropdown-menu";

export const saleTableColumns: ColumnDef<SaleDto>[] = [
    {
      accessorKey: "productNames",
      header: "Products",
    },
    {
      accessorKey: "totalProducts",
      header: "Quantity of products",
    },
    {
      header: "Total Value",
      cell: ({
        row: {
            original: {totalAmount},
        },
      }) => formatCurrency(totalAmount)
    },
    {
        header: "Date",
        cell: ({row: {
            original: {date},
        },
    }) => Intl.DateTimeFormat("en-US").format(new Date(date)),
      },
      {
        header: "Actions",
        cell: ({row: {original: sale}}) => (
          <SalesTableDropdownMenu sale={sale} />
        ) 
      },
  ]