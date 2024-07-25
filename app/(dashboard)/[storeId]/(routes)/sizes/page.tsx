import { format } from "date-fns";
import React from "react";
import prismadb from "@/lib/prismadb";
import SizeClient from "./components/client";

const SizePage = async ({ params }: { params: { storeId: string } }) => {
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const formattedSizes = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <SizeClient data={formattedSizes} />
    </div>
  );
};
export default SizePage;
