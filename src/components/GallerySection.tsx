import { Card } from "@/components/ui/card";

const GallerySection = () => {
  const baseUrl = import.meta.env.BASE_URL;
  const photos = [
    {
      id: 1,
      src: `${baseUrl}img/2.jpeg`,
      alt: "Momen kebersamaan keluarga",
      delay: 0,
      direction: "zoom-in",
    },
    {
      id: 2,
      src: `${baseUrl}img/3.jpeg`,
      alt: "Kebersamaan Keluarga di Rumah Sunat Gibran",
      delay: 200,
      direction: "fade-right",
    },
    {
      id: 3,
      src: `${baseUrl}img/4.jpeg`,
      alt: "Suasana tamu undangan walimatul khitan",
      delay: 400,
      direction: "fade-left",
    },
  ];

  return (
    <section className="py-20 px-4 bg-card">
      <div className="max-w-6xl mx-auto">
        <h2 
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-primary"
          data-aos="fade-up"
        >
          Galeri Foto
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <Card
              key={photo.id}
              className="relative overflow-hidden rounded-3xl shadow-elegant hover:shadow-gold transition-all duration-500 group"
              data-aos={photo.direction}
              data-aos-delay={photo.delay}
              data-aos-duration="1000"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/10 to-transparent opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-4 right-4 text-primary-foreground font-medium text-sm md:text-base opacity-100 group-hover:opacity-100 transition-opacity duration-500">
                {photo.alt}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
