type Category = {
  label: string;
  value: string | null;
};

export default function Categories({
  selected,
  setSelected,
}: {
  selected: string | null;
  setSelected: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const categories: Category[] = [
    { label: "All", value: null },
    { label: "Mhunga", value: "mhunga" },
    { label: "Zviyo", value: "zviyo" },
    { label: "Mapfunde", value: "mapfunde" },
    { label: "Dovi", value: "dovi" },
    { label: "Huchi", value: "huchi" },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">

        <h3 className="text-3xl font-bold mb-10">
          Shop by Category
        </h3>

        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((cat) => {
            const isActive = selected === cat.value;

            return (
              <button
                key={cat.label}
                onClick={() => {
                  console.log("SELECTED CATEGORY:", cat.value);
                  setSelected(cat.value);
                }}
                className={`px-5 py-2 rounded-full font-medium transition border ${
                  isActive
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-gray-100 hover:bg-gray-200 border-gray-200"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}