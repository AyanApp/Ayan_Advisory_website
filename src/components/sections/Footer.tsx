"use client";

import { useEffect, useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { SiFacebook, SiInstagram, SiYoutube } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";

import { getFooterData } from "../../api/api_services";

type FooterData = Awaited<ReturnType<typeof getFooterData>>;
type SocialLink = FooterData["socialLinks"][number];

// ─── Social icon map ────────────────────────────────────────────────────────

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  YouTube: <SiYoutube size={18} />,
  Instagram: <SiInstagram size={18} />,
  Facebook: <SiFacebook size={18} />,
  LinkedIn: <FaLinkedinIn size={18} />,
};

// ─── Component ──────────────────────────────────────────────────────────────

export default function Footer() {
  const [footerData, setFooterData] = useState<FooterData | null>(null);

  useEffect(() => {
    getFooterData()
      .then((data) => setFooterData(data))
      .catch((err) => console.error("Failed to fetch footer data:", err));
  }, []);

  const indiaAddressLines: string[] = footerData?.address?.split("\n") ?? [];
  const usAddressLines: string[] = footerData?.usAddress?.split("\n") ?? [];

  return (
    <footer className="bg-[#555555] text-white w-full">
      <div className="w-full px-6 sm:px-10 lg:px-14 py-8">

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16 items-start">

          {/* ================= LOGO SECTION ================= */}
          <div>

            {footerData?.logo ? (
              <img
                src={footerData.logo}
                alt="AYAN Tech Solutions"
                className="h-28 sm:h-32 md:h-36 w-auto object-contain object-left mb-2"
                style={{ marginLeft: "-10px" }}
              />
            ) : (
              <div className="h-32 w-40 bg-white/10 animate-pulse rounded mb-2" />
            )}

            {footerData?.workedTechnology && (
              <p className="text-white/95 text-[22px] leading-[34px] font-medium mb-6">
                {footerData.workedTechnology}
              </p>
            )}

            {/* SOCIAL ICONS */}
            <div className="flex gap-3">
              {footerData?.socialLinks && footerData.socialLinks.length > 0
                ? footerData.socialLinks.map((link: SocialLink) => (
                    <a
                      key={link.id}
                      href={link.socialMediaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 flex items-center justify-center border border-white/20 hover:border-white transition"
                    >
                      {SOCIAL_ICONS[link.socialMedia] ?? null}
                    </a>
                  ))
                : Array.from({ length: 4 }).map((_: unknown, i: number) => (
                    <div key={i} className="w-11 h-11 bg-white/10 animate-pulse" />
                  ))}
            </div>

          </div>


          {/* ================= CONTACT SECTION ================= */}
          <div>

            {footerData?.getInTouch && (
              <h4 className="font-semibold mb-6 text-[24px] text-white">
                {footerData.getInTouch}
              </h4>
            )}

            <div className="space-y-5 text-white/90 text-[16px]">

              {footerData?.mobileNumber && (
                <div className="flex items-center gap-3">
                  <Phone size={18} />
                  <span>{footerData.mobileNumber}</span>
                </div>
              )}

              {footerData?.usMobileNumber && (
                <div className="flex items-center gap-3">
                  <Phone size={18} />
                  <span>{footerData.usMobileNumber}</span>
                </div>
              )}

              {footerData?.mailId && (
                <div className="flex items-center gap-3">
                  <Mail size={18} />
                  <span>{footerData.mailId}</span>
                </div>
              )}

              {footerData?.officeTiming && (
                <p className="leading-[30px]">{footerData.officeTiming}</p>
              )}

            </div>

          </div>


          {/* ================= ADDRESS SECTION ================= */}
          <div>

            {footerData?.officeAddress && (
              <h4 className="font-semibold mb-6 text-[24px] text-white">
                {footerData.officeAddress}
              </h4>
            )}

            <div className="space-y-6 text-white/90 text-[16px]">

              {indiaAddressLines.length > 0 && (
                <div className="flex gap-3">
                  <MapPin size={18} className="mt-1 shrink-0" />
                  <p className="leading-[32px]">
                    {indiaAddressLines.map((line: string, i: number) => (
                      <span key={i}>
                        {line}
                        {i < indiaAddressLines.length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </div>
              )}

              {usAddressLines.length > 0 && (
                <div className="flex gap-3">
                  <MapPin size={18} className="mt-1 shrink-0" />
                  <p className="leading-[32px]">
                    {usAddressLines.map((line: string, i: number) => (
                      <span key={i}>
                        {line}
                        {i < usAddressLines.length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </div>
              )}

            </div>

          </div>


          {/* ================= FREE DEMO SECTION ================= */}
          <div className="flex flex-col items-center justify-center h-full text-center">

            {footerData?.requestDemo && (
              <h3 className="text-[28px] font-semibold mb-5 text-white">
                {footerData.requestDemo}
              </h3>
            )}

            {footerData?.description && (
              <p className="text-white/90 text-[16px] leading-[30px] mb-8 max-w-[320px]">
                {footerData.description}
              </p>
            )}

            {footerData?.requestDemoButton && (
              <a
                href={footerData.requestDemoLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="bg-[#2f63e0] text-white px-8 py-4 rounded-2xl text-[18px] font-semibold border-2 border-black hover:bg-[#2454c9] transition shadow-md">
                  {footerData.requestDemoButton}
                </button>
              </a>
            )}

          </div>

        </div>


        {/* ================= BOTTOM ================= */}
        {footerData?.copyrights && (
          <div className="border-t border-white/10 mt-8 pt-5 text-center text-xs text-white/60">
            {footerData.copyrights}
          </div>
        )}

      </div>
    </footer>
  );
}
