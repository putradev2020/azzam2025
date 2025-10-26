import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

const CountdownSection = () => {
  const targetDate = new Date("2025-11-23T09:30:00").getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const timeUnits = [
    { label: "Hari", value: timeLeft.days },
    { label: "Jam", value: timeLeft.hours },
    { label: "Menit", value: timeLeft.minutes },
    { label: "Detik", value: timeLeft.seconds },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-primary/5 py-24 px-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-24 bg-gradient-to-r from-accent/25 to-transparent md:block" />
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-24 bg-gradient-to-l from-accent/25 to-transparent md:block" />

      <div className="relative mx-auto max-w-4xl text-center" data-aos="fade-up" data-aos-duration="900">
        <div className="mb-8 inline-flex items-center rounded-full bg-accent/15 px-6 py-3 text-sm font-semibold tracking-wide text-accent">
          Hitung Mundur Acara
        </div>

        <h2 className="font-serif text-4xl font-bold text-primary md:text-5xl">
          Walimatul Khitan
        </h2>
        <p className="mt-3 text-2xl font-semibold text-accent md:text-3xl">
          Fahri Azzam Darmawan
        </p>
        <p className="mt-2 text-base uppercase tracking-[0.35em] text-muted-foreground">
          Minggu, 23 November 2025
        </p>

        <div
          className="relative mx-auto mt-12 flex max-w-3xl flex-nowrap items-center justify-start gap-4 overflow-x-auto px-2 pb-2 md:flex-wrap md:justify-center md:overflow-visible"
          data-aos="zoom-in"
          data-aos-delay="250"
        >
          {timeUnits.map((unit, index) => (
            <Card
              key={index}
              className="flex h-28 w-28 flex-col items-center justify-center rounded-3xl border-accent/40 bg-gradient-to-b from-accent/90 to-accent/80 text-primary shadow-xl shadow-accent/30 transition-transform duration-300 hover:-translate-y-1 md:h-36 md:w-36"
            >
              <span className="text-4xl font-bold tracking-wide md:text-5xl">
                {unit.value.toString().padStart(2, "0")}
              </span>
              <span className="mt-2 text-xs font-medium uppercase tracking-[0.4em] text-primary/80">
                {unit.label}
              </span>
            </Card>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-2xl space-y-4 rounded-3xl border border-accent/20 bg-card/80 p-8 text-muted-foreground shadow-lg shadow-primary/10 backdrop-blur">
          <p className="font-serif text-lg text-primary">
            Bismillahirrahmanirrahim
          </p>
          <p className="text-sm md:text-base">
            Assalamu'alaikum Warahmatullahi Wabarakatuh. Dengan memohon rahmat dan ridho Allah SWT, kami sekeluarga mengundang Bapak/Ibu/Saudara/i untuk hadir dalam acara Walimatul Khitan putra kami tercinta.
          </p>
          <p className="text-sm md:text-base">
            Kehadiran serta doa restu dari Bapak/Ibu/Saudara/i sekalian akan menjadi kebahagiaan dan kehormatan bagi kami.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CountdownSection;
