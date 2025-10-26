import { Clock, MapPin, User, Music, Utensils, Gift } from "lucide-react";
import { Card } from "@/components/ui/card";

const SusunanAcaraSection = () => {
  const scheduleItems = [
    {
      time: "09.30 - 10.00",
      title: "Pembukaan & Sambutan",
      description: "Pembukaan acara dan sambutan dari keluarga",
      icon: User,
    },
    {
      time: "10.00 - 11.00",
      title: "Prosesi Khitan",
      description: "Prosesi khitanan berlangsung",
      icon: Clock,
    },
    {
      time: "11.00 - 12.00",
      title: "Hiburan & Musik",
      description: "Penampilan musik dan hiburan untuk tamu",
      icon: Music,
    },
    {
      time: "12.00 - 13.30",
      title: "Makan Bersama",
      description: "Hidangan lezat untuk semua tamu undangan",
      icon: Utensils,
    },
    {
      time: "13.30 - Selesai",
      title: "Sesi Foto & Penutupan",
      description: "Foto bersama dan penutupan acara",
      icon: Gift,
    },
  ];

  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-background via-card to-background overflow-hidden">
      <div className="chandelier-bg" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div
          data-aos="fade-down"
          data-aos-duration="800"
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Susunan Acara
          </h2>
          <div className="w-24 h-1 bg-gradient-gold mx-auto" />
          <p className="text-muted-foreground mt-4 text-lg">
            Rangkaian acara yang telah kami persiapkan
          </p>
        </div>

        <div className="space-y-6">
          {scheduleItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card
                key={index}
                className="p-6 shadow-elegant hover:shadow-gold transition-all duration-500 border-accent/10 bg-card/80 backdrop-blur-sm"
                data-aos="fade-up"
                data-aos-delay={index * 100}
                data-aos-duration="800"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>

                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h3 className="text-xl font-semibold text-primary">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 text-accent font-semibold mt-2 md:mt-0">
                        <Clock className="w-4 h-4" />
                        <span>{item.time}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div
          className="mt-12 text-center"
          data-aos="fade-up"
          data-aos-delay="600"
          data-aos-duration="800"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-gold rounded-full shadow-gold">
            <MapPin className="w-5 h-5 text-primary" />
            <span className="font-semibold text-primary">
              Jl. Untung Suropati, Lrg. Rambu-Rambu Rt. 45, Jelutung
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SusunanAcaraSection;
