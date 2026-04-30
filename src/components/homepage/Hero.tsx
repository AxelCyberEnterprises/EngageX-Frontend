import { Link } from "react-router-dom";

function Hero() {
    return (
        <section className="flex flex-col lg:flex-row px-10 lg:px-20 pt-8 pb-16 lg:items-center lg:gap-x-16">
            {/* Left — Copy */}
            <div className="flex-1 space-y-3 text-left">
                <h1 className="font-montreal leading-tight font-extrabold">
                    <span className="text-[#64BA9F]">70%</span> of Americans fear public speaking.
                    <br />
                    Yet it's the #1 career accelerator.
                </h1>

                <p className="text-xl lg:text-2xl text-dark-electric-blue font-medium leading-relaxed">
                    Practice where it feels real, before it is real.
                </p>

                <p className="text-dark-electric-blue leading-relaxed max-w-xl font-medium">
                    The only AI platform with avatar audiences, live coach + AI feedback, multilingual support, and
                    privacy-safe design, built by a Black woman in tech.
                </p>

                <div className="flex items-center gap-4 flex-wrap ">
                    <Link to="/auth/signup">
                        <button
                            className="flex gap-4 mt-6 w-full lg:w-max py-3 px-8 items-center justify-center rounded-lg bg-[#64BA9F] text-white font-semibold"
                            onClick={() => localStorage.setItem("clicked", "1")}
                        >
                            <p>Sign Up</p>
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

                    <Link to="https://youtu.be/9wngYuqKK7Q?si=dyYU2qiEH9TXYM2R" target="_blank">
                        <button className="flex gap-4 mt-6 w-full lg:w-max py-3 px-8 items-center justify-center rounded-lg bg-[#EDEDED] hover:bg-[#D4D4D4] text-[#253141] font-semibold">
                            <p>
                                {" "}
                                View EngageX<sup>®</sup> in Action{" "}
                            </p>
                        </button>
                    </Link>
                </div>

                <p className="text-sm text-dark-electric-blue/60 mt-2">Free to start. No credit card required.</p>
            </div>

            {/* Right — Video */}
            <div className="flex-1 mt-12 lg:mt-0 flex justify-center lg:justify-end">
                <video className="w-full max-w-2xl rounded-xl shadow-lg" controls>
                    <source
                        src="https://engagex-user-content-1234.s3.us-west-1.amazonaws.com/static-videos/new_homepage_hero_engageX.mp4"
                        type="video/mp4"
                    />
                </video>
            </div>
        </section>
    );
}

export default Hero;
