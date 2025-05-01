import clsx from "clsx";
import HowItWorksCard from "./HowItWorksCard";

function HowItWorks() {
    const how_it_works_sections = [
      {
        header: "NEW FEATURES COMING SOON!",
        title: "Interview Studio",
        content:
          "An exciting new vertical Interview Studio will soon be available for specified industry professionals in:",
        list: ["Marketing", "Biotech/Pharma", "Sales", "Operations", "Technology", "Sports Executives"],
        carousel: [
          {
            title: "Industry Specific Interviewing",
            content:
              "Custom questions aligned with key industries including healthcare, pharma and biotech, marketing, operations, sports, and technology.",
          },
          {
            title: "Over 100 Intuitive Interview questions per industry",
            content:
              "Dynamic prompts that adapt based on your responses to simulate real conversations.",
          },
          {
            title: "AI STAR Feedback Analysis",
            content:
              "Real time evaluation based on the STAR method to strengthen structured response skills.",
          },
          {
            title: "3D Animated AI Model Simulated Interviewers",
            content:
              "Realistic animated interviewers that bring an immersive and engaging experience.",
          },
          {
            title: "Comprehensive Feedback Reporting",
            content:
              "Detailed insights that highlight strengths, areas for growth, and actionable improvement tips.",
          },
          {
            title: "Comparative Session Analysis",
            content:
              "Track your performance over multiple sessions to measure progress and refine technique.",
          },
        ],
      },

      {
        header: "FEATURES",
        title: "AI progress tracking for pitch improvement",
        content:
          "Our AI progress tracking for public speaking improvement is a cutting-edge solution for individuals and teams to refine their pitch delivery. Whether for business, sales, or investor opportunity pitches, this tool ensures continuous improvement and success",
        img: "./assets/HowItWorksImg2.png",
      },
      {
        header: "FEATURES",
        title: "Feedback score dashboard",
        content:
          "Get a snapshot of overall feedback scores and analyzed metrics to understand strengths and areas for improvement. Interpretation of feedback patterns and customer satisfaction levels. Session reporting will outline steps to enhance feedback scores and improve user performance",
        img: "./assets/HowItWorksImg3.png",
      },
    ];
    return (
        <section>
            {how_it_works_sections.map((item, idx) => (
                <HowItWorksCard
                    item={item}
                    key={idx}
                    className={clsx("flex-1", idx % 2 != 0 ? "lg:flex-row-reverse" : "bg-alice-blue")}
                />
            ))}
        </section>
    );
}

export default HowItWorks;
