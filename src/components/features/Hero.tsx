import { Link } from "react-router-dom";
import HeroSVG from "./HeroSVG";

function Hero() {
  return (
    <section className="min-h-[100vh]">
      <div className="flex flex-col lg:flex-row pt-26 lg:pt-0 lg:pl-20 font-montserrat lg:gap-20 justify-between min-h-[calc(100vh-5rem)] items-center">
        <div className="flex-1 relative z-20 space-y-2 px-10 text-center lg:text-left">
          <p className="text-dark-orange">Provide tailored pitch to users</p>
          <div className="space-y-8">
            <h2 className="font-montreal leading-snug">
              Transform your speaking skills with EngageX™
            </h2>
            <p className="big text-[#62717A]">
              Step into the future of public speaking, pitching, and
              presentations with EngageX™, a training platform designed to
              enhance your confidence, delivery, and audience engagement using
              cutting edge technology combined with AI and award-winning
              coaches.
            </p>
          </div>
          <Link to="/dashboard/user/">
            <button className="flex gap-2 mx-auto lg:mx-0 w-full lg:w-max py-4 px-6 items-center justify-center rounded-2xl relative top-10">
              <p>Get started</p>
              <svg
                width="15"
                height="18"
                className="h-6 w-7"
                viewBox="0 0 15 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.0243 6.32818C11.1897 6.32894 11.3481 6.39499 11.4651 6.51196C11.5821 6.62893 11.6481 6.78737 11.6489 6.95279L11.6489 12.8453C11.6518 12.9292 11.6379 13.0128 11.6078 13.0912C11.5778 13.1696 11.5322 13.2411 11.4739 13.3015C11.4156 13.3619 11.3458 13.4099 11.2685 13.4427C11.1913 13.4755 11.1082 13.4924 11.0243 13.4924C10.9403 13.4924 10.8573 13.4755 10.78 13.4427C10.7027 13.4099 10.6329 13.3619 10.5746 13.3015C10.5163 13.2411 10.4708 13.1696 10.4407 13.0912C10.4107 13.0128 10.3967 12.9292 10.3996 12.8453L10.3996 8.46128L4.39513 14.4658C4.27792 14.583 4.11895 14.6489 3.95319 14.6489C3.78743 14.6489 3.62846 14.583 3.51125 14.4658C3.39404 14.3486 3.32819 14.1896 3.32819 14.0239C3.32819 13.8581 3.39404 13.6991 3.51125 13.5819L9.51576 7.5774L5.1317 7.5774C4.96986 7.57169 4.81655 7.50338 4.70408 7.38687C4.59161 7.27035 4.52875 7.11473 4.52875 6.95279C4.52875 6.79085 4.59161 6.63523 4.70408 6.51871C4.81655 6.4022 4.96986 6.33389 5.1317 6.32818L11.0243 6.32818Z"
                  fill="white"
                />
              </svg>
            </button>
          </Link>
        </div>
        <HeroSVG />
      </div>
    </section>
  );
}

export default Hero;
