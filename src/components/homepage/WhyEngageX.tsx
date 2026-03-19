function WhyEngageX() {
  const differentiators = [
    {
      title: "Avatar Audiences",
      description:
        "Real emotional reactions. Real pressure. Zero judgment.",
    },
    {
      title: "Dual Feedback Loop",
      description:
        "AI precision + human coach insight, every session.",
    },
    {
      title: "Multilingual",
      description:
        "Practice in the language your audience speaks.",
    },
    {
      title: "Privacy-Safe",
      description: "Your sessions are yours. Always.",
    },
    {
      title: "Built Different",
      description:
        "Created by a Black woman in tech, for everyone who's ever been underestimated in a room.",
    },
    {
      title: "Live Coach Reviews",
      description:
        "Get supplemental feedback from ICF-certified, DTM, and TEDx speech coaches in real live review sessions.",
    },
  ];

  return (
    <section className="bg-alice-blue px-10 lg:px-20 py-28">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
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
            <p className="small">WHY ENGAGEX®</p>
          </div>
          <h4 className="h-max font-montreal leading-snug">
            There's no other platform built like this.
          </h4>
        </div>

        {/* Two-column grid — all 6 items */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-10">
          {differentiators.map((item, idx) => (
            <div key={idx} className="flex gap-4 items-start">
              {/* Checkmark */}
              <div className="mt-1 flex-shrink-0">
                <div className="w-7 h-7 rounded-full bg-[#64BA9F] flex items-center justify-center">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.5 7.5L5.5 10.5L11.5 3.5"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              {/* Text */}
              <div>
                <h6 className="font-montreal font-semibold text-lg">
                  {item.title}
                </h6>
                <p className="text-dark-electric-blue mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyEngageX;
