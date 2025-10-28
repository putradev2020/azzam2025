import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Heart, Send, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";

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
  const [validationErrors, setValidationErrors] = useState<{ name?: string; message?: string }>({});
  const { toast } = useToast();

  const greetingSchema = z.object({
    name: z.string().trim().min(2, "Nama minimal 2 karakter").max(100, "Nama maksimal 100 karakter"),
    message: z.string().trim().min(10, "Ucapan minimal 10 karakter").max(500, "Ucapan maksimal 500 karakter")
  });

  const formatDateTime = (isoString: string) =>
    new Intl.DateTimeFormat("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(isoString));

  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoadingMessages(true);
      try {
        const { data, error } = await supabase
          .from("greetings")
          .select("id, name, message, submitted_at")
          .order("submitted_at", { ascending: false });

        if (error) {
          console.error("Error fetching greetings:", error.message);
          toast({
            title: "Gagal memuat ucapan",
            description: "Silakan refresh halaman untuk mencoba lagi.",
            variant: "destructive",
          });
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
      } catch (error) {
        console.error("Error:", error);
        toast({
          title: "Terjadi kesalahan",
          description: "Gagal memuat ucapan.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingMessages(false);
      }
    };

    void fetchMessages();

    // Setup realtime subscription
    const channel = supabase
      .channel("greetings-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "greetings",
        },
        (payload) => {
          const newMessage: GreetingMessage = {
            id: String(payload.new.id),
            name: payload.new.name,
            message: payload.new.message,
            submittedAt: payload.new.submitted_at,
          };
          setMessagesList((prev) => [newMessage, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous validation errors
    setValidationErrors({});

    // Validate input
    const validation = greetingSchema.safeParse({
      name: name.trim(),
      message: message.trim(),
    });

    if (!validation.success) {
      const errors: { name?: string; message?: string } = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0] === "name") errors.name = err.message;
        if (err.path[0] === "message") errors.message = err.message;
      });
      setValidationErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
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
        toast({
          title: "Gagal mengirim ucapan",
          description: "Silakan coba beberapa saat lagi.",
          variant: "destructive",
        });
      } else if (data) {
        setName("");
        setMessage("");
        toast({
          title: "Ucapan terkirim!",
          description: "Terima kasih atas ucapan dan doa Anda.",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Terjadi kesalahan",
        description: "Gagal mengirim ucapan.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
                onChange={(e) => {
                  setName(e.target.value);
                  if (validationErrors.name) {
                    setValidationErrors((prev) => ({ ...prev, name: undefined }));
                  }
                }}
                className={`bg-background/50 border-accent/30 focus:border-accent transition-all duration-300 ${
                  validationErrors.name ? "border-red-500" : ""
                }`}
              />
              {validationErrors.name && (
                <p className="text-sm text-red-500 mt-1">{validationErrors.name}</p>
              )}
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
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (validationErrors.message) {
                    setValidationErrors((prev) => ({ ...prev, message: undefined }));
                  }
                }}
                rows={5}
                className={`bg-background/50 border-accent/30 focus:border-accent transition-all duration-300 resize-none ${
                  validationErrors.message ? "border-red-500" : ""
                }`}
              />
              {validationErrors.message && (
                <p className="text-sm text-red-500 mt-1">{validationErrors.message}</p>
              )}
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
              {isLoadingMessages && (
                <div className="flex items-center justify-center py-8">
                  <div className="w-8 h-8 border-4 border-accent/30 border-t-accent rounded-full animate-spin" />
                </div>
              )}
              {!isLoadingMessages && messagesList.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-8">Belum ada ucapan yang masuk. Jadilah yang pertama!</p>
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
