import { format } from "date-fns";
import React from "react";
import prismadb from "@/lib/prismadb";
import ColorClient from "./components/client";

const ColorPage = async ({ params }: { params: { storeId: string } }) => {
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const formattedColors = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <ColorClient data={formattedColors} />
    </div>
  );
};
export default ColorPage;
