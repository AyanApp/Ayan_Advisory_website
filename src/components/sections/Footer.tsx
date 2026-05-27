"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";

import {
  SiFacebook,
  SiInstagram,
  SiYoutube,
} from "react-icons/si";

import { FaLinkedinIn } from "react-icons/fa";

import { getFooterData } from "../../api/api_services";

type FooterData = Awaited<
  ReturnType<typeof getFooterData>
>;

type SocialLink =
  FooterData["socialLinks"][number];

export default function Footer() {

  const [footerData, setFooterData] =
    useState<FooterData | null>(null);

  useEffect(() => {

    getFooterData()
      .then((data) => setFooterData(data))
      .catch((err) =>
        console.error(
          "Failed to fetch footer data:",
          err
        )
      );

  }, []);

  if (!footerData) return null;

  // ✅ SOCIAL ICONS MAP

  const iconMap: Record<
    string,
    React.ReactNode
  > = {

    YouTube: <SiYoutube size={16} />,

    Instagram: <SiInstagram size={16} />,

    Facebook: <SiFacebook size={16} />,

    LinkedIn: <FaLinkedinIn size={16} />,

  };

  return (

    <footer className="bg-[#8a8f93] text-white w-full">

      <div className="w-full px-6 sm:px-10 lg:px-16 py-12">

        {/* MAIN GRID */}

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-[1fr_0.9fr_1.4fr]
            gap-6
            lg:gap-1
            items-start
          "
        >

          {/* ================= LOGO + ABOUT ================= */}

          <div className="flex flex-col items-start justify-start h-full">

            {/* LOGO */}

            {footerData?.logo ? (

              <img
                src={footerData.logo}
                alt="Ayan Logo"
                className="h-16 sm:h-18 md:h-20 w-auto mb-4 object-contain object-left"
                style={{ marginLeft: "-6px" }}
              />

            ) : (

              <div className="h-16 w-36 bg-white/10 animate-pulse rounded mb-4" />

            )}

            {/* TECHNOLOGY TEXT */}

            <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-xs">

              {footerData.workedTechnology}

            </p>

            {/* SOCIAL ICONS */}

            <div className="flex gap-3 mt-auto">

              {footerData.socialLinks?.map(
                (link: SocialLink) => (

                  <a
                    key={link.id}
                    href={link.socialMediaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      w-10 h-10
                      flex items-center justify-center
                      border border-white/20
                      hover:border-white
                      hover:text-white
                      transition
                    "
                  >

                    {iconMap[link.socialMedia]}

                  </a>

                )
              )}

            </div>

          </div>

          {/* ================= CONTACT ================= */}

          <div className="flex flex-col justify-start h-full lg:px-4">

            <h4 className="font-semibold mb-6 text-sm">

              {footerData.getInTouch}

            </h4>

            <div className="space-y-5 text-white/70 text-sm">

              {/* INDIA NUMBER */}

              <div className="flex items-center gap-3">

                <Phone size={16} />

                <span>
                  {footerData.mobileNumber}
                </span>

              </div>

              {/* USA NUMBER */}

              <div className="flex items-center gap-3">

                <Phone size={16} />

                <span>
                  {footerData.usMobileNumber}
                </span>

              </div>

              {/* EMAIL */}

              <div className="flex items-center gap-3">

                <Mail size={16} />

                <span>
                  {footerData.mailId}
                </span>

              </div>

              {/* OFFICE TIMING */}

              <p>
                {footerData.officeTiming}
              </p>

            </div>

          </div>

          {/* ================= ADDRESS ================= */}

          <div className="flex flex-col justify-start h-full">

            <h4 className="font-semibold mb-6 text-sm">

              {footerData.officeAddress}

            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* INDIA ADDRESS */}

              <div className="border-l border-white/20 pl-4">

                <h5 className="text-white font-semibold mb-3">

                  {footerData.indainAddressSubtitle}

                </h5>

                <div className="flex gap-2 text-white/70 text-sm">

                  <MapPin
                    size={16}
                    className="mt-1 shrink-0"
                  />

                  <p className="leading-7 whitespace-pre-line">

                    {footerData.address}

                  </p>

                </div>

              </div>

              {/* USA ADDRESS */}

              <div className="border-l border-white/20 pl-4">

                <h5 className="text-white font-semibold mb-3">

                  {footerData.usAddressSubtitle}

                </h5>

                <div className="flex gap-2 text-white/70 text-sm">

                  <MapPin
                    size={16}
                    className="mt-1 shrink-0"
                  />

                  <p className="leading-7 whitespace-pre-line">

                    {footerData.usAddress}

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* COPYRIGHT */}

        <div className="border-t border-white/10 mt-10 pt-6 text-center text-xs text-white/50">

          {footerData.copyrights}

        </div>

      </div>

    </footer>

  );

}