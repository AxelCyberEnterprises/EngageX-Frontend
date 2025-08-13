import { Link } from "react-router-dom";

function TermsOfService() {
    return (
        <main className="">
            <div className="space-y-20 py-36 font-montserrat px-10 lg:px-20">
                <h1 className="text-center font-montreal">Our terms of service</h1>
                <div className="space-y-16 text-[#475467]">
                    <div className="space-y-5">
                        <p className="big">EngageX® Cookie Policy</p>
                        <p className="big">Effective Date: 05/20/2025</p>
                        <p className="big">
                            Welcome to EngageX®! These Terms of Service ("Terms") govern your use of our AI-powered
                            platform for public speaking, pitch, and presentation services ("Services"). By accessing or
                            using EngageX®, you agree to comply with and be bound by these Terms
                        </p>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-black font-montreal">1. Acceptance of Terms</h4>
                        <p className="big">
                            By registering for, accessing, or using EngageX®, you confirm that you have read,
                            understood, and agree to be bound by these Terms. If you do not agree, do not use EngageX®
                        </p>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-black font-montreal">2. User Accounts</h4>
                        <p className="big space-y-6">
                            <p className="big">
                                You must provide accurate and complete information when creating an account
                            </p>
                            <p className="big">
                                You are responsible for maintaining the confidentiality of your account credentials
                            </p>
                            <p className="big">
                                EngageX® reserves the right to suspend or terminate accounts found to be in violation
                                of these Terms
                            </p>
                        </p>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-black font-montreal">3. Use of Services</h4>
                        <p className="big space-y-6">
                            <p className="big">You may use EngageX® only for lawful purposes</p>
                            <p className="big">
                                You agree not to misuse, distribute, or reverse-engineer any part of the platform
                            </p>
                            <p className="big">
                                EngageX® reserves the right to modify or discontinue any aspect of the Services without
                                prior notice
                            </p>
                        </p>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-black font-montreal">4. Intellectual Property</h4>
                        <div className="big space-y-6">
                            <p className="big">
                                EngageX® and its content (including software, graphics, and AI-generated insights) are
                                protected by intellectual property laws
                            </p>
                            <p className="big">
                                You may not copy, reproduce, or distribute EngageX® content without our written consent
                            </p>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-black font-montreal">5. Privacy & Data Protection</h4>
                        <div className="big space-y-6">
                            <p className="big">Our use of your data is governed by our Privacy Policy</p>
                            <p className="big">
                                We implement security measures to protect user data but cannot guarantee absolute
                                security
                            </p>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-black font-montreal">6. Payment & Subscription</h4>
                        <div className="big space-y-6">
                            <p className="big">Certain features may require payment or subscription</p>
                            <p className="big">Fees are non-refundable unless required by law</p>
                            <p className="big">EngageX® reserves the right to modify pricing at any time</p>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-black font-montreal">7. Limitation of Liability</h4>
                        <div className="big space-y-6">
                            <p className="big">
                                EngageX® provides its Services "as is" and does not guarantee error-free performance
                            </p>
                            <p className="big">
                                We are not liable for indirect, incidental, or consequential damages resulting from the
                                use of our Services
                            </p>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-black font-montreal">8. Termination</h4>
                        <div className="big space-y-6">
                            <p className="big">
                                EngageX® reserves the right to terminate your access for any breach of these Terms
                            </p>
                            <p className="big">Users may deactivate their accounts at any time</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-black font-montreal">9. Governing Law</h4>
                        <p className="big">These Terms are governed by the law</p>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-black font-montreal">10.Contact Us</h4>
                        <p className="big">
                            For any privacy-related concerns, please contact{" "}
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

export default TermsOfService;
