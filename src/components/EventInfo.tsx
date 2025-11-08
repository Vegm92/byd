import { Calendar, MapPin, Users, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const EventInfo = () => {
  const highlights = [
    {
      icon: Calendar,
      title: "Event",
      description: "Sales Training & Product Launch",
      detail: "2025"
    },
    {
      icon: MapPin,
      title: "Location",
      description: "Barcelona",
      detail: "Spain"
    },
    {
      icon: Users,
      title: "Audience",
      description: "European Sales Teams",
      detail: "BYD Network"
    },
    {
      icon: Award,
      title: "Focus",
      description: "ATTO 2 DM-i Technology",
      detail: "Hybrid Excellence"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-secondary/30">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Event Information
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join us for an exclusive training experience showcasing the innovative BYD ATTO 2 DM-i
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                      {item.detail}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventInfo;
