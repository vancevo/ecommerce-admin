"use client";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Plus as IconPlus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { DataTable } from "./data-table";
import { ApiList } from "@/components/ui/api-list";
import { columns, type OrderColumn } from "./columns";

interface OrderClientProps {
  data: OrderColumn[];
}

const OrderClient: React.FC<OrderClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Orders (${data?.length})`}
          description="Manage orders for your store"
        />
      </div>
      <Separator />
      {/* DATA TABLE */}
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title={`API`} description="API calls for Orders" />
      <Separator />
      <ApiList entityName="orders" entityIdName={"orderId"} />
    </>
  );
};

export default OrderClient;
