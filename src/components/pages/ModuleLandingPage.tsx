// ModuleLandingPage.tsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CheckCircle2, Play, Star } from "lucide-react";

import Navigation from "../sections/Navigation";
import Footer from "../sections/Footer";
import { getModulePage } from "../../api/api_services";

// ── Types ─────────────────────────────────────────────────────────────────────
type WhyChooseUsItem = {
  id: number;
  title: string;
  description: string;
  iconUrl: string;
};

type FeatureItem = {
  id: number;
  points: string;
};

type ModuleData = {
  title: string;
  subtitle: string;
  whyChooseUsTitle: string;
  whyChooseUs: WhyChooseUsItem[];
  videoTitle: string;
  videoUrl: string;
  videoMime: string;
  featuredTitle: string;
  featuredDescription: string;
  featureItems: FeatureItem[];
  featureImageUrl: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonText: string;
};

// ── Hardcoded testimonials ─────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    id: 1,
    quote: "Implementing this solution transformed our patient care delivery and improved efficiency significantly.",
    name: "Dr. Rajesh Kumar",
    role: "Chief Medical Officer",
    initials: "RK",
  },
  {
    id: 2,
    quote: "The platform's seamless interoperability allowed our teams to collaborate in real time like never before.",
    name: "Dr. Sarah Mitchell",
    role: "Director of Clinical Operations",
    initials: "SM",
  },
  {
    id: 3,
    quote: "Security and compliance were our top concerns — this solution exceeded every expectation we had.",
    name: "Dr. Ahmed Al-Farsi",
    role: "Head of Digital Health",
    initials: "AA",
  },
];
// ──────────────────────────────────────────────────────────────────────────────

export default function ModuleLandingPage() {
  const { slug } = useParams<{ slug: string }>();

  const [data, setData] = useState<ModuleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [videoPlaying, setVideoPlaying] = useState(false);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    setError("");
    setData(null);
    setVideoPlaying(false);

    console.log("Fetching module slug:", slug);

    getModulePage(slug)
      .then((res) => {
        console.log("Module data:", res);
        if (!res) {
          setError("Module not found.");
          return;
        }
        setData(res as ModuleData);
      })
      .catch((err) => {
        console.error("Module fetch error:", err);
        setError("Failed to load module.");
      })
      .finally(() => setLoading(false));

  }, [slug]);

  // ── Loading ────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center pt-24">
          <p className="text-gray-500 text-lg">Loading...</p>
        </div>
        <Footer />
      </>
    );
  }

  // ── Error ──────────────────────────────────────────────────────────────────
  if (error || !data) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex flex-col items-center justify-center pt-24 gap-2">
          <p className="text-red-500 text-lg">{error || "Module not found."}</p>
          <p className="text-gray-400 text-sm">Slug: {slug}</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation />

      <div className="w-full bg-[#f7f9fc] pt-24">

        {/* ================= HERO ================= */}
        <section className="relative overflow-hidden bg-gradient-to-r from-[#0077d7] to-[#14b8ff] py-28 px-6">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl" />
          <div className="relative z-10 max-w-6xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {data.title}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-9">
              {data.subtitle}
            </p>
          </div>
        </section>

        {/* ================= WHY CHOOSE US ================= */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">

            <h2 className="text-4xl font-bold text-center mb-16 text-[#0f172a]">
              {data.whyChooseUsTitle}
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {data.whyChooseUs.map((card) => (
                <div
                  key={card.id}
                  className="bg-white rounded-3xl border border-gray-200 p-10 shadow-sm hover:shadow-xl transition"
                >
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 overflow-hidden">
                    {card.iconUrl ? (
                      <img
                        src={card.iconUrl}
                        alt={card.title}
                        className="w-16 h-16 object-contain"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-2xl bg-gray-100" />
                    )}
                  </div>

                  <h3 className="text-2xl font-semibold mb-4">
                    {card.title}
                  </h3>

                  <p className="text-gray-600 leading-8">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ================= VIDEO SECTION ================= */}
        <section className="py-24 px-6 bg-[#f8fbff]">
          <div className="max-w-6xl mx-auto">

            <h2 className="text-4xl font-bold text-center mb-16 text-[#0f172a]">
              {data.videoTitle}
            </h2>

            <div className="bg-[#dff3ff] rounded-[40px] h-[550px] flex flex-col items-center justify-center shadow-inner overflow-hidden relative">
              {videoPlaying && data.videoUrl ? (
                <video
                  src={data.videoUrl}
                  autoPlay
                  controls
                  className="w-full h-full object-cover rounded-[40px]"
                />
              ) : (
                <>
                  <button
                    onClick={() => setVideoPlaying(true)}
                    className="w-28 h-28 rounded-full bg-[#0077d7] flex items-center justify-center hover:scale-110 transition"
                  >
                    <Play className="text-white ml-1" size={44} fill="white" />
                  </button>
                  <p className="mt-8 text-gray-500 text-lg">
                    Click to watch demo video
                  </p>
                </>
              )}
            </div>

          </div>
        </section>

        {/* ================= FEATURES SECTION ================= */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">

            <h2 className="text-4xl font-bold text-center mb-20 text-[#0f172a]">
              {data.featuredTitle}
            </h2>

            <div className="grid lg:grid-cols-2 gap-20 items-center">

              {/* LEFT */}
              <div>
                <p className="text-gray-600 text-lg leading-9 mb-10">
                  {data.featuredDescription}
                </p>

                <div className="space-y-6">
                  {data.featureItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <CheckCircle2 className="text-green-600 shrink-0" size={26} />
                      <span className="text-lg">{item.points}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT */}
              <div className="rounded-[40px] overflow-hidden shadow-xl">
                {data.featureImageUrl ? (
                  <img
                    src={data.featureImageUrl}
                    alt={data.featuredTitle}
                    className="w-full h-[500px] object-cover"
                  />
                ) : (
                  <div className="w-full h-[500px] bg-gray-100 rounded-[40px]" />
                )}
              </div>

            </div>

          </div>
        </section>

        {/* ================= TESTIMONIALS — hardcoded ================= */}
        <section className="py-24 px-6 bg-[#f8fbff]">
          <div className="max-w-6xl mx-auto">

            <h2 className="text-4xl font-bold text-center mb-16 text-[#0f172a]">
              Customer Success Stories
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((t) => (
                <div
                  key={t.id}
                  className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm"
                >
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="text-yellow-500" fill="#eab308" size={20} />
                    ))}
                  </div>

                  <p className="text-gray-600 leading-8 italic mb-8">
                    "{t.quote}"
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">
                      {t.initials}
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{t.name}</h4>
                      <p className="text-gray-500 text-sm">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="bg-gradient-to-r from-[#0077d7] to-[#14b8ff] py-24 px-6 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold mb-8">{data.ctaTitle}</h2>
            <p className="text-xl text-white/90 leading-9 mb-12">{data.ctaDescription}</p>
            <button className="bg-white text-[#0077d7] px-10 py-5 rounded-2xl text-lg font-semibold hover:scale-105 transition shadow-lg">
              {data.ctaButtonText}
            </button>
          </div>
        </section>

      </div>

      <Footer />
    </>
  );
}




// // ModuleLandingPage.tsx

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import {
//   CheckCircle2,
//   Play,
//   Star,
// } from "lucide-react";

// import Navigation from "../sections/Navigation";
// import Footer from "../sections/Footer";
// import { apiClient, getMediaUrl } from "../../api/client";

// // ── Types ────────────────────────────────────────────────────────────────────
// type WhyChooseUsItem = {
//   id: number;
//   title: string;
//   description: string;
//   icon: {
//     url: string;
//     formats?: { thumbnail?: { url: string } };
//   } | null;
// };

// type FeatureItem = {
//   id: number;
//   points: string;
// };

// type ModuleData = {
//   title: string;
//   subtitle: string;
//   Why_Choose_Us_Title: string;
//   Video_title: string;
//   Featured_Title: string;
//   Featured_Description: string;
//   ctaTitle: string;
//   ctaDescription: string;
//   ctaButtonText: string;
//   Demo_Video: { url: string; mime: string } | null;
//   FeatureImage: {
//     url: string;
//     formats?: { large?: { url: string }; medium?: { url: string } };
//   } | null;
//   featureitem: FeatureItem[];
//   Why_Choose_Us: WhyChooseUsItem[];
// };

// // ── Hardcoded testimonials ───────────────────────────────────────────────────
// const TESTIMONIALS = [
//   {
//     id: 1,
//     quote:
//       "Implementing this solution transformed our patient care delivery and improved efficiency significantly.",
//     name: "Dr. Rajesh Kumar",
//     role: "Chief Medical Officer",
//     initials: "RK",
//   },
//   {
//     id: 2,
//     quote:
//       "The platform's seamless interoperability allowed our teams to collaborate in real time like never before.",
//     name: "Dr. Sarah Mitchell",
//     role: "Director of Clinical Operations",
//     initials: "SM",
//   },
//   {
//     id: 3,
//     quote:
//       "Security and compliance were our top concerns — this solution exceeded every expectation we had.",
//     name: "Dr. Ahmed Al-Farsi",
//     role: "Head of Digital Health",
//     initials: "AA",
//   },
// ];
// // ────────────────────────────────────────────────────────────────────────────

// export default function ModuleLandingPage() {
//   const { slug } = useParams<{ slug: string }>();

//   const [data, setData] = useState<ModuleData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [videoPlaying, setVideoPlaying] = useState(false);

//   useEffect(() => {
//     if (!slug) return;

//     setLoading(true);
//     setVideoPlaying(false);

//     const endpoint =
//       `/api/ad-4-advisory-modules?filters[slug][$eq]=${slug}` +
//       `&populate[Why_Choose_Us][populate]=icon` +
//       `&populate[Demo_Video]=true` +
//       `&populate[FeatureImage]=true` +
//       `&populate[featureitem]=true`;

//     apiClient(endpoint)
//       .then((json) => {
//         const item = json?.data?.[0];
//         if (!item) {
//           setError("Module not found.");
//           return;
//         }
//         setData({
//           title: item.title ?? "",
//           subtitle: item.subtitle ?? "",
//           Why_Choose_Us_Title: item.Why_Choose_Us_Title ?? "Why Choose Us",
//           Video_title: item.Video_title ?? "See it in Action",
//           Featured_Title: item.Featured_Title ?? "",
//           Featured_Description: item.Featured_Description ?? "",
//           ctaTitle: item.ctaTitle ?? "",
//           ctaDescription: item.ctaDescription ?? "",
//           ctaButtonText: item.ctaButtonText ?? "Schedule a Demo",
//           Demo_Video: item.Demo_Video
//             ? { url: item.Demo_Video.url, mime: item.Demo_Video.mime }
//             : null,
//           FeatureImage: item.FeatureImage ?? null,
//           featureitem: item.featureitem ?? [],
//           Why_Choose_Us: item.Why_Choose_Us ?? [],
//         });
//       })
//       .catch(() => setError("Failed to load module."))
//       .finally(() => setLoading(false));
//   }, [slug]);

//   // ── Feature image URL ──────────────────────────────────────────────────────
//   const featureImageUrl = data?.FeatureImage
//     ? getMediaUrl(
//         data.FeatureImage.formats?.large?.url ||
//         data.FeatureImage.formats?.medium?.url ||
//         data.FeatureImage.url
//       )
//     : "";

//   // ── Demo video URL ─────────────────────────────────────────────────────────
//   const videoUrl = data?.Demo_Video ? getMediaUrl(data.Demo_Video.url) : "";

//   // ── Loading / error states ─────────────────────────────────────────────────
//   if (loading) {
//     return (
//       <>
//         <Navigation />
//         <div className="min-h-screen flex items-center justify-center pt-24">
//           <p className="text-gray-500 text-lg">Loading...</p>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   if (error || !data) {
//     return (
//       <>
//         <Navigation />
//         <div className="min-h-screen flex items-center justify-center pt-24">
//           <p className="text-red-500 text-lg">{error || "Module not found."}</p>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   return (
//     <>
//       <Navigation />

//       <div className="w-full bg-[#f7f9fc] pt-24">

//         {/* ================= HERO ================= */}
//         <section className="relative overflow-hidden bg-gradient-to-r from-[#0077d7] to-[#14b8ff] py-28 px-6">
//           <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl" />
//           <div className="relative z-10 max-w-6xl mx-auto text-center text-white">
//             <h1 className="text-5xl md:text-6xl font-bold mb-6">
//               {data.title}
//             </h1>
//             <p className="text-xl text-white/90 max-w-3xl mx-auto leading-9">
//               {data.subtitle}
//             </p>
//           </div>
//         </section>

//         {/* ================= WHY CHOOSE US ================= */}
//         <section className="py-24 px-6 bg-white">
//           <div className="max-w-6xl mx-auto">

//             <h2 className="text-4xl font-bold text-center mb-16 text-[#0f172a]">
//               {data.Why_Choose_Us_Title}
//             </h2>

//             <div className="grid md:grid-cols-3 gap-8">
//               {data.Why_Choose_Us.map((card) => {
//                 const iconUrl = card.icon
//                   ? getMediaUrl(
//                       card.icon.formats?.thumbnail?.url || card.icon.url
//                     )
//                   : "";

//                 return (
//                   <div
//                     key={card.id}
//                     className="bg-white rounded-3xl border border-gray-200 p-10 shadow-sm hover:shadow-xl transition"
//                   >
//                     {/* Icon — from Strapi media */}
//                     <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 overflow-hidden">
//                       {iconUrl ? (
//                         <img
//                           src={iconUrl}
//                           alt={card.title}
//                           className="w-16 h-16 object-contain"
//                         />
//                       ) : (
//                         <div className="w-16 h-16 rounded-2xl bg-gray-100" />
//                       )}
//                     </div>

//                     <h3 className="text-2xl font-semibold mb-4">
//                       {card.title}
//                     </h3>

//                     <p className="text-gray-600 leading-8">
//                       {card.description}
//                     </p>
//                   </div>
//                 );
//               })}
//             </div>

//           </div>
//         </section>

//         {/* ================= VIDEO SECTION ================= */}
//         <section className="py-24 px-6 bg-[#f8fbff]">
//           <div className="max-w-6xl mx-auto">

//             <h2 className="text-4xl font-bold text-center mb-16 text-[#0f172a]">
//               {data.Video_title}
//             </h2>

//             <div className="bg-[#dff3ff] rounded-[40px] h-[550px] flex flex-col items-center justify-center shadow-inner overflow-hidden relative">
//               {videoPlaying && videoUrl ? (
//                 <video
//                   src={videoUrl}
//                   autoPlay
//                   controls
//                   className="w-full h-full object-cover rounded-[40px]"
//                 />
//               ) : (
//                 <>
//                   <button
//                     onClick={() => setVideoPlaying(true)}
//                     className="w-28 h-28 rounded-full bg-[#0077d7] flex items-center justify-center hover:scale-110 transition"
//                   >
//                     <Play className="text-white ml-1" size={44} fill="white" />
//                   </button>
//                   <p className="mt-8 text-gray-500 text-lg">
//                     Click to watch demo video
//                   </p>
//                 </>
//               )}
//             </div>

//           </div>
//         </section>

//         {/* ================= FEATURES SECTION ================= */}
//         <section className="py-24 px-6 bg-white">
//           <div className="max-w-6xl mx-auto">

//             <h2 className="text-4xl font-bold text-center mb-20 text-[#0f172a]">
//               {data.Featured_Title}
//             </h2>

//             <div className="grid lg:grid-cols-2 gap-20 items-center">

//               {/* LEFT */}
//               <div>
//                 <p className="text-gray-600 text-lg leading-9 mb-10">
//                   {data.Featured_Description}
//                 </p>

//                 <div className="space-y-6">
//                   {data.featureitem.map((item) => (
//                     <div key={item.id} className="flex items-center gap-4">
//                       <CheckCircle2 className="text-green-600 shrink-0" size={26} />
//                       <span className="text-lg">{item.points}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* RIGHT — feature image */}
//               <div className="rounded-[40px] overflow-hidden shadow-xl">
//                 {featureImageUrl ? (
//                   <img
//                     src={featureImageUrl}
//                     alt={data.Featured_Title}
//                     className="w-full h-[500px] object-cover"
//                   />
//                 ) : (
//                   <div className="w-full h-[500px] bg-gray-100 rounded-[40px]" />
//                 )}
//               </div>

//             </div>

//           </div>
//         </section>

//         {/* ================= TESTIMONIALS — hardcoded ================= */}
//         <section className="py-24 px-6 bg-[#f8fbff]">
//           <div className="max-w-6xl mx-auto">

//             <h2 className="text-4xl font-bold text-center mb-16 text-[#0f172a]">
//               Customer Success Stories
//             </h2>

//             <div className="grid md:grid-cols-3 gap-8">
//               {TESTIMONIALS.map((t) => (
//                 <div
//                   key={t.id}
//                   className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm"
//                 >
//                   <div className="flex gap-1 mb-6">
//                     {Array.from({ length: 5 }).map((_, i) => (
//                       <Star key={i} className="text-yellow-500" fill="#eab308" size={20} />
//                     ))}
//                   </div>

//                   <p className="text-gray-600 leading-8 italic mb-8">
//                     "{t.quote}"
//                   </p>

//                   <div className="flex items-center gap-4">
//                     <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">
//                       {t.initials}
//                     </div>
//                     <div>
//                       <h4 className="font-semibold text-lg">{t.name}</h4>
//                       <p className="text-gray-500 text-sm">{t.role}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//           </div>
//         </section>

//         {/* ================= CTA ================= */}
//         <section className="bg-gradient-to-r from-[#0077d7] to-[#14b8ff] py-24 px-6 text-center text-white">
//           <div className="max-w-4xl mx-auto">
//             <h2 className="text-5xl font-bold mb-8">{data.ctaTitle}</h2>
//             <p className="text-xl text-white/90 leading-9 mb-12">{data.ctaDescription}</p>
//             <button className="bg-white text-[#0077d7] px-10 py-5 rounded-2xl text-lg font-semibold hover:scale-105 transition shadow-lg">
//               {data.ctaButtonText}
//             </button>
//           </div>
//         </section>

//       </div>

//       <Footer />
//     </>
//   );
// }