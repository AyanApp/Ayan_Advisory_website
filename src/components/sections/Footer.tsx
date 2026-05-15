"use client";

import { Mail, MapPin, Phone } from "lucide-react";

import {
  SiFacebook,
  SiInstagram,
  SiYoutube,
} from "react-icons/si";

import { FaLinkedinIn } from "react-icons/fa";

// LOGO IMAGE
import logo from "../../assets/logo.png";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#555555] text-white w-full">

      <div className="w-full px-6 sm:px-10 lg:px-14 py-8">

        {/* GRID */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-8
            lg:gap-16
            items-start
          "
        >

          {/* ================= LOGO SECTION ================= */}
          <div>

            {/* LOGO */}
            <img
              src={logo}
              alt="AYAN Tech Solutions"
              className="h-28 sm:h-32 md:h-36 w-auto object-contain object-left mb-2"
              style={{ marginLeft: "-10px" }}
            />

            {/* TAGLINE */}
            <p className="text-white/95 text-[22px] leading-[34px] font-medium mb-6">
              Digital Transformation - Delivered!
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex gap-3">

              <a
                href="#"
                className="w-11 h-11 flex items-center justify-center border border-white/20 hover:border-white transition"
              >
                <SiYoutube size={18} />
              </a>

              <a
                href="#"
                className="w-11 h-11 flex items-center justify-center border border-white/20 hover:border-white transition"
              >
                <SiInstagram size={18} />
              </a>

              <a
                href="#"
                className="w-11 h-11 flex items-center justify-center border border-white/20 hover:border-white transition"
              >
                <SiFacebook size={18} />
              </a>

              <a
                href="#"
                className="w-11 h-11 flex items-center justify-center border border-white/20 hover:border-white transition"
              >
                <FaLinkedinIn size={18} />
              </a>

            </div>

          </div>


          {/* ================= CONTACT SECTION ================= */}
          <div>

            <h4 className="font-semibold mb-6 text-[24px] text-white">
              Get in Touch
            </h4>

            <div className="space-y-5 text-white/90 text-[16px]">

              <div className="flex items-center gap-3">
                <Phone size={18} />
                <span>+91 8754495604</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} />
                <span>+1 (908)266-0767</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail size={18} />
                <span>info@ayantech.com</span>
              </div>

              <p className="leading-[30px]">
                Monday – Friday 9:30 am to 6:30 pm IST
              </p>

            </div>

          </div>


          {/* ================= ADDRESS SECTION ================= */}
          <div>

            <h4 className="font-semibold mb-6 text-[24px] text-white">
              Office Address
            </h4>

            <div className="space-y-6 text-white/90 text-[16px]">

              {/* INDIA ADDRESS */}
              <div className="flex gap-3">

                <MapPin
                  size={18}
                  className="mt-1 shrink-0"
                />

                <p className="leading-[32px]">
                  184-187 Temple Steps Block C 9th Flr
                  <br />
                  Anna Salai
                  <br />
                  Little Mount, Saidapet,
                  <br />
                  Chennai - 600 015
                </p>

              </div>

              {/* USA ADDRESS */}
              <div className="flex gap-3">

                <MapPin
                  size={18}
                  className="mt-1 shrink-0"
                />

                <p className="leading-[32px]">
                  5900 Balcones Dr., Ste 100, Austin,
                  <br />
                  TX78731 USA.
                </p>

              </div>

            </div>

          </div>


          {/* ================= FREE DEMO SECTION ================= */}
          <div className="flex flex-col items-center justify-center h-full text-center">

            <h3 className="text-[28px] font-semibold mb-5 text-white">
              Request a Free Demo
            </h3>

            <p className="text-white/90 text-[16px] leading-[30px] mb-8 max-w-[320px]">
              Experience our integrated healthcare platform and discover how AYAN can transform your healthcare operations.
            </p>

            <button
             className="
  bg-[#2f63e0]
  text-white
  px-8
  py-4
  rounded-2xl
  text-[18px]
  font-semibold
  border-2
  border-black
  hover:bg-[#2454c9]
  transition
  shadow-md
"
            >
              Book Free Demo
            </button>

          </div>

        </div>


        {/* ================= BOTTOM ================= */}
        <div className="border-t border-white/10 mt-8 pt-5 text-center text-xs text-white/60">

          © {year} AYAN SOLUTIONS. All rights reserved.

        </div>

      </div>

    </footer>
  );
}