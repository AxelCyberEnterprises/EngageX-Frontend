import clsx from "clsx";
import HowItWorksCard from "./HowItWorksCard";

function HowItWorks() {
  let how_it_works_sections = [
    {
      title: "AI realistic enhancements for users",
      content:
        "Enhancing user interactions with AI-driven customization. Tailored experiences based on behavior and preferences and a real-time responsiveness for a more immersive experience",
      img: "./assets/HowItWorksImg1.png",
    },

    {
      title: "AI progress tracking for pitch improvement",
      content:
        "Our AI progress tracking for public speaking improvement is a cutting-edge solution for individuals and teams to refine their pitch delivery. Whether for business, sales, or investor opportunity pitches, this tool ensures continuous improvement and success",
      img: "./assets/HowItWorksImg2.png",
    },
    {
      title: "Feedback score dashboard",
      content:
        "Get a snapshot of overall feedback scores and analyzed metrics to understand strengths and areas for improvement. Interpretation of feedback patterns and customer satisfaction levels. Session reporting will outline steps to enhance feedback scores and improve user performance.",
      img: "./assets/HowItWorksImg3.png",
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
