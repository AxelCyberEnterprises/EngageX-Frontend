import { Link } from "react-router-dom";
import SecurityTrust from "../assets/EngageX® Security Trust Overview .pdf";

function SecurityAndCompliance() {
    return (
        <main className="">
            <div className="space-y-20 py-36 font-montserrat px-10 lg:px-20">
                <h1 className="text-center font-montreal">EngageX Security & Compliance Overview</h1>

                <a className="w-full" href={SecurityTrust} target="_blank" rel="noopener noreferrer">
                    <button className="flex gap-4 mb-12 mx-auto py-3 px-8 items-center justify-center rounded-lg">
                        EngageX® Security Trust Overview
                    </button>
                </a>

                <div className="space-y-16 text-[#475467]">
                    <div className="space-y-5">
                        <p className="text-lg">
                            At EngageX<sup>®</sup>, your privacy and security are our top priorities. We've put strong
                            measures in place to keep your data safe and your experience secure. Here's a simple
                            overview of what we do to protect you:
                        </p>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-black font-montreal">Secure Login & Access</h4>
                        <div className="text-lg space-y-2">
                            <ul className="list-disc pl-5 space-y-2 mt-3">
                                <li>
                                    We use a trusted system to protect your account with strong encryption and
                                    passwords.
                                </li>
                                <li>
                                    Access to features and data is controlled so only authorized users can see your
                                    information.
                                </li>
                                <li>All logins and data access happen over secure, encrypted connections (HTTPS).</li>
                            </ul>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-black font-montreal">Protecting Your Data</h4>
                        <div className="text-lg space-y-2">
                            <ul className="list-disc pl-5 space-y-2 mt-3">
                                <li>Your session recordings and personal data are encrypted and stored securely.</li>
                                <li>
                                    Recordings are automatically deleted 24 hours after your session unless you choose
                                    to download them.
                                </li>
                                <li>We carefully check all file uploads to keep harmful content out.</li>
                                <li>
                                    Only you and authorized parts of our platform can access your uploaded files, which
                                    are stored safely with limited access.
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-black font-montreal">Safe and Private Network</h4>
                        <div className="text-lg space-y-2">
                            <ul className="list-disc pl-5 space-y-2 mt-3">
                                <li>
                                    Our services run in a secure cloud environment with strict controls on who can
                                    access what.
                                </li>
                                <li>We constantly monitor for unusual activity or threats to keep your data safe.</li>
                                <li>
                                    All activity on our system is logged securely to help us respond quickly to any
                                    issues.
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-black font-montreal">Built to Industry Standards</h4>
                        <div className="text-lg space-y-2">
                            <ul className="list-disc pl-5 space-y-2 mt-3">
                                <li>
                                    We run our platform on AWS, which follows top security standards (SOC 2 and ISO
                                    27001).
                                </li>
                                <li>
                                    We do not use tracking cookies, respecting your privacy while you use our platform.
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-black font-montreal">Your Control & Transparency</h4>
                        <div className="text-lg space-y-2">
                            <ul className="list-disc pl-5 space-y-2 mt-3">
                                <li>
                                    You can always request access to your personal data or ask for it to be deleted.
                                </li>
                                <li>
                                    If you download your session recordings, please keep them safe, as we cannot control
                                    what happens after.
                                </li>
                                <li>We keep you informed if we update our security practices or privacy policy.</li>
                            </ul>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <p className="text-lg">
                            We are committed to providing a safe, reliable, and transparent service so you can focus on
                            improving your public speaking with confidence.
                        </p>
                        <p className="text-lg">
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
