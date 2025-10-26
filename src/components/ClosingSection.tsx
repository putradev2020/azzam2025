import { Heart } from "lucide-react";

const ClosingSection = () => {
  return (
    <section className="relative py-24 px-4 bg-gradient-to-b from-card via-background to-primary/10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-gold/5 blur-3xl" />
      
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <div
          data-aos="fade-down"
          data-aos-duration="1000"
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-gold rounded-full shadow-gold mb-6">
            <Heart className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Terima Kasih
          </h2>
          <div className="w-24 h-1 bg-gradient-gold mx-auto" />
        </div>

        <div
          className="space-y-6 text-muted-foreground"
          data-aos="fade-up"
          data-aos-delay="300"
          data-aos-duration="1000"
        >
          <p className="text-lg leading-relaxed">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
            Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
          </p>
          <p className="text-lg leading-relaxed">
            Atas kehadiran dan doa restunya, kami ucapkan terima kasih.
          </p>
          
          <div className="pt-8">
            <p className="text-xl font-semibold text-primary mb-2">
              Wassalamu'alaikum Warahmatullahi Wabarakatuh
            </p>
          </div>
        </div>

        <div
          className="mt-12 pt-8 border-t border-accent/20"
          data-aos="fade-up"
          data-aos-delay="500"
          data-aos-duration="1000"
        >
          <p className="text-sm text-muted-foreground">
            Kami yang berbahagia
          </p>
          <p className="text-lg font-semibold text-primary mt-2">
            Keluarga Bapak Benny Darmawan & Ibu Nuriyanni
          </p>
        </div>
      </div>
    </section>
  );
};

export default ClosingSection;
