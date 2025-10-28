import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Heart, Send, MessageCircle } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

type GreetingMessage = {
  id: string;
  name: string;
  message: string;
  submittedAt: string;
};

const KirimUcapanSection = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messagesList, setMessagesList] = useState<GreetingMessage[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const formatDateTime = (isoString: string) =>
    new Intl.DateTimeFormat("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(isoString));

  useEffect(() => {
    const fetchMessages = async () => {
      if (!supabase) {
        setErrorMessage(
          "Supabase belum dikonfigurasi. Tambahkan VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY untuk menampilkan ucapan."
        );
        return;
      }
      setIsLoadingMessages(true);
      setErrorMessage(null);
      const { data, error } = await supabase
        .from("greetings")
        .select("id, name, message, submitted_at")
        .order("submitted_at", { ascending: false });

      if (error) {
        console.error("Error fetching greetings:", error.message);
        setErrorMessage("Gagal memuat ucapan. Silakan coba beberapa saat lagi.");
        setMessagesList([]);
      } else if (data) {
        const normalized = data.map((item) => ({
          id: String(item.id),
          name: item.name,
          message: item.message,
          submittedAt: item.submitted_at,
        }));
        setMessagesList(normalized);
      }
      setIsLoadingMessages(false);
    };

    void fetchMessages();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !message.trim()) {
      console.warn("Nama atau pesan belum diisi.");
      return;
    }

    setIsSubmitting(true);

    if (!supabase) {
      console.error("Supabase belum dikonfigurasi. Ucapan tidak dapat dikirim.");
      setErrorMessage(
        "Supabase belum dikonfigurasi. Tambahkan VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY untuk mengirim ucapan."
      );
      setName("");
      setMessage("");
      setIsSubmitting(false);
      return;
    }

    const { data, error } = await supabase
      .from("greetings")
      .insert({
        name: name.trim(),
        message: message.trim(),
      })
      .select("id, name, message, submitted_at")
      .single();

    if (error) {
      console.error("Error saving greeting:", error.message);
      setErrorMessage("Gagal mengirim ucapan. Silakan coba beberapa saat lagi.");
    } else if (data) {
      const newMessage: GreetingMessage = {
        id: String(data.id),
        name: data.name,
        message: data.message,
        submittedAt: data.submitted_at,
      };

      setMessagesList((prev) => [newMessage, ...prev]);
      setName("");
      setMessage("");
      setErrorMessage(null);
    }

    setIsSubmitting(false);
  };

  return (
    <section className="relative py-20 px-4 bg-gradient-to-b from-card via-background to-card overflow-hidden">
      {/* Chandelier Background */}
      <div className="chandelier-bg" />
      
      <div className="max-w-3xl mx-auto relative z-10">
        <div
          data-aos="zoom-in"
          data-aos-duration="800"
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-gold rounded-full shadow-gold mb-6">
            <MessageCircle className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Kirim Ucapan
          </h2>
          <div className="w-24 h-1 bg-gradient-gold mx-auto mb-4" />
          <p className="text-muted-foreground text-lg">
            Berikan ucapan dan doa terbaik untuk Azzam
          </p>
        </div>

        <Card
          className="p-8 shadow-elegant border-accent/20 bg-card/90 backdrop-blur-sm"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="1000"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div
              data-aos="fade-right"
              data-aos-delay="300"
              data-aos-duration="800"
            >
              <label htmlFor="name" className="block text-sm font-semibold text-primary mb-2">
                Nama Anda
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Masukkan nama Anda"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-background/50 border-accent/30 focus:border-accent transition-all duration-300"
              />
            </div>

            <div
              data-aos="fade-left"
              data-aos-delay="400"
              data-aos-duration="800"
            >
              <label htmlFor="message" className="block text-sm font-semibold text-primary mb-2">
                Ucapan & Doa
              </label>
              <Textarea
                id="message"
                placeholder="Tuliskan ucapan dan doa Anda di sini..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                className="bg-background/50 border-accent/30 focus:border-accent transition-all duration-300 resize-none"
              />
            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="500"
              data-aos-duration="800"
              className="flex justify-center"
            >
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-gold hover:shadow-gold transition-all duration-300 text-primary font-semibold px-8 py-6 text-lg rounded-full group"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    Mengirim...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    Kirim Ucapan
                  </span>
                )}
              </Button>
            </div>
          </form>
        </Card>

        <div
          className="relative mt-12"
          data-aos="fade-up"
          data-aos-delay="600"
          data-aos-duration="800"
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-gold/10 blur-2xl" />
          <Card className="relative z-10 p-8 bg-card/95 backdrop-blur border-accent/10 shadow-elegant">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-accent">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary">
                  Doa & Ucapan untuk Azzam
                </h3>
                <p className="text-sm text-muted-foreground">
                  Terima kasih atas cinta dan dukungan yang diberikan.
                </p>
              </div>
            </div>

            <div className="space-y-6 max-h-[420px] overflow-y-auto pr-2">
              {isLoadingMessages && <p className="text-sm text-muted-foreground">Memuat ucapan...</p>}
              {errorMessage && !isLoadingMessages && (
                <p className="text-sm text-red-600">{errorMessage}</p>
              )}
              {!isLoadingMessages && !errorMessage && messagesList.length === 0 && (
                <p className="text-sm text-muted-foreground">Belum ada ucapan yang masuk.</p>
              )}
              {messagesList.map((item, index) => (
                <div
                  key={item.id}
                  className={`relative flex flex-col gap-2 rounded-2xl border border-accent/10 bg-background/70 p-5 shadow-sm shadow-accent/10 transition-all duration-300 ${
                    index % 2 === 0
                      ? "ml-0 mr-6 sm:mr-16"
                      : "mr-0 ml-6 sm:ml-16"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-primary">{item.name}</h4>
                    <span className="text-xs text-muted-foreground">
                      {formatDateTime(item.submittedAt)}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.message}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default KirimUcapanSection;
