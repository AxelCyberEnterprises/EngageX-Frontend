import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import AllPressPosts from "@/components/press/AllPressPosts";
import Hero from "@/components/press/Hero";

function Press() {
  return (
    <main>
      <Navbar />
      <Hero />
      <AllPressPosts />
      <Footer />
    </main>
  );
}

export default Press;
