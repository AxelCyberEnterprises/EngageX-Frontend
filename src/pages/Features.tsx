import FeaturesSection from "@/components/features/FeaturesSection";
import Hero from "@/components/features/Hero";
import HowItWorks from "@/components/features/HowItWorks";
import NewFeaturesSection from "@/components/features/StudioSection";

const newFeaturesDataTheRookie = {
  header: "NEW FEATURES COMING SOON!",
  title: "The Rookie",
  content:
    "An exciting new vertical “THE ROOKIE” will soon be available for Athletes across Multiple sports i.e Basketball, Football, Soccer and Baseballl",
  list: [
    "Athlete Onboarding",
    "AI Reactions",
    "Certified Coaches",
    "Flexible Training",
    "Feedback Report",
    "Session Analysis",
  ],
  carousel: [
    {
      title: "Communication Training For New Athletes",
      content:
        "EngageX™ equips every Rookie and Sophomore player to confidently navigate media communication challenges",
    },
    {
      title: "Experience Real-World Media Simulated Environments",
      content:
        "Train in the spotlight before you step into it",
    },
    {
      title: "AI + Live Certified Coaching",
      content:
        "We use a hybrid model of Real life certified coaches and AI feedback to emulate high pressure media moments",
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
        "Detailed insights that highlight strengths, areas for growth, and actionable improvement tips"
    },
  ],
};


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
