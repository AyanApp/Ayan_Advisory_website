import { apiClient, getMediaUrl, postClient } from "./client";
import { ENDPOINTS } from "./endpoints";

// ─── Header ────────────────────────────────────────────────────────────────

export const getHeaderData = async () => {
  const json = await apiClient(ENDPOINTS.HEADER);
  const data = json?.data;

  return {
    logo: getMediaUrl(
      data?.Ayan_Logo?.formats?.large?.url ||
      data?.Ayan_Logo?.formats?.medium?.url ||
      data?.Ayan_Logo?.formats?.small?.url ||
      data?.Ayan_Logo?.formats?.thumbnail?.url ||
      data?.Ayan_Logo?.url
    ),

    button1: data?.button1?.trim(),
    button2: data?.button2?.trim(),
    button3: data?.button3?.trim(),
    button4: data?.button4?.trim(),
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
    indainAddressSubtitle: data?.Indain_Address_SubTile?.trim(),
    address: data?.Address?.trim(),
    usAddressSubtitle: data?.US_Address_SubTile?.trim(),
    usAddress: data?.US_Address?.trim(),
    copyrights: data?.Ayan_CopyRights?.trim(),

    socialLinks:
      data?.socialLinks?.map((item: any) => ({
        id: item?.id,
        socialMedia: item?.Social_media,
        socialMediaUrl: item?.SocialMedia_url?.trim(),
      })) || [],
  };
};

// ─── Contact Page ───────────────────────────────────────────────────────

export const getContactPage = async () => {
  const res = await apiClient(ENDPOINTS.CONTACT_PAGE);
  const data = res?.data;
 
  if (!data) return null;
 
  const description = data?.description?.[0]?.children?.[0]?.text || "";
 
  const socialLinks =
    data?.URL?.map((item: any) => ({
      title: item.title,
      description: item.description,
      buttonText: item.buttonText,
      link: item.Link,
    })) || [];
 
  const addresses =
    data?.Address?.map((addr: any) => ({
      title: addr.title,
      description: addr.description?.[0]?.children?.[0]?.text || "",
    })) || [];
 
  const mapImage = data?.location_image?.url
    ? getMediaUrl(data.location_image.url)
    : "";
 
  const form = {
    title: data?.form?.title || "",
    submitButton: data?.form?.SubmitButtonText || "Submit",
    successMessage: data?.form?.successMessage || "",
    fields:
      data?.form?.formField
        ?.map((f: any) => ({
          id: f.id,
          label: f.label,
          name: f.name,
          type: f.type,
          placeholder: f.placeholder,
          required: f.required,
          width: f.width,
          order: f.order,
        }))
        .sort((a: any, b: any) => a.order - b.order) || [],
  };
 
  return {
    title: data?.title || "",
    description,
    subtitle: data?.subtitle || "",
    subTitle: data?.sub_title || "",
    socialLinks,
    addresses,
    mapImage,
    form,
  };
};
 
export const submitContactForm = async (formValues: Record<string, string>) => {
  const res = await postClient(ENDPOINTS.CONTACT_SUBMIT, formValues);
  return res;
};