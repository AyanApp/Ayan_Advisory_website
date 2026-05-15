export default function HeroSection() {
  return (
    <section className="relative h-[600px] w-full">

      <img
        src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop"
        alt=""
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/50"></div>

      <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-24 text-white">

        <h1 className="text-5xl md:text-7xl font-bold max-w-3xl leading-tight">
          Elevating Every Patient Journey
        </h1>

        <p className="mt-6 text-xl max-w-2xl text-gray-200">
          Streamline care, enhance collaboration, and drive healthier futures.
        </p>

      </div>

    </section>
  );
}
