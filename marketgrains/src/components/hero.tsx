import mapfunde from "../assets/images/mapfunde.jpg";
export default function Hero() {

    return(

        <section className="relative min-h-screen flex items-center justify-left bg-neutral-100">
            <HeroBackground />

            <div className="relative z-10 w-full">
                <HeroContent />
            </div>
        </section>
    
    );
}
         
  
{/* Hero Background Component */ }
function HeroBackground() {
    return(
        <div className="absolute inset-0 ">
                <img
                    src={mapfunde}
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
    <div className="px-8 text-left text-white max-w-6xl mx-auto">
            <HeroTitle />
            <HeroText />
            <HeroButtons />
    </div>
    )
}

{/* Hero Title, Text, and Buttons Components */ }
function HeroTitle(){
    return (
        <h2 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
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

