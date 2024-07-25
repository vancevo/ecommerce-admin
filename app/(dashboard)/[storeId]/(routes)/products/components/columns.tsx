"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import type { Category, Color, Size } from "@prisma/client";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumn = {
  id: string;
  name: string;
  isArchived: boolean;
  isFeatured: boolean;
  price: number;
  createdAt: string;
  category: Category;
  size: Size;
  color: Color;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isArchived",
    header: "Archieved",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <div>${row.original.price}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => <div>{row.original.category.name}</div>,
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ row }) => <div>{row.original.size.name}</div>,
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => (
      <div className="flex gap-x-2 items-center">
        <div>{row.original.color.value}</div>
        <div
          className="p-3 border rounded-full"
          style={{ backgroundColor: row.original.color.value }}
        ></div>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    // row is object of ProductColumn, vi ColumnDef da~ phan loai
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
