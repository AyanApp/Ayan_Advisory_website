"use client";

import { useEffect, useState } from "react";
import { getHeaderData } from "../../api/api_services";
import { Link } from "react-router-dom";

type HeaderData = Awaited<ReturnType<typeof getHeaderData>>;

export default function Navigation() {
  const [headerData, setHeaderData] =
    useState<HeaderData | null>(null);

  useEffect(() => {
    getHeaderData()
      .then((data) => setHeaderData(data))
      .catch((err) =>
        console.error(
          "Failed to fetch header data:",
          err
        )
      );
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#ffffff] shadow-md px-8 py-4 flex items-center justify-between z-50">

      {/* Logo */}
      <Link to="/">
        {headerData?.logo ? (
          <img
            src={headerData.logo}
            alt="AYAN Logo"
            className="h-16 w-auto object-contain cursor-pointer"
          />
        ) : (
          <div className="h-16 w-36 bg-gray-200 animate-pulse rounded" />
        )}
      </Link>

      {/* Navigation Buttons */}
      <div className="hidden md:flex gap-8 font-medium text-gray-700">

        {headerData?.button1 && (
          <a
            href="http://ayantech.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#DC2626] transition-colors duration-300"
          >
            {headerData.button1}
          </a>
        )}

        {headerData?.button2 && (
          <a
            href="#"
            className="hover:text-[#DC2626] transition-colors duration-300"
          >
            {headerData.button2}
          </a>
        )}

        {headerData?.button3 && (
          <a
            href="#"
            className="hover:text-[#DC2626] transition-colors duration-300"
          >
            {headerData.button3}
          </a>
        )}

        {headerData?.button4 && (
          <Link
            to="/contact"
            className="hover:text-[#DC2626] transition-colors duration-300"
          >
            {headerData.button4}
          </Link>
        )}

      </div>

    </nav>
  );
}




// "use client";

// import { useEffect, useState } from "react";
// import { getHeaderData } from "../../api/api_services";
// import { Link } from "react-router-dom";

// type HeaderData = Awaited<ReturnType<typeof getHeaderData>>;

// export default function Navigation() {
//   const [headerData, setHeaderData] =
//     useState<HeaderData | null>(null);

//   useEffect(() => {
//     getHeaderData()
//       .then((data) => setHeaderData(data))
//       .catch((err) =>
//         console.error(
//           "Failed to fetch header data:",
//           err
//         )
//       );
//   }, []);

//   return (
//     <nav className="fixed top-0 left-0 w-full bg-[#ffffff] shadow-md px-8 py-4 flex items-center justify-between z-50">

//       {/* Logo */}

//       {headerData?.logo ? (
//         <img
//           src={headerData.logo}
//           alt="AYAN Logo"
//           className="h-16 w-auto object-contain"
//         />
//       ) : (
//         <div className="h-16 w-36 bg-gray-200 animate-pulse rounded" />
//       )}

//       {/* Navigation Buttons */}

//       <div className="hidden md:flex gap-8 font-medium text-gray-700">

//         {headerData?.button1 && (
//           <a
//             href="http://ayantech.com/"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="hover:text-blue-600 transition"
//           >

//             {headerData.button1}

//           </a>
//         )}

//         {headerData?.button2 && (
//           <a href="#">
//             {headerData.button2}
//           </a>
//         )}

//         {headerData?.button3 && (
//           <a href="#">
//             {headerData.button3}
//           </a>
//         )}

//         {headerData?.button4 && (
//           <Link
//             to="/contact"
//             className="hover:text-blue-600 transition"
//           >

//             {headerData.button4}

//           </Link>
//         )}

//       </div>

//     </nav>
//   );
// }