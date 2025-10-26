import { Users } from "lucide-react";

const TurutMengundangSection = () => {
  const invitees = [
    { name: "Firdaus", role: "Ketua RT. 45" },
    { name: "H. Ozwan", role: "Ketua RT. 44" },
    { name: "H. Pamuji", role: "Ketua Masjid" },
    { name: "Sarno", role: "Mbah" },
    { name: "Masrudin", role: "Kakek" },
    { name: "Priyono", role: "Mbah" },
    { name: "H. Imam Mashudi", role: "Mbah" },
    { name: "H. Marlan", role: "" },
    { name: "H. Jauhari", role: "Pakde" },
    { name: "H. Hardi Semeru", role: "" },
    { name: "H. Jumadi", role: "" },
    { name: "Sukijan", role: "Pakde" },
    { name: "Lasiman", role: "Uwak" },
    { name: "Lustiono", role: "Paman" },
    { name: "M. Ramadhoni", role: "Paman" },
    { name: "Antoni Darmawan", role: "Wak" },
    { name: "Sholihin", role: "Wak" },
    { name: "Rudi Darmawansyah", role: "Wak" },
  ];

  return (
    <section className="relative overflow-hidden py-24 px-4 bg-gradient-to-b from-primary/5 via-secondary/40 to-card">
      <div className="absolute inset-x-0 top-10 h-72 bg-gradient-gold/20 blur-3xl opacity-70" />
      <div className="relative max-w-6xl mx-auto">
        <div
          className="text-center mb-14"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-gold shadow-lg shadow-accent/20">
            <Users className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Turut Mengundang
          </h2>
          <div className="w-24 h-1 mx-auto bg-gradient-gold rounded-full" />
          <p className="mt-6 text-muted-foreground max-w-3xl mx-auto">
            Untaian doa dan dukungan hangat dari keluarga, tetangga, dan kerabat yang ikut memeriahkan momen khitanan Fahri Azzam Darmawan.
          </p>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="1000"
        >
          {invitees.map((invitee, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-white/40 bg-card/85 p-6 shadow-lg shadow-primary/10 backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20"
              data-aos="zoom-in"
              data-aos-delay={100 + index * 50}
              data-aos-duration="800"
            >
              <span className="absolute inset-x-6 top-0 h-[3px] rounded-full bg-gradient-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-gold text-primary font-semibold text-lg shadow-md shadow-accent/40">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground">
                    {invitee.name}
                  </h3>
                  {invitee.role && (
                    <span className="mt-2 inline-flex items-center rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent">
                      {invitee.role}
                    </span>
                  )}
                </div>
              </div>
              <div className="pointer-events-none absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-gradient-gold/20 blur-2xl transition-transform duration-500 group-hover:-translate-y-4" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TurutMengundangSection;
