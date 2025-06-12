import clsx from "clsx";
import { useState } from "react";
import { Link } from "react-router-dom";

interface NewFeaturesSectionProps {
  data: {
    header: string;
    title: string;
    content: string;
    list: string[];
    carousel: { title: string; content: string }[];
  };
}

function NewFeaturesSection({ data }: NewFeaturesSectionProps) {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  return (
    <section className="px-10 lg:px-20 pb-20 space-y-20 py-20 font-montserrat bg-alice-blue">
      <div className="space-y-10 flex flex-col items-center font-montserrat">
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
          <p className="small text-dull-electric-blue">
            NEW FEATURES COMING SOON!
          </p>
        </div>

        <div className="lg:w-[50%] text-center mx-auto space-y-4 flex flex-col items-center">
          <h2 className="h-max font-montreal leading-snug">{data.title}</h2>
          <p>
            {data.content}
          </p>
        </div>

        <section className="space-y-8">
          <div className="flex overflow-auto w-[calc(100vw-2rem)] lg:w-full justify-between gap-3 py-3 px-3 rounded-lg bg-white">
            {data.list.map((content: string, idx: number) => (
              <button
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className={clsx(
                  "px-5 py-3 rounded-md text-nowrap",
                  activeIdx == idx
                    ? "bg-gunmetal text-white"
                    : "bg-transparent text-black"
                )}
              >
                {content} 
              </button>
            ))}
          </div>

          <div className="px-4 lg:pl-16 lg:pr-8 w-full flex flex-col lg:flex-row bg-white gap-8 lg:gap-10 items-center py-10 rounded-lg justify-between">
            <div className="w-full lg:w-1/2 space-y-3">
              <h3 className="leading-tight">
                {data.carousel[activeIdx].title}
              </h3>
              <p>{data.carousel[activeIdx].content}</p>
              <Link to={"/contact"}>
                <button className="hidden lg:flex px-5 py-4 gap-4 rounded-md mt-20">
                  <p>Reach Out</p>
                  <svg
                    width="10"
                    height="20"
                    viewBox="0 0 10 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.4633 10.5927L3.74913 15.3069L2.5708 14.1285L6.6958 10.0035L2.5708 5.87853L3.74913 4.7002L8.4633 9.41436C8.61953 9.57063 8.70729 9.78256 8.70729 10.0035C8.70729 10.2245 8.61953 10.4364 8.4633 10.5927Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </Link>
            </div>
            <div
              className={`lg:w-[650px] rounded-[20px] overflow-hidden ${
                activeIdx === 1 || activeIdx === 2 || activeIdx === 3
                  ? "lg:h-[580px]"
                  : "lg:h-[500px]"
              }`}
            >
              <img
                src={`/assets/${data.title.split(" ").join("").toLowerCase()}img${activeIdx + 1}.${ activeIdx == 0 ? "jpg" : "png"}`}
                alt=""
                className={`w-full h-full rounded-[20px] ${ activeIdx == 0 ? "object-cover" : "object-contain"} ${
                  activeIdx === 5 ? "object-[center_30%]" : ""
                }`}
              />
            </div>

            <div className="flex items-start lg:hidden w-full">
              <Link to={"/contact"}>
                <button className="px-5 py-4 flex gap-4 rounded-md">
                  <p>Reach Out</p>
                  <svg
                    width="10"
                    height="20"
                    viewBox="0 0 10 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.4633 10.5927L3.74913 15.3069L2.5708 14.1285L6.6958 10.0035L2.5708 5.87853L3.74913 4.7002L8.4633 9.41436C8.61953 9.57063 8.70729 9.78256 8.70729 10.0035C8.70729 10.2245 8.61953 10.4364 8.4633 10.5927Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

export default NewFeaturesSection;
