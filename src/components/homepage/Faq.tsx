import { useState } from "react";
import clsx from "clsx";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "How does the virtual audience work?",
    answer:
      "The virtual audience simulates real-time feedback to help you practice effectively.",
  },
  {
    question: "Can I practice with my own slides?",
    answer:
      "Yes! You can upload and practice with your own presentation slides.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes! Sign up to try our platform for free and experience the benefits firsthand.",
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
            Got questions? We've got answers.
          </h4>
          <p className="text-dark-electric-blue leading-normal">
            Track progress, receive actionable feedback, and captivate your
            audience like never before.
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
            {openIndex === idx && (
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
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Faq;
