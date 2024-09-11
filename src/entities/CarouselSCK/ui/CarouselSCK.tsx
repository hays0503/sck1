import { Category } from "@/shared/types/category";
import Image from "next/image";
import React, { useRef, useState } from "react";
import Carousel, { StateCallBack } from "react-multi-carousel";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

export default function CarouselSCK({
  selectCategory,
  isMobile,
}: {
  selectCategory: Category;
  isMobile: boolean;
}) {
  const [background, setBackground] = useState(
    selectCategory.list_url_to_baner[0]
  );
  const CarouselRef = useRef(null);
  const imageSelector = useRef<number>(0);

  return (
    <div data-testid="carousel-sck" style={{ backgroundImage: `url(${background})`,height:"300px" }}>
      <div
        style={{
          paddingBottom: "30px",
          position: "relative",
          backdropFilter: "blur(10px)",
          height: "300px",
        }}
      >
        <Carousel
          beforeChange={
            (nextSlide: number, state: StateCallBack) => {
            if (nextSlide > state.currentSlide) {
              if (
                imageSelector.current + 1 ===
                selectCategory.list_url_to_baner.length
              ) {
                imageSelector.current = 0;
              } else {
                imageSelector.current = imageSelector.current + 1;
              }
            } else {
              if (imageSelector.current - 1 < 0) {
                imageSelector.current =
                  selectCategory.list_url_to_baner.length - 1;
              } else {
                imageSelector.current = imageSelector.current - 1;
              }
            }
            setBackground(
              selectCategory.list_url_to_baner[imageSelector.current]
            );
          }
        }
          ref={CarouselRef}
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
              items: 1,
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0,
              },
              items: 1,
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464,
              },
              items: 1,
            },
          }}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots
          sliderClass=""
          slidesToSlide={1}
          swipeable
        >
          {selectCategory.list_url_to_baner.map((item, index) => {
            return (
              <img
                src={item}
                key={index}
                alt={"banner"}
                style={{
                  cursor: "pointer",
                  display: "block",
                  margin: "auto",
                  height: "300px",
                  width: "100%",
                  objectFit: "scale-down",
                }}
              />
            );
          })}
        </Carousel>
      </div>
    </div>
  );
}
