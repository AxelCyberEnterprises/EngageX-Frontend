import { cn } from "@/lib/utils";

interface IDashboardCard extends React.ComponentProps<"div"> {
    bgImage: string;
}

const DashboardCard = ({ bgImage, className, children }: IDashboardCard) => {
    return (
        <div className={cn("w-full md:w-1/3 lg:w-1/4 h-45 px-2 md:mb-3 hidden md:block", className)}>
            <div
                className="index__card other__cards p-4 flex flex-col h-full justify-end rounded-[8px] relative overflow-hidden"
                style={{
                    background: `url(${bgImage}`,
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default DashboardCard;
