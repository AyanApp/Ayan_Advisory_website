export default function ServicesSection() {
  return (
    <section className="w-full overflow-hidden">

      {/* ================= SECTION TITLE =================
      <div className="py-20 bg-white text-center">

        <h2 className="text-5xl md:text-6xl font-extrabold text-black">
          AYAN solutions
        </h2>

        <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto px-6">
          Delivering innovative healthcare and ERP solutions with modern
          technology, seamless integration, and scalable infrastructure.
        </p>

      </div> */}


      {/* ================= FIRST ROW ================= */}
      <div className="grid md:grid-cols-2">

        {/* LEFT CONTENT */}
        <div className="bg-[#f5f5f5] flex items-center px-10 md:px-20 py-20">

          <div className="max-w-xl">

            <h1 className="text-4xl md:text-6xl font-extrabold text-black leading-tight">
              Proprietary ERP Solution
            </h1>

            <p className="mt-8 text-xl leading-10 text-gray-600">
              Our proprietary ERP software solution can be customized with
              Cloud or On-Prem options. It integrates a full range of
              business processes with minimal cost and modern technology
              under the hood.
            </p>


          </div>

        </div>


        {/* RIGHT IMAGE */}
        <div className="h-[500px]">

          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2070&auto=format&fit=crop"
            alt="ERP Solution"
            className="w-full h-full object-cover"
          />

        </div>

      </div>


      {/* ================= SECOND ROW ================= */}
      <div className="grid md:grid-cols-2">

        {/* LEFT IMAGE */}
        <div className="h-[500px] order-2 md:order-1">

          <img
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop"
            alt="Healthcare Management"
            className="w-full h-full object-cover"
          />

        </div>


        {/* RIGHT CONTENT */}
        <div className="bg-[#f5f5f5] flex items-center px-10 md:px-20 py-20 order-1 md:order-2">

          <div className="max-w-xl">

            <h1 className="text-4xl md:text-6xl font-extrabold text-black leading-tight">
              Healthcare Management System
            </h1>

            <p className="mt-8 text-xl leading-10 text-gray-600">
              Streamline hospital workflows, patient management,
              laboratory integration, and pharmacy operations with
              secure and scalable healthcare software solutions.
            </p>

          </div>

        </div>

      </div>


      {/* ================= THIRD ROW ================= */}
      <div className="grid md:grid-cols-2">

        {/* LEFT CONTENT */}
        <div className="bg-[#f5f5f5] flex items-center px-10 md:px-20 py-20">

          <div className="max-w-xl">

            <h1 className="text-4xl md:text-6xl font-extrabold text-black leading-tight">
              Laboratory Information System
            </h1>

            <p className="mt-8 text-xl leading-10 text-gray-600">
              Improve laboratory efficiency with sample tracking,
              automated reporting, quality assurance, and integrated
              diagnostics management.
            </p>

          </div>

        </div>


        {/* RIGHT IMAGE */}
        <div className="h-[500px]">

          <img
            src="https://images.unsplash.com/photo-1581595219315-a187dd40c322?q=80&w=2070&auto=format&fit=crop"
            alt="Laboratory"
            className="w-full h-full object-cover"
          />

        </div>

      </div>


      {/* ================= FOURTH ROW ================= */}
      <div className="grid md:grid-cols-2">

        {/* LEFT IMAGE */}
        <div className="h-[500px] order-2 md:order-1">

          <img
            src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=2070&auto=format&fit=crop"
            alt="Pharmacy"
            className="w-full h-full object-cover"
          />

        </div>


        {/* RIGHT CONTENT */}
        <div className="bg-[#f5f5f5] flex items-center px-10 md:px-20 py-20 order-1 md:order-2">

          <div className="max-w-xl">

            <h1 className="text-4xl md:text-6xl font-extrabold text-black leading-tight">
              Pharmacy Management
            </h1>

            <p className="mt-8 text-xl leading-10 text-gray-600">
              Simplify inventory management, billing, prescription
              handling, and medicine tracking with smart pharmacy
              automation tools.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}