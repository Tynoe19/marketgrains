import { useState, type FormEvent } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!email.trim()) return;
    // For now we just show a success message — no backend yet
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section id="contact" className="py-20 bg-green-600 scroll-mt-20">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Stay in the loop
        </h2>
        <p className="text-green-100 mb-8">
          Get updates on new grain varieties, distributor deals, and recruitment
          bonus announcements.
        </p>

        {submitted ? (
          <p className="text-white font-semibold bg-green-700/50 rounded-xl py-4 px-6">
            Thanks for subscribing! We&apos;ll be in touch.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-semibold transition-colors"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
