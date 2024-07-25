import { format } from "date-fns";
import React from "react";
import prismadb from "@/lib/prismadb";
import ColorClient from "./components/client";

const OrdersPage = async ({ params }: { params: { storeId: string } }) => {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });


  const formattedOrders = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    products: item.orderItems.map((orderItem) => orderItem.product.name).join(', '),
    totalPrice: item.orderItems.reduce((total, item) => {
      return total + Number(item.product.price)
    }, 0),
    isPaid: item.isPaid,

    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <ColorClient data={formattedOrders} />
    </div>
  );
};
export default OrdersPage;
