import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Button } from "@/components/ui/button";
import AOS from "aos";
import "aos/dist/aos.css";
import HeroSection from "@/components/HeroSection";
import GreetingSection from "@/components/GreetingSection";
import EventDetailsSection from "@/components/EventDetailsSection";
import SusunanAcaraSection from "@/components/SusunanAcaraSection";
import GallerySection from "@/components/GallerySection";
import CountdownSection from "@/components/CountdownSection";
import TurutMengundangSection from "@/components/TurutMengundangSection";
import RSVPSection from "@/components/RSVPSection";
import KirimUcapanSection from "@/components/KirimUcapanSection";
import ClosingSection from "@/components/ClosingSection";

const Index = () => {
  const [isInvitationOpened, setIsInvitationOpened] = useState(false);
  const [isOpeningPopupVisible, setIsOpeningPopupVisible] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrl = `${import.meta.env.BASE_URL}lagu.mp3`;

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out",
    });
  }, []);

  useEffect(() => {
    const audio = new Audio(audioUrl);
    audio.loop = true;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const playAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    void audio.play().catch(() => {
      setIsAudioPlaying(false);
    });
  };

  const handleToggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isAudioPlaying) {
      audio.pause();
      setIsAudioPlaying(false);
    } else {
      playAudio();
      setIsAudioPlaying(true);
    }
  };

  const handleOpenInvitation = () => {
    playAudio();
    setIsOpeningPopupVisible(true);
  };

  const handlePopupFinish = () => {
    setIsInvitationOpened(true);
    setIsOpeningPopupVisible(false);
    setTimeout(() => {
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }, 150);
  };

  return (
    <div className="bg-background">
      {isOpeningPopupVisible && <InvitationOpeningPopup onFinish={handlePopupFinish} />}
      
      <div className="relative min-h-screen">
        <HeroSection
          onOpen={handleOpenInvitation}
          isAudioPlaying={isAudioPlaying}
          onToggleAudio={handleToggleAudio}
        />

        {isInvitationOpened && (
          <>
            <GreetingSection />
            <EventDetailsSection />
            <SusunanAcaraSection />
            <GallerySection />
            <CountdownSection />
            <TurutMengundangSection />
            <RSVPSection />
            <KirimUcapanSection />
            <ClosingSection />
          </>
        )}
      </div>
    </div>
  );
};

export default Index;

interface InvitationOpeningPopupProps {
  onFinish: () => void;
}

const InvitationOpeningPopup = ({ onFinish }: InvitationOpeningPopupProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsVisible(true), 20);
    return () => window.clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    setIsVisible(false);
    window.setTimeout(() => {
      onFinish();
    }, 450);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-primary/40 backdrop-blur-md transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div
        className={`relative mx-4 w-full max-w-3xl overflow-hidden rounded-[2.5rem] border border-white/15 bg-card/90 p-10 text-center shadow-2xl shadow-primary/20 backdrop-blur-xl transition-all duration-500 ${isVisible ? "translate-y-0 scale-100 opacity-100" : "translate-y-6 scale-95 opacity-0"}`}
      >
        <div className="mb-6">
          <span className="inline-flex items-center justify-center rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
            Walimatul Khitan
          </span>
        </div>
        <h2 className="mb-4 text-3xl font-semibold text-primary">Assalamu'alaikum Warahmatullahi Wabarakatuh</h2>
        <p className="mx-auto mb-8 max-w-2xl text-base text-muted-foreground">
          Dengan penuh rasa syukur, kami mengundang Saudara/i untuk hadir dalam acara Walimatul Khitan putra kami.
        </p>
        <Button
          onClick={handleContinue}
          size="lg"
          className="bg-gradient-gold px-10 py-6 text-lg font-semibold text-primary hover:shadow-gold"
        >
          Lihat Undangan
        </Button>
      </div>
    </div>
  );
};
