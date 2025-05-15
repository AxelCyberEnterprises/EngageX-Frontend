function Hero() {
  return (
    <section className="px-10">
      <div className="text-center py-24 space-y-3">
        <h1>EngageX™ in the news</h1>
        <h6 className="text-[#475467]">
          For press enquiries, please contact{" "}
          <span className="">info@engagexai.io</span>
        </h6>
      </div>
      {/* <div className="flex flex-col lg:flex-row gap-10">
        <div className="h-[20rem] w-full lg:min-w-[33rem] relative object-contain">
          <img
            src="./assets/pressimg1.png"
            className="h-full w-full absolute object-contain"
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
      </div> */}

      <div>
        <div className="w-full overflow-clip h-[40vh] relative">
          <img
            src="./assets/presshero.png"
            className="h-full w-full absolute object-cover"
          />
        </div>
        <div className="space-y-6 py-6">
          <h4 className="text-center">
            At EngageX, AI Innovation Meets Environmental Responsibility
          </h4>
          <p className="text-[#667085] font-montserrat">
            At EngageX, we believe the future of AI shouldn’t come at the
            planet’s expense. That’s why we’ve reimagined how to deliver cutting
            edge capabilities without repeating the energy-intensive cycle of
            training massive models from scratch. Rather than burning through
            megawatts to build new large scale models, we strategically adapt
            and optimize existing, high performance AI foundations with
            innovative new structure/design. This approach dramatically reduces
            our carbon footprint while unlocking powerful features like
            real-time engagement analysis, intelligent speech coaching, and
            instant feedback generation. Our commitment to sustainability drives
            every layer of our AI pipeline: • We prioritize refinement over
            reinvention, maximizing efficiency by improving what’s already world
            class. • We deploy lightweight, cloud optimized systems, minimizing
            energy use without sacrificing speed or accuracy. • We reduce
            environmental waste by skipping redundant training cycles and using
            infrastructure powered by cleaner energy. At EngageX, we’re proving
            that AI can be bold, brilliant, and better for the planet.
            Innovation and sustainability aren’t competing goals, they’re our
            blueprint for progress.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
