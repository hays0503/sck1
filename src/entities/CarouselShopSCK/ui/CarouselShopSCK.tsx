"use client";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function CarouselShopSCK({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        cursor:"grab",        
        position: "relative",
        height: "100%",
        width: "100%",
      }}
    >
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        className=""
        containerClass="container"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 4,
            partialVisibilityGutter:40,
            slidesToSlide:2
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 768,
            },
            items: 2,
            partialVisibilityGutter:40,
          },
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        sliderClass=""
        slidesToSlide={1}
        swipeable
        ssr
      >
        {children}
      </Carousel>
    </div>
  );
}
