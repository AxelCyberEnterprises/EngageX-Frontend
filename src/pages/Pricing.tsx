// import PricingComponent from "@/components/homepage/Pricing";
import PricingPlansSection from "@/components/homepage/PricingPlansSection";
import Benefits from "@/components/pricing/Benefits";
import FAQs from "@/components/pricing/FAQs";
import Hero from "@/components/pricing/Hero";

function Pricing() {
    return (
        <main>
            <Hero />
            {/* <PricingComponent
                showPricing={true}
                subtext="Everything you need to become the best speaker you can be is right here"
            /> */}
            <PricingPlansSection showButton={false} />
            <Benefits />
            <FAQs />
        </main>
    );
}

export default Pricing;
