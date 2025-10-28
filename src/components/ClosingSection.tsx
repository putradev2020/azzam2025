import { Heart } from "lucide-react";

const ClosingSection = () => {
  return (
    <section className="py-8 px-4 bg-gradient-to-b from-card to-primary/5">
      <div className="max-w-2xl mx-auto text-center">
        <div 
          className="mb-6"
          data-aos="fade-in"
          data-aos-duration="1000"
        >
          <Heart className="w-8 h-8 mx-auto mb-4 text-accent" />
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
            Terima Kasih
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
            Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu
            kepada putra kami.
          </p>
          <p className="text-foreground font-semibold">
            Wassalamu'alaikum Warahmatullahi Wabarakatuh
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground">
            © 2025 Keluarga Fahri Azzam Darmawan. Made with{" "}
            <span className="text-accent">♥</span> by Putra Developer
          </p>
        </div>
      </div>
    </section>
  );
};

export default ClosingSection;
