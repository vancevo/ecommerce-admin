import { format } from "date-fns";
import React from "react";
import prismadb from "@/lib/prismadb";
import CategoryClient from "./components/client";


const CategoryPage = async ({ params }: { params: { storeId: string } }) => {
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <CategoryClient data={formattedCategories} />
    </div>
  );
};
export default CategoryPage;
