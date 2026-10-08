import FeaturesSection from "@/components/features/FeaturesSection";
import Hero from "@/components/features/Hero";
import HowItWorks from "@/components/features/HowItWorks";
import NewFeaturesSection from "@/components/features/StudioSection";

const newFeaturesDataTheRookie = {
    header: "NEW FEATURES COMING SOON!",
    title: "The Rookie",
    content:
        "Welcome to EngageX Media Training. This platform gives you a place to practice the moments that happen after the competition—when the cameras are on, the questions are coming, and your response matters. You’ll train for press conferences, postgame and post-match interviews, sponsor and NIL conversations, personal branding, social media, and crisis situations. Each experience is designed to help you think clearly, answer confidently, protect your reputation, and strengthen your brand. EngageX helps you prepare before the pressure is real, so you’re ready to represent yourself at your best",
    list: [
        "Athlete Onboarding",
        "AI Reactions",
        "AI Media Coaching",
        "Flexible Training",
        "Feedback Report",
        "Session Analysis",
    ],
    carousel: [
        {
            title: "Communication Training For New Athletes",
            content:
                "EngageX equips every Rookie and Sophomore player to confidently navigate media communication challenges",
        },
        {
            title: "Experience Real-World Media Simulated Environments",
            content: "Train in the spotlight before you step into it",
        },
        {
            title: "AI Media Coaching",
            content:
                "We use a model trained by an ICF certified speech coach offering Al feedback to emulate high pressure media moments",
        },
        {
            title: "Train Anytime, Anywhere",
            content: "On-demand coaching you can access wherever you are, whenever you need  it",
        },
        {
            title: "Comparative Session Analysis",
            content: "Track your performance over multiple sessions to measure progress and refine technique",
        },
        {
            title: "Comprehensive Feedback Reporting",
            content: "Detailed insights that highlight strengths, areas for growth, and actionable improvement tips",
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
