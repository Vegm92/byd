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

      {/* Bulk QR Section - Commented out
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <Button
            onClick={() => setShowQr(!showQr)}
            className="px-6 py-3 text-lg font-semibold uppercase tracking-wide"
            style={{
              backgroundColor: "var(--byd-blue)",
              color: "white",
              fontFamily: "Montserrat",
            }}
          >
            {showQr ? "Hide" : "Show"} All PDF QR Codes
          </Button>
        </div>

        {showQr && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
              <div key={vehicle.id} className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-lg font-bold mb-4" style={{ fontFamily: "Montserrat" }}>
                  {vehicle.name}
                </h3>
                {qrCodes[vehicle.id] ? (
                  <img src={qrCodes[vehicle.id]} alt={`QR for ${vehicle.name}`} className="mx-auto" />
                ) : (
                  <p className="text-gray-500">Link not available</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      */}

      <Footer />
    </div>
  );
};

export default Index;
