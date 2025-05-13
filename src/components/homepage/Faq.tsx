import { useState } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "Is there a free trial?",
    answer:
      "Yes, for leaders seeking an enterprise solution, we provide up to three decision-makers with user access for two sessions",
  },
  {
    question: "How does the virtual audience work?",
    answer:
      "The virtual audience simulates real-time feedback to help you practice effectively",
  },
  {
    question: "Can I practice with my own slides?",
    answer:
      "Yes! You can upload and practice with your own presentation slides. Your slide content is protected by auto-deletion from the platform upon finishing a session.",
  },
  {
    question: "Can I change my plan later?",
    answer:
      "Yes, your plan is eligible to be upgraded or downgraded to any plan you choose once your sessions have been utilized or have expired.",
  },
  {
    question: "What is your cancellation policy?",
    answer: "Please note that our cancellation policy does not include refunds",
  },
  {
    question: "How does billing work?",
    answer:
      "Session plans are paid upfront before session engagement using any major credit card and must be used within 12 months from the date of purchase",
  },
];

function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="px-10 lg:px-20 py-28 gap-y-24 flex flex-col lg:flex-row justify-between bg-alice-blue">
      <div className="space-y-[24px] flex flex-col items-start">
        <div className="px-3 py-3 flex rounded-lg gap-2 items-center w-max border bg-white border-[#E1E5E7]">
          <p className="small font-montserrat">FAQs</p>
        </div>

        <div className="lg:w-[70%] text-wrap space-y-4">
          <h4 className="h-max font-montreal leading-snug">
            Got questions? We've got answers
          </h4>
          <p className="text-dark-electric-blue leading-normal">
            Track progress, receive actionable feedback, and captivate your
            audience like never before
          </p>
        </div>
      </div>

      <div className="space-y-4 lg:w-[50%]">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="py-6 px-6 bg-white rounded-2xl cursor-pointer"
            onClick={() => toggleFaq(idx)}
          >
            <div className="flex items-center gap-6">
              <svg
                width="16"
                height="16"
                className="h-4 w-4"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d={openIndex === idx ? "M1 8H15" : "M1 8H15 M8 1V15"}
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <p
                className={clsx(
                  openIndex === idx ? "text-black" : "text-[#62717A]"
                )}
              >
                {faq.question}
              </p>
            </div>
            {openIndex === idx &&
              (idx != 4 ? (
                <p
                  className={clsx(
                    "mt-6 ml-11 transition-all duration-300",
                    openIndex === idx
                      ? "opacity-100 max-h-40"
                      : "opacity-0 max-h-0 overflow-hidden"
                  )}
                >
                  {faq.answer}
                </p>
              ) : (
                <p
                  className={clsx(
                    "mt-6 ml-11 transition-all duration-300",
                    openIndex === idx
                      ? "opacity-100 max-h-40"
                      : "opacity-0 max-h-0 overflow-hidden"
                  )}
                >
                  Please refer to our{" "}
                  <Link to="/cancellation-policy">
                    <span className="underline underline-offset-2">
                      Cancellation Policy
                    </span>
                  </Link>{" "}
                  for full details
                </p>
              ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Faq;
