import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Pagination, SwiperOptions } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import Images
import Slider1 from "../static/img/slide-1.png";
import Slider2 from "../static/img/slide-2.png";
import Slider3 from "../static/img/slide-3.png";
import Slider4 from "../static/img/slide-4.png";
import ArrowForward from "../static/img/button-circle.png";
import "../styles/Onboarding.css";
import { useNavigate } from "react-router-dom";
import { AnySoaRecord } from "dns";

const Onboarding = () => {
  let navigate = useNavigate();
  const [my_swiper, set_my_swiper] = useState<any>({});
  const swiper = useSwiper();

  // switch (key) {
  //   case value:
  //     break;

  //   default:
  //     break;
  // }
  // useEffect(() => {});

  return (
    <div className="background-onboarding">
      <div className="app-container onboarding">
        <div className="onboarding__buttons">
          <button className="onboarding__btn onboarding__btn--active">
            Ру
          </button>
          <button className="onboarding__btn">Каз</button>
          <button
            className="onboarding__btn onboarding__btn--pass"
            onClick={() => navigate("/policy", { replace: true })}
          >
            Пропустить
          </button>
        </div>

        <div className="app-slider">
          <Swiper
            onInit={(ev) => {
              set_my_swiper(ev);
            }}
            slidesPerView={"auto"}
            centeredSlides={true}
            spaceBetween={0}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            <SwiperSlide>
              <img src={Slider1} alt="slide" className="onboarding__img" />
              <h1 className="onboarding__title">
                Здесь Вы сможете получить информацию о своём репродуктивном
                потенциале
              </h1>
            </SwiperSlide>
            <SwiperSlide>
              <img src={Slider2} alt="slide" className="onboarding__img" />
              <h1 className="onboarding__title">
                Оценить свои возможности или наличие рисков
              </h1>
            </SwiperSlide>
            <SwiperSlide>
              <img src={Slider3} alt="slide" className="onboarding__img" />
              <h1 className="onboarding__title">
                Пройти диагностику бесплодия в паре
              </h1>
            </SwiperSlide>
            <SwiperSlide>
              <img src={Slider4} alt="slide" className="onboarding__img" />
              <h1 className="onboarding__title">
                Пополнить знания в области репродуктивного здоровья
              </h1>
            </SwiperSlide>
          </Swiper>
        </div>

        <button
          className="onboarding__forward"
          onClick={() => {
            if (my_swiper.isEnd) {
              navigate("/policy", { replace: true });
            } else {
              my_swiper.slideNext();
            }
          }}
        >
          <img src={ArrowForward} alt="arrow" />
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
