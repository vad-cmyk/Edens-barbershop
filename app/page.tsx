import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Team from "@/components/Team";
import Gallery from "@/components/Gallery";
import BookingTeaser from "@/components/BookingTeaser";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <About />
        <Services />
        <Team />
        <Gallery />
        <BookingTeaser />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
