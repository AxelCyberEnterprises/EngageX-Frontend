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
              className="h-5 w-5 stroke-3"
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
              className="size-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_3473_29176)">
                <path
                  d="M2.25 20.25H23.25"
                  stroke="#64BA9F"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M4.5 3.75V20.25"
                  stroke="#64BA9F"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M16.5 20.25V3.75"
                  stroke="#64BA9F"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M21 20.25V8.25"
                  stroke="#64BA9F"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7.5 7.5H9"
                  stroke="#64BA9F"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12 7.5H13.5"
                  stroke="#64BA9F"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7.5 11.25H9"
                  stroke="#64BA9F"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12 11.25H13.5"
                  stroke="#64BA9F"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.25 20.25V15H12.75V20.25"
                  stroke="#64BA9F"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M3.75 3.75H17.25"
                  stroke="#64BA9F"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M16.5 8.25H21.75"
                  stroke="#64BA9F"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_3473_29176">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <p className="big font-semibold">Address</p>
            <p className="text-green-sheen">Chicago, IL 60615</p>
          </div>
          <div className="space-y-4 mt-10">
            <div className="flex gap-5">
              <a href="">
                <svg
                  width="39"
                  height="39"
                  className="cursor-pointer"
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
              </a>
              <a href="">
                <svg
                  width="40"
                  height="39"
                  className="cursor-pointer"
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
              </a>
              <a href="">
                <svg
                  width="39"
                  height="39"
                  className="cursor-pointer"
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
              </a>
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
          <button className="w-full py-4 rounded-lg">Send message</button>
        </a>
      </div>
    </section>
  );
}

export default Hero;
