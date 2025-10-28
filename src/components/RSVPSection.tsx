import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Gift, Send, Copy, Check } from "lucide-react";

const RSVPSection = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [attendance, setAttendance] = useState<"yes" | "no" | null>(null);
  const [copied, setCopied] = useState(false);

  const bankAccount = "1234567890"; // Replace with actual account number
  const bankName = "Bank Mandiri a.n. [Nama Pemegang Rekening]";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !attendance) {
      toast({
        title: "Mohon lengkapi form",
        description: "Nama dan konfirmasi kehadiran harus diisi",
        variant: "destructive",
      });
      return;
    }

    // In production, this would send data to backend
    toast({
      title: "Terima kasih!",
      description: "Konfirmasi kehadiran Anda telah kami terima",
    });

    setName("");
    setMessage("");
    setAttendance(null);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(bankAccount);
    setCopied(true);
    toast({
      title: "Berhasil disalin!",
      description: "Nomor rekening telah disalin ke clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <h2 
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-primary"
          data-aos="fade-up"
        >
          RSVP & Hadiah
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* RSVP Form */}
          <Card 
            className="p-8 shadow-elegant"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h3 className="text-2xl font-semibold mb-6 text-primary">
              Konfirmasi Kehadiran
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  placeholder="Nama Anda"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-accent/30 focus:border-accent"
                />
              </div>

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant={attendance === "yes" ? "default" : "outline"}
                  onClick={() => setAttendance("yes")}
                  className={attendance === "yes" ? "bg-gradient-gold" : "border-accent/30"}
                >
                  Hadir
                </Button>
                <Button
                  type="button"
                  variant={attendance === "no" ? "default" : "outline"}
                  onClick={() => setAttendance("no")}
                  className={attendance === "no" ? "bg-gradient-gold" : "border-accent/30"}
                >
                  Tidak Hadir
                </Button>
              </div>

              <Textarea
                placeholder="Pesan & Doa (Opsional)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="border-accent/30 focus:border-accent resize-none"
              />

              <Button 
                type="submit" 
                className="w-full bg-gradient-gold hover:shadow-gold"
              >
                <Send className="w-4 h-4 mr-2" />
                Kirim Konfirmasi
              </Button>
            </form>
          </Card>

          {/* Gift Info */}
          <Card 
            className="p-8 shadow-elegant"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div className="flex items-center gap-3 mb-6">
              <Gift className="w-8 h-8 text-accent" />
              <h3 className="text-2xl font-semibold text-primary">
                Kirim Hadiah
              </h3>
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              Doa restu Anda merupakan karunia yang sangat berarti bagi kami.
              Namun jika memberi adalah ungkapan tanda kasih, Anda dapat memberikan
              kado secara cashless melalui:
            </p>

            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-6 border border-accent/20">
              <p className="text-sm text-muted-foreground mb-2">Nomor Rekening</p>
              <p className="font-semibold text-lg text-primary mb-1">{bankAccount}</p>
              <p className="text-sm text-muted-foreground mb-4">{bankName}</p>
              
              <Button
                onClick={copyToClipboard}
                variant="outline"
                className="w-full border-accent/30 hover:bg-accent/10"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2 text-green-600" />
                    Tersalin!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Salin Nomor Rekening
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default RSVPSection;
