import React from "react";
import prismadb from "@/lib/prismadb";
import ColorForm from "./components/color-form";

interface ColorPageProps {
  params: {
    colorId: string;
    storeId: string;
  };
}

const ColorPage: React.FC<ColorPageProps> = async ({ params }) => {
  const color = await prismadb.color.findUnique({
    where: {
      id: params.colorId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={color} />
      </div>
    </div>
  );
};

export default ColorPage;
