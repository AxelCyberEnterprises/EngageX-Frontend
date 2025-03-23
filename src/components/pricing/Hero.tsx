import Navbar from "../Navbar";

function Hero() {
  return (
    <section className="h-max lg:min-h-[100vh] relative">
      <Navbar />
      <div className="space-y-10 flex h-full lg:min-h-[calc(100vh-5rem)] flex-col font-montserrat">
        <svg
          width="1439"
          height="581"
          className="h-full min-h-[calc(100vh-5rem)] w-full"
          viewBox="0 0 1439 581"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_f_1151_3939)">
            <ellipse cx="720.5" cy="290" rx="529.5" ry="331" fill="#EFF6FC" />
          </g>
          <defs>
            <filter
              id="filter0_f_1151_3939"
              x="-9"
              y="-241"
              width="1459"
              height="1062"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="100"
                result="effect1_foregroundBlur_1151_3939"
              />
            </filter>
          </defs>
        </svg>

        <div className="absolute w-full gap-y-20 flex flex-col items-center mt-[10rem]">
          <div>
            <p className="big mx-auto text-center text-dark-orange">
              Tailored price for our users
            </p>

            <div className="lg:w-[50%] text-center mx-auto space-y-4 flex flex-col items-center">
              <h1 className="h-max font-montreal leading-snug">
                Become a better speaker <br /> with our tailored plans
              </h1>
              <p className="big">
                Our plans ensure flexibility and affordability, making sure you
                get the best Value for your specific Speech improvement needs
              </p>
            </div>
          </div>

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
              Over <span className="font-semibold">+2k</span> careers impacted
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
