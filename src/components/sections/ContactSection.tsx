export default function ContactSection() {
  return (
    <section className="bg-white py-20 px-10">

      <h2 className="text-5xl font-bold text-center mb-14">
        Contact Us
      </h2>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">

        <input
          type="text"
          placeholder="Your Name"
          className="border p-4 rounded-xl"
        />

        <input
          type="email"
          placeholder="Your Email"
          className="border p-4 rounded-xl"
        />

        <textarea
          placeholder="Your Message"
          className="border p-4 rounded-xl md:col-span-2 h-40"
        ></textarea>

      </div>

    </section>
  );
}