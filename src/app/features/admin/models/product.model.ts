export interface IProduct {
  name: string;
  description: string;
  productCategoryId: string;
  brandId: string;
}

export interface IProductsList {
  id: string;
  name: string;
  description: string;
  categoryName: string;
  brandName: string;
  isActive: boolean;
}
