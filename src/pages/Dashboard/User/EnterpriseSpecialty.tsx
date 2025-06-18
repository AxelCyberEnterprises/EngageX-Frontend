import PharmaHqImg from "@/assets/images/webps/pharmahq-room.webp";
import RookieRoomImg from "@/assets/images/webps/rookie-room.webp";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const EnterpriseSpecialty = () => {
    const cardData = [
        {
            id: 0,
            image: RookieRoomImg,
            title: "The Rookie",
            href: "./the-rookie-room",
            available: true,
        },
        {
            id: 1,
            image: PharmaHqImg,
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
                    const isAvailable = card.available;

                    return (
                        <div
                            key={idx}
                            className={`w-full lg:w-1/4 px-2 mb-3 block h-32
                                ${isAvailable ? "cursor-pointer" : "cursor-not-allowed opacity-60"}
                            `}
                            style={{ textDecoration: "none" }}
                            onClick={() => isAvailable && setSelectedCardIdx(idx)}
                        >
                            <div
                                className={cn(
                                    "bg-cover bg-center bg-no-repeat p-4 flex flex-col h-full justify-between rounded-md relative overflow-hidden transition-all",
                                    { "outline-4 outline-medium-sea-green": selectedCardIdx === idx && isAvailable },
                                )}
                                style={{
                                    background: `linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${card.image})`,
                                }}
                            >
                                {!isAvailable && (
                                    <span className="absolute top-2 left-3 text-xs text-white font-semibold z-10">
                                        Coming soon...
                                    </span>
                                )}
                                <h6 className="absolute bottom-5 left-5 text-white">{card.title}</h6>
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
