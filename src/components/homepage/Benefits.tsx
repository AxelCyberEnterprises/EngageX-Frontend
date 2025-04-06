import { Link } from "react-router-dom";

function Benefits() {
  return (
    <section className=" px-10 lg:px-20 py-28 gap-y-24 flex flex-col justify-center items-center">
      <div className="space-y-[24px] flex flex-col items-center">
        <div className="px-3 py-3 flex gap-2 items-center w-max border rounded-[6px] bg-white border-[#E1E5E7] mx-auto">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            className="h-4 w-4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.0714 3.63167C6.47007 2.46501 8.08207 2.42967 8.55474 3.52567L8.59474 3.63234L9.13274 5.20567C9.25603 5.5665 9.45527 5.89668 9.71702 6.17396C9.97877 6.45123 10.2969 6.66915 10.6501 6.81301L10.7947 6.86701L12.3681 7.40434C13.5347 7.80301 13.5701 9.41501 12.4747 9.88767L12.3681 9.92768L10.7947 10.4657C10.4338 10.5889 10.1035 10.7881 9.82608 11.0498C9.54869 11.3116 9.33067 11.6298 9.18674 11.983L9.13274 12.127L8.5954 13.701C8.19674 14.8677 6.58474 14.903 6.11274 13.8077L6.0714 13.701L5.53407 12.1277C5.41086 11.7667 5.21165 11.4364 4.9499 11.159C4.68814 10.8816 4.36993 10.6636 4.01674 10.5197L3.87274 10.4657L2.2994 9.92834C1.13207 9.52967 1.09674 7.91767 2.19274 7.44567L2.2994 7.40434L3.87274 6.86701C4.23356 6.74371 4.56374 6.54447 4.84102 6.28272C5.11829 6.02097 5.33621 5.7028 5.48007 5.34967L5.53407 5.20567L6.0714 3.63167ZM7.3334 4.06234L6.79607 5.63567C6.60833 6.18588 6.30292 6.68854 5.90109 7.10867C5.49927 7.5288 5.0107 7.85629 4.4694 8.06834L4.30274 8.12901L2.7294 8.66634L4.30274 9.20367C4.85294 9.39141 5.35561 9.69683 5.77573 10.0987C6.19586 10.5005 6.52335 10.989 6.7354 11.5303L6.79607 11.697L7.3334 13.2703L7.87074 11.697C8.05848 11.1468 8.36389 10.6441 8.76571 10.224C9.16753 9.80388 9.65611 9.47639 10.1974 9.26434L10.3641 9.20434L11.9374 8.66634L10.3641 8.12901C9.81387 7.94127 9.3112 7.63585 8.89107 7.23403C8.47094 6.83221 8.14345 6.34364 7.9314 5.80234L7.8714 5.63567L7.3334 4.06234ZM12.6667 1.33301C12.7915 1.33301 12.9137 1.36799 13.0195 1.43399C13.1253 1.49998 13.2105 1.59434 13.2654 1.70634L13.2974 1.78434L13.5307 2.46834L14.2154 2.70167C14.3404 2.74414 14.45 2.82275 14.5302 2.92755C14.6105 3.03235 14.6578 3.15862 14.6663 3.29036C14.6747 3.42209 14.6438 3.55336 14.5775 3.66753C14.5113 3.7817 14.4126 3.87363 14.2941 3.93167L14.2154 3.96367L13.5314 4.19701L13.2981 4.88167C13.2555 5.00663 13.1769 5.11614 13.072 5.19634C12.9672 5.27653 12.8409 5.3238 12.7092 5.33216C12.5774 5.34051 12.4462 5.30957 12.3321 5.24326C12.2179 5.17695 12.1261 5.07825 12.0681 4.95967L12.0361 4.88167L11.8027 4.19767L11.1181 3.96434C10.9931 3.92188 10.8835 3.84326 10.8033 3.73846C10.723 3.63366 10.6756 3.5074 10.6672 3.37566C10.6588 3.24393 10.6897 3.11265 10.7559 2.99848C10.8222 2.88431 10.9208 2.79238 11.0394 2.73434L11.1181 2.70234L11.8021 2.46901L12.0354 1.78434C12.0804 1.65262 12.1654 1.53828 12.2786 1.45734C12.3918 1.3764 12.5276 1.33292 12.6667 1.33301Z"
              fill="#4C5C75"
            />
          </svg>
          <p className="small font-montserrat">BENEFITS</p>
        </div>

        <div className="lg:w-[55%] text-center mx-auto space-y-4 flex flex-col items-center">
          <h4 className="h-max font-montreal leading-snug">
            What's in it for you?
          </h4>
          <p className="text-dark-electric-blue leading-normal">
            Track progress, receive actionable feedback, and captivate your
            audience like never before.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full lg:w-[90%] mx-auto">
        <div className="flex gap-x-10 w-full border border-[#EBF1FF] items-center py-8 px-9 rounded-2xl bg-[#EBF1FF]">
          <div className="p-3 flex items-center justify-center rounded-full bg-gunmetal">
            <svg
              width="16"
              height="15"
              className="h-5 w-5"
              viewBox="0 0 16 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_401_744)">
                <path
                  d="M10.334 5V3.125L12.209 1.25L12.834 2.5L14.084 3.125L12.209 5H10.334ZM10.334 5L7.83397 7.49997M14.084 7.5C14.084 10.9518 11.2858 13.75 7.83398 13.75C4.3822 13.75 1.58398 10.9518 1.58398 7.5C1.58398 4.04822 4.3822 1.25 7.83398 1.25M10.959 7.5C10.959 9.22589 9.55987 10.625 7.83398 10.625C6.10809 10.625 4.70898 9.22589 4.70898 7.5C4.70898 5.77411 6.10809 4.375 7.83398 4.375"
                  stroke="white"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_401_744">
                  <rect
                    width="15"
                    height="15"
                    fill="white"
                    transform="translate(0.333984)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="space-y-4">
            <h6 className=" font-montreal">Confidence & mastery</h6>
            <p className="text-dark-electric-blue">
              Perfect your tone, pace, and delivery through personalized
              feedback
            </p>
          </div>
        </div>
        <div className="flex gap-x-10 w-full border border-[#EBF1FF] items-center py-8 px-9 rounded-2xl bg-[#EBF1FF]">
          <div className="p-3 flex items-center justify-center rounded-full bg-gunmetal">
            <svg
              width="16"
              height="15"
              className="h-5 w-5"
              viewBox="0 0 16 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.459 13.125H3.20898C2.85895 13.125 2.68394 13.125 2.55024 13.0569C2.43264 12.997 2.33703 12.9013 2.27711 12.7837C2.20898 12.65 2.20898 12.475 2.20898 12.125V1.875M13.459 4.375L10.0625 7.77145C9.93878 7.8952 9.8769 7.95708 9.80555 7.98026C9.74279 8.00066 9.67518 8.00066 9.61242 7.98026C9.54106 7.95708 9.47919 7.8952 9.35543 7.77145L8.18754 6.60355C8.06378 6.4798 8.0019 6.41792 7.93055 6.39474C7.86779 6.37434 7.80018 6.37434 7.73742 6.39474C7.66606 6.41792 7.60419 6.4798 7.48043 6.60355L4.70898 9.375M13.459 4.375H10.959M13.459 4.375V6.875"
                stroke="white"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="space-y-4">
            <h6 className=" font-montreal">Real-time insights</h6>
            <p className="text-dark-electric-blue">
              Get immediate feedback on audience engagement and sentiment
            </p>
          </div>
        </div>
        <div className="flex gap-x-10 w-full border border-[#EBF1FF] items-center py-8 px-9 rounded-2xl bg-[#EBF1FF]">
          <div className="p-3 flex items-center justify-center rounded-full bg-gunmetal">
            <svg
              width="16"
              height="15"
              className="h-5 w-5"
              viewBox="0 0 16 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_577_1405)">
                <path
                  d="M7.83398 1.25V1.875M2.20898 7.5H1.58398M3.77148 3.4375L3.39642 3.06244M11.8965 3.4375L12.2716 3.06244M14.084 7.5H13.459M6.58398 8.4375H9.08398M7.83398 8.4375V11.5625M10.0215 10.5462C10.9678 9.86548 11.584 8.7547 11.584 7.5C11.584 5.42893 9.90505 3.75 7.83398 3.75C5.76292 3.75 4.08398 5.42893 4.08398 7.5C4.08398 8.7547 4.70019 9.86548 5.64648 10.5462V11.75C5.64648 12.4501 5.64648 12.8001 5.78273 13.0675C5.90257 13.3027 6.09379 13.4939 6.329 13.6138C6.59639 13.75 6.94642 13.75 7.64648 13.75H8.02148C8.72155 13.75 9.07158 13.75 9.33897 13.6138C9.57418 13.4939 9.7654 13.3027 9.88524 13.0675C10.0215 12.8001 10.0215 12.4501 10.0215 11.75V10.5462Z"
                  stroke="white"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_577_1405">
                  <rect
                    width="15"
                    height="15"
                    fill="white"
                    transform="translate(0.333984)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="space-y-4">
            <h6 className=" font-montreal">Comprehensive analytics</h6>
            <p className="text-dark-electric-blue">
              Track your progress with detailed session reports and playback
              features
            </p>
          </div>
        </div>
        <div className="flex gap-x-10 w-full border border-[#EBF1FF] items-center py-8 px-9 rounded-2xl bg-[#EBF1FF]">
          <div className="p-3 flex items-center justify-center rounded-full bg-gunmetal">
            <svg
              className="size-5"
              width="16"
              height="15"
              viewBox="0 0 16 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_1208_3902)">
                <path
                  d="M10.3333 3.125L11.5833 4.375L14.0833 1.875M14.0833 7.5V10.75C14.0833 11.8001 14.0833 12.3251 13.8789 12.7262C13.6991 13.079 13.4123 13.3659 13.0595 13.5456C12.6584 13.75 12.1334 13.75 11.0833 13.75H4.58325C3.53315 13.75 3.0081 13.75 2.60702 13.5456C2.25422 13.3659 1.96738 13.079 1.78761 12.7262C1.58325 12.3251 1.58325 11.8001 1.58325 10.75V4.25C1.58325 3.1999 1.58325 2.67485 1.78761 2.27377C1.96738 1.92096 2.25422 1.63413 2.60702 1.45436C3.0081 1.25 3.53315 1.25 4.58325 1.25H7.83325M1.67419 12.4539C1.96741 11.3991 2.93485 10.625 4.08311 10.625H8.45811C9.03893 10.625 9.32934 10.625 9.57083 10.673C10.5626 10.8703 11.3378 11.6455 11.5351 12.6373C11.5831 12.8788 11.5831 13.1692 11.5831 13.75M9.08325 5.9375C9.08325 7.31821 7.96396 8.4375 6.58325 8.4375C5.20254 8.4375 4.08325 7.31821 4.08325 5.9375C4.08325 4.55679 5.20254 3.4375 6.58325 3.4375C7.96396 3.4375 9.08325 4.55679 9.08325 5.9375Z"
                  stroke="white"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_1208_3902">
                  <rect
                    width="15"
                    height="15"
                    fill="white"
                    transform="translate(0.333252)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="space-y-4">
            <h6 className=" font-montreal"> Goal-oriented practice</h6>
            <p className="text-dark-electric-blue">
              Set milestones, achieve badges, and grow your speaking skills
              systematically
            </p>
          </div>
        </div>
        <div className="flex gap-x-10 w-full border border-[#EBF1FF] items-center py-8 px-9 rounded-2xl bg-[#EBF1FF]">
          <div className="p-3 flex items-center justify-center rounded-full bg-gunmetal">
            <svg
              className="h-5 w-5"
              width="16"
              height="15"
              viewBox="0 0 16 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_2078_14170)">
                <path
                  d="M12.2083 6.25V2.5M10.3333 4.375H14.0833M10.3333 13.125V12.375C10.3333 11.3249 10.3333 10.7999 10.1289 10.3988C9.94913 10.046 9.66229 9.75913 9.30948 9.57936C8.9084 9.375 8.38335 9.375 7.33325 9.375H4.58325C3.53315 9.375 3.0081 9.375 2.60702 9.57936C2.25422 9.75913 1.96738 10.046 1.78761 10.3988C1.58325 10.7999 1.58325 11.3249 1.58325 12.375V13.125M8.14575 4.6875C8.14575 5.89562 7.16637 6.875 5.95825 6.875C4.75013 6.875 3.77075 5.89562 3.77075 4.6875C3.77075 3.47938 4.75013 2.5 5.95825 2.5C7.16637 2.5 8.14575 3.47938 8.14575 4.6875Z"
                  stroke="white"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_2078_14170">
                  <rect
                    width="15"
                    height="15"
                    fill="white"
                    transform="translate(0.333252)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="space-y-4">
            <h6 className=" font-montreal">Support of a certified coach.</h6>
            <p className="text-dark-electric-blue">
              We give you access to Distinguished Toastmasters (DTM) and ICF
              certified coaches to help aid your growth
            </p>
          </div>
        </div>
        <div className="flex gap-x-10 w-full border border-[#EBF1FF] items-center py-8 px-9 rounded-2xl bg-[#EBF1FF]">
          <div className="p-3 flex items-center justify-center rounded-full bg-gunmetal">
            <svg
              className="size-5"
              width="16"
              height="15"
              viewBox="0 0 16 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_2078_14167)">
                <path
                  d="M14.0833 7.5H11.5833L9.70825 13.125L5.95825 1.875L4.08325 7.5H1.58325"
                  stroke="white"
                  stroke-width="1.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_2078_14167">
                  <rect
                    width="15"
                    height="15"
                    fill="white"
                    transform="translate(0.333252)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="space-y-4">
            <h6 className=" font-montreal">
              Session improvement functionality
            </h6>
            <p className="text-dark-electric-blue">
              Seamlessly improve on the exact same speaking exercise you worked
              on in the past
            </p>
          </div>
        </div>
      </div>

      <div className="relative flex justify-center w-full">
        <Link to="/features">
          <button className="flex gap-2 mx-auto lg:mx-0 w-full lg:w-max py-4 px-6 items-center justify-center rounded-lg">
            <p>Learn more</p>
            <svg
              width="15"
              height="18"
              viewBox="0 0 15 18"
              className="h-6 w-7"
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
    </section>
  );
}

export default Benefits;
