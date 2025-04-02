import { JSX } from "react";

interface Params {
  feature: { svg: JSX.Element; title: string; content: string };
}

function FeaturesSectionCard({ feature }: Params) {
  return (
    <div className="border border-foreground/10 space-y-6 font-montserrat py-6 rounded-2xl px-5">
      <div className="w-full">{feature.svg}</div>
      <div className="space-y-1">
        <h6 className="font-montreal">{feature.title}</h6>
        <p className="small">{feature.content}</p>
      </div>
    </div>
  );
}

export default FeaturesSectionCard;
