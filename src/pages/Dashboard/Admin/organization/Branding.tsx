import Branding from "@/components/Branding";
import { useLocation } from "react-router-dom";

export default function OrgBranding() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const orgId = searchParams.get("id");

    return (
        <div className="px-6 pb-8 bg-white min-h-screen">
            <div className="bg-white z-10 sticky top-0 flex justify-between items-center mb-4">
                <h1 className="xl:text-4xl lg:text-3xl sm:text-2xl text-xl">Branding</h1>
            </div>

            {!orgId && (
                <p className="text-sm text-muted-foreground mb-4">No organization selected.</p>
            )}

            {/* Reuse the existing Branding form/preview */}
            <Branding />
        </div>
    );
}


