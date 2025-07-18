import clsx from "clsx";

interface Params {
  plan: {
    type: string;
    price: number;
    sessions: number;
    contents: Array<string>;
    button_text: string;
    highlight: boolean;
    payment_link: string;
  };
}

function PricingCard({ plan }: Params) {
  return (
    <div
      className={clsx(
        "h-max group font-montserrat p-8 space-y-10 rounded-2xl duration-700 cursor-pointer lg:h-full border flex flex-col justify-between border-[#6F7C8E]",
        plan.highlight &&
        "relative lg:bottom-[4rem] text-white stroke-white border-none bg-gunmetal"
      )}
    >
      <div className="space-y-12">
        <div className="space-y-8 relative border-b pb-8">
          {plan.highlight && (
            <div className="px-5 py-3 absolute -top-[3rem] -right-14 rotate-12 bg-alice-blue w-max text-black small rounded-full">
              🔥 Most popular
            </div>
          )}
          <div className="py-3 font-medium px-4 small rounded-lg bg-[#B5B5B529] w-max">
            {plan.type}
          </div>
          <div className="space-y-2">
            <p
              className={clsx(
                plan.highlight ? "text-[#ECB25E]" : "text-green-sheen"
              )}
            >
              {plan.sessions} SESSIONS
            </p>
            <div className="flex items-center">
              <h2 className="font-bold mr-[20px]">${plan.price}</h2>{" "}
              <p>Valid for 1 year</p>
            </div>
          </div>
        </div>

        <div className="space-y-6 mt-[50px]">
          {plan.contents.map((content, idx) => (
            <div className="flex gap-4 items-center">
              <div key={idx}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className={clsx(
                    "stroke-gunmetal h-5 w-5",
                    plan.highlight && "stroke-white"
                  )}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.9987 1.6387C9.36736 1.4404 8.6955 1.3335 7.9987 1.3335C4.3168 1.3335 1.33203 4.31826 1.33203 8.00016C1.33203 11.682 4.3168 14.6668 7.9987 14.6668C11.6806 14.6668 14.6654 11.682 14.6654 8.00016C14.6654 7.30336 14.5584 6.63152 14.3602 6.00016"
                    strokeLinecap="round"
                  />
                  <path
                    d="M5.66602 6.33333L7.99935 8.66667L13.9995 2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="w-full font-montserrat ">{content}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <a href={plan.payment_link} target="_blank">
          <button
            className={clsx(
              "flex gap-2 mx-auto lg:mx-0 w-full py-4 px-6 items-center justify-center rounded-lg bg-[#6F7C8E]",
              plan.highlight && "bg-alice-blue text-black"
            )}
          >
            {plan.button_text}
          </button>
        </a>

        {plan.type === "STARTER PLAN" && <a href={'/auth/login'} target="_blank">
          <button
            className={clsx(
              "flex gap-2 mx-auto lg:mx-0 w-full py-4 px-6 items-center text-[#FFFF] mt-5 justify-center rounded-lg bg-[#262b3a]"
            )}
          >
            Gift card access code
          </button>
        </a>}
      </div>

    </div>
  );
}

export default PricingCard;
