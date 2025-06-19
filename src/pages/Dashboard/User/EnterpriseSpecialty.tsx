import PharmaHqImg from "@/assets/images/webps/pharmahq-room.webp";
import RookieRoomImg from "@/assets/images/webps/rookie-room.webp";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const EnterpriseSpecialty = () => {
    const cardData = [
        {
            id: 0,
            image: RookieRoomImg,
            title: "The Rookie",
            href: "/dashboard/user/the-rookie-room",
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

    return (
        <div className="flex flex-col h-full">
            <div className="p-4 md:px-8 flex flex-wrap flex-1">
                {cardData.map((card, idx) => {
                    const isAvailable = card.available;

                    return isAvailable ? (
                        <Link
                            key={idx}
                            to={card.href}
                            className="w-full lg:w-1/4 px-2 mb-3 block h-32 cursor-pointer"
                            style={{ textDecoration: "none" }}
                        >
                            <div
                                className={cn(
                                    "bg-cover bg-center bg-no-repeat p-4 flex flex-col h-full justify-between rounded-md relative overflow-hidden transition-all"
                                )}
                                style={{
                                    background: `linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${card.image})`,
                                }}
                            >
                                <h6 className="absolute bottom-5 left-5 text-white">{card.title}</h6>
                            </div>
                        </Link>
                    ) : (
                        <div
                            key={idx}
                            className="w-full lg:w-1/4 px-2 mb-3 block h-32 cursor-not-allowed opacity-60"
                            style={{ textDecoration: "none" }}
                        >
                            <div
                                className={cn(
                                    "bg-cover bg-center bg-no-repeat p-4 flex flex-col h-full justify-between rounded-md relative overflow-hidden transition-all"
                                )}
                                style={{
                                    background: `linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${card.image})`,
                                }}
                            >
                                <span className="absolute top-2 left-3 text-xs text-white font-semibold z-10">
                                    Coming soon...
                                </span>
                                <h6 className="absolute bottom-5 left-5 text-white">{card.title}</h6>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default EnterpriseSpecialty;
