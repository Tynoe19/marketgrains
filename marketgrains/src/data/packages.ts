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

export const packages: Package[] = [
  {
    id: 1,
    name: "Mini Combo",
    description: "Perfect starter pack for new distributors testing the market.",
    orderValue: 175,
    salesValue: 205,
    profit: 30,
    products: ["Zviyo", "Mhunga", "Mapfunde"],
  },
  {
    id: 2,
    name: "Full Combo",
    description: "Our best value bundle — highest profit margin for active sellers.",
    orderValue: 350,
    salesValue: 410,
    profit: 60,
    products: ["Zviyo", "Mhunga", "Mapfunde", "Dovi", "Huchi"],
    featured: true,
  },
  {
    id: 3,
    name: "Mixed Combo",
    description: "A balanced mix of grains and spreads for diverse customers.",
    orderValue: 262,
    salesValue: 298,
    profit: 36,
    products: ["Zviyo", "Mhunga", "Mapfunde", "Dovi"],
  },
];
