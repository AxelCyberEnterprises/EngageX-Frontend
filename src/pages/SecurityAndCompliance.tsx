import { Link } from "react-router-dom";
import SecurityTrust from "../assets/EngageX® Security Trust Overview .pdf";

function SecurityAndCompliance() {
    return (
        <main className="">
            <div className="space-y-20 py-36 font-montserrat px-10 lg:px-20">
                <h1 className="text-center font-montreal">EngageX Security & Compliance Overview</h1>

                <button className="flex gap-4 mb-12 mx-auto py-3 px-8 items-center justify-center rounded-lg">
                    <a href={SecurityTrust} target="_blank" rel="noopener noreferrer">
                        EngageX® Security Trust Overview
                    </a>

                    <svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M11.0243 6.32818C11.1897 6.32894 11.3481 6.39499 11.4651 6.51196C11.5821 6.62893 11.6481 6.78737 11.6489 6.95279L11.6489 12.8453C11.6518 12.9292 11.6379 13.0128 11.6078 13.0912C11.5778 13.1696 11.5322 13.2411 11.4739 13.3015C11.4156 13.3619 11.3458 13.4099 11.2685 13.4427C11.1913 13.4755 11.1082 13.4924 11.0243 13.4924C10.9403 13.4924 10.8573 13.4755 10.78 13.4427C10.7027 13.4099 10.6329 13.3619 10.5746 13.3015C10.5163 13.2411 10.4708 13.1696 10.4407 13.0912C10.4107 13.0128 10.3967 12.9292 10.3996 12.8453L10.3996 8.46128L4.39513 14.4658C4.27792 14.583 4.11895 14.6489 3.95319 14.6489C3.78743 14.6489 3.62846 14.583 3.51125 14.4658C3.39404 14.3486 3.32819 14.1896 3.32819 14.0239C3.32819 13.8581 3.39404 13.6991 3.51125 13.5819L9.51576 7.5774L5.1317 7.5774C4.96986 7.57169 4.81655 7.50338 4.70408 7.38687C4.59161 7.27035 4.52875 7.11473 4.52875 6.95279C4.52875 6.79085 4.59161 6.63523 4.70408 6.51871C4.81655 6.4022 4.96986 6.33389 5.1317 6.32818L11.0243 6.32818Z"
                            fill="white"
                        />
                    </svg>
                </button>

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
