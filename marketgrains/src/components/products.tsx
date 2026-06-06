import products from '../data/products'; 
import { useCart } from '../context/cartContext';
console.log("🔥 PRODUCTS COMPONENT IS MOUNTED");
type ProductsProps = {
    selected: string | null;
    search: string;
};
export default function Products({ selected, search }: ProductsProps){
    const { addToCart } = useCart();

    const filtered = products.filter((p) =>{
        const categoryMatch = selected 
            ? p.category.toLowerCase() === selected.toLowerCase()
            : true;

        const searchMatch = search 
            ? p.name.toLowerCase().includes(search.toLowerCase()) 
            : true;
        return categoryMatch && searchMatch;    
    });
    console.log("PRODUCTS SELECTED:", selected);

    console.log("FILTERED:", filtered);
    console.log("ALL PRODUCTS:", products);

    return(
        <section className="py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6">
                <h3 className="text-3xl text-center font-bold mb-10">
                    Featured Products
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((product) => (
                        <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                            <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-48 object-cover"
                            />
                            
                            <div className="flex flex-col p-4 gap-3">
                                <h4 className="text-lg font-semibold text-blue-600">
                                    {product.name}
                                </h4>
                                <div className="flex items-center justify-between pt-2 border-t">

                                <p className="text-lg font-semibold text-blue-600">${product.price }</p>
                                </div>
                                
                                <button className="bg-green-600 py-2 px-4 items-center rounded-full transition hover:bg-green-700 text-white inline-block mt-4 self-start"
                                    onClick={() => addToCart(product)}>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>


    )
}
          