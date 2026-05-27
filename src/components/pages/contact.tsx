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

  const handleChange = (
    name: string,
    value: string
  ) => {

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

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

    const baseClass =
      "w-full mt-1 p-3 border border-gray-300 rounded-xl outline-none focus:border-blue-500 bg-white";

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

          {field.required && (
            <span className="text-red-500">
              {" "}
              *
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
          required={field.required}
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

          {/* LEFT SIDE */}

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