import { Link } from "react-router-dom";

function SecurityAndCompliance() {
    return (
        <main className="">
            <div className="space-y-20 py-36 font-montserrat px-10 lg:px-20">
                <h1 className="text-center font-montreal">EngageX Security & Compliance Overview</h1>
                <div className="space-y-16 text-[#475467]">
                    <div className="space-y-5">
                        <p className="big">
                            At EngageX®, your privacy and security are our top priorities. We've put strong measures in
                            place to keep your data safe and your experience secure. Here's a simple overview of what we
                            do to protect you:
                        </p>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-black font-montreal">Secure Login & Access</h4>
                        <div className="big space-y-2">
                            <p className="flex big items-center gap-x-3 pl-4 mt-3">
                                <div className="h-2 w-2 rounded-full bg-gunmetal" />
                                We use a trusted system to protect your account with strong encryption and passwords.
                            </p>
                            <p className="flex big items-center gap-x-3 pl-4">
                                <div className="h-2 w-2 rounded-full bg-gunmetal" />
                                Access to features and data is controlled so only authorized users can see your
                                information.
                            </p>
                            <p className="flex big items-center gap-x-3 pl-4">
                                <div className="h-2 w-2 rounded-full bg-gunmetal" />
                                All logins and data access happen over secure, encrypted connections (HTTPS).
                            </p>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-black font-montreal">Protecting Your Data</h4>
                        <div className="big space-y-2">
                            <p className="flex big items-center gap-x-3 pl-4 mt-3">
                                <div className="h-2 w-2 rounded-full bg-gunmetal" />
                                Your session recordings and personal data are encrypted and stored securely.
                            </p>
                            <p className="flex big items-center gap-x-3 pl-4">
                                <div className="h-2 w-2 rounded-full bg-gunmetal" />
                                Recordings are automatically deleted 24 hours after your session unless you choose to
                                download them.
                            </p>
                            <p className="flex big items-center gap-x-3 pl-4">
                                <div className="h-2 w-2 rounded-full bg-gunmetal" />
                                We carefully check all file uploads to keep harmful content out.
                            </p>
                            <p className="flex big items-center gap-x-3 pl-4">
                                <div className="h-2 w-2 rounded-full bg-gunmetal" />
                                Only you and authorized parts of our platform can access your uploaded files, which are
                                stored safely with limited access.
                            </p>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-black font-montreal">Safe and Private Network</h4>
                        <div className="big space-y-2">
                            <p className="flex big items-center gap-x-3 pl-4 mt-3">
                                <div className="h-2 w-2 rounded-full bg-gunmetal" />
                                Our services run in a secure cloud environment with strict controls on who can access
                                what.
                            </p>
                            <p className="flex big items-center gap-x-3 pl-4">
                                <div className="h-2 w-2 rounded-full bg-gunmetal" />
                                We constantly monitor for unusual activity or threats to keep your data safe.
                            </p>
                            <p className="flex big items-center gap-x-3 pl-4">
                                <div className="h-2 w-2 rounded-full bg-gunmetal" />
                                All activity on our system is logged securely to help us respond quickly to any issues.
                            </p>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-black font-montreal">Built to Industry Standards</h4>
                        <div className="big space-y-2">
                            <p className="flex big items-center gap-x-3 pl-4 mt-3">
                                <div className="h-2 w-2 rounded-full bg-gunmetal" />
                                We run our platform on AWS, which follows top security standards (SOC 2 and ISO 27001).
                            </p>
                            <p className="flex big items-center gap-x-3 pl-4">
                                <div className="h-2 w-2 rounded-full bg-gunmetal" />
                                We do not use tracking cookies, respecting your privacy while you use our platform.
                            </p>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-black font-montreal">Your Control & Transparency</h4>
                        <div className="big space-y-2">
                            <p className="flex big items-center gap-x-3 pl-4 mt-3">
                                <div className="h-2 w-2 rounded-full bg-gunmetal" />
                                You can always request access to your personal data or ask for it to be deleted.
                            </p>
                            <p className="flex big items-center gap-x-3 pl-4">
                                <div className="h-2 w-2 rounded-full bg-gunmetal" />
                                If you download your session recordings, please keep them safe, as we cannot control
                                what happens after.
                            </p>
                            <p className="flex big items-center gap-x-3 pl-4">
                                <div className="h-2 w-2 rounded-full bg-gunmetal" />
                                We keep you informed if we update our security practices or privacy policy.
                            </p>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <p className="big">
                            We are committed to providing a safe, reliable, and transparent service so you can focus on
                            improving your public speaking with confidence.
                        </p>
                        <p className="big">
                            If you have any questions or concerns about security or privacy, please contact us at{" "}
                            <Link to="mailto:info@engagexai.io" className="text-primary underline underline-offset-2">
                                info@engagexai.io
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default SecurityAndCompliance;
