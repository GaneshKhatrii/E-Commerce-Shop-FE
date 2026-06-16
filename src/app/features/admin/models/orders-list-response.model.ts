export interface IOrders {
  orderId: string;
  customerName: string;
  customerEmail: string;
  phoneNumber: string;
  totalAmount: number;
  statusId: number;
  statusName: string;
  createdAt: Date;
}
