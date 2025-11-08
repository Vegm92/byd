import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getBydVehicles, getCompetitorVehicles } from "@/data/vehicles";
import { useNavigate } from "react-router-dom";
import { useViewMode } from "@/contexts/ViewModeContext";

const CarGallery = () => {
  const navigate = useNavigate();
  const { viewMode } = useViewMode();
  const allBydVehicles = getBydVehicles();
  const allCompetitorVehicles = getCompetitorVehicles();

  // Define small and big vehicle IDs
  const smallVehicleIds = [
    'byd-atto-2-dmi',
    'byd-atto-2-ev',
    'toyota-rav4-hybrid', // Yaris
    'vw-troc', // T-Roc
    'peugeot-2008-hybrid', // Peugeot 2008
    'mg-hs-phev' // MG HS
  ];

  const bigVehicleIds = [
    'byd-sealion-5-dmi',
    'vw-tiguan',
    'hyundai-tucson-nline',
    'mg-zs-hybrid'
  ];

  // Filter and sort vehicles based on view mode
  const getFilteredVehicles = (vehicles: any[], isByd: boolean) => {
    let filteredVehicles = vehicles;

    if (viewMode === 'small') {
      filteredVehicles = vehicles.filter(v => smallVehicleIds.includes(v.id));
    } else if (viewMode === 'big') {
      filteredVehicles = vehicles.filter(v => bigVehicleIds.includes(v.id));
    }

    // Put ATTO 2 DM-i in center position for desktop (position 1 in array)
    const atto2Index = filteredVehicles.findIndex(v => v.id === 'byd-atto-2-dmi');
    if (atto2Index >= 0 && atto2Index !== 1) {
      const atto2Vehicle = filteredVehicles.splice(atto2Index, 1)[0];
      // Insert at position 1 (center on desktop 3-column layout)
      filteredVehicles.splice(1, 0, atto2Vehicle);
    }

    return filteredVehicles;
  };

  const bydVehicles = getFilteredVehicles(allBydVehicles, true);
  const competitorVehicles = getFilteredVehicles(allCompetitorVehicles, false);

  const handleCarClick = (carId: string) => {
    // Save current scroll position before navigating
    sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    navigate(`/vehicle/${carId}`);
  };

  return (
    <section id="vehicle-gallery" className="py-24 bg-background">
      <div className="container px-4">
        {/* BYD Vehicles Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary text-primary-foreground">BYD Fleet</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Our Vehicles
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover BYD's innovative hybrid and electric lineup
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
             {bydVehicles.map((vehicle) => (
               <Card
                 key={vehicle.id}
                 onClick={() => handleCarClick(vehicle.id)}
                 className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer max-w-sm w-full"
               >
                 <div className="relative aspect-[2/1] bg-gradient-to-br from-[var(--byd-very-light-blue)] to-white">
                  <img 
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-contain p-4"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="text-white font-semibold" style={{ backgroundColor: 'var(--byd-red)' }}>
                      {vehicle.type}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6 bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-xl text-foreground">{vehicle.brand}</h3>
                    <Badge variant="outline" className="border-[var(--byd-gray)] text-[var(--byd-gray)]">{vehicle.specs.power}</Badge>
                  </div>
                  <p className="text-[var(--byd-gray)] font-medium mb-3">{vehicle.model}</p>
                  <div className="flex items-center gap-4 text-sm text-[var(--byd-gray)]">
                    <span>Range: {vehicle.specs.range}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Competitor Vehicles Section */}
        <div>
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-competitor text-competitor-foreground">Competition</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Competitor Vehicles
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Compare against leading hybrid and electric SUVs in the market
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
             {competitorVehicles.map((vehicle) => (
               <Card
                 key={vehicle.id}
                 onClick={() => handleCarClick(vehicle.id)}
                 className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer max-w-sm w-full"
               >
                 <div className="relative aspect-[2/1] bg-gradient-to-br from-[var(--byd-light-peach)] to-white">
                  <img 
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-contain p-4"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="text-white font-semibold" style={{ backgroundColor: 'var(--byd-blue)' }}>
                      {vehicle.type}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4 bg-white">
                  <h3 className="font-bold text-lg text-foreground">{vehicle.brand}</h3>
                  <p className="text-sm text-[var(--byd-gray)]">{vehicle.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarGallery;
