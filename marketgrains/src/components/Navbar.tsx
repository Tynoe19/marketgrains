import { useCart } from '../context/cartContext';   
type NavbarProps = {
    search: string;
    setSearch: (value: string) => void; 
    // You can add props here if needed in the future
};
export default function Navbar( { search, setSearch }: NavbarProps) {
    const { cart } = useCart();
    return(
        <nav className="w-full px-6 py-4 bg-white shadow-md flex flex-col sm:flex-row items-center justify-between">
            {/* Logo Section */ }
            <h1 className="text-2xl font-bold">
                Elita-07
            </h1>

            {/* Navigation Links */ }
            <div className="hidden md:flex gap-4">
                <a href="">Home</a>
                <a href="">Products</a>
                <a href="">About</a>
                <a href="">Contact</a>
                <a href="">Cart</a>
            </div>
            <div className="relative"> 
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.length}
                </span>
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