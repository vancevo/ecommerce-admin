"use client";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Plus as IconPlus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { DataTable } from "./data-table";
import { ApiList } from "@/components/ui/api-list";
import { columns, type ColorColumn } from "./columns";

interface ColorClientProps {
  data: ColorColumn[];
}

const ColorClient: React.FC<ColorClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Colors (${data?.length})`}
          description="Manage Colors for your store"
        />
        <Button
          onClick={() => {
            router.push(`/${params.storeId}/colors/new`);
          }}
        >
          <IconPlus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      {/* DATA TABLE */}
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title={`API`} description="API calls for Colors" />
      <Separator />
      <ApiList entityName="colors" entityIdName={"colorId"} />
    </>
  );
};

export default ColorClient;
