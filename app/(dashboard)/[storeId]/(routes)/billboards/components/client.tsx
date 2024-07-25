"use client";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import type { Billboard } from "@prisma/client";
import { Plus as IconPlus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { columns, type BillboardColumn } from "./columns";
import { DataTable } from "./data-table";
import { ApiList } from "@/components/ui/api-list";

interface BillboardClientProps {
  data: BillboardColumn[];
}

const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    console.log({ data });
  }, []);
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${data.length})`}
          description="Manage billboards for your store"
        />
        <Button
          onClick={() => {
            router.push(`/${params.storeId}/billboards/new`);
          }}
        >
          <IconPlus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      {/* DATA TABLE */}
      <DataTable searchKey="label" columns={columns} data={data} />
      <Heading title={`API`} description="API calls for Billboards" />
      <Separator />
      <ApiList entityName="billboards" entityIdName={"billboardId"}/>
    </>
  );
};

export default BillboardClient;
