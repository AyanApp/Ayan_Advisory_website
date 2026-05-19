"use client";

import { useEffect, useState } from "react";
import { getHomePageData } from "../../api/api_services";

type HomePageData = Awaited<ReturnType<typeof getHomePageData>>;
type HomeSectionType = HomePageData["homeSections"][number];
type ClientLogo = HomePageData["clientLogos"][number];
type IsoCertificate = HomePageData["isoCertificates"][number];

// ─── Rich text block types ─────────────────────────────────────────────────

interface RichTextChild {
  type: string;
  text?: string;
  bold?: boolean;
  children?: RichTextChild[];
}

interface RichTextBlock {
  type: string;
  children: RichTextChild[];
}

// ─── Rich Text Renderer ────────────────────────────────────────────────────

const renderRichText = (blocks: RichTextBlock[]): React.ReactNode => {
  return blocks.map((block: RichTextBlock, blockIndex: number) => {
    if (block.type === "paragraph") {
      return (
        <p
          key={blockIndex}
          className="text-gray-600 text-lg leading-9 mb-4 max-w-xl"
        >
          {block.children.map((child: RichTextChild, i: number) =>
            child.bold ? (
              <strong key={i}>{child.text}</strong>
            ) : (
              <span key={i}>{child.text}</span>
            )
          )}
        </p>
      );
    }

    if (block.type === "list") {
      return (
        <ul
          key={blockIndex}
          className="list-disc list-inside text-gray-600 text-lg leading-9 mb-4 max-w-xl"
        >
          {block.children.map((item: RichTextChild, i: number) => (
            <li key={i}>
              {item.children?.map((child: RichTextChild, j: number) =>
                child.bold ? (
                  <strong key={j}>{child.text}</strong>
                ) : (
                  <span key={j}>{child.text}</span>
                )
              )}
            </li>
          ))}
        </ul>
      );
    }

    return null;
  });
};

// ─── Component ─────────────────────────────────────────────────────────────

export default function HomeSection() {
  const [homeData, setHomeData] =
    useState<HomePageData | null>(null);

  const [heroBgLoaded, setHeroBgLoaded] =
    useState(false);

  useEffect(() => {
    getHomePageData()
      .then((data) => {
        setHomeData(data);

        if (data?.heroImage) {
          const img = new Image();

          img.src = data.heroImage;

          img.onload = () => setHeroBgLoaded(true);

          img.onerror = () => {
            console.error(
              "Hero image failed to load:",
              data.heroImage
            );
          };
        }
      })
      .catch((err) => {
        console.error(
          "Failed to fetch home page data:",
          err
        );
      });
  }, []);

  const clients: ClientLogo[] =
    homeData?.clientLogos ?? [];

  const isoCertificates: IsoCertificate[] =
    homeData?.isoCertificates ?? [];

  return (
    <main className="w-full overflow-hidden">

      {/* ================= HERO SECTION ================= */}

      <section
        className="relative w-full h-[810px] bg-cover bg-center bg-gray-400 transition-all duration-500"
        style={
          heroBgLoaded && homeData?.heroImage
            ? {
                backgroundImage: `url(${homeData.heroImage})`,
              }
            : {}
        }
      >
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 flex items-center h-full px-6 sm:px-10 lg:px-14">
          <div className="max-w-3xl text-white">

            {homeData?.title && (
              <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                {homeData.title}
              </h1>
            )}

            {homeData?.subTitle && (
              <p className="text-lg md:text-2xl text-white/90 mb-8">
                {homeData.subTitle}
              </p>
            )}

          </div>
        </div>
      </section>

      {/* ================= CERTIFICATION SECTION ================= */}

      <section className="bg-gray-100 py-4 px-4">
        <div className="flex items-center justify-center gap-10 flex-wrap">

          {isoCertificates.map(
            (item: IsoCertificate) => (
              <img
                key={item.id}
                src={item.isoLogo}
                alt="ISO Certification"
                className="w-24 md:w-28 object-contain"
              />
            )
          )}

        </div>
      </section>

      {/* ================= CLIENT LOGO MARQUEE ================= */}

      <section className="bg-white py-2 px-4">
        <div className="relative w-full overflow-hidden">

          {clients.length > 0 ? (
            <div className="flex items-center animate-marquee gap-20 w-max">

              {[...clients, ...clients].map(
                (
                  client: ClientLogo,
                  index: number
                ) => (
                  <div
                    key={index}
                    className="flex items-center justify-center"
                  >
                    <img
                      src={client.logo}
                      alt={client.logoName}
                      className="h-16 object-contain"
                      onError={(e) => {
                        (
                          e.currentTarget as HTMLImageElement
                        ).style.display = "none";
                      }}
                    />
                  </div>
                )
              )}

            </div>
          ) : (
            <div className="flex items-center gap-20 py-4">

              {Array.from({ length: 5 }).map(
                (_: unknown, i: number) => (
                  <div
                    key={i}
                    className="h-16 w-28 bg-gray-200 animate-pulse rounded"
                  />
                )
              )}

            </div>
          )}

        </div>
      </section>

      {/* ================= SERVICES SECTION ================= */}

      <section className="w-full bg-white">

        {homeData?.homeSections &&
        homeData.homeSections.length > 0 ? (
          homeData.homeSections.map(
            (
              service: HomeSectionType,
              index: number
            ) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={service.id}
                  className="grid lg:grid-cols-2 min-h-[500px]"
                >

                  {/* Content Side */}

                  <div
  className={`bg-[#f5f5f5] flex flex-col h-[500px] ${
    !isEven ? "lg:order-2" : ""
  }`}
>

  {/* FIXED TITLE */}
  <div className="px-8 lg:px-16 pt-16 pb-6 shrink-0">

    {service.title && (
      <h2 className="text-5xl font-bold leading-tight">
        {service.title}
      </h2>
    )}

  </div>

  {/* SCROLLABLE DESCRIPTION */}
  <div className="overflow-y-auto px-8 lg:px-16 pb-16 flex-1">

    {renderRichText(
      service.description as RichTextBlock[]
    )}

  </div>

</div>

                  {/* Media Side */}

                  <div
                    className={`h-[500px] ${
                      !isEven ? "lg:order-1" : ""
                    }`}
                  >

                    {service.media ? (
                      service.mime.startsWith(
                        "video"
                      ) ? (
                        <video
                          src={service.media}
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (
                              e.currentTarget as HTMLVideoElement
                            ).style.display =
                              "none";
                          }}
                        />
                      ) : (
                        <img
                          src={service.media}
                          alt={service.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (
                              e.currentTarget as HTMLImageElement
                            ).style.display =
                              "none";
                          }}
                        />
                      )
                    ) : (
                      <div className="w-full h-full bg-gray-200 animate-pulse" />
                    )}

                  </div>

                </div>
              );
            }
          )
        ) : (
          <div className="grid lg:grid-cols-2 min-h-[500px]">

            <div className="flex items-center px-8 lg:px-16 py-16 bg-[#f5f5f5]">
              <div className="w-full space-y-4">

                <div className="h-12 bg-gray-200 animate-pulse rounded w-3/4" />

                <div className="h-6 bg-gray-200 animate-pulse rounded w-full" />

                <div className="h-6 bg-gray-200 animate-pulse rounded w-5/6" />

              </div>
            </div>

            <div className="h-[500px] bg-gray-200 animate-pulse" />

          </div>
        )}

      </section>

    </main>
  );
}