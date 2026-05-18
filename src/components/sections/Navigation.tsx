"use client";

import { useEffect, useState } from "react";
import { getHeaderData } from "../../api/api_services";

type HeaderData = Awaited<ReturnType<typeof getHeaderData>>;

export default function Navigation() {
  const [headerData, setHeaderData] = useState<HeaderData | null>(null);

  useEffect(() => {
    getHeaderData()
      .then((data) => setHeaderData(data))
      .catch((err) => console.error("Failed to fetch header data:", err));
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#ffffff] shadow-md px-8 py-4 flex items-center justify-between z-50">

      {headerData?.logo ? (
        <img
          src={headerData.logo}
          alt="AYAN Healthcare"
          className="h-16 w-auto object-contain"
        />
      ) : (
        <div className="h-16 w-36 bg-gray-200 animate-pulse rounded" />
      )}

      <div className="hidden md:flex gap-8 font-medium text-gray-700">
        {headerData?.healthcare && <a href="#">{headerData.healthcare}</a>}
        {headerData?.laboratory && <a href="#">{headerData.laboratory}</a>}
        {headerData?.analytics && <a href="#">{headerData.analytics}</a>}
        {headerData?.contact && <a href="#">{headerData.contact}</a>}
      </div>

    </nav>
  );
}
