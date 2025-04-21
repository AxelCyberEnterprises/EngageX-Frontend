import Hero from "../components/homepage/Hero";
import Intro from "../components/homepage/Intro";
import Benefits from "../components/homepage/Benefits";
import HowItWorks from "../components/homepage/HowItWorks";
import Pricing from "../components/homepage/Pricing";
import Faq from "../components/homepage/Faq";
import Testimonial from "../components/homepage/Testimonial";

const HomePage: React.FC = () => {
  return (
    <main className="font-montserrat">
      <Hero />
      <Intro />
      <Benefits />
      <HowItWorks />
      <Pricing />
      <Faq />
      <Testimonial />
    </main>
  );
};

export default HomePage;
