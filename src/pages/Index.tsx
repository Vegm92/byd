import { useEffect } from "react";
import Hero from "@/components/Hero";
import CarGallery from "@/components/CarGallery";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    // Restore scroll position when returning from vehicle detail
    const savedPosition = sessionStorage.getItem("scrollPosition");
    if (savedPosition) {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        window.scrollTo(0, parseInt(savedPosition, 10));
        sessionStorage.removeItem("scrollPosition");
      });
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Hero />
      <CarGallery />
      <Footer />
    </div>
  );
};

export default Index;
