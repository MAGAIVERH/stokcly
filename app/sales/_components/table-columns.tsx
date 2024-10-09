"use client"

import { Button } from "@/app/_components/ui/button";
import { SaleDto } from "@/app/_data-access/sale/get-sales";
import { formatCurrency } from "@/app/_helpers/currency";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontalIcon } from "lucide-react";

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
        cell: () => <Button><MoreHorizontalIcon size={16}/></Button>
      },
  ]