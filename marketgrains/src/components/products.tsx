import products from "../data/products";
import { useCart } from "../context/cartContext";

type ProductsProps = {
  selected: string | null;
  search: string;
};

export default function Products({ selected, search }: ProductsProps) {
  const { addToCart } = useCart();

  // .filter() creates a new array with only items that pass both checks
  const filtered = products.filter((product) => {
    const categoryMatch = selected
      ? product.category.toLowerCase() === selected.toLowerCase()
      : true;

    const searchMatch = search
      ? product.name.toLowerCase().includes(search.toLowerCase())
      : true;

    return categoryMatch && searchMatch;
  });

  return (
    <section id="products" className="py-20 bg-gray-50 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-3">
            For Buyers
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Purchase individual grains and spreads for your home. Add items to
            your cart and check out when you&apos;re ready.
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-500 text-lg">No products match your search.</p>
            <p className="text-gray-400 text-sm mt-2">Try a different category or search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((product) => (
              <article
                key={product.id}
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative overflow-hidden h-52">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 text-xs font-semibold text-green-700 capitalize">
                    {product.category}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-2xl font-bold text-green-600 mb-4">${product.price}</p>

                  <button
                    type="button"
                    onClick={() => addToCart(product)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-xl transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
