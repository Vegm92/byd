import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToGallery = () => {
    document.getElementById('vehicle-gallery')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[var(--byd-very-light-blue)] to-white">
      {/* Background Image - Clean background per brand guidelines */}
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: 'url(https://cdn.abacus.ai/images/39b31350-21b7-4164-9184-8d2eb7fe6bd3.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--byd-blue)]/10 via-transparent to-white z-0" />

      {/* Content */}
      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <div className="space-y-6">
            <span className="block text-sm md:text-base font-semibold tracking-[0.4em] uppercase" style={{ color: 'var(--byd-red)' }}>
              New
            </span>
            <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tight text-foreground">
              ATTO 2 DM-i
            </h1>
            <p className="text-xl md:text-2xl font-medium text-foreground/90 uppercase tracking-wide">
              Europe Sales Training
            </p>
            <p className="text-sm md:text-base uppercase tracking-[0.6em]" style={{ color: 'var(--byd-gray)' }}>
              Barcelona 2025
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Button 
              size="lg" 
              onClick={scrollToGallery}
              className="bg-[var(--byd-red)] hover:bg-[var(--byd-red)]/90 text-white font-semibold px-8 py-6 text-lg"
              style={{ backgroundColor: 'var(--byd-red)' }}
            >
              Explore Vehicles
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer" onClick={scrollToGallery}>
        <div className="w-6 h-10 border-2 rounded-full flex items-start justify-center p-2" style={{ borderColor: 'var(--byd-red)' }}>
          <div className="w-1 h-2 rounded-full" style={{ backgroundColor: 'var(--byd-red)' }} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
