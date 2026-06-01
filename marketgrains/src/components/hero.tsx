import { useState } from 'react'
import Categories from './categories'
import Products from './products'
import Navbar from './Navbar'
import { useCart } from '../context/cartContext';
import Packages from './packages';

export default function Hero(){
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const { cart } = useCart();
    console.log("Cart contents:", cart);

    return(
        <>
            

        <section className="relative min-h-screen flex items-center justify-left bg-neutral-100">
            <div className=""></div>
            <HeroBackground />

            <HeroContent />
            <Navbar  search={search} setSearch={setSearch} />


        </section>

            <Categories 
            selected={selectedCategory}
            setSelected={setSelectedCategory}
            />
            
            <Products selected={selectedCategory} search={search} />
            <Packages />
        </>
        
    )
}
{/* Hero Background Component */ }
function HeroBackground() {
    return(
        <div className="absolute inset-0 bg-black/40">
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
    <div className="relative z-10 text-lefttext-white max-w-2l padding-8">
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
        <h2 className="text-7xl md:text-6xl font-bold leading-tight mb-6">
            Organic Traditional Grains
            <span className="text-green-600 italic" >. For homes and Distributors</span>
        </h2>
    );
}
function HeroText(){
    return (
        <p  className="text-lg md:text-xl text-gray-200 mt-4 leading-relaxed mb-6">Shop quality organic grains for your home or expand your business
        with our distributor packages!</p>
    );             
}
function HeroButtons(){
    return(
        <div className=" mt-6 flex flex-col sm:flex-row justify-left gap-4 ">
            <button className="bg-blue-700 hover:bg-blue-900 text-white font-semibold py-3 px-7 rounded-full">
                        Shop Now
            </button>

            <button className="border border-white/40 hover:bg-white/20 text-white font-bold py-3 px-7 rounded-full">
                        Explore Packages
            </button>
        </div>

    )
}
