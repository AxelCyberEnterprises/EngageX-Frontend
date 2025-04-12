import clsx from "clsx";

interface Params {
  feature: { className: string; title: string; content: string; img: string };
}

function FeaturesSectionCard({ feature }: Params) {
  return (
    <div
      className={clsx(
        "border border-foreground/10 space-y-4 font-montserrat py-6 pt-0 rounded-2xl px-5",
        feature.className
      )}
    >
      <div className="w-full h-[8.5rem] overflow-clip relative">
        <img src={feature.img} className="w-full object-contain absolute" />
      </div>
      <div className="space-y-3">
        <h6 className="font-montreal">{feature.title}</h6>
        <p className="small">{feature.content}</p>
      </div>
    </div>
  );
}

export default FeaturesSectionCard;
