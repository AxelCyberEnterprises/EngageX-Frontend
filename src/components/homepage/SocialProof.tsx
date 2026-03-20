import nasdaqLogo from "@/assets/images/pngs/nasdaq.png";
import bullsLogo from "@/assets/images/pngs/Chicago_Bulls_logo.png";
import girlsIncLogo from "@/assets/images/pngs/girls inc.png";
import { StarIcon } from "lucide-react";

function SocialProof() {
  const quotes = [
    {
      text: "\u201CThe coolest thing I\u2019ve seen in a while!\u201D",
      name: "Katherine Milliken",
      title: "VP of Entertainment & Fan Experience, Miami Dolphins",
    },
    {
      text: "\u201CEngageX\u00AE offers leaders like myself a transformative approach to inspiring teams, driving innovation, and turning strategic communication into measurable results.\u201D",
      name: "Ben Tubou",
      title: "Director & Small Business Liaison Officer, McKesson",
    },
    {
      text: "\u201CThere\u2019s no downside to it, it makes you more presentable, helps you avoid embarrassment, and that\u2019s a great idea. Honestly, it should be mandatory.\u201D",
      name: "Aaron Williams",
      title: "14-Season NBA Veteran, National Basketball Association",
    },
  ];

  const partners = [
    { src: girlsIncLogo, alt: "Girls Inc Chicago" },
    { src: nasdaqLogo, alt: "NASDAQ Entrepreneurial Center" },
    { src: bullsLogo, alt: "Chicago Bulls" },
  ];

  return (
    <section className="bg-alice-blue px-10 lg:px-20 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h5 className="font-montreal font-semibold text-gunmetal">
          Real people. Real results.
        </h5>
        <p className="text-dark-electric-blue/70 mt-2 text-base">
          Hear what leaders are saying after stepping into the room.
        </p>
      </div>

      {/* Quotes — old testimonial card style */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {quotes.map((quote, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-full md:h-[18rem] h-auto flex flex-col justify-between py-10 items-center relative md:overflow-clip overflow-visible border bg-white"
          >
            <div className="flex justify-center relative z-10">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} fill="#253141" strokeWidth={0} />
              ))}
            </div>
            <p className="text-base text-center px-4 text-pretty relative z-10">
              {quote.text}
            </p>
            <div className="flex gap-2 items-center self-stretch px-4 relative z-10">
              <p className="text-xs text-center mt-8 -mb-4 min-w-0 break-words whitespace-normal w-full">
                <span className="font-bold">{quote.name}</span>
                {" - "}
                {quote.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Partner Logos */}
      <div className="mt-20 text-center">
        <p className="text-xs text-gunmetal/40 uppercase tracking-[0.2em] mb-10 font-medium">Trusted by leaders at</p>
        <div className="flex flex-wrap items-center justify-center gap-16 lg:gap-24">
          {partners.map((partner, idx) => (
            <img
              key={idx}
              src={partner.src}
              alt={partner.alt}
              className="h-12 lg:h-16 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-200"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default SocialProof;
