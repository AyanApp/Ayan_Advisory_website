import { apiClient, getMediaUrl } from "./client";
import { ENDPOINTS } from "./endpoints";

// ─── Header ────────────────────────────────────────────────────────────────

export const getHeaderData = async () => {
  const json = await apiClient(ENDPOINTS.HEADER);
  const data = json?.data;

  return {
    logo: getMediaUrl(data?.Header_Logo?.url),
    healthcare: data?.Healthcare?.trim(),
    laboratory: data?.Laboratory?.trim(),
    analytics: data?.Analytics?.trim(),
    contact: data?.Contact?.trim(),
  };
};

// ─── Home Page ─────────────────────────────────────────────────────────────

export const getHomePageData = async () => {
  const json = await apiClient(ENDPOINTS.HOME_PAGE);
  const data = json?.data;

  const heroImageUrl =
    data?.HeroImage?.formats?.large?.url ||
    data?.HeroImage?.formats?.medium?.url ||
    data?.HeroImage?.url ||
    "";

  return {
    title: data?.title?.trim(),
    subTitle: data?.subTitle?.trim(),

    heroImage: getMediaUrl(heroImageUrl),

    // ─── Client Logos ─────────────────────────────────────────

    clientLogos:
      data?.clientLogo
        ?.sort((a: any, b: any) => a.order_number - b.order_number)
        ?.map((item: any) => {
          const logoUrl =
            item?.logo?.formats?.thumbnail?.url ||
            item?.logo?.formats?.small?.url ||
            item?.logo?.url ||
            "";

          return {
            id: item?.id,
            orderNumber: item?.order_number,
            logoName: item?.Logo_Name || "",
            logo: getMediaUrl(logoUrl),
          };
        }) || [],

    // ─── Home Sections ───────────────────────────────────────

    homeSections:
      data?.HomePage?.map((item: any) => {
        const mediaUrl =
          item?.image?.formats?.large?.url ||
          item?.image?.formats?.medium?.url ||
          item?.image?.formats?.small?.url ||
          item?.image?.url ||
          "";

        return {
          id: item?.id,
          title: item?.title?.trim(),
          description: item?.description || [],
          media: getMediaUrl(mediaUrl),
          mime: item?.image?.mime || "",
        };
      }) || [],

    // ─── ISO Certificates ────────────────────────────────────

    isoCertificates:
      data?.IOS_Certificates?.map((item: any) => {
        const isoLogoUrl =
          item?.ISO_Logo?.formats?.large?.url ||
          item?.ISO_Logo?.formats?.medium?.url ||
          item?.ISO_Logo?.formats?.small?.url ||
          item?.ISO_Logo?.formats?.thumbnail?.url ||
          item?.ISO_Logo?.url ||
          "";

        return {
          id: item?.id,
          isoLogo: getMediaUrl(isoLogoUrl),
        };
      }) || [],
  };
};

// ─── Footer ────────────────────────────────────────────────────────────────

export const getFooterData = async () => {
  const json = await apiClient(ENDPOINTS.FOOTER);
  const data = json?.data;

  return {
    logo: getMediaUrl(data?.Ayan_Logo?.url),
    workedTechnology: data?.Worked_technology?.trim(),
    getInTouch: data?.Get_in_Touch?.trim(),
    mobileNumber: data?.Mobile_number?.trim(),
    usMobileNumber: data?.US_Mobile_Number?.trim(),
    mailId: data?.Mail_id?.trim(),
    officeTiming: data?.OfficeTiming?.trim(),
    officeAddress: data?.OfficeAddress?.trim(),
    address: data?.Address?.trim(),
    usAddress: data?.US_Address?.trim(),
    requestDemo: data?.RequestDemo?.trim(),
    description: data?.description?.trim(),
    requestDemoButton: data?.RequestDemo_Button?.trim(),
    requestDemoLink: data?.RequestDemo_Link?.trim(),
    copyrights: data?.Ayan_CopyRights?.trim(),

    socialLinks:
      data?.socialLinks?.map((item: any) => ({
        id: item?.id,
        socialMedia: item?.Social_media,
        socialMediaUrl: item?.SocialMedia_url?.trim(),
      })) || [],
  };
};