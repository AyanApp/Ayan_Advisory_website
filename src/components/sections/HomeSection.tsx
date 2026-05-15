// HomeSection.tsx

import hero from "../../assets/hero.png";

import iso9001 from "../../assets/iso9001.png";
import iso27001 from "../../assets/iso27001.png";
import stage3 from "../../assets/stage3.png";

import client1 from "../../assets/client1.png";
import client2 from "../../assets/client2.png";
import client3 from "../../assets/client3.png";
import client4 from "../../assets/client4.webp";
import client5 from "../../assets/client5.png";
import client6 from "../../assets/client6.png";
import client7 from "../../assets/client7.png";
import client8 from "../../assets/client8.png";
import client9 from "../../assets/client9.png";
import client10 from "../../assets/client10.png";

export default function HomeSection() {

  const clients = [
    client1,
    client2,
    client3,
    client4,
    client5,
    client6,
    client7,
    client8,
    client9,
    client10,
  ];

  return (

    <main className="w-full overflow-hidden">

      {/* ================= HERO SECTION ================= */}

      <section
        className="relative w-full h-[810px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${hero})`,
        }}
      >

        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 flex items-center h-full px-6 sm:px-10 lg:px-14">

          <div className="max-w-3xl text-white">

            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Elevating Every
              <br />
              Patient Journey
            </h1>

            <p className="text-lg md:text-2xl text-white/90 mb-8">
              Streamline care, enhance collaboration,
              and drive healthier futures.
            </p>

           
          </div>

        </div>

      </section>


      {/* ================= CERTIFICATION SECTION ================= */}

      <section className="bg-gray-100 py-3 px-4">
        <div className="flex items-center justify-center gap-10 flex-wrap">

          <img
            src={iso9001}
            alt="ISO 9001"
            className="w-24 md:w-28 object-contain"
          />

          <img
            src={stage3}
            alt="Stage 3"
            className="w-24 md:w-28 object-contain"
          />

          <img
            src={iso27001}
            alt="ISO 27001"
            className="w-24 md:w-28 object-contain"
          />

        </div>

      </section>


      {/* ================= CLIENT SECTION ================= */}

      <section className="bg-white py-2 px-4">
        <div className="relative w-full overflow-hidden">

          <div className="flex items-center animate-marquee gap-20 w-max">

            {[...clients, ...clients].map((client, index) => (

              <div
                key={index}
                className="flex items-center justify-center"
              >

                <img
                  src={client}
                  alt={`Client ${index + 1}`}
                  className="h-16 object-contain"
                />

              </div>

            ))}

          </div>

        </div>

      </section>


     {/* ================= SERVICES SECTION ================= */}

<section className="w-full bg-white">

  {/* SERVICE 1 */}
  <div className="grid lg:grid-cols-2 min-h-[500px]">

    {/* LEFT CONTENT */}
    <div className="flex items-center px-8 lg:px-16 py-16 bg-[#f5f5f5]">

      <div>

        <h2 className="text-5xl font-bold leading-tight mb-6">
          Proprietary ERP
          <br />
          Solution
        </h2>

        <p className="text-gray-600 text-lg leading-9 mb-8 max-w-xl">
          Our proprietary ERP software solution can be
          customized with Cloud or On-Prem options.
          It integrates a full range of business
          processes with minimal cost and modern
          technology.
        </p>

      </div>

    </div>

    {/* RIGHT IMAGE */}
    <div className="h-[500px]">

      <img
        src={hero}
        alt="ERP Solution"
        className="w-full h-full object-cover"
      />

    </div>

  </div>

</section>
    </main>

  );
}