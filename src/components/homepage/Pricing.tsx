import PricingCard from "./PricingCard";

function Pricing({ subtext }: { subtext?: string }) {
  let plans = [
    {
      type: "STARTER PLAN",
      price: 180,
      sessions: 4,
      contents: [
        "Ideal for individuals looking to gain support, build clarity, and take the first steps toward their personal or professional goals.",
        "Best for occasional users with minimal speaking opportunities.",
        "Perfect for exploring coaching at your own pace.",
        "Offers foundational strategies to boost confidence and communication awareness.",
      ],
      button_text: "Start now",
      highlight: false,
      payment_link:
        "https://connect.intuit.com/pay/CareerDoctorLlc/scs-v1-d77fb68013f54350b75d514d54189fd1191971d0274b4d16bb762c22406bdf7156e09114df9548b88a6b0c9d519b1239?locale=EN_US",
    },
    {
      type: "GROWTH PLAN",
      price: 240,
      sessions: 6,
      contents: [
        "Great for those seeking impactful meeting engagement and improvement in targeted communication goals.",
        "Suitable for all professional levels looking to level up their speaking presence.",
        "Focuses on specific areas like message clarity, audience connection, and confidence-building.",
        "Ideal for professionals preparing for team meetings, client conversations, or leadership interactions.",
      ],
      button_text: "Choose growth plan",
      highlight: true,
      payment_link:
        "https://connect.intuit.com/pay/CareerDoctorLlc/scs-v1-46dbc56154fd4e2fa0150a8246276351757f6a348eca4c02b3b4ebaf67ef244f7b923ec4fce641d0b42984bfc07c8491?locale=EN_US",
    },
    {
      type: "PRO PLAN",
      price: 288,
      sessions: 8,
      contents: [
        "Fantastic for professionals looking to make measurable progress over time.",
        "Covers all four core areas: pitch, presentation, public speaking, and storytelling.",
        "Covers all four core areas: pitch, presentation, public speaking, and storytelling.",
        "Great for preparing for key events such as panels, conferences, or investor meetings.",
        "Offers a structured path with feedback and strategies to elevate your overall communication impact.",
      ],
      button_text: "Go pro",
      highlight: false,
      payment_link:
        "https://connect.intuit.com/pay/CareerDoctorLlc/scs-v1-83fccafc8b004617b1f57152c42c9bd6b711beae594e4ba3b19fcca2ba0c10800257b01db53b4fd4bd54ca1d47bece0e?locale=EN_US",
    },
    {
      type: "ULTIMATE PLAN",
      price: 396,
      sessions: 12,
      contents: [
        "Best for long-term development and professionals with frequent public speaking responsibilities.",
        "Highly recommended for executives, thought leaders, and senior managers.",
        "Provides ongoing, high-touch support across all communication domains.",
        "Designed for sustained growth, executive presence, and high-stakes performance readiness.",
      ],
      button_text: "Get the ultimate plan",
      highlight: false,
      payment_link:
        "https://connect.intuit.com/pay/CareerDoctorLlc/scs-v1-b4372ea1177e40689bfc3080f896e78ec455af91c9a543eea0b08df2de1ab9b090507c99ea5048beaf1f2b31984ddf0a?locale=EN_US",
    },
  ];
  return (
    <section className=" px-10 lg:px-20 py-28 font-montserrat gap-y-24 relative flex flex-col justify-center items-center">
      <div className="space-y-10 flex flex-col items-center">
        <div className="px-3 py-3 flex gap-2 items-center w-max border rounded-lg bg-white border-[#E1E5E7] mx-auto">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            className="h-4 w-4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.0714 3.63167C6.47007 2.46501 8.08207 2.42967 8.55474 3.52567L8.59474 3.63234L9.13274 5.20567C9.25603 5.5665 9.45527 5.89668 9.71702 6.17396C9.97877 6.45123 10.2969 6.66915 10.6501 6.81301L10.7947 6.86701L12.3681 7.40434C13.5347 7.80301 13.5701 9.41501 12.4747 9.88767L12.3681 9.92768L10.7947 10.4657C10.4338 10.5889 10.1035 10.7881 9.82608 11.0498C9.54869 11.3116 9.33067 11.6298 9.18674 11.983L9.13274 12.127L8.5954 13.701C8.19674 14.8677 6.58474 14.903 6.11274 13.8077L6.0714 13.701L5.53407 12.1277C5.41086 11.7667 5.21165 11.4364 4.9499 11.159C4.68814 10.8816 4.36993 10.6636 4.01674 10.5197L3.87274 10.4657L2.2994 9.92834C1.13207 9.52967 1.09674 7.91767 2.19274 7.44567L2.2994 7.40434L3.87274 6.86701C4.23356 6.74371 4.56374 6.54447 4.84102 6.28272C5.11829 6.02097 5.33621 5.7028 5.48007 5.34967L5.53407 5.20567L6.0714 3.63167ZM7.3334 4.06234L6.79607 5.63567C6.60833 6.18588 6.30292 6.68854 5.90109 7.10867C5.49927 7.5288 5.0107 7.85629 4.4694 8.06834L4.30274 8.12901L2.7294 8.66634L4.30274 9.20367C4.85294 9.39141 5.35561 9.69683 5.77573 10.0987C6.19586 10.5005 6.52335 10.989 6.7354 11.5303L6.79607 11.697L7.3334 13.2703L7.87074 11.697C8.05848 11.1468 8.36389 10.6441 8.76571 10.224C9.16753 9.80388 9.65611 9.47639 10.1974 9.26434L10.3641 9.20434L11.9374 8.66634L10.3641 8.12901C9.81387 7.94127 9.3112 7.63585 8.89107 7.23403C8.47094 6.83221 8.14345 6.34364 7.9314 5.80234L7.8714 5.63567L7.3334 4.06234ZM12.6667 1.33301C12.7915 1.33301 12.9137 1.36799 13.0195 1.43399C13.1253 1.49998 13.2105 1.59434 13.2654 1.70634L13.2974 1.78434L13.5307 2.46834L14.2154 2.70167C14.3404 2.74414 14.45 2.82275 14.5302 2.92755C14.6105 3.03235 14.6578 3.15862 14.6663 3.29036C14.6747 3.42209 14.6438 3.55336 14.5775 3.66753C14.5113 3.7817 14.4126 3.87363 14.2941 3.93167L14.2154 3.96367L13.5314 4.19701L13.2981 4.88167C13.2555 5.00663 13.1769 5.11614 13.072 5.19634C12.9672 5.27653 12.8409 5.3238 12.7092 5.33216C12.5774 5.34051 12.4462 5.30957 12.3321 5.24326C12.2179 5.17695 12.1261 5.07825 12.0681 4.95967L12.0361 4.88167L11.8027 4.19767L11.1181 3.96434C10.9931 3.92188 10.8835 3.84326 10.8033 3.73846C10.723 3.63366 10.6756 3.5074 10.6672 3.37566C10.6588 3.24393 10.6897 3.11265 10.7559 2.99848C10.8222 2.88431 10.9208 2.79238 11.0394 2.73434L11.1181 2.70234L11.8021 2.46901L12.0354 1.78434C12.0804 1.65262 12.1654 1.53828 12.2786 1.45734C12.3918 1.3764 12.5276 1.33292 12.6667 1.33301Z"
              fill="#4C5C75"
            />
          </svg>
          <p className="small">PRICING</p>
        </div>

        <div className="lg:w-[70%] text-center mx-auto space-y-4 flex flex-col items-center">
          <h4 className="h-max font-montreal leading-snug">
            Choose the right plan for <br /> your growth
          </h4>
          <p className="text-dark-electric-blue leading-normal">
            {subtext
              ? subtext
              : "Brief introduction highlighting the flexibility of pricing plans to cater to different professional needs."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 w-full lg:grid-cols-2 xl:grid-cols-4 gap-10 lg:gap-8 lg:pt-32">
        {plans.map((plan, idx) => (
          <PricingCard plan={plan} key={idx} />
        ))}
      </div>

      <div className="flex flex-col lg:flex-row relative justify-between overflow-clip w-full pl-10 py-12  lg:h-max lg:py-12 bg-[#6F7C8E] rounded-2xl text-white">
        <div className="h-full lg:w-[50%]">
          <div className="lg:w-full pr-[30px] lg:pr-0">
            <h4 className="font-montreal">Enterprise & team plans</h4>
            <p className="mt-4 font-montserrat">
              For teams or departments with more than 10 individuals, we offer a
              customized enterprise plan designed for seamless multi-user
              access.
            </p>
            <button className="flex gap-2 font-montserrat mt-10 mx-auto lg:mx-0 w-full lg:w-max py-4 px-6 items-center justify-center rounded-lg">
              <p>Contact us for a consultation!</p>
              <svg
                width="15"
                height="18"
                className="h-6 w-7"
                viewBox="0 0 15 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.0243 6.32818C11.1897 6.32894 11.3481 6.39499 11.4651 6.51196C11.5821 6.62893 11.6481 6.78737 11.6489 6.95279L11.6489 12.8453C11.6518 12.9292 11.6379 13.0128 11.6078 13.0912C11.5778 13.1696 11.5322 13.2411 11.4739 13.3015C11.4156 13.3619 11.3458 13.4099 11.2685 13.4427C11.1913 13.4755 11.1082 13.4924 11.0243 13.4924C10.9403 13.4924 10.8573 13.4755 10.78 13.4427C10.7027 13.4099 10.6329 13.3619 10.5746 13.3015C10.5163 13.2411 10.4708 13.1696 10.4407 13.0912C10.4107 13.0128 10.3967 12.9292 10.3996 12.8453L10.3996 8.46128L4.39513 14.4658C4.27792 14.583 4.11895 14.6489 3.95319 14.6489C3.78743 14.6489 3.62846 14.583 3.51125 14.4658C3.39404 14.3486 3.32819 14.1896 3.32819 14.0239C3.32819 13.8581 3.39404 13.6991 3.51125 13.5819L9.51576 7.5774L5.1317 7.5774C4.96986 7.57169 4.81655 7.50338 4.70408 7.38687C4.59161 7.27035 4.52875 7.11473 4.52875 6.95279C4.52875 6.79085 4.59161 6.63523 4.70408 6.51871C4.81655 6.4022 4.96986 6.33389 5.1317 6.32818L11.0243 6.32818Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        </div>
        <img
          className="hidden lg:block h-[16rem] absolute right-0 bottom-0"
          src="./assets/product.png"
          alt="engagex product image"
        />
        <img
          className="lg:hidden mt-12"
          src="./assets/productmb.png"
          alt="engagex product image"
        />
      </div>
    </section>
  );
}

export default Pricing;
