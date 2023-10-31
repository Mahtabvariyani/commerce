import React from "react";
import OrderDetails from "./OrderDetails";
import Container from "@/app/components/Container";
import getOrdersById from "@/actions/getOrdersById";
import NullData from "@/app/components/NullData";

interface IParams {
  orderId?: string;
}

const Order = async ({ params }: { params: IParams }) => {
  const order = await getOrdersById(params);

  if (!order) return <NullData title="No Order" />;
  return (
    <div className="p-8">
      <Container>
        <OrderDetails order={order} />
      </Container>
    </div>
  );
};

export default Order;
