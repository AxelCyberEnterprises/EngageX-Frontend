import { Link } from "react-router-dom";
import PricingCard from "./PricingCard";

const plans = [
  {
    type: "STARTER PLAN",
    price: 180,
    sessions: 4,
    contents: [
      "Ideal for individuals looking to gain support, build clarity, and take the first steps toward their personal or professional goals",
      "Best for occasional users with minimal speaking opportunities",
      "Perfect for exploring coaching at your own pace",
      "Offers foundational strategies to boost confidence and communication awareness",
    ],
    button_text: "Start now",
    highlight: false,
    payment_link: "/auth/login",
  },
  {
    type: "GROWTH PLAN",
    price: 240,
    sessions: 6,
    contents: [
      "Great for those seeking impactful meeting engagement and improvement in targeted communication goals",
      "Suitable for all professional levels looking to level up their speaking presence",
      "Ideal for professionals preparing for team meetings, client conversations, or leadership interactions",
    ],
    button_text: "Choose growth plan",
    highlight: true,
    payment_link: "/auth/login",
  },
  {
    type: "PRO PLAN",
    price: 288,
    sessions: 8,
    contents: [
      "Fantastic for professionals looking to make measurable progress over time",
      "Covers all four core areas: pitch, presentation, public speaking, and storytelling",
      "Great for preparing for keynote speaking engagements, pitch presentations, panels, conferences, or investor meetings",
      "Offers a structured path with feedback and strategies to elevate your overall communication impact",
    ],
    button_text: "Go pro",
    highlight: false,
    payment_link: "/auth/login",
  },
  {
    type: "ULTIMATE PLAN",
    price: 396,
    sessions: 12,
    contents: [
      "Best for long-term development and professionals with frequent public speaking responsibilities",
      "Highly recommended for executives, thought leaders, and senior managers",
      "Provides ongoing, high-touch support across all communication domains",
      "Designed for sustained growth, executive presence, and high-stakes performance readiness",
    ],
    button_text: "Get the ultimate plan",
    highlight: false,
    payment_link: "/auth/login",
  },
];

function PricingPlansSection() {
  return (
    <section className="bg-white px-10 lg:px-20 py-28 font-montserrat">
      {/* Header */}
      <div className="text-center mb-16 space-y-4">
        <div className="px-3 py-3 flex gap-2 items-center w-max border rounded-[6px] bg-white border-[#E1E5E7] mx-auto">
          <svg
            width="16"
            height="16"
            className="h-4 w-4"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.0714 3.63167C6.47007 2.46501 8.08207 2.42967 8.55474 3.52567L8.59474 3.63234L9.13274 5.20567C9.25603 5.5665 9.45527 5.89668 9.71702 6.17396C9.97877 6.45123 10.2969 6.66915 10.6501 6.81301L10.7947 6.86701L12.3681 7.40434C13.5347 7.80301 13.5701 9.41501 12.4747 9.88767L12.3681 9.92768L10.7947 10.4657C10.4338 10.5889 10.1035 10.7881 9.82608 11.0498C9.54869 11.3116 9.33067 11.6298 9.18674 11.983L9.13274 12.127L8.5954 13.701C8.19674 14.8677 6.58474 14.903 6.11274 13.8077L6.0714 13.701L5.53407 12.1277C5.41086 11.7667 5.21165 11.4364 4.9499 11.159C4.68814 10.8816 4.36993 10.6636 4.01674 10.5197L3.87274 10.4657L2.2994 9.92834C1.13207 9.52967 1.09674 7.91767 2.19274 7.44567L2.2994 7.40434L3.87274 6.86701C4.23356 6.74371 4.56374 6.54447 4.84102 6.28272C5.11829 6.02097 5.33621 5.7028 5.48007 5.34967L5.53407 5.20567L6.0714 3.63167Z"
              fill="#4C5C75"
            />
          </svg>
          <p className="small">PRICING</p>
        </div>
        <h4 className="font-montreal leading-snug">
          Simple, transparent pricing.
        </h4>
        <p className="text-dark-electric-blue max-w-xl mx-auto leading-relaxed">
          Everything you need to become the best speaker you can be is right here.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-10 lg:gap-8 lg:pt-8">
        {plans.map((plan, idx) => (
          <PricingCard plan={plan} key={idx} />
        ))}
      </div>

      {/* CTA link to full pricing page */}
      <div className="mt-14 text-center">
        <Link to="/pricing">
          <button className="flex gap-2 mx-auto py-3 px-8 items-center justify-center rounded-lg border border-[#6F7C8E] text-[#6F7C8E] font-semibold hover:bg-[#6F7C8E] hover:text-white transition-colors duration-200">
            View full pricing details
            <svg
              width="15"
              height="18"
              viewBox="0 0 15 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.0243 6.32818C11.1897 6.32894 11.3481 6.39499 11.4651 6.51196C11.5821 6.62893 11.6481 6.78737 11.6489 6.95279L11.6489 12.8453C11.6518 12.9292 11.6379 13.0128 11.6078 13.0912C11.5778 13.1696 11.5322 13.2411 11.4739 13.3015C11.4156 13.3619 11.3458 13.4099 11.2685 13.4427C11.1913 13.4755 11.1082 13.4924 11.0243 13.4924C10.9403 13.4924 10.8573 13.4755 10.78 13.4427C10.7027 13.4099 10.6329 13.3619 10.5746 13.3015C10.5163 13.2411 10.4708 13.1696 10.4407 13.0912C10.4107 13.0128 10.3967 12.9292 10.3996 12.8453L10.3996 8.46128L4.39513 14.4658C4.27792 14.583 4.11895 14.6489 3.95319 14.6489C3.78743 14.6489 3.62846 14.583 3.51125 14.4658C3.39404 14.3486 3.32819 14.1896 3.32819 14.0239C3.32819 13.8581 3.39404 13.6991 3.51125 13.5819L9.51576 7.5774L5.1317 7.5774C4.96986 7.57169 4.81655 7.50338 4.70408 7.38687C4.59161 7.27035 4.52875 7.11473 4.52875 6.95279C4.52875 6.79085 4.59161 6.63523 4.70408 6.51871C4.81655 6.4022 4.96986 6.33389 5.1317 6.32818L11.0243 6.32818Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </Link>
      </div>
    </section>
  );
}

export default PricingPlansSection;
