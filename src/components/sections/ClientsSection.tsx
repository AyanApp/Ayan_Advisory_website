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

export default function ClientsSection() {

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

    <section className="py-8 bg-[#d9d9d6] overflow-hidden">

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

  );
}