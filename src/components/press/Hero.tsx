function Hero() {
    return (
        <section className="px-10">
            <div className="text-center pt-24 pb-20 w-max mx-auto items-center space-y-3">
                <div className="flex gap-2 items-center">
                    <img src="/assets/logodark.png" alt="brand logo" className="h-10 lg:h-13 lg:mt-2" />
                    <h1>in the news</h1>
                </div>
            </div>

      <div className="space-y-8">
        <div className="hidden lg:block w-full overflow-clip h-[30rem] relative">
          <img
            src="/assets/presshero.png"
            className=" h-full w-full absolute object-cover top-0"
          />
        </div>
        <div className=" lg:hidden w-full overflow-clip h-[10rem] relative">
          <img
            src="/assets/pressimgmobile.png"
            className=" h-full w-full absolute object-cover top-0"
          />
        </div>
        <div className="space-y-6 py-6">
          <h4 className="text-center">
            At EngageX™ AI Innovation Meets Environmental Responsibility
          </h4>
          <p className="text-[#667085] font-montserrat">
            At EngageX™, we believe the future of AI shouldn’t come at the
            planet’s expense. That’s why we’ve reimagined how to deliver cutting
            edge capabilities without repeating the energy-intensive cycle of
            training massive models from scratch. Rather than burning through
            megawatts to build new large scale models, we strategically adapt
            and optimize existing, high performance AI foundations with
            innovative new structure/design. This approach dramatically reduces
            our carbon footprint while unlocking powerful features like
            real-time engagement analysis, intelligent speech coaching, and
            instant feedback generation. Our commitment to sustainability drives
            every layer of our AI pipeline: <br /><br />• We prioritize refinement over
            reinvention, maximizing efficiency by improving what’s already world
            class. <br /><br />• We deploy lightweight, cloud optimized systems, minimizing
            energy use without sacrificing speed or accuracy. <br /><br />• We reduce
            environmental waste by skipping redundant training cycles and using
            infrastructure powered by cleaner energy. At EngageX™, we’re proving
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
