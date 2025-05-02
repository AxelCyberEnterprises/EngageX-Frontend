import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="flex flex-col lg:flex-row px-10 lg:px-20 pt-22 lg:space-x-[5rem]">
      <div className="flex-1 space-y-5">
        <div className="flex gap-4 bg-[#8FA7DF1A] w-max pl-2 pr-6 py-3 rounded-full items-center mx-auto lg:mx-0">
          <div className="flex">
            <img
              src="./assets/profile1.png"
              alt="profile"
              className="size-[28.82px] lg:size-8 rounded-full"
            />
            <img
              src="./assets/profile2.png"
              alt="profile"
              className="size-[28.82px] lg:size-8 rounded-full -ml-3"
            />
            <img
              src="./assets/profile3.png"
              alt="profile"
              className="size-[28.82px] lg:size-8 rounded-full -ml-3"
            />
          </div>
          <p className="">
            Over <span className="font-semibold">+2k</span> Careers Impacted
          </p>
        </div>
        <h1 className="font-montreal text-center lg:text-left ">
          Elevate your speaking skills with our immersive virtual practice
          platform
        </h1>
        <p className="big text-dark-electric-blue font-light text-center lg:text-left">
          Prepare, persuade, perfect, and present with confidence in a realistic
          AI-powered environment. Our web-based, mobile-friendly platform and
          ios app are built for sales professionals, entrepreneurs, athletes,
          and corporate leaders. Designed to sharpen communication, captivate
          audiences, and elevate influence. The platform features a hybrid
          coaching model that combines AI technology with insights from
          certified coaches, delivering expert guidance that goes beyond
          peer-based feedback.
        </p>
        <Link to="/dashboard/user/">
          <button className="flex gap-4 mt-10 mx-auto lg:mx-0 w-full lg:w-max py-3 px-8 items-center justify-center rounded-lg">
            <p>Get started</p>
            <svg
              width="15"
              height="18"
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

      <div className="mx-auto flex-1 w-full lg:w-[50%] flex flex-col items-end relative h-[50rem]">
        <div className="flex gap-2 w-full h-max lg:h-full lg:gap-6 mt-16">
          <div className="w-1/2 rounded-2xl overflow-clip relative h-[9.8rem] lg:h-[20rem]">
            <img
              src="./assets/hero1.png"
              className="w-full object-cover h-full absolute"
            />
          </div>
          <div className="w-1/2 rounded-2xl overflow-clip h-[12.5rem] lg:h-[24.5rem] relative">
            <img
              src="./assets/hero2.png"
              className="w-full object-cover h-full absolute"
            />
          </div>
        </div>
        <div className="w-full flex relative h-[17rem] lg:h-min justify-center">
          {/* <HeroSVG /> */}
          <img
            src="./assets/homepathimg.png"
            className="absolute w-[40rem] bottom-[9.7rem] lg:bottom-[9.5rem] mr-16"
            alt=""
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
