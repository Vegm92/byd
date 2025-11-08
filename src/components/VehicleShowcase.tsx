import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const VehicleShowcase = () => {
  const vehicles = [
    {
      name: "ATTO 2 Hiking Green",
      image: "https://www.byd.com/content/dam/byd-site/eu/electric-cars/atto-2/xl/byd-atto2-exterior-04-green-xl.jpg",
      color: "Hiking Green",
      badge: "Popular"
    },
    {
      name: "ATTO 2 Luxury Black",
      image: "https://www.byd.com/content/dam/byd-site/eu/electric-cars/atto-2/xl/byd-atto2-exterior-04-black-xl.jpg",
      color: "Premium Black",
      badge: "Premium"
    },
    {
      name: "ATTO 2 Sky White",
      image: "https://byd.simemotors.my/media/wysiwyg/atto-2/car-sky-white.png",
      color: "Sky White",
      badge: "Classic"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Vehicle Gallery
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore the ATTO 2 DM-i in stunning colors and finishes
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicles.map((vehicle, index) => (
            <Card 
              key={index} 
              className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
               <div className="relative aspect-[2/1] bg-gradient-to-br from-secondary/50 to-background">
                <img 
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-primary text-primary-foreground">
                    {vehicle.badge}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-2 text-foreground">{vehicle.name}</h3>
                <p className="text-muted-foreground flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-accent border-2 border-white" />
                  {vehicle.color}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VehicleShowcase;
