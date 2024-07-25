"use client";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus as IconPlus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { ApiList } from "@/components/ui/api-list";
import { columns, type CategoryColumn } from "./columns";
import { DataTable } from "./data-table";

interface CategoryClientProps {
  data: CategoryColumn[];
  // data: BillboardColumn[];
}

const CategoryClient: React.FC<CategoryClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    console.log("CategoryClientProps", { data });
  }, []);

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${data?.length})`}
          description="Manage categories for your store"
        />
        <Button
          onClick={() => {
            router.push(`/${params.storeId}/categories/new`);
          }}
        >
          <IconPlus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      {/* DATA TABLE */}
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title={`API`} description="API calls for Categories" />
      <Separator />
      <ApiList entityName="categories" entityIdName={"CategoryId"}/>
    </>
  );
};

export default CategoryClient;
