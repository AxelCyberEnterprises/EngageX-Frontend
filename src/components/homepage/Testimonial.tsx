import { JSX } from "react";
import TestimonialSVG from "./svgs/TestimonialSVG";
import TestimonialSVG2 from "./svgs/TestimonialSVG2";
import TestimonialSVG3 from "./svgs/TestimonialSVG3";
import { Link } from "react-router-dom";
import { StarIcon } from "lucide-react";

type Testimonial = {
  img?: string;
  svg?: JSX.Element;
  alt?: string;
  text: string;
  subtext: string;
  avatar?: string;
  color: string;
  text_color: string;
};

function Testimonial() {
  let testimonials = [
    {
      svg: <TestimonialSVG />,
      text: "“The coolest thing I've seen in a while!”",
      subtext: "- Katherine M. - VP of Entertainment & Fan Experience",
      color: "#C1C2B4",
      text_color: "",
    },
    {
      svg: <TestimonialSVG2 />,
      text: "“EngageX offers leaders like myself a transformative approach to inspiring teams, driving innovation, and turning strategic communication into measurable results.”",
      subtext: "- Ben Tubuo-Dir - and Small Business Officer",
      color: "#6F7C8E",
      text_color: "",
    },
    {
      svg: <TestimonialSVG3 />,
      text: "“There's no downside to it, it makes you more presentable, helps you avoid embarrassment, and that's a great idea. Honestly, it should be mandatory.”",
      subtext: "- Aaron Williams - former 14-season NBA veteran",
      color: "#EFF6FC",
      text_color: "",
    },
  ];
  return (
    <section className="py-26 px-10 lg:px-20 space-y-20 flex flex-col justify-center items-center">
      <div className="space-y-10 flex flex-col items-center">
        <div className="px-3 py-3 flex gap-2 items-center w-max border rounded-[6px] bg-white border-[#E1E5E7] mx-auto">
          <svg
            width="16"
            height="16"
            className="h-4 w-4"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.0714 3.63167C6.47007 2.46501 8.08207 2.42967 8.55474 3.52567L8.59474 3.63234L9.13274 5.20567C9.25603 5.5665 9.45527 5.89668 9.71702 6.17396C9.97877 6.45123 10.2969 6.66915 10.6501 6.81301L10.7947 6.86701L12.3681 7.40434C13.5347 7.80301 13.5701 9.41501 12.4747 9.88767L12.3681 9.92768L10.7947 10.4657C10.4338 10.5889 10.1035 10.7881 9.82608 11.0498C9.54869 11.3116 9.33067 11.6298 9.18674 11.983L9.13274 12.127L8.5954 13.701C8.19674 14.8677 6.58474 14.903 6.11274 13.8077L6.0714 13.701L5.53407 12.1277C5.41086 11.7667 5.21165 11.4364 4.9499 11.159C4.68814 10.8816 4.36993 10.6636 4.01674 10.5197L3.87274 10.4657L2.2994 9.92834C1.13207 9.52967 1.09674 7.91767 2.19274 7.44567L2.2994 7.40434L3.87274 6.86701C4.23356 6.74371 4.56374 6.54447 4.84102 6.28272C5.11829 6.02097 5.33621 5.7028 5.48007 5.34967L5.53407 5.20567L6.0714 3.63167ZM7.3334 4.06234L6.79607 5.63567C6.60833 6.18588 6.30292 6.68854 5.90109 7.10867C5.49927 7.5288 5.0107 7.85629 4.4694 8.06834L4.30274 8.12901L2.7294 8.66634L4.30274 9.20367C4.85294 9.39141 5.35561 9.69683 5.77573 10.0987C6.19586 10.5005 6.52335 10.989 6.7354 11.5303L6.79607 11.697L7.3334 13.2703L7.87074 11.697C8.05848 11.1468 8.36389 10.6441 8.76571 10.224C9.16753 9.80388 9.65611 9.47639 10.1974 9.26434L10.3641 9.20434L11.9374 8.66634L10.3641 8.12901C9.81387 7.94127 9.3112 7.63585 8.89107 7.23403C8.47094 6.83221 8.14345 6.34364 7.9314 5.80234L7.8714 5.63567L7.3334 4.06234ZM12.6667 1.33301C12.7915 1.33301 12.9137 1.36799 13.0195 1.43399C13.1253 1.49998 13.2105 1.59434 13.2654 1.70634L13.2974 1.78434L13.5307 2.46834L14.2154 2.70167C14.3404 2.74414 14.45 2.82275 14.5302 2.92755C14.6105 3.03235 14.6578 3.15862 14.6663 3.29036C14.6747 3.42209 14.6438 3.55336 14.5775 3.66753C14.5113 3.7817 14.4126 3.87363 14.2941 3.93167L14.2154 3.96367L13.5314 4.19701L13.2981 4.88167C13.2555 5.00663 13.1769 5.11614 13.072 5.19634C12.9672 5.27653 12.8409 5.3238 12.7092 5.33216C12.5774 5.34051 12.4462 5.30957 12.3321 5.24326C12.2179 5.17695 12.1261 5.07825 12.0681 4.95967L12.0361 4.88167L11.8027 4.19767L11.1181 3.96434C10.9931 3.92188 10.8835 3.84326 10.8033 3.73846C10.723 3.63366 10.6756 3.5074 10.6672 3.37566C10.6588 3.24393 10.6897 3.11265 10.7559 2.99848C10.8222 2.88431 10.9208 2.79238 11.0394 2.73434L11.1181 2.70234L11.8021 2.46901L12.0354 1.78434C12.0804 1.65262 12.1654 1.53828 12.2786 1.45734C12.3918 1.3764 12.5276 1.33292 12.6667 1.33301Z"
              fill="#4C5C75"
            />
          </svg>
          <p className="small">TESTIMONIALS</p>
        </div>

        <div className="lg:w-[32rem] text-center mx-auto space-y-4 flex flex-col items-center">
          <h4 className="h-max font-montreal leading-snug">
            Loved by aspiring speakers and industry leaders alike
          </h4>
          <p className="text-dark-electric-blue leading-normal">
            Hear directly from leaders who have tested and experienced the
            platform firsthand
          </p>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <div className="grid sm:grid-cols-3 grid-cols-1 gap-8 lg:pr-8">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className={`flex-shrink-0 w-full h-[15rem] flex flex-col justify-between py-10 items-center relative overflow-clip border`}
            >
              <div className="flex justify-center">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} fill="gray" stroke-width={0} />
                ))}
              </div>
              
              <p className="text-base text-center">{testimonial.text}</p>
              <div className="flex gap-6 items-center">
                <p className="text-xs"><span className="font-bold">{testimonial.subtext.split(' - ')[0]}</span> - {testimonial.subtext.split(' - ')[1]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative w-full flex justify-center">
        <Link to="/auth/signup">
          <button className="flex gap-2 mx-auto lg:mx-0 w-full lg:w-max py-4 px-6 items-center justify-center rounded-lg relative">
            <p>Join us now</p>
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
    </section>
  );
}

export default Testimonial;
