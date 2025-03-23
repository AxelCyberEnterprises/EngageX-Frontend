import clsx from "clsx";

function HowItWorksCardTwoSVG({ className }: { className?: string }) {
  return (
    <div className={clsx(className, "border border-black/10 rounded-2xl")}>
      <img src="./assets/howitworkscardtwoimg.png" />
      <div className="space-y-1 px-4 pb-4">
        <p className="big">Improve Intentionally with AI and Coaching</p>
        <p className="text-[#6F7C8E] font-montserrat">
          Continue to optimize your growth by tracking progress, Receiving
          feedback and scheduling calls with coach for extra help and attention
          when needed
        </p>
      </div>
    </div>
  );
}

export default HowItWorksCardTwoSVG;
