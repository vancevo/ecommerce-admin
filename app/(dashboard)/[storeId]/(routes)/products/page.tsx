import { format } from "date-fns";
import React from "react";
import prismadb from "@/lib/prismadb";
import ProductClient from "./components/client";
import type { ProductColumn } from "./components/columns";
const ProductPage = async ({ params }: { params: { storeId: string } }) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      color: true,
      size: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  console.log({ products });

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isArchived: item.isArchived,
    isFeatured: item.isFeatured,
    price: item.price,
    category: item.category,
    size: item.size,
    color: item.color,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      {/* <BillboardClient data={formattedBillboards} /> */}
      {/* <ProductClient data={products}/> */}
      <ProductClient data={formattedProducts} />
    </div>
  );
};
export default ProductPage;
