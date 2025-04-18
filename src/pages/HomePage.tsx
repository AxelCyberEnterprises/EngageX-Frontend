import Hero from "../components/homepage/Hero";
import Intro from "../components/homepage/Intro";
import Benefits from "../components/homepage/Benefits";
import HowItWorks from "../components/homepage/HowItWorks";
import Pricing from "../components/homepage/Pricing";
import Faq from "../components/homepage/Faq";
import Testiomonial from "../components/homepage/Testiomonial";

const HomePage: React.FC = () => {
  return (
    <main className="font-montserrat">
      <Hero />
      <Intro />
      <Benefits />
      <HowItWorks />
      <Pricing />
      <Faq />
      <Testiomonial />
    </main>
  );
};

export default HomePage;
