export default function Categories({ selected, setSelected }: 
    { selected: string | null; setSelected: React.Dispatch<React.SetStateAction<string | null>>}) 
    {
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
              onClick={() => setSelected(cat)}
              className={selected === cat ? "cursor-pointer bg-blue-500 text-white transition rounded-xl py-8 font-semibold" :
                 "cursor-pointer bg-gray-100 hover:bg-gray-200 transition rounded-xl py-8 font-semibold"
                }
            >
              {cat}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}