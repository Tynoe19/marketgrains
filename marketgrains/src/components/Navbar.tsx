import { useCart } from '../context/cartContext';   
import { useEffect, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
type NavbarProps = {
    search: string;
    setSearch: (value: string) => void; 
    // You can add props here if needed in the future
};
export default function Navbar( { search, setSearch }: NavbarProps) {
    const { cart } = useCart();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return(
        <nav
            className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-white shadow-md text-black' : 'bg-transparent text-white'}`}
        >
            <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
            <div className="text-2xl font-bold">
                Elita-07
            </div>

            {/* Navigation Links */ }
            <div className="hidden md:flex gap-6 font-medium">
                <a href="">Home</a>
                <a href="">Products</a>
                <a href="">About</a>
                <a href="">Contact</a>
                </div>
                {menuOpen && (
                    <div className=" flex flex-col items-center md:hidden px-6 pb-4">
                        <a href="" >Home</a>
                        <a href="" >Products</a>
                        <a href="" >Contact</a>
                    </div>
                )}

                { /* right side with search and cart */ }

                  <div className="flex items-center gap-4">
                    {/* Search Bar */ }
                
                    <input
                    type="text"
                    placeholder="Search..."
                    className={`border px-3 py-1 rounded-md w-40 md:w-64 transition-all duration-300 focus:outline-none focus:ring-2 
                    ${scrolled ? 'border-gray-300 text-black bg-white focus:ring-blue-500' : 'border-white/40 bg-white/20 text-white placeholder:text-white/70 focus:ring-white'}`}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button className="relative px-3 py-1 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors">
                    Cart
                {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {cart.length}
                    </span>
                )}
                
                </button>
                <button className="md:hidden text-2xl"
                onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <FiX /> : <FiMenu />}

                    </button>


    
                </div>

                
                
            </div>
            
           
          
        </nav>
    )
}