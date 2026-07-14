export type Package = {
  id: number;
  name: string;
  description: string;
  orderValue: number;
  salesValue: number;
  profit: number;
  featured?: boolean;
  packageItems: PackageItem[];
};
export type PackageItem = {
  id: number;
  product: number;
  productName: string;
  quantity: number;
  productWeight: number;
};
export type PackageAPIResponse = {
  id: number;
  name: string;
  order_value: string;
  sales_value: string;
  profit: string;
  featured: boolean; 
  description: string;
  package_items: PackageItemAPIResponse[];
};
export type PackageItemAPIResponse = {
  id: number;
  product: number;
  product_name: string;
  quantity: number;
  product_weight: string;
};
