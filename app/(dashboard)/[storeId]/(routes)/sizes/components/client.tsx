"use client";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Plus as IconPlus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { DataTable } from "./data-table";
import { ApiList } from "@/components/ui/api-list";
import { columns, type SizeColumn } from "./columns";

interface SizeClientProps {
  data: SizeColumn[];
}

const SizeClient: React.FC<SizeClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Sizes (${data?.length})`}
          description="Manage Sizes for your store"
        />
        <Button
          onClick={() => {
            router.push(`/${params.storeId}/sizes/new`);
          }}
        >
          <IconPlus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      {/* DATA TABLE */}
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title={`API`} description="API calls for Sizes" />
      <Separator />
      <ApiList entityName="sizes" entityIdName={"sizeId"} />
    </>
  );
};

export default SizeClient;
