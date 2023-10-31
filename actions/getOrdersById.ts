import prisma from "@/libs/prismadb";

interface IParams {
  orderId?: string;
}

export default async function getOrdersById(params: IParams) {
  try {
    const { orderId } = params;

    const order = await prisma.order.findMany({
      where: {
        id: orderId,
      },
    });

    if (order.length === 0) {
      console.log('Order not found:', orderId);
      return null;
    }

    return order[0];
  } catch (error: any) {
    console.error(error);
    throw new Error(error);
  }
}
