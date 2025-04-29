import PricingComponent from "@/components/homepage/Pricing";
import Benefits from "@/components/pricing/Benefits";
import FAQs from "@/components/pricing/FAQs";
import Hero from "@/components/pricing/Hero";

function Pricing() {
  return (
    <main>
      <Hero />
      <PricingComponent
        showPricing={true}
        subtext="Everything you need to become the best speaker you can be is right here"
      />
      <Benefits />
      <FAQs />
    </main>
  );
}

export default Pricing;
