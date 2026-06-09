const testimonials = [
  {
    quote:
      "The Mhunga and Zviyo are always fresh. I order monthly for my family and the quality never drops.",
    name: "Tendai M.",
    role: "Home Buyer",
    initials: "TM",
  },
  {
    quote:
      "I started with the Mini Combo and now run a small stall. The profit margins are real and easy to understand.",
    name: "Rudo K.",
    role: "Distributor",
    initials: "RK",
  },
  {
    quote:
      "Recruiting two friends into the program gave me a nice bonus on top of my regular sales. Great side income.",
    name: "Farai N.",
    role: "Distributor",
    initials: "FN",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-amber-50/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-amber-600 uppercase tracking-wider mb-3">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            What our community says
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <blockquote
              key={item.name}
              className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100 flex flex-col"
            >
              <p className="text-gray-600 leading-relaxed flex-grow mb-6">
                &ldquo;{item.quote}&rdquo;
              </p>
              <footer className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-bold">
                  {item.initials}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.role}</p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
