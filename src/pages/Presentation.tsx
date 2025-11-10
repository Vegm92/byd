import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/keyboard";

const Presentation = () => {
  const swiperRef = useRef<any>(null);

  // Slides data - using the BYD-convoy-presentation images
  const slides = [
    "/images/byd-convoy-presentation/Diapositiva1.PNG",
    "/images/byd-convoy-presentation/Diapositiva2.PNG",
    "/images/byd-convoy-presentation/Diapositiva3.PNG",
    "/images/byd-convoy-presentation/Diapositiva4.PNG",
    "/images/byd-convoy-presentation/Diapositiva5.PNG",
    "/images/byd-convoy-presentation/Diapositiva6.PNG",
    "/images/byd-convoy-presentation/Diapositiva7.PNG",
  ];

  useEffect(() => {
    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (swiperRef.current) {
        if (e.key === "ArrowLeft") {
          swiperRef.current.slidePrev();
        } else if (e.key === "ArrowRight") {
          swiperRef.current.slideNext();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="w-full h-screen bg-black">
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Keyboard]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        keyboard={{ enabled: true }}
        className="h-full"
        onSwiper={(swiper) => (swiperRef.current = swiper)}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="flex items-center justify-center h-full">
              <img
                src={slide}
                alt={`Slide ${index + 1}`}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Presentation;
