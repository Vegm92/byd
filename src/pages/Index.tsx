import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import CarGallery from "@/components/CarGallery";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { vehicles } from "@/data/vehicles";
import { pdfLinks } from "@/data/pdfLinks";
// QRCode will be dynamically imported

const Index = () => {
  const [showQr, setShowQr] = useState(false);
  const [qrCodes, setQrCodes] = useState<Record<string, string>>({});

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

  const generateQrCodes = async () => {
    // Dynamically import QRCode only when needed
    const { default: QRCode } = await import('qrcode');

    const codes: Record<string, string> = {};
    for (const vehicle of vehicles) {
      const link = pdfLinks[vehicle.id];
      if (link) {
        codes[vehicle.id] = await QRCode.toDataURL(link, { width: 128 });
      }
    }
    setQrCodes(codes);
  };

  useEffect(() => {
    if (showQr && Object.keys(qrCodes).length === 0) {
      generateQrCodes();
    }
  }, [showQr]);

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
