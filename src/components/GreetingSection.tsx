import { BookOpen } from "lucide-react";

const GreetingSection = () => {
  const illustrationSrc = `${import.meta.env.BASE_URL}img/1.png`;

  return (
    <section className="py-20 px-4 bg-card">
      <div className="max-w-4xl mx-auto text-center">
        <div
          className="mb-12"
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          <div
            className="mb-8 flex justify-center"
            data-aos="zoom-in"
            data-aos-delay="200"
            data-aos-duration="900"
          >
            <img
              src={illustrationSrc}
              loading="lazy"
              alt="Ilustrasi Walimatul Khitan"
              className="w-44 md:w-56 max-w-full rounded-3xl border border-accent/30 bg-white/80 p-3 shadow-gold"
            />
          </div>
          <BookOpen className="w-12 h-12 mx-auto mb-6 text-accent" />
          <div className="text-xl md:text-2xl italic text-muted-foreground mb-4 leading-relaxed">
            "Dan hendaklah kamu menikahkan orang-orang yang masih membujang di antara kamu,
            dan juga orang-orang yang layak dari hamba-hamba sahayamu yang laki-laki dan perempuan.
            Jika mereka miskin, Allah akan memberikan kemampuan kepada mereka dengan karunia-Nya."
          </div>
          <p className="text-accent font-semibold">QS. An-Nur: 32</p>
        </div>

        <div
          className="space-y-6"
          data-aos="fade-up"
          data-aos-delay="500"
          data-aos-duration="1000"
        >
          <p className="text-foreground/80 text-lg leading-relaxed">
            Assalamu'alaikum Warahmatullahi Wabarakatuh
          </p>
          <p className="text-foreground/80 text-lg leading-relaxed">
            Dengan memohon Rahmat dan Ridho Allah SWT, kami bermaksud mengundang
            Bapak/Ibu/Saudara/i untuk menghadiri acara Walimatul Khitan putra kami:
          </p>

          <div className="py-8">
            <h3 className="text-4xl md:text-5xl font-bold text-gradient-gold mb-2">
              Fahri Azzam Darmawan
            </h3>
            <p className="text-muted-foreground">
              Putra dari Bapak Benny Darmawan & Ibu Nuriyanni
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GreetingSection;
