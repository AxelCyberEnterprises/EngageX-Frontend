import Hero from "../components/homepage/Hero";
import SocialProof from "../components/homepage/SocialProof";
import HowItWorks from "../components/homepage/HowItWorks";
import WhyEngageX from "../components/homepage/WhyEngageX";
import PricingPlansSection from "../components/homepage/PricingPlansSection";

const HomePage: React.FC = () => {
    return (
        <main className="font-montserrat">
            <Hero />
            <SocialProof />
            <HowItWorks />
            <WhyEngageX />
            <PricingPlansSection />
            {/* <Pricing /> */}
        </main>
    );
};

export default HomePage;
