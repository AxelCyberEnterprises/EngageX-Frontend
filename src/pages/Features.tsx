import FeaturesSection from "@/components/features/FeaturesSection";
import Hero from "@/components/features/Hero";
import HowItWorks from "@/components/features/HowItWorks";
import NewFeaturesSection from "@/components/features/StudioSection";

const newFeaturesDataTheRookie = {
  header: "NEW FEATURES COMING SOON!",
  title: "The Rookie",
  content:
    "EngageX™️ equips every Rookie and Sophomore player to confidently navigate media communication challenges.",
  list: [
    "Athlete Onboarding",
    "AI Reactions",
    "Smart Coaching",
    "Flexible Training",
    "Feedback Report",
    "Session Analysis",
  ],
  carousel: [
    {
      title: "Virtual Speech Coaching for Sports Rookies & Sophomores",
      content:
        "Building confidence, clarity, and composure in every media moment",
    },
    {
      title: "Virtual Room Experience",
      content:
        "Practise and improve your presence in a realistic, interactive digital environment",
    },
    {
      title: "AI + Live Certified Coaching",
      content:
        "AI and expert coaching to prep you for interviews, media and high pressure moments",
    },
    {
      title: "Train Anytime, Anywhere",
      content:
        "On-demand coaching you can access wherever you are, whenever you need  it",
    },
    {
      title: "Comparative Session Analysis",
      content:
        "Track your performance over multiple sessions to measure progress and refine technique",
    },
    {
      title: "Comprehensive Feedback Reporting",
      content:
        "Detailed insights that highlight strengths, areas for growth, and actionable improvement tips.",
    },
  ],
};

// const newFeaturesDataPharmHQ = {
//   header: "NEW FEATURES COMING SOON!",
//   title: "PharmHQ",
//   content:
//     "An exciting new vertical that helps skip the costly, Inefficient role play, EngageX builds launch confidence through smart, modern conversation training that saves money and keeps your field force truly ready",
//   list: [
//     "Training Essentials",
//     "Hybrid Coaching",
//     "Remote Onboarding",
//     "Flexible Training",
//     "Feedback Report",
//     "Session Analysis",
//   ],
//   carousel: [
//     {
//       title: "Bridging product knowledge and Connection",
//       content:
//         "Transforming life sciences training to help improve results in Authentic Consultative Selling and prevent poor performance",
//     },
//     {
//       title: "Blending Human-AI Intelligence",
//       content:
//         "Seamlessly uniting AI precision with certified human expertise to reduce poorly executed conversations that can lead to distrust or disengagement",
//     },
//     {
//       title: "Train for Presence That Connects, even Remotely",
//       content:
//         "Maintain effectiveness even in remote situations from first impression to final pitch, sharpen your virtual impact where it matters most. ",
//     },
//     {
//       title: "Accessible anytime and anywhere",
//       content:
//         "Built for busy schedules, Interview Studio delivers practice and feedback — anytime, anywhere",
//     },
//     {
//       title: "Comprehensive Feedback Reporting",
//       content:
//         "Detailed insights that highlight strengths, areas for growth, and actionable improvement tips",
//     },
//     {
//       title: "Comparative Session Analysis",
//       content:
//         "Track your performance over multiple sessions to measure progress and refine technique",
//     },
//   ],
// };

function Features() {
  return (
    <main>
      <Hero />
      {/* <NewFeaturesSection data={newFeaturesDataPharmHQ} /> */}
      <NewFeaturesSection data={newFeaturesDataTheRookie} />
      <FeaturesSection />
      <HowItWorks />
    </main>
  );
}

export default Features;
