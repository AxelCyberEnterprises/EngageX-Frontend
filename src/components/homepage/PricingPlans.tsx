import CheckIcon from "@/assets/images/svgs/check";
import React from "react";

interface PricingCardProps {
  planPayment: () => void;
}

const PricingCards: React.FC<PricingCardProps> = ({ planPayment }) => {
  const plans = [
    {
      type: "STARTER PLAN",
      price: 180,
      sessions: 4,
      contents: ["Great for testing.", "Ideal for trials."],
      buttonText: "Select Starter Plan",
      highlight: false,
      sessionColor: "text-[#64BA9F]",
    },
    {
      type: "GROWTH PLAN",
      price: 240,
      sessions: 4,
      contents: ["Perfect for specific goals.", "For mid-level professionals."],
      buttonText: "Choose Growth Plan",
      highlight: true,
      sessionColor: "text-amber-500",
    },
    {
      type: "PRO PLAN",
      price: 288,
      sessions: 8,
      contents: ["Best for steady progress.", "Great for preparation."],
      buttonText: "Go Pro",
      highlight: false,
      sessionColor: "text-[#64BA9F]",
    },
    {
      type: "ULTIMATE PLAN",
      price: 396,
      sessions: 12,
      contents: [
        "Best for long-term growth",
        "Ideal for professionals.",
        "Includes exclusive bonus.",
      ],
      buttonText: "Get the Ultimate Plan",
      highlight: false,
      sessionColor: "text-[#64BA9F]",
    },
  ];

  return (
    <div className="font-montreal grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-x-6 gap-y-10 w-full max-w-6xl mx-auto font-normal rounded-[20px]">
      {plans.map((plan, index) => (
        <div
          key={index}
          className={`relative flex-1 rounded-3xl p-6 flex flex-col justify-between duration-700 hover:bg-[#262B3A] hover:stroke-white hover:border-none hover:text-[#EFF6FC] group
            ${
              plan.highlight
                ? "bg-[#262B3A] text-white z-10"
                : "lg:bg-transparent border border-[#BDBDBD]"
            }`}
        >
          {plan.highlight && (
            <div className="absolute -top-4 lg:right-0 sm:right-auto right-0 lg:ml-0 sm:ml-5 ml-0 lg:mr-0 sm:mr-0 mr-5 lg:left-0 flex justify-center">
              <div className="px-4 md:py-[5px] py-1 bg-[#EFF6FC] text-[#262B3A] rounded-full flex items-center text-sm">
                <span className="mr-1">🔥</span> Recommended
              </div>
            </div>
          )}

          <div className="space-y-8">
            <div className="space-y-4 border-b border-[#1A1A1A] pb-6">
              <div className="flex justify-between text-xs">
                <div className="bg-opacity-20 bg-[#B5B5B529] rounded-lg px-4 py-2 inline-block">
                  {plan.type}
                </div>
                <div
                  className={`${
                    plan.highlight ? "text-[#ECB25E]" : "text-[#64BA9F]"
                  } group-hover:text-[#ECB25E] my-auto`}
                >
                  {plan.sessions} SESSIONS
                </div>
              </div>
              <div>
                <div
                  className={`flex flex-col gap-2 items-start mt-2 ${
                    plan.highlight && "text-[#EFF6FC]"
                  }`}
                >
                  <span className="md:text-5xl text-4xl font-bold">
                    ${plan.price}
                  </span>
                  <span className="ml-2 font-light"> Valid for 1 year</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {plan.contents.map((content, idx) => (
                <div
                  key={idx}
                  className="flex items-center font-light sm:text-base text-sm"
                >
                  <div
                    className={`mr-3 ${
                      plan.highlight
                        ? ""
                        : "text-[#64BA9F] group-hover:text-white"
                    }`}
                  >
                    <CheckIcon
                      strokeColor={plan.highlight ? "#ECB25E" : "#64BA9F"}
                    />
                  </div>
                  <span>{content}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={planPayment}
            className={`text-sm mt-10 w-full py-3 rounded-lg group-hover:bg-alice-blue group-hover:text-black
            ${
              plan.highlight
                ? "bg-white text-slate-800"
                : "bg-slate-400 text-white group-hover:bg-alice-blue group-hover:text-black"
            }`}
          >
            {plan.buttonText}
          </button>
        </div>
      ))}
    </div>
  );
};

export default PricingCards;
