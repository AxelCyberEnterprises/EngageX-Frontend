import clsx from "clsx";
import HowItWorksCard from "./HowItWorksCard";
import HowItWorksCardOneSVG from "./svgs/HowItWorksCardOneSVG";
import HowItWorksCardThreeSVG from "./svgs/HowItWorksCardThreeSVG";
import HowItWorksCardTwoSVG from "./svgs/HowItWorksCardTwoSVG";

function HowItWorks() {
  let how_it_works_sections = [
    {
      title: "AI realistic enhancements for users",
      content:
        "Enhancing user interactions with AI-driven customization. Tailored experiences based on behavior and preferences and a real-time responsiveness for a more immersive experience",
      svg: <HowItWorksCardOneSVG className="w-full h-[20rem]" />,
    },
    {
      title: "AI progress tracking for pitch improvement",
      content:
        "Our AI progress tracking for public speaking Improvement is a cutting-edge solution for individuals and teams to help refine their pitch delivery. Every session is automatically recorded, allowing you to improve your performance. Whether for business, sales, or public speaking, this tool ensures continuous improvement and success.",
      svg: (
        <HowItWorksCardTwoSVG className="w-[24rem] h-[20rem] mt-22 lg:mt-0" />
      ),
    },
    {
      title: "Feedback score dashboard",
      content:
        "Get a snapshot of overall feedback scores and Analyzed metrics to understand strengths and areas for improvement. Interpretation of feedback patterns and customer satisfaction levels. Showing steps to enhance feedback scores and improve user experience.",
      svg: (
        <HowItWorksCardThreeSVG className="w-full h-[20rem] mt-22 lg:mt-0" />
      ),
    },
  ];
  return (
    <section>
      {how_it_works_sections.map((item, idx) => (
        <HowItWorksCard
          item={item}
          key={idx}
          className={clsx(
            "flex-1",
            idx % 2 != 0 ? "lg:flex-row-reverse" : "bg-alice-blue"
          )}
        />
      ))}
    </section>
  );
}

export default HowItWorks;
