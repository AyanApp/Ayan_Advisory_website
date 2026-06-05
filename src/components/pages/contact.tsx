import { useEffect, useState } from "react";

import {
  MapPin,
  Mail,
  CalendarDays,
  Phone,
} from "lucide-react";

import { FaLinkedinIn } from "react-icons/fa";

import Navigation from "../sections/Navigation";
import Footer from "../sections/Footer";

import {
  getContactPage,
   submitContactForm,
} from "../../api/api_services";

// ── Free email domain blocklist ──────────────────────────────────────────────
const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com", "googlemail.com",
  "yahoo.com", "yahoo.co.uk", "yahoo.co.in", "yahoo.co.jp", "yahoo.fr",
  "yahoo.de", "yahoo.es", "yahoo.it", "yahoo.com.ar", "yahoo.com.br",
  "yahoo.com.mx", "ymail.com", "rocketmail.com",
  "hotmail.com", "hotmail.co.uk", "hotmail.fr", "hotmail.de", "hotmail.es",
  "hotmail.it", "hotmail.com.br",
  "outlook.com", "outlook.in", "outlook.com.br",
  "live.com", "live.co.uk", "live.fr", "live.de", "live.in",
  "msn.com",
  "icloud.com", "me.com", "mac.com",
  "aol.com", "aim.com", "verizon.net", "att.net",
  "protonmail.com", "protonmail.ch", "proton.me", "pm.me",
  "zoho.com",
  "mail.com", "email.com", "inbox.com", "usa.com",
  "gmx.com", "gmx.net", "gmx.de", "gmx.fr", "gmx.us",
  "rediffmail.com", "indiatimes.com",
  "yandex.com", "yandex.ru", "yandex.ua", "mail.ru", "list.ru",
  "bk.ru", "inbox.ru",
  "tutanota.com", "tuta.io", "tutamail.com",
  "fastmail.com", "fastmail.fm",
  "hushmail.com", "hush.com",
  "guerrillamail.com", "sharklasers.com", "guerrillamailblock.com",
  "tempmail.com", "throwam.com", "mailinator.com", "trashmail.com",
  "10minutemail.com", "dispostable.com", "maildrop.cc",
]);

const FREE_ROOT_DOMAINS = new Set([
  "gmail.com", "googlemail.com",
  "yahoo.com", "ymail.com",
  "hotmail.com", "outlook.com", "live.com", "msn.com",
  "icloud.com", "me.com",
  "mail.ru", "yandex.ru", "yandex.com",
]);

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Returns true if the email belongs to a free/personal provider
const isFreeEmail = (email: string): boolean => {
  const trimmed = email.trim().toLowerCase();
  if (!EMAIL_REGEX.test(trimmed)) return false;
  const domain = trimmed.split("@")[1];
  if (FREE_EMAIL_DOMAINS.has(domain)) return true;
  const parts = domain.split(".");
  for (let i = 0; i < parts.length - 1; i++) {
    if (FREE_ROOT_DOMAINS.has(parts.slice(i).join("."))) return true;
  }
  return false;
};

// Basic format check only — accepts both free and business emails
const validateEmailFormat = (email: string): string => {
  const trimmed = email.trim();
  if (!trimmed) return "Email is required.";
  if (!EMAIL_REGEX.test(trimmed)) return "Please enter a valid email address.";
  return "";
};

// Used to detect the email field regardless of what name/type the API returns
const isEmailInputField = (field: any): boolean =>
  field.type === "email" ||
  field.name?.toLowerCase().includes("email") ||
  field.label?.toLowerCase().includes("email");

// Used to detect the phone field
const isPhoneInputField = (field: any): boolean =>
  field.type === "number" ||
  field.type === "tel" ||
  field.name?.toLowerCase().includes("phone") ||
  field.label?.toLowerCase().includes("phone");

// ── International phone validation ──────────────────────────────────────────
// Accepts: +1 (555) 555-5555 | +44 7911 123456 | 0555 123456 (KSA) | etc.
// Allows digits, spaces, hyphens, dots, parentheses, leading +
// Total digit count must be 7–15 (ITU-T E.164 standard)
const PHONE_CHARS_REGEX = /^[+\d][\d\s\-().]{5,19}$/;

const validatePhone = (phone: string): string => {
  const trimmed = phone.trim();
  if (!trimmed) return "Phone number is required.";
  if (!PHONE_CHARS_REGEX.test(trimmed)) return "Please enter a valid phone number.";
  const digitsOnly = trimmed.replace(/\D/g, "");
  if (digitsOnly.length < 7) return "Phone number is too short.";
  if (digitsOnly.length > 15) return "Phone number is too long.";
  return "";
};
// ────────────────────────────────────────────────────────────────────────────

export default function ContactPage() {

  const [pageData, setPageData] = useState<any>(null);

  const [formValues, setFormValues] =
    useState<Record<string, string>>({});

  const [submitted, setSubmitted] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] = useState("");

  const [loading, setLoading] =
    useState(true);

  // Form validation errors
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {

    getContactPage()
      .then((data) => {
        setPageData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(
          "Failed to fetch contact page:",
          err
        );
        setLoading(false);
      });

  }, []);

  // Derive email type live from current input
  const emailKey = Object.keys(formValues).find((k) =>
    k.toLowerCase().includes("email")
  ) ?? "email";
  const phoneKey = Object.keys(formValues).find((k) =>
    k.toLowerCase().includes("phone")
  ) ?? "phone";

  const currentEmail = formValues[emailKey] ?? "";
  const usingFreeEmail = isFreeEmail(currentEmail);

  const handleChange = (
    name: string,
    value: string
  ) => {

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name.toLowerCase().includes("email")) {
      setEmailError("");
      setPhoneError(""); // re-evaluate phone requirement when email changes
    }
    if (name.toLowerCase().includes("phone")) setPhoneError("");

  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    // 1. Validate email format (accepts all — free and business)
    const emailMsg = validateEmailFormat(currentEmail);
    if (emailMsg) {
      setEmailError(emailMsg);
      return;
    }

    // 2. Phone validation
    const phoneVal = (formValues[phoneKey] ?? "").trim();
    if (usingFreeEmail) {
      // Free email: phone is mandatory + must be valid
      const phoneMsg = validatePhone(phoneVal || "");
      if (phoneMsg) {
        setPhoneError(
          !phoneVal
            ? "Phone number is required when using a personal email."
            : phoneMsg
        );
        return;
      }
    } else if (phoneVal) {
      // Business email: phone is optional but if filled must be valid
      const phoneMsg = validatePhone(phoneVal);
      if (phoneMsg) {
        setPhoneError(phoneMsg);
        return;
      }
    }

    setSubmitting(true);

    setError("");

    try {

       console.log(formValues);

      const res =
        await submitContactForm(formValues);

      console.log(res);

      setSubmitted(true);

      setFormValues({});

    } catch (err) {

      console.error(err);

      setError(
        "Something went wrong. Please try again."
      );

    } finally {

      setSubmitting(false);

    }

  };

  const renderField = (field: any) => {

    const isEmailField = isEmailInputField(field);
    const isPhoneField = isPhoneInputField(field);

    // Phone is required when using a free email
    const phoneIsNowRequired = isPhoneField && usingFreeEmail;

    const hasEmailError = isEmailField && !!emailError;
    const hasPhoneError = isPhoneField && !!phoneError;
    const hasError = hasEmailError || hasPhoneError;

    const baseClass = [
      "w-full mt-1 p-3 border rounded-xl outline-none bg-white transition-colors",
      hasError
        ? "border-red-500 focus:border-red-500"
        : "border-gray-300 focus:border-blue-500",
    ].join(" ");

    if (field.type === "textarea") {

      return (
        <div
          key={field.id}
          className={
            field.width === "full"
              ? "col-span-2"
              : ""
          }
        >

          <label className="text-sm font-medium text-gray-700">

            {field.label}

            {field.required && (
              <span className="text-red-500">
                {" "}
                *
              </span>
            )}

          </label>

          <textarea
            placeholder={field.placeholder}
            required={field.required}
            rows={5}
            value={formValues[field.name] || ""}
            className={baseClass}
            onChange={(e) =>
              handleChange(
                field.name,
                e.target.value
              )
            }
          />

        </div>
      );

    }

    return (
      <div
        key={field.id}
        className={
          field.width === "full"
            ? "col-span-2"
            : ""
        }
      >

        <label className="text-sm font-medium text-gray-700">

          {field.label}

          {/* Show * if originally required OR phone is now required due to free email */}
          {(field.required || phoneIsNowRequired) && (
            <span className="text-red-500">
              {" "}
              *
            </span>
          )}

          {/* Hint next to phone label */}
          {isPhoneField && (
            <span className="ml-2 text-xs font-normal text-gray-400">
              {usingFreeEmail
                ? "(Required for personal email)"
                : "(Optional for business email)"}
            </span>
          )}

        </label>

        <input
          type={
            field.type === "number"
              ? "tel"
              : field.type
          }
          placeholder={field.placeholder}
          required={field.required || phoneIsNowRequired}
          value={formValues[field.name] || ""}
          className={baseClass}
          onChange={(e) =>
            handleChange(
              field.name,
              e.target.value
            )
          }
          onBlur={
            isEmailField
              ? (e) => {
                  if (e.target.value.trim() || emailError) {
                    setEmailError(validateEmailFormat(e.target.value));
                  }
                }
              : isPhoneField
              ? (e) => {
                  const val = e.target.value.trim();
                  if (!val && usingFreeEmail) {
                    setPhoneError("Phone number is required when using a personal email.");
                  } else if (val) {
                    setPhoneError(validatePhone(val));
                  }
                }
              : undefined
          }
        />

        {hasEmailError && (
          <p className="mt-1 text-xs text-red-500">{emailError}</p>
        )}

        {hasPhoneError && (
          <p className="mt-1 text-xs text-red-500">{phoneError}</p>
        )}

      </div>
    );

  };

  if (loading) {

    return (
      <>
        <Navigation />

        <div className="min-h-screen flex items-center justify-center pt-28">

          <p className="text-gray-500">
            Loading...
          </p>

        </div>

        <Footer />
      </>
    );

  }

  return (
    <>

      <Navigation />

      <div className="min-h-screen bg-[#eef2f7] px-6 py-16 pt-32">

        {/* TOP HEADING */}

        <div className="max-w-5xl mx-auto text-center mb-16">

          <h1 className="text-5xl md:text-6xl font-semibold text-[#0f2747] leading-tight">

            {pageData?.title}

          </h1>

          <p className="text-gray-600 mt-5 text-lg leading-8 max-w-3xl mx-auto">

            {pageData?.description}

          </p>

        </div>

        {/* MAIN SECTION */}

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-start">

          {/* LEFT SIDE — all cards open directly, no email gate */}

          <div className="flex flex-col gap-6">

            {pageData?.socialLinks?.map(
              (item: any, index: number) => {

                const icons = [

                  <FaLinkedinIn
                    className="text-white"
                    size={24}
                  />,

                  <MapPin
                    className="text-white"
                    size={24}
                  />,

                  <Mail
                    className="text-white"
                    size={24}
                  />,

                  <CalendarDays
                    className="text-white"
                    size={24}
                  />,

                  <Phone
                    className="text-white"
                    size={24}
                  />,

                ];

                return (

                  <div
                    key={index}
                    className="bg-white rounded-2xl shadow-md border border-gray-200 px-8 py-8 flex items-start gap-6"
                  >

                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 mt-1"
                      style={{
                        backgroundColor:
                          "#374151",
                      }}
                    >

                      {icons[index]}

                    </div>

                    <div>

                      <h3 className="text-[30px] font-semibold text-[#1b2b52]">

                        {item.title}

                      </h3>

                      <p className="text-gray-600 text-[15px] leading-7 mt-3 max-w-[480px]">

                        {item.description}

                      </p>

                      <a
                        href={item.link}
                        target={
                          item.link?.startsWith(
                            "http"
                          )
                            ? "_blank"
                            : "_self"
                        }
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-semibold mt-5 text-[#374151] group transition-all duration-300"
                      >

                        <span className="group-hover:text-[#1b2b52] transition-colors duration-300">

                          {item.buttonText}

                        </span>

                        <span className="transform transition-transform duration-300 group-hover:translate-x-2">

                          →

                        </span>

                      </a>

                    </div>

                  </div>

                );

              }
            )}

          </div>

          {/* RIGHT FORM */}

          <div className="bg-white shadow-md rounded-2xl p-8 border border-gray-200">

            <h2 className="text-3xl font-semibold text-center text-[#1b2b52] mb-3">

              {pageData?.form?.title}

            </h2>

            <p className="text-center text-gray-600 text-sm mb-8 leading-6">

              {pageData?.form?.description}

            </p>

            {submitted ? (

              <div className="text-center py-10 text-green-600 font-semibold text-lg">

                {pageData?.form?.successMessage}

              </div>

            ) : (

              <form
                className="grid grid-cols-2 gap-5"
                onSubmit={handleSubmit}
              >

                {pageData?.form?.fields?.map(
                  (field: any) =>
                    renderField(field)
                )}

                {/* Amber hint when free email detected */}
                {usingFreeEmail && (
                  <p className="col-span-2 text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                    📧 You're using a personal email — phone number is required to proceed.
                  </p>
                )}

                {error && (

                  <p className="col-span-2 text-red-500 text-sm text-center">

                    {error}

                  </p>

                )}

                <div className="col-span-2 text-center mt-2">

                  <button
                    type="submit"
                    disabled={submitting}
                    className="text-white w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:opacity-90 hover:scale-[1.02] hover:shadow-lg disabled:opacity-60"
                    style={{
                      backgroundColor:
                        "#1b2b52",
                    }}
                  >

                    {submitting
                      ? "Sending..."
                      : pageData?.form
                          ?.submitButton}

                  </button>

                </div>

              </form>

            )}

          </div>

        </div>

      </div>

      <Footer />

    </>
  );

}



// import { useEffect, useState } from "react";

// import {
//   MapPin,
//   Mail,
//   CalendarDays,
//   Phone,
// } from "lucide-react";

// import { FaLinkedinIn } from "react-icons/fa";

// import Navigation from "../sections/Navigation";
// import Footer from "../sections/Footer";

// import {
//   getContactPage,
//    submitContactForm,
// } from "../../api/api_services";

// // ── Free email domain blocklist ──────────────────────────────────────────────
// const FREE_EMAIL_DOMAINS = new Set([
//   "gmail.com", "googlemail.com",
//   "yahoo.com", "yahoo.co.uk", "yahoo.co.in", "yahoo.co.jp", "yahoo.fr",
//   "yahoo.de", "yahoo.es", "yahoo.it", "yahoo.com.ar", "yahoo.com.br",
//   "yahoo.com.mx", "ymail.com", "rocketmail.com",
//   "hotmail.com", "hotmail.co.uk", "hotmail.fr", "hotmail.de", "hotmail.es",
//   "hotmail.it", "hotmail.com.br",
//   "outlook.com", "outlook.in", "outlook.com.br",
//   "live.com", "live.co.uk", "live.fr", "live.de", "live.in",
//   "msn.com",
//   "icloud.com", "me.com", "mac.com",
//   "aol.com", "aim.com", "verizon.net", "att.net",
//   "protonmail.com", "protonmail.ch", "proton.me", "pm.me",
//   "zoho.com",
//   "mail.com", "email.com", "inbox.com", "usa.com",
//   "gmx.com", "gmx.net", "gmx.de", "gmx.fr", "gmx.us",
//   "rediffmail.com", "indiatimes.com",
//   "yandex.com", "yandex.ru", "yandex.ua", "mail.ru", "list.ru",
//   "bk.ru", "inbox.ru",
//   "tutanota.com", "tuta.io", "tutamail.com",
//   "fastmail.com", "fastmail.fm",
//   "hushmail.com", "hush.com",
//   "guerrillamail.com", "sharklasers.com", "guerrillamailblock.com",
//   "tempmail.com", "throwam.com", "mailinator.com", "trashmail.com",
//   "10minutemail.com", "dispostable.com", "maildrop.cc",
// ]);

// const FREE_ROOT_DOMAINS = new Set([
//   "gmail.com", "googlemail.com",
//   "yahoo.com", "ymail.com",
//   "hotmail.com", "outlook.com", "live.com", "msn.com",
//   "icloud.com", "me.com",
//   "mail.ru", "yandex.ru", "yandex.com",
// ]);

// const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// const validateBusinessEmail = (email: string): string => {
//   const trimmed = email.trim().toLowerCase();
//   if (!trimmed) return "Email is required.";
//   if (!EMAIL_REGEX.test(trimmed)) return "Enter a valid business email address.";
//   const domain = trimmed.split("@")[1];
//   if (FREE_EMAIL_DOMAINS.has(domain)) return "Use a valid business email address.";
//   const parts = domain.split(".");
//   for (let i = 0; i < parts.length - 1; i++) {
//     const rootCandidate = parts.slice(i).join(".");
//     if (FREE_ROOT_DOMAINS.has(rootCandidate)) return "Use a valid business email address.";
//   }
//   return "";
// };

// const isEmailInputField = (field: any): boolean =>
//   field.type === "email" ||
//   field.name?.toLowerCase().includes("email") ||
//   field.label?.toLowerCase().includes("email");
// // ────────────────────────────────────────────────────────────────────────────

// // Index 2 = Mail card, Index 3 = CalendarDays card
// const EMAIL_GATED_INDEXES = new Set([2, 3]);

// export default function ContactPage() {

//   const [pageData, setPageData] = useState<any>(null);

//   const [formValues, setFormValues] =
//     useState<Record<string, string>>({});

//   const [submitted, setSubmitted] =
//     useState(false);

//   const [submitting, setSubmitting] =
//     useState(false);

//   const [error, setError] = useState("");

//   const [loading, setLoading] =
//     useState(true);

//   // Form email validation
//   const [emailError, setEmailError] = useState("");

//   // Icon card email gate
//   const [cardEmail, setCardEmail] = useState("");
//   const [cardEmailError, setCardEmailError] = useState("");
//   const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
//   const [pendingLink, setPendingLink] = useState<string | null>(null);

//   useEffect(() => {

//     getContactPage()
//       .then((data) => {
//         setPageData(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(
//           "Failed to fetch contact page:",
//           err
//         );

//         setLoading(false);
//       });

//   }, []);

//   const handleChange = (
//     name: string,
//     value: string
//   ) => {

//     setFormValues((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     // Clear email error as user corrects the field
//     if (name.toLowerCase().includes("email")) setEmailError("");

//   };

//   const handleSubmit = async (
//     e: React.FormEvent
//   ) => {

//     e.preventDefault();

//     // Business email gate
//     const emailKey = Object.keys(formValues).find((k) =>
//       k.toLowerCase().includes("email")
//     ) ?? "email";
//     const emailMsg = validateBusinessEmail(formValues[emailKey] ?? "");
//     if (emailMsg) {
//       setEmailError(emailMsg);
//       return;
//     }

//     setSubmitting(true);

//     setError("");

//     try {

//        console.log(formValues);

//       const res =
//         await submitContactForm(formValues);

//       console.log(res);

//       setSubmitted(true);

//       setFormValues({});

//     } catch (err) {

//       console.error(err);

//       setError(
//         "Something went wrong. Please try again."
//       );

//     } finally {

//       setSubmitting(false);

//     }

//   };

//   // ── Icon card handlers ───────────────────────────────────────────────────
//   const handleCardClick = (
//     e: React.MouseEvent<HTMLAnchorElement>,
//     item: any,
//     index: number
//   ) => {
//     if (!EMAIL_GATED_INDEXES.has(index)) return;

//     e.preventDefault();

//     if (activeCardIndex === index) {
//       setActiveCardIndex(null);
//       setCardEmail("");
//       setCardEmailError("");
//       setPendingLink(null);
//       return;
//     }

//     setActiveCardIndex(index);
//     setCardEmail("");
//     setCardEmailError("");
//     setPendingLink(item.link);
//   };

//   const handleCardEmailSubmit = () => {
//     const msg = validateBusinessEmail(cardEmail);
//     if (msg) {
//       setCardEmailError(msg);
//       return;
//     }
//     if (pendingLink) {
//       window.open(pendingLink, pendingLink.startsWith("http") ? "_blank" : "_self");
//     }
//     setActiveCardIndex(null);
//     setCardEmail("");
//     setCardEmailError("");
//     setPendingLink(null);
//   };
//   // ────────────────────────────────────────────────────────────────────────

//   const renderField = (field: any) => {

//     const isEmailField = isEmailInputField(field);
//     const hasError = isEmailField && !!emailError;

//     const baseClass = [
//       "w-full mt-1 p-3 border rounded-xl outline-none bg-white transition-colors",
//       hasError
//         ? "border-red-500 focus:border-red-500"
//         : "border-gray-300 focus:border-blue-500",
//     ].join(" ");

//     if (field.type === "textarea") {

//       return (
//         <div
//           key={field.id}
//           className={
//             field.width === "full"
//               ? "col-span-2"
//               : ""
//           }
//         >

//           <label className="text-sm font-medium text-gray-700">

//             {field.label}

//             {field.required && (
//               <span className="text-red-500">
//                 {" "}
//                 *
//               </span>
//             )}

//           </label>

//           <textarea
//             placeholder={field.placeholder}
//             required={field.required}
//             rows={5}
//             value={formValues[field.name] || ""}
//             className={baseClass}
//             onChange={(e) =>
//               handleChange(
//                 field.name,
//                 e.target.value
//               )
//             }
//           />

//         </div>
//       );

//     }

//     return (
//       <div
//         key={field.id}
//         className={
//           field.width === "full"
//             ? "col-span-2"
//             : ""
//         }
//       >

//         <label className="text-sm font-medium text-gray-700">

//           {field.label}

//           {field.required && (
//             <span className="text-red-500">
//               {" "}
//               *
//             </span>
//           )}

//         </label>

//         <input
//           type={
//             field.type === "number"
//               ? "tel"
//               : field.type
//           }
//           placeholder={field.placeholder}
//           required={field.required}
//           value={formValues[field.name] || ""}
//           className={baseClass}
//           onChange={(e) =>
//             handleChange(
//               field.name,
//               e.target.value
//             )
//           }
//           onBlur={
//             isEmailField
//               ? (e) => {
//                   if (e.target.value.trim() || emailError) {
//                     setEmailError(validateBusinessEmail(e.target.value));
//                   }
//                 }
//               : undefined
//           }
//         />

//         {hasError && (
//           <p className="mt-1 text-xs text-red-500">{emailError}</p>
//         )}

//       </div>
//     );

//   };

//   if (loading) {

//     return (
//       <>
//         <Navigation />

//         <div className="min-h-screen flex items-center justify-center pt-28">

//           <p className="text-gray-500">
//             Loading...
//           </p>

//         </div>

//         <Footer />
//       </>
//     );

//   }

//   return (
//     <>

//       <Navigation />

//       <div className="min-h-screen bg-[#eef2f7] px-6 py-16 pt-32">

//         {/* TOP HEADING */}

//         <div className="max-w-5xl mx-auto text-center mb-16">

//           <h1 className="text-5xl md:text-6xl font-semibold text-[#0f2747] leading-tight">

//             {pageData?.title}

//           </h1>

//           <p className="text-gray-600 mt-5 text-lg leading-8 max-w-3xl mx-auto">

//             {pageData?.description}

//           </p>

//         </div>

//         {/* MAIN SECTION */}

//         <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-start">

//           {/* LEFT SIDE */}

//           <div className="flex flex-col gap-6">

//             {pageData?.socialLinks?.map(
//               (item: any, index: number) => {

//                 const icons = [

//                   <FaLinkedinIn
//                     className="text-white"
//                     size={24}
//                   />,

//                   <MapPin
//                     className="text-white"
//                     size={24}
//                   />,

//                   <Mail
//                     className="text-white"
//                     size={24}
//                   />,

//                   <CalendarDays
//                     className="text-white"
//                     size={24}
//                   />,

//                   <Phone
//                     className="text-white"
//                     size={24}
//                   />,

//                 ];

//                 return (

//                   <div
//                     key={index}
//                     className="bg-white rounded-2xl shadow-md border border-gray-200 px-8 py-8 flex flex-col gap-4"
//                   >

//                     {/* Top row: icon + content */}
//                     <div className="flex items-start gap-6">

//                       <div
//                         className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 mt-1"
//                         style={{
//                           backgroundColor:
//                             "#374151",
//                         }}
//                       >

//                         {icons[index]}

//                       </div>

//                       <div>

//                         <h3 className="text-[30px] font-semibold text-[#1b2b52]">

//                           {item.title}

//                         </h3>

//                         <p className="text-gray-600 text-[15px] leading-7 mt-3 max-w-[480px]">

//                           {item.description}

//                         </p>

//                         <a
//                           href={item.link}
//                           target={
//                             item.link?.startsWith(
//                               "http"
//                             )
//                               ? "_blank"
//                               : "_self"
//                           }
//                           rel="noopener noreferrer"
//                           className="inline-flex items-center gap-2 font-semibold mt-5 text-[#374151] group transition-all duration-300"
//                           onClick={(e) => handleCardClick(e, item, index)}
//                         >

//                           <span className="group-hover:text-[#1b2b52] transition-colors duration-300">

//                             {item.buttonText}

//                           </span>

//                           <span className="transform transition-transform duration-300 group-hover:translate-x-2">

//                             →

//                           </span>

//                         </a>

//                       </div>

//                     </div>
//                     {/* ↑ top row ends here */}

//                     {/* Email gate panel — only for Mail & Calendar cards */}
//                     {EMAIL_GATED_INDEXES.has(index) && activeCardIndex === index && (
//                       <div className="border-t border-gray-100 pt-4 flex flex-col gap-3">

//                         <p className="text-sm text-gray-500">
//                           Enter your business email to continue:
//                         </p>

//                         <div>
//                           <input
//                             type="email"
//                             autoFocus
//                             placeholder="you@company.com"
//                             value={cardEmail}
//                             onChange={(e) => {
//                               setCardEmail(e.target.value);
//                               if (cardEmailError) setCardEmailError("");
//                             }}
//                             onBlur={() =>
//                               setCardEmailError(validateBusinessEmail(cardEmail))
//                             }
//                             onKeyDown={(e) =>
//                               e.key === "Enter" && handleCardEmailSubmit()
//                             }
//                             className={[
//                               "w-full p-3 border rounded-xl outline-none bg-white text-sm transition-colors",
//                               cardEmailError
//                                 ? "border-red-500 focus:border-red-500"
//                                 : "border-gray-300 focus:border-blue-500",
//                             ].join(" ")}
//                           />
//                           {cardEmailError && (
//                             <p className="mt-1 text-xs text-red-500">{cardEmailError}</p>
//                           )}
//                         </div>

//                         <div className="flex gap-3">
//                           <button
//                             onClick={handleCardEmailSubmit}
//                             className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
//                             style={{ backgroundColor: "#1b2b52" }}
//                           >
//                             Continue →
//                           </button>
//                           <button
//                             onClick={() => {
//                               setActiveCardIndex(null);
//                               setCardEmail("");
//                               setCardEmailError("");
//                             }}
//                             className="px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-600 border border-gray-300 hover:bg-gray-50 transition-all"
//                           >
//                             Cancel
//                           </button>
//                         </div>

//                       </div>
//                     )}

//                   </div>

//                 );

//               }
//             )}

//           </div>

//           {/* RIGHT FORM */}

//           <div className="bg-white shadow-md rounded-2xl p-8 border border-gray-200">

//             <h2 className="text-3xl font-semibold text-center text-[#1b2b52] mb-3">

//               {pageData?.form?.title}

//             </h2>

//             <p className="text-center text-gray-600 text-sm mb-8 leading-6">

//               {pageData?.form?.description}

//             </p>

//             {submitted ? (

//               <div className="text-center py-10 text-green-600 font-semibold text-lg">

//                 {pageData?.form?.successMessage}

//               </div>

//             ) : (

//               <form
//                 className="grid grid-cols-2 gap-5"
//                 onSubmit={handleSubmit}
//               >

//                 {pageData?.form?.fields?.map(
//                   (field: any) =>
//                     renderField(field)
//                 )}

//                 {error && (

//                   <p className="col-span-2 text-red-500 text-sm text-center">

//                     {error}

//                   </p>

//                 )}

//                 <div className="col-span-2 text-center mt-2">

//                   <button
//                     type="submit"
//                     disabled={submitting}
//                     className="text-white w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:opacity-90 hover:scale-[1.02] hover:shadow-lg disabled:opacity-60"
//                     style={{
//                       backgroundColor:
//                         "#1b2b52",
//                     }}
//                   >

//                     {submitting
//                       ? "Sending..."
//                       : pageData?.form
//                           ?.submitButton}

//                   </button>

//                 </div>

//               </form>

//             )}

//           </div>

//         </div>

//       </div>

//       <Footer />

//     </>
//   );

// }



// import { useEffect, useState } from "react";

// import {
//   MapPin,
//   Mail,
//   CalendarDays,
//   Phone,
// } from "lucide-react";

// import { FaLinkedinIn } from "react-icons/fa";

// import Navigation from "../sections/Navigation";
// import Footer from "../sections/Footer";

// import {
//   getContactPage,
//    submitContactForm,
// } from "../../api/api_services";

// export default function ContactPage() {

//   const [pageData, setPageData] = useState<any>(null);

//   const [formValues, setFormValues] =
//     useState<Record<string, string>>({});

//   const [submitted, setSubmitted] =
//     useState(false);

//   const [submitting, setSubmitting] =
//     useState(false);

//   const [error, setError] = useState("");

//   const [loading, setLoading] =
//     useState(true);

//   useEffect(() => {

//     getContactPage()
//       .then((data) => {
//         setPageData(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(
//           "Failed to fetch contact page:",
//           err
//         );

//         setLoading(false);
//       });

//   }, []);

//   const handleChange = (
//     name: string,
//     value: string
//   ) => {

//     setFormValues((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//   };

//   const handleSubmit = async (
//     e: React.FormEvent
//   ) => {

//     e.preventDefault();

//     setSubmitting(true);

//     setError("");

//     try {

//        console.log(formValues);

//       const res =
//         await submitContactForm(formValues);

//       console.log(res);

//       setSubmitted(true);

//       setFormValues({});

//     } catch (err) {

//       console.error(err);

//       setError(
//         "Something went wrong. Please try again."
//       );

//     } finally {

//       setSubmitting(false);

//     }

//   };

//   const renderField = (field: any) => {

//     const baseClass =
//       "w-full mt-1 p-3 border border-gray-300 rounded-xl outline-none focus:border-blue-500 bg-white";

//     if (field.type === "textarea") {

//       return (
//         <div
//           key={field.id}
//           className={
//             field.width === "full"
//               ? "col-span-2"
//               : ""
//           }
//         >

//           <label className="text-sm font-medium text-gray-700">

//             {field.label}

//             {field.required && (
//               <span className="text-red-500">
//                 {" "}
//                 *
//               </span>
//             )}

//           </label>

//           <textarea
//             placeholder={field.placeholder}
//             required={field.required}
//             rows={5}
//             value={formValues[field.name] || ""}
//             className={baseClass}
//             onChange={(e) =>
//               handleChange(
//                 field.name,
//                 e.target.value
//               )
//             }
//           />

//         </div>
//       );

//     }

//     return (
//       <div
//         key={field.id}
//         className={
//           field.width === "full"
//             ? "col-span-2"
//             : ""
//         }
//       >

//         <label className="text-sm font-medium text-gray-700">

//           {field.label}

//           {field.required && (
//             <span className="text-red-500">
//               {" "}
//               *
//             </span>
//           )}

//         </label>

//         <input
//           type={
//             field.type === "number"
//               ? "tel"
//               : field.type
//           }
//           placeholder={field.placeholder}
//           required={field.required}
//           value={formValues[field.name] || ""}
//           className={baseClass}
//           onChange={(e) =>
//             handleChange(
//               field.name,
//               e.target.value
//             )
//           }
//         />

//       </div>
//     );

//   };

//   if (loading) {

//     return (
//       <>
//         <Navigation />

//         <div className="min-h-screen flex items-center justify-center pt-28">

//           <p className="text-gray-500">
//             Loading...
//           </p>

//         </div>

//         <Footer />
//       </>
//     );

//   }

//   return (
//     <>

//       <Navigation />

//       <div className="min-h-screen bg-[#eef2f7] px-6 py-16 pt-32">

//         {/* TOP HEADING */}

//         <div className="max-w-5xl mx-auto text-center mb-16">

//           <h1 className="text-5xl md:text-6xl font-semibold text-[#0f2747] leading-tight">

//             {pageData?.title}

//           </h1>

//           <p className="text-gray-600 mt-5 text-lg leading-8 max-w-3xl mx-auto">

//             {pageData?.description}

//           </p>

//         </div>

//         {/* MAIN SECTION */}

//         <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-start">

//           {/* LEFT SIDE */}

//           <div className="flex flex-col gap-6">

//             {pageData?.socialLinks?.map(
//               (item: any, index: number) => {

//                 const icons = [

//                   <FaLinkedinIn
//                     className="text-white"
//                     size={24}
//                   />,

//                   <MapPin
//                     className="text-white"
//                     size={24}
//                   />,

//                   <Mail
//                     className="text-white"
//                     size={24}
//                   />,

//                   <CalendarDays
//                     className="text-white"
//                     size={24}
//                   />,

//                   <Phone
//                     className="text-white"
//                     size={24}
//                   />,

//                 ];

//                 return (

//                   <div
//                     key={index}
//                     className="bg-white rounded-2xl shadow-md border border-gray-200 px-8 py-8 flex items-start gap-6"
//                   >

//                     <div
//                       className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 mt-1"
//                       style={{
//                         backgroundColor:
//                           "#374151",
//                       }}
//                     >

//                       {icons[index]}

//                     </div>

//                     <div>

//                       <h3 className="text-[30px] font-semibold text-[#1b2b52]">

//                         {item.title}

//                       </h3>

//                       <p className="text-gray-600 text-[15px] leading-7 mt-3 max-w-[480px]">

//                         {item.description}

//                       </p>

//                       <a
//                         href={item.link}
//                         target={
//                           item.link?.startsWith(
//                             "http"
//                           )
//                             ? "_blank"
//                             : "_self"
//                         }
//                         rel="noopener noreferrer"
//                         className="inline-flex items-center gap-2 font-semibold mt-5 text-[#374151] group transition-all duration-300"
//                       >

//                         <span className="group-hover:text-[#1b2b52] transition-colors duration-300">

//                           {item.buttonText}

//                         </span>

//                         <span className="transform transition-transform duration-300 group-hover:translate-x-2">

//                           →

//                         </span>

//                       </a>

//                     </div>

//                   </div>

//                 );

//               }
//             )}

//           </div>

//           {/* RIGHT FORM */}

//           <div className="bg-white shadow-md rounded-2xl p-8 border border-gray-200">

//             <h2 className="text-3xl font-semibold text-center text-[#1b2b52] mb-3">

//               {pageData?.form?.title}

//             </h2>

//             <p className="text-center text-gray-600 text-sm mb-8 leading-6">

//               {pageData?.form?.description}

//             </p>

//             {submitted ? (

//               <div className="text-center py-10 text-green-600 font-semibold text-lg">

//                 {pageData?.form?.successMessage}

//               </div>

//             ) : (

//               <form
//                 className="grid grid-cols-2 gap-5"
//                 onSubmit={handleSubmit}
//               >

//                 {pageData?.form?.fields?.map(
//                   (field: any) =>
//                     renderField(field)
//                 )}

//                 {error && (

//                   <p className="col-span-2 text-red-500 text-sm text-center">

//                     {error}

//                   </p>

//                 )}

//                 <div className="col-span-2 text-center mt-2">

//                   <button
//                     type="submit"
//                     disabled={submitting}
//                     className="text-white w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:opacity-90 hover:scale-[1.02] hover:shadow-lg disabled:opacity-60"
//                     style={{
//                       backgroundColor:
//                         "#1b2b52",
//                     }}
//                   >

//                     {submitting
//                       ? "Sending..."
//                       : pageData?.form
//                           ?.submitButton}

//                   </button>

//                 </div>

//               </form>

//             )}

//           </div>

//         </div>

//       </div>

//       <Footer />

//     </>
//   );

// }