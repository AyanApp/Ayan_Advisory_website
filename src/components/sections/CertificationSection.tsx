import iso9001 from "../../assets/iso9001.png";
import iso27001 from "../../assets/iso27001.png";
import stage3 from "../../assets/stage3.png";

export default function CertificationSection() {
  return (

   <section className="bg-[#555555] py-1 px-2">

  <div className="flex items-center justify-center gap-8 flex-wrap">

    {/* ISO 9001 */}
    <div className="h-28 flex items-center justify-center">
      <img
        src={iso9001}
        alt="ISO 9001"
        className="w-24 md:w-28 object-contain"
      />
    </div>

    {/* Stage 3 */}
    <div className="h-28 flex items-center justify-center">
      <img
        src={stage3}
        alt="Stage 3 Certification"
        className="w-24 md:w-28 object-contain"
      />
    </div>

    {/* ISO 27001 */}
    <div className="h-28 flex items-center justify-center">
      <img
        src={iso27001}
        alt="ISO 27001"
        className="w-24 md:w-28 object-contain"
      />
    </div>

  </div>

</section>
  );
}
