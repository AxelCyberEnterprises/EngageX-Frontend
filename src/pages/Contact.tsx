import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Faq from "@/components/contact/Faq";
import Hero from "@/components/contact/Hero";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Contact() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" }); // or "auto"
      }
    }
  }, [location]);

  return (
    <main>
      <Navbar />
      <Hero />
      <Faq />
      <Footer />
    </main>
  );
}

export default Contact;
