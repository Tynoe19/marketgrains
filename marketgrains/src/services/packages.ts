import { apiFetch } from "./api";
import type { Package, PackageAPIResponse } from "../types/packages";



function mapPackageResponse(raw: PackageAPIResponse): Package {
    return { 
        id: raw.id,
        name: raw.name,
        orderValue: parseFloat(raw.order_value),
        salesValue: parseFloat(raw.sales_value),
        profit: parseFloat(raw.profit),
        featured: raw.featured,
        products: raw.products,
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