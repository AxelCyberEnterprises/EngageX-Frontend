import { Link, useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation(); // Get the current route

  const getActiveClass = (path: string) =>
    location.pathname === path ? "text-[#64BA9F]" : "text-white";

  return (
    <section className="px-10 lg:px-20 bg-gunmetal text-white pt-16 space-y-20">
      <div className="p-20 flex flex-col lg:flex-row space-y-10 lg:space-y-0 lg:justify-between text-black lg:items-center bg-alice-blue rounded-2xl">
        <h4 className="font-montreal lg:w-[17rem] font-medium leading-relaxed">
          Ready to speak with confidence?
        </h4>
        <Link to="/auth/login">
          <button className="px-6 py-3 space-x-10 rounded-2xl">
            <p className="">Get started</p>
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              className="h-6 w-7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.738281"
                y="0.833252"
                width="26.6667"
                height="26.6667"
                rx="13.3333"
                fill="#C1C2B4"
              />
              <path
                d="M19.6915 14.5478C19.902 14.3372 19.902 13.9958 19.6915 13.7852L16.2599 10.3537C16.0493 10.1431 15.7079 10.1431 15.4973 10.3537C15.2868 10.5643 15.2868 10.9057 15.4973 11.1162L18.5476 14.1665L15.4973 17.2168C15.2868 17.4273 15.2868 17.7688 15.4973 17.9793C15.7079 18.1899 16.0493 18.1899 16.2599 17.9793L19.6915 14.5478ZM8.83398 14.7057H19.3102V13.6273H8.83398V14.7057Z"
                fill="#262B3A"
              />
            </svg>
          </button>
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row justify-between gap-[83.48px] lg:px-[50px] text-[#626362]">
        <div className="space-y-3 lg:w-1/4">
          <img src="./assets/logo.png" alt="brand logo" className="h-8" />
          <p>Start speaking with confidence</p>
        </div>

        <div className="flex flex-col lg:flex-row space-y-16 lg:w-3/4 justify-between lg:pl-[10rem]">
          <div className="space-y-8">
            <p className="text-[#737373]">Pages</p>
            <ul className="space-y-6">
              <li>
                <Link to="/" className={getActiveClass("/")}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/features" className={getActiveClass("/features")}>
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className={getActiveClass("/pricing")}>
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-8">
            <p className="text-[#737373]">Support</p>
            <ul className="space-y-6">
              <li>
                <Link
                  to="/help-center"
                  className={getActiveClass("/help-center")}
                >
                  Help center
                </Link>
              </li>
              <li>
                <Link to="/live-chat" className={getActiveClass("/live-chat")}>
                  Live chat
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-8">
            <p className="text-[#737373]">Legal</p>
            <ul className="space-y-6">
              <li>
                <Link
                  to="/privacy-policy"
                  className={getActiveClass("/privacy-policy")}
                >
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  className={getActiveClass("/terms-of-service")}
                >
                  Terms of service
                </Link>
              </li>
              <li>
                <Link
                  to="/cookie-policy"
                  className={getActiveClass("/cookie-policy")}
                >
                  Cookie policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-t-alice-blue flex flex-col lg:flex-row space-y-4 lg:space-y-0 py-6 justify-between text-white">
        <p>
          © Career Doctor, LLC all rights reserved. Engineered by Axel Cyber,
          LLC.
        </p>
        <div className="flex items-center gap-4">
          <Link
            to="/terms-of-service"
            className={getActiveClass("/terms-of-service")}
          >
            Terms & conditions
          </Link>
          <div className="h-2 w-2 rounded-full bg-white" />
          <Link
            to="/privacy-policy"
            className={getActiveClass("/privacy-policy")}
          >
            Privacy policy
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Footer;
