export const ENDPOINTS = {
  HEADER: "/api/ad-1-header-info?populate[0]=Ayan_Logo",
  HOME_PAGE:
    "/api/ad-2-home-page?populate[0]=HeroImage&populate[1]=clientLogo.logo&populate[2]=HomePage.image&populate[3]=IOS_Certificates.ISO_Logo",
  FOOTER:
    "/api/ad-3-footer?populate[0]=Ayan_Logo&populate[1]=socialLinks",
  CONTACT_PAGE: "/api/contact-page",
  CONTACT_SUBMIT: "/api/contact-page/send-email",

  // Module landing page — slug injected dynamically
  MODULE_PAGE: (slug: string) =>
    `/api/ad-4-advisory-modules?filters[slug][$eq]=${slug}` +
    `&populate[Why_Choose_Us][populate]=icon` +
    `&populate[Demo_Video]=true` +
    `&populate[FeatureImage]=true` +
    `&populate[featureitem]=true`,
};





/* export const ENDPOINTS = {
  HEADER: "/api/ad-1-header-info?populate[0]=Ayan_Logo",
  HOME_PAGE:
    "/api/ad-2-home-page?populate[0]=HeroImage&populate[1]=clientLogo.logo&populate[2]=HomePage.image&populate[3]=IOS_Certificates.ISO_Logo",
  FOOTER:
    "/api/ad-3-footer?populate[0]=Ayan_Logo&populate[1]=socialLinks",
  CONTACT_PAGE: "/api/contact-page",
  CONTACT_SUBMIT: "/api/contact-page/send-email",
  // Module landing page — slug is injected dynamically in api_services
  MODULE_PAGE: (slug: string) =>
    `/api/ad-4-advisory-modules?filters[slug][$eq]=${slug}` +
    `&populate[Why_Choose_Us][populate]=icon` +
    `&populate[Demo_Video]=true` +
    `&populate[FeatureImage]=true` +
    `&populate[featureitem]=true`,
};

 */