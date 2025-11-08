import { Battery, Zap, Gauge, Leaf } from "lucide-react";

const TechSpecs = () => {
  const specs = [
    {
      icon: Battery,
      title: "DM-i Technology",
      value: "Hybrid Powertrain",
      description: "Advanced plug-in hybrid system"
    },
    {
      icon: Zap,
      title: "Performance",
      value: "Dynamic Drive",
      description: "Efficient and powerful"
    },
    {
      icon: Gauge,
      title: "Range",
      value: "Extended Range",
      description: "Electric + hybrid capability"
    },
    {
      icon: Leaf,
      title: "Eco-Friendly",
      value: "Low Emissions",
      description: "Sustainable mobility"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-secondary/30 to-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="container px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Technical Excellence
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cutting-edge technology meets sustainable performance
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {specs.map((spec, index) => (
            <div 
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 hover:shadow-lg"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mb-4 shadow-lg">
                <spec.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-foreground">{spec.title}</h3>
              <p className="text-2xl font-bold text-primary mb-2">{spec.value}</p>
              <p className="text-sm text-muted-foreground">{spec.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechSpecs;
