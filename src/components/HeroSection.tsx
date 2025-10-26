import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

interface HeroSectionProps {
  onOpen: () => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
}

const HeroSection = ({ onOpen, isAudioPlaying, onToggleAudio }: HeroSectionProps) => {

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with parallax effect */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="w-20 h-1 bg-gradient-gold mx-auto mb-6" />
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-4 tracking-wide">
            Walimatul Khitan
          </h1>
          <div className="w-20 h-1 bg-gradient-gold mx-auto mt-6" />
        </div>

        <h2 className="text-3xl md:text-4xl font-semibold text-accent mb-8">
          Fahri Azzam Darmawan
        </h2>

        <p className="text-primary-foreground/90 text-lg mb-8 font-light">
          Minggu, 23 November 2025
        </p>

        <Button
          onClick={onOpen}
          size="lg"
          className="bg-gradient-gold hover:shadow-gold transition-all duration-300 text-primary font-semibold px-8 py-6 text-lg rounded-full"
          data-aos="fade-up"
          data-aos-delay="300"
          data-aos-duration="800"
        >
          Buka Undangan
        </Button>
      </div>

      {/* Music Control */}
      <button
        onClick={onToggleAudio}
        className="absolute bottom-8 right-8 z-20 bg-card/80 backdrop-blur-sm p-3 rounded-full shadow-elegant hover:shadow-gold transition-all duration-300"
        aria-label="Toggle music"
      >
        {isAudioPlaying ? (
          <Volume2 className="w-5 h-5 text-accent" />
        ) : (
          <VolumeX className="w-5 h-5 text-muted-foreground" />
        )}
      </button>
    </section>
  );
};

export default HeroSection;
