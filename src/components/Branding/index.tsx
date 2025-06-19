import { Eye } from "lucide-react";
import BrandingForm from "../forms/BrandingForm";
import { Button } from "../ui/button";
import BrandingPreview from "./BrandingPreview";

const Branding = () => {
    return (
        <section>
            <div className="py-6">
                <h2 className="text-xl mb-1">Branding & White-Labeling</h2>
                <p className="text-sm text-[#6F7C8E]">Customize your platform's look and feel to match your brand.</p>
            </div>

            <div className="flex gap-6">
                <BrandingForm className="lg:w-1/2 w-full flex flex-col gap-8" />

                <div className="lg:w-1/2 w-full hidden lg:flex flex-col gap-8">
                    <Button
                        variant="outline"
                        className="w-fit text-[#6F7C8E] hover:text-[#6F7C8E] font-normal border-light-silver"
                    >
                        PREVIEW <Eye className="size-4" />
                    </Button>

                    <div className="h-full bg-[#F8F8F7] py-6 pl-6">
                        <BrandingPreview />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Branding;
