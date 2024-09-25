"use client";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function CarouselShopSCK({
  children,
  deviceType
}: {
  children: React.ReactNode;
  deviceType:string
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
        deviceType={deviceType}
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={true}
        className=""
        containerClass="carousel-container"
        itemClass='carousel-image-item'
        dotListClass=""
        draggable
        focusOnSelect={true}
        infinite
        keyBoardControl
        minimumTouchDrag={20}
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
            items:1,
            partialVisibilityGutter:1,
          },
          mobile: {
            breakpoint: {
              max: 768,
              min: 320,
            },
            items: 1,
            // partialVisibilityGutter:10,
          },
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        sliderClass=""
        slidesToSlide={1}
        swipeable
        ssr={true}
      >
        {children}
      </Carousel>
    </div>
  );
}
