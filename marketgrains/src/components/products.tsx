import products from '../data/products'; 
import { useCart } from '../context/cartContext';
type ProductsProps = {
    selected: string | null;
    search: string;
};
export default function Products({ selected, search }: ProductsProps){
    const { addToCart } = useCart();

    const filtered = products.filter((p) =>{
        const categoryMatch = selected ? p.category === selected : true;
        const searchMatch = search ? p.name.toLowerCase().includes(search.toLowerCase()) : true;
        return categoryMatch && searchMatch;    
    });

    return(
        <section className="py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6">
                <h3 className="text-3xl font-bold mb-10">
                    Our Products
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((product) => (
                        <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                            <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-48 object-cover"
                            />
                            <button className="bg-green-600 text-white px-4 py-2 rounded"
                            onClick={() => addToCart(product)}>
                                Add to Cart
                            </button>
                            <div className="p-4">
                                <h4 className="text-xl font-bold">{product.name}</h4>
                                <p className="text-lg font-semibold text-blue-600">{product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>


    )
}
          