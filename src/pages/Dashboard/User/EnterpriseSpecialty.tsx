import cardFlower from "../../../assets/images/svgs/card-flower.svg";
import theRookieBg from "../../../assets/images/jpegs/the-rookie-bg.jpeg";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const EnterpriseSpecialty = () => {
    const cardData = [
        {
            id: 0,
            image: theRookieBg,
            title: "The Rookie",
            href: "/sessions/the-rookie-media-training/1",
            available: true,
        },
        {
            id: 1,
            image: theRookieBg,
            title: "PharmaHQ",
            href: "/dashboard/sessions/enterprise-specialty",
            available: false,
        },
    ];

    const [selectedCardIdx, setSelectedCardIdx] = useState<number | null>(null);

    const proceed = () => {
        if (selectedCardIdx !== null) {
            const selectedCard = cardData[selectedCardIdx];
            if (selectedCard && selectedCard.href && selectedCard.available) {
                window.location.href = selectedCard.href;
            }
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="p-4 md:px-8 flex flex-wrap flex-1">
                {cardData.map((card, idx) => {
                    const isActive = selectedCardIdx === idx;
                    const isAvailable = card.available;
                    return (
                        <div
                            key={idx}
                            className={`w-full lg:w-1/4 px-2 mb-3 block h-32
                                ${isAvailable ? "cursor-pointer" : "cursor-default opacity-50"}
                            `}
                            style={{ textDecoration: "none" }}
                            onClick={() => isAvailable && setSelectedCardIdx(idx)}
                        >
                            <div
                                className={`p-4 flex flex-col h-full justify-between rounded-md relative overflow-hidden transition-all
                                    ${isActive && isAvailable ? "bg-alice-blue border border-slate-gray" : "bg-anti-flash-white"}
                                `}
                            >
                                {!isAvailable && (
                                    <span className="absolute top-2 left-3 text-xs text-slate-500 font-semibold z-10">
                                        Coming soon...
                                    </span>
                                )}
                                <img
                                    src={cardFlower}
                                    alt="card flower background"
                                    className="absolute top-0 right-0 h-1/2"
                                />
                                <h6 className="absolute bottom-5 left-5 text-primary-blue">{card.title}</h6>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="border-t-2 border-bright-gray flex items-center justify-end h-20 px-4 md:px-8">
                <Button
                    className="bg-medium-sea-green hover:bg-medium-sea-green/90 text-white py-3 lg:me-20"
                    onClick={proceed}
                    disabled={selectedCardIdx === null || !cardData[selectedCardIdx]?.available}
                >
                    Proceed
                </Button>
            </div>
        </div>
    );
};

export default EnterpriseSpecialty;
