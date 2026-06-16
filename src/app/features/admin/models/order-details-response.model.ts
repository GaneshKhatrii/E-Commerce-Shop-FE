export interface IOrderItems {
  productVariantId: string;
  productName: string;
  size: string;
  color: string;
  quantity: number;
  unitPrice: number;
  subTotal: number;
  imageUrl: string;
}
export interface IOrderDetails {
  orderId: string;
  customerName: string;
  customerEmail: string;
  phoneNumber: string;

  addAddressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;

  totalAmount: number;
  status: string;
  createdAt: string;
  orderItems: IOrderItems[];
}
