import { useState } from 'react'
export default function Hero(){
    return(
        <>
        <section className="relative min-h-screen flex items-center justify-left bg-neutral-100">
            
            <HeroBackground />

            <HeroContent />


        </section>

            <Categories />
            <Products />
        
        </>
        
    )
}
{/* Hero Background Component */ }
function HeroBackground() {
    return(
        <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JhaW5zfGVufDB8fDB8fHww&w=1000&q=80"
                    alt="Grains background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50"/>
            </div>
    )
}

{/* Hero Content Component */ }
function HeroContent(){
    return(
    <div className="relative z-10 text-left text-white max-w-2l">
        <div className="max-w-4xl text-left text-white">
            <HeroTitle />
            <HeroText />
            <HeroButtons />
        </div>
    </div>
    )
}

{/* Hero Title, Text, and Buttons Components */ }
function HeroTitle(){
    return (
        <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            Welcome to Market Grains
        </h2>
    );
}
function HeroText(){
    return (
        <p  className="text-lg md:text-xl text-gray-200 mt-4 leading-relaxed mb-6">Your one-stop shop for all things grains!</p>
    );             
}
function HeroButtons(){
    return(
        <div className=" mt-6 flex flex-col sm:flex-row justify-left gap-4 ">
            <button className="bg-blue-700 hover:bg-blue-900 text-white font-semibold py-3 px-7 rounded-full">
                        Shop Now
            </button>

            <button className="border border-white/40 hover:bg-white/20 text-white font-bold py-3 px-7 rounded-full">
                        Learn More
            </button>
        </div>

    )
}
function Categories() {
  const categories = [
    "Mhunga",
    "Zviyo",
    "Mapfunde",
    "Dovi",
    "Huchi",
  ];
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">

        <h3 className="text-3xl font-bold mb-10">
          Shop by Category
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {categories.map((cat) => (
            <div
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={selectedCategory === cat ? "cursor-pointer bg-blue-500 text-white transition rounded-xl py-8 font-semibold" : "cursor-pointer bg-gray-100 hover:bg-gray-200 transition rounded-xl py-8 font-semibold"}
            >
              {cat}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
function Products(){
    const products =[
        {id: 1, name: "Mhunga", price: "$10.99", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JhaW5zfGVufDB8fDB8fHww&w=1000&q=80"},
        {id: 2, name: "Zviyo", price: "$12.99", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JhaW5zfGVufDB8fDB8fHww&w=1000&q=80"},
        {id: 3, name: "Mapfunde", price: "$9.99", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JhaW5zfGVufDB8fDB8fHww&w=1000&q=80"},
        {id: 4, name: "Dovi", price: "$14.99", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JhaW5zfGVufDB8fDB8fHww&w=1000&q=80"},
        {id: 5, name: "Huchi", price: "$19.99", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JhaW5zfGVufDB8fDB8fHww&w=1000&q=80"},
    ]
    return(
        <section className="py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6">
                <h3 className="text-3xl font-bold mb-10">
                    Our Products
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
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
          