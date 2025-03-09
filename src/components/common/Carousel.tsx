import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

type CarouselProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
};

const Carousel = <T extends { id: string | number }>({
  items,
  renderItem,
}: CarouselProps<T>) => {
  const [isNavigationEnabled, setIsNavigationEnabled] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsNavigationEnabled(width > 640);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={20}
      slidesPerView={1}
      pagination={isNavigationEnabled ? false : { clickable: true }}
      navigation={isNavigationEnabled ? true : false}
      breakpoints={{
        641: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1280: { slidesPerView: 4 },
        1620: { slidesPerView: 5 },
        2048: { slidesPerView: 6 },
        2560: { slidesPerView: 7 },
        3840: { slidesPerView: 8 },
      }}
      style={{ paddingBottom: '36px' }}
    >
      {items.map((item) => (
        <SwiperSlide key={item.id}>{renderItem(item)}</SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
