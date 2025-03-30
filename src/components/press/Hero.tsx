function Hero() {
  return (
    <section className="px-10">
      <div className="text-center py-24 space-y-3">
        <h1>EngageX™ in the news</h1>
        <h6 className="text-[#475467]">
          For press enquiries, please contact{" "}
          <span className="text-gunmetal underline underline-offset-4">
            engageX@thecareerdoctorllc.com
          </span>
        </h6>
      </div>
      <div className="flex gap-10">
        <div className="h-[20rem] min-w-[33rem] relative ">
          <img
            src="./assets/pressimg1.png"
            className="h-full w-full absolutee object-center"
          />
        </div>
        <div className="space-y-4">
          <p className="text-green-sheen">25 Mar 2025</p>
          <div className="flex justify-between items-center">
            <h4>Speak confidently with EngageX™</h4>
            <svg
              width="24"
              height="28"
              viewBox="0 0 24 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 21L17 11M17 11H7M17 11V21"
                stroke="#1A1A1A"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <p className="big text-[#667085]">
            Prepare, perfect, and present with confidence in a realistic,
            AI-powered environment tailored for leaders, presenters, and
            entrepreneurs to refine their communication, captivate audiences,
            and elevate their influence—plus, get the bonus of real-time
            guidance from an expert coach.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
