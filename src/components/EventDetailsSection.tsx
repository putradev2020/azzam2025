import { Calendar, Clock, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import locationMap from "@/assets/location-map.png";

const EventDetailsSection = () => {
  const mapUrl =
    "https://www.google.com/maps?q=-1.6232268,103.6114628&z=17&hl=id&output=embed";

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/6 via-background to-primary/6 py-24 px-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-accent/20 to-transparent md:block" />
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-24 bg-gradient-to-l from-accent/20 to-transparent md:block" />

      <div className="relative mx-auto max-w-5xl">
        <h2 
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-primary"
          data-aos="fade-up"
        >
          Detail Acara
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card 
            className="p-8 text-center shadow-elegant hover:shadow-gold transition-all duration-300 border-accent/20"
            data-aos="flip-up"
            data-aos-duration="800"
          >
            <Calendar className="w-12 h-12 mx-auto mb-4 text-accent" />
            <h3 className="text-xl font-semibold mb-2">Hari & Tanggal</h3>
            <p className="text-muted-foreground">Minggu</p>
            <p className="text-2xl font-bold text-primary mt-2">23 November 2025</p>
          </Card>

          <Card 
            className="p-8 text-center shadow-elegant hover:shadow-gold transition-all duration-300 border-accent/20"
            data-aos="flip-up"
            data-aos-delay="200"
            data-aos-duration="800"
          >
            <Clock className="w-12 h-12 mx-auto mb-4 text-accent" />
            <h3 className="text-xl font-semibold mb-2">Waktu</h3>
            <p className="text-2xl font-bold text-primary mt-2">09.30 WIB</p>
            <p className="text-muted-foreground">Sampai Selesai</p>
          </Card>

          <Card 
            className="p-8 text-center shadow-elegant hover:shadow-gold transition-all duration-300 border-accent/20"
            data-aos="flip-up"
            data-aos-delay="400"
            data-aos-duration="800"
          >
            <MapPin className="w-12 h-12 mx-auto mb-4 text-accent" />
            <h3 className="text-xl font-semibold mb-2">Lokasi</h3>
            <p className="text-muted-foreground leading-relaxed">
              Jl. Untung Suropati<br />
              Lrg. Rambu-Rambu Rt. 45<br />
              Jelutung
            </p>
          </Card>
        </div>

        <div
          className="mx-auto max-w-3xl overflow-hidden rounded-[2.5rem] border border-accent/30 bg-card/90 p-4 shadow-2xl shadow-primary/20 backdrop-blur"
          data-aos="fade-zoom-in"
          data-aos-duration="1000"
        >
          <iframe
            src={mapUrl}
            width="100%"
            height="360"
            style={{ border: 0, borderRadius: "1.5rem" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokasi Acara"
          />
        </div>

        <div 
          className="mt-12 flex justify-center"
          data-aos="fade-up"
          data-aos-delay="300"
          data-aos-duration="1000"
        >
          <div className="w-full max-w-lg rounded-[2.5rem] border border-accent/25 bg-card/90 p-8 text-center shadow-xl shadow-primary/10 backdrop-blur">
            <h3 className="text-xl font-semibold text-center mb-4 text-primary">
              Denah Lokasi
            </h3>
            <div 
              className="relative overflow-hidden rounded-lg"
              data-aos="zoom-in"
              data-aos-delay="500"
              data-aos-duration="800"
            >
              <img 
                src={locationMap} 
                alt="Denah Lokasi Acara" 
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetailsSection;
