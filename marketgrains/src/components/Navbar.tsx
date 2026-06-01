import { useCart } from '../context/cartContext';   
import { useEffect, useState } from 'react';
type NavbarProps = {
    search: string;
    setSearch: (value: string) => void; 
    // You can add props here if needed in the future
};
export default function Navbar( { search, setSearch }: NavbarProps) {
    const { cart } = useCart();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return(
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}
        >
            <div className="flex items-center justify-between px-6 py-4">
            <div className="text-2xl font-bold">
                Elita-07
            </div>

            {/* Navigation Links */ }
            <div className="hidden md:flex gap-4">
                <a href="">Home</a>
                <a href="">Products</a>
                <a href="">About</a>
                <a href="">Contact</a>
                <a href="">Cart</a>
            </div>
            {/* Cart Icon with Item Count */ }
            <div>
                <button className="px-4 py-2 border rounded">
                    Cart
                </button>
            </div>
            
        </div>

            { /* Search Section */ }
            <div className="relative flex items-center gap-4">
                <div>
                    <input
                    type="text"
                    placeholder="Search..."
                    className="border px-3 py-1 rounded-md w-40 md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                </div>

                
                
            </div>
        </nav>
    )
}