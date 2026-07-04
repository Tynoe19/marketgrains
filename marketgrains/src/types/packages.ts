export type Package = {
  id: number;
  name: string;
  description: string;
  orderValue: number;
  salesValue: number;
  profit: number;
  products: string[];
  featured?: boolean;
};
export type PackageAPIResponse = {
  id: number;
  name: string;
  order_value: string;
  sales_value: string;
  profit: string;
  featured: boolean;
  products: string[]; 
  description: string;
};