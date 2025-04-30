function HeroSVG() {
  return (
    <div className="flex-1 flex items-center relative size-[35rem] justify-end">
      <div className="absolute h-[70vh] blur-lg w-[100vw] lg:w-[60vw] bg-radial from-40% from-[#7CA5FF]/15 to-white"></div>
      <img
        src="./assets/features-image.jpeg"
        className="h-[18rem] my-26 lg:my-0 lg:h-[35rem] relative z-20 mx-auto  lg:mr-10"
        alt=""
      />
    </div>
  );
}

export default HeroSVG;
