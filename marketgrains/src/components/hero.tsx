export default function Hero(){
    return(
        <section className="relative min-h-screen flex items-center justify-center bg-neutral-100">
            
            <HeroBackground />

            <HeroContent />

            <Categories />

        </section>
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
              className="bg-gray-100 hover:bg-gray-200 transition rounded-xl py-8 font-semibold"
            >
              {cat}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
          