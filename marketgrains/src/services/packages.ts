import { apiFetch } from "./api";
import type { Package, PackageAPIResponse, PackageItemAPIResponse } from "../types/packages";



function mapPackageResponse(raw: PackageAPIResponse): Package {
    return { 
        id: raw.id,
        name: raw.name,
        orderValue: parseFloat(raw.order_value),
        salesValue: parseFloat(raw.sales_value),
        profit: parseFloat(raw.profit),
        featured: raw.featured,
        packageItems: raw.package_items.map((item: PackageItemAPIResponse) => ({
            id: item.id,
            product: item.product,
            productName: item.product_name,
            quantity: item.quantity,
            productWeight: parseFloat(item.product_weight)
        })) || [],
        description: raw.description
    };
}

export async function getPackages(): Promise<Package[]> {
    const rawPackages = await apiFetch<PackageAPIResponse[]>("products/packages/");
    return rawPackages.map(mapPackageResponse);
}

export async function getPackageById(id: number): Promise<Package> {
    const rawPackage = await apiFetch<PackageAPIResponse>(`products/packages/${id}/`);
    return mapPackageResponse(rawPackage);
}