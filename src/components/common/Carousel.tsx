import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

type CarouselProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
};

const Carousel = <T extends { id: string | number }>({
  items,
  renderItem,
}: CarouselProps<T>) => {
  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      spaceBetween={20}
      slidesPerView={1}
      navigation
      autoplay={{
        delay: 3000,
        disableOnInteraction: true,
      }}
      breakpoints={{
        641: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1280: { slidesPerView: 4 },
        1620: { slidesPerView: 5 },
        2048: { slidesPerView: 6 },
        2560: { slidesPerView: 7 },
        3840: { slidesPerView: 8 },
      }}
    >
      {items.map((item) => (
        <SwiperSlide key={item.id}>{renderItem(item)}</SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
