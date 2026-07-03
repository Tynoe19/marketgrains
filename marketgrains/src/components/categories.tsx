import { useEffect, useState } from "react";
import { getCategories } from "../services/categoryService";
import type { Category as BackendCategory } from "../types/category";

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
  const [categories, setCategories] = useState<Category[]>([{ label: "All", value: null }]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data: BackendCategory[] = await getCategories();
        const mapped = data.map((cat) => ({
          label: cat.name,
          value: String(cat.id),
        }));
        setCategories([{ label: "All", value: null }, ...mapped]);
      } catch (err) {
        console.error("Failed to load categories", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadCategories();
  }, []);

  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-center text-sm font-semibold text-green-600 uppercase tracking-wider mb-3">
          Browse
        </p>
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Shop by Category
        </h2>

        {isLoading ? (
          <p className="text-center text-gray-400">Loading categories...</p>
        ) : (
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => {
              const isActive = selected === cat.value;

              return (
                <button
                  key={cat.label}
                  type="button"
                  onClick={() => setSelected(cat.value)}
                  className={`px-5 py-2.5 rounded-full font-medium transition-all border ${
                    isActive
                      ? "bg-green-600 text-white border-green-600 shadow-md shadow-green-600/20"
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:border-green-300 hover:text-green-700"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}