import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="flex flex-col md:flex-row px-10 lg:px-20 gap-20 font-montserrat py-26">
      <div className="flex-1 flex flex-col justify-between gap-28">
        <div className="space-y-4">
          <h2 className="font-montreal leading-snug">
            We'd love to hear from you
          </h2>
          <p className="text-[#475467]">
            Fill out the form and our friendly team would get back to you
            shortly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 lg:gap-8">
          <div className="space-y-4">
            <svg
              width="24"
              height="24"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6M22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6M22 6L12 13L2 6"
                stroke="#64BA9F"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="big font-semibold">Email</p>
            <p className="text-green-sheen">info@ldoxygen.com</p>
          </div>
          <div className="space-y-4">
            <svg
              width="24"
              height="24"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.9994 16.9201V19.9201C22.0006 20.1986 21.9435 20.4743 21.832 20.7294C21.7204 20.9846 21.5567 21.2137 21.3515 21.402C21.1463 21.5902 20.904 21.7336 20.6402 21.8228C20.3764 21.912 20.0968 21.9452 19.8194 21.9201C16.7423 21.5857 13.7864 20.5342 11.1894 18.8501C8.77327 17.3148 6.72478 15.2663 5.18945 12.8501C3.49942 10.2413 2.44769 7.27109 2.11944 4.1801C2.09446 3.90356 2.12732 3.62486 2.21595 3.36172C2.30457 3.09859 2.44702 2.85679 2.63421 2.65172C2.82141 2.44665 3.04925 2.28281 3.30324 2.17062C3.55722 2.05843 3.83179 2.00036 4.10945 2.0001H7.10945C7.59475 1.99532 8.06524 2.16718 8.43321 2.48363C8.80118 2.80008 9.04152 3.23954 9.10944 3.7201C9.23607 4.68016 9.47089 5.62282 9.80945 6.5301C9.94399 6.88802 9.97311 7.27701 9.89335 7.65098C9.8136 8.02494 9.62831 8.36821 9.35944 8.6401L8.08945 9.9101C9.513 12.4136 11.5859 14.4865 14.0894 15.9101L15.3594 14.6401C15.6313 14.3712 15.9746 14.1859 16.3486 14.1062C16.7225 14.0264 17.1115 14.0556 17.4694 14.1901C18.3767 14.5286 19.3194 14.7635 20.2794 14.8901C20.7652 14.9586 21.2088 15.2033 21.526 15.5776C21.8431 15.9519 22.0116 16.4297 21.9994 16.9201Z"
                stroke="#64BA9F"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <p className="big font-semibold">Phone</p>
            <p className="text-green-sheen">+234 (0) 808 110 1475</p>
          </div>
          <div className="space-y-4">
            <svg
              width="20"
              height="24"
              viewBox="0 0 20 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 10C19 17 10 23 10 23C10 23 1 17 1 10C1 7.61305 1.94821 5.32387 3.63604 3.63604C5.32387 1.94821 7.61305 1 10 1C12.3869 1 14.6761 1.94821 16.364 3.63604C18.0518 5.32387 19 7.61305 19 10Z"
                stroke="#64BA9F"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 13C11.6569 13 13 11.6569 13 10C13 8.34315 11.6569 7 10 7C8.34315 7 7 8.34315 7 10C7 11.6569 8.34315 13 10 13Z"
                stroke="#64BA9F"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <p className="big font-semibold">Office</p>
            <p className="text-green-sheen">999c Danmole Street, Ikoyi Lagos</p>
          </div>
          <div className="space-y-4 flex items-end">
            <div className="flex gap-5">
              <svg
                width="39"
                height="39"
                viewBox="0 0 39 39"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_1883_9802)">
                  <path
                    d="M15.8993 28.0713C23.6602 28.0713 27.9063 21.64 27.9063 16.0644C27.9063 15.8836 27.9022 15.6988 27.8942 15.518C28.7202 14.9206 29.433 14.1807 29.9992 13.333C29.2299 13.6753 28.4131 13.8988 27.5768 13.996C28.4574 13.4681 29.1168 12.6389 29.4326 11.662C28.6042 12.153 27.6982 12.4993 26.7535 12.6862C26.117 12.0098 25.2754 11.562 24.3589 11.412C23.4423 11.2619 22.5019 11.418 21.6829 11.856C20.864 12.2941 20.2121 12.9897 19.8282 13.8353C19.4442 14.681 19.3495 15.6296 19.5588 16.5345C17.8813 16.4503 16.2403 16.0145 14.742 15.2554C13.2438 14.4964 11.9218 13.4309 10.8617 12.1281C10.3229 13.057 10.1581 14.1562 10.4006 15.2023C10.6432 16.2484 11.2749 17.1629 12.1675 17.7599C11.4974 17.7386 10.842 17.5582 10.2554 17.2336V17.2858C10.2548 18.2606 10.5918 19.2056 11.2091 19.96C11.8265 20.7145 12.686 21.2318 13.6417 21.4242C13.0209 21.594 12.3694 21.6188 11.7376 21.4965C12.0073 22.3349 12.5319 23.0681 13.2384 23.5939C13.9448 24.1197 14.7978 24.4119 15.6783 24.4296C14.1835 25.6037 12.337 26.2406 10.4362 26.2376C10.0991 26.2371 9.76236 26.2164 9.42773 26.1757C11.3588 27.4146 13.605 28.0725 15.8993 28.0713Z"
                    fill="#555555"
                  />
                </g>
                <circle
                  cx="19.2857"
                  cy="19.2857"
                  r="19.2857"
                  fill="black"
                  fillOpacity="0.1"
                />
                <defs>
                  <clipPath id="clip0_1883_9802">
                    <rect
                      width="20.5714"
                      height="20.5714"
                      fill="white"
                      transform="translate(9.42773 9.42871)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <svg
                width="40"
                height="39"
                viewBox="0 0 40 39"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.572266"
                  width="38.5714"
                  height="38.5714"
                  rx="19.2857"
                  fill="black"
                  fillOpacity="0.1"
                />
                <g clipPath="url(#clip0_1883_9806)">
                  <path
                    d="M28.1932 9H10.6633C9.82355 9 9.14453 9.66295 9.14453 10.4826V28.0848C9.14453 28.9045 9.82355 29.5714 10.6633 29.5714H28.1932C29.0329 29.5714 29.716 28.9045 29.716 28.0888V10.4826C29.716 9.66295 29.0329 9 28.1932 9ZM15.2477 26.5299H12.1941V16.7103H15.2477V26.5299ZM13.7209 15.3723C12.7405 15.3723 11.949 14.5808 11.949 13.6045C11.949 12.6281 12.7405 11.8366 13.7209 11.8366C14.6972 11.8366 15.4887 12.6281 15.4887 13.6045C15.4887 14.5768 14.6972 15.3723 13.7209 15.3723ZM26.6744 26.5299H23.6249V21.7567C23.6249 20.6196 23.6048 19.1531 22.0378 19.1531C20.4508 19.1531 20.2097 20.3946 20.2097 21.6763V26.5299H17.1642V16.7103H20.0892V18.0522H20.1294C20.5352 17.2808 21.5316 16.4652 23.0142 16.4652C26.1039 16.4652 26.6744 18.4982 26.6744 21.142V26.5299Z"
                    fill="#555555"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1883_9806">
                    <rect
                      width="20.5714"
                      height="20.5714"
                      fill="white"
                      transform="translate(9.14453 9)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <svg
                width="39"
                height="39"
                viewBox="0 0 39 39"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_1883_9810)">
                  <path
                    d="M30.1417 19.7144C30.1417 14.0338 25.5367 9.42871 19.856 9.42871C14.1754 9.42871 9.57031 14.0338 9.57031 19.7144C9.57031 24.8482 13.3316 29.1036 18.2489 29.8752V22.6876H15.6373V19.7144H18.2489V17.4484C18.2489 14.8705 19.7845 13.4466 22.134 13.4466C23.259 13.4466 24.4364 13.6475 24.4364 13.6475V16.1787H23.1394C21.8617 16.1787 21.4632 16.9716 21.4632 17.7859V19.7144H24.3158L23.8598 22.6876H21.4632V29.8752C26.3804 29.1036 30.1417 24.8482 30.1417 19.7144Z"
                    fill="#555555"
                  />
                </g>
                <circle
                  cx="19.4283"
                  cy="19.2857"
                  r="19.2857"
                  fill="black"
                  fillOpacity="0.1"
                />
                <defs>
                  <clipPath id="clip0_1883_9810">
                    <rect
                      width="20.5714"
                      height="20.5714"
                      fill="white"
                      transform="translate(9.57031 9.42871)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-8 p-9 border rounded-2xl">
        <div className="flex gap-6">
          <div className="space-y-4">
            <label className="text-[#475467] small" htmlFor="firstname">
              First name
            </label>
            <input type="text" placeholder="First name" className="mt-3" />
          </div>
          <div className="space-y-4">
            <label className="text-[#475467] small" htmlFor="lastname">
              Last name
            </label>
            <input type="text" placeholder="Last name" className="mt-3" />
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-[#475467] small" htmlFor="email">
            Email
          </label>
          <input type="email" placeholder="you@company.com" className="mt-3" />
        </div>

        <div className="space-y-4">
          <label className="small" htmlFor="message">
            Message
          </label>
          <textarea placeholder="" className="mt-3 h-[8rem]" />
        </div>

        <div className="flex w-full">
          <input className="h-6 w-6" type="checkbox" id="agree" name="agree" />
          <label htmlFor="agree" className="ml-4">
            You agree to our{" "}
            <span className="underline">
              <Link to="/privacypolicy">privacy policy</Link>
            </span>
            .
          </label>
        </div>

        <a href="mailto:engagex@axelcyber.com">
          <button className="w-full py-4 ">Send message</button>
        </a>
      </div>
    </section>
  );
}

export default Hero;
