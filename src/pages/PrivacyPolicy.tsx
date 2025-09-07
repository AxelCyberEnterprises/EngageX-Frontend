import { Link } from "react-router-dom";

function PrivacyPolicy() {
    return (
        <main className="">
            <div className="space-y-20 py-36 font-montserrat px-10 lg:px-20">
                <h1 className="text-center font-montreal">Privacy policy</h1>
                <div className="space-y-16 text-[#475467]">
                    <p className="text-lg">Effective Date: 05/20/2025</p>
                    <div className="space-y-6">
                        <h4 className="text-black font-montreal">Introduction</h4>
                        <p className="text-lg">
                            Welcome to EngageX<sup>®</sup>. Your privacy is important to us. This Privacy Policy
                            explains how we collect, use, and protect your personal information when you use our
                            AI-powered public speaking and presentation training platform.
                        </p>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-black font-montreal">Information we Collect</h4>
                        <div className="text-lg space-y-2">
                            <p className="text-lg">
                                When using EngageX<sup>®</sup>, we may collect:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 mt-5">
                                <li>
                                    <span className="font-medium">Personal Information:</span> Name, email address, and
                                    account details
                                </li>
                                <li>
                                    <span className="font-medium">Session Data:</span> Audio analysis for AI-driven
                                    feedback (not stored beyond 24 hours)
                                </li>
                                <li>
                                    <span className="font-medium">Usage Information:</span> Browser type, device
                                    information, and interaction data for improving user experience
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-black font-montreal">How We Use Your Information</h4>
                        <div className="text-lg space-y-2">
                            <p className="text-lg">
                                EngageX<sup>®</sup> processes collected data to:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 mt-5">
                                <li>Provide AI-generated feedback on speech performance</li>
                                <li>Improve platform accuracy and user experience</li>
                                <li>Enable users to download session recordings for personal review</li>
                                <li>Ensure compliance with security and legal obligations</li>
                            </ul>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-black font-montreal">Data Storage & Security</h4>
                        <div className="text-lg space-y-2">
                            <p className="text-lg">
                                At EngageX<sup>®</sup>, protecting your data is a top priority. We implement robust
                                security measures, including:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 mt-5">
                                <li>Encryption of session storage and media files using AES encryption standards</li>
                                <li>
                                    Secure authentication using Django's built-in system with securely hashed passwords
                                    and role-based access controls to restrict user permissions
                                </li>
                                <li>
                                    All data transmission protected by HTTPS/TLS encryption to safeguard data in transit
                                </li>
                                <li>
                                    Strict network security including private VPC subnet for databases and tightly
                                    controlled AWS Security Groups
                                </li>
                                <li>
                                    Automated deletion of session recordings and related data 24 hours after creation,
                                    unless downloaded by the user
                                </li>
                                <li>
                                    Use of pre-signed URLs for secure, temporary access to user-uploaded media stored in
                                    S3 buckets
                                </li>
                                <li>
                                    Continuous monitoring and logging via AWS CloudWatch, GuardDuty, and CloudTrail for
                                    enhanced threat detection and audit capabilities
                                </li>
                                <li>
                                    Implementation of Django token-based CSRF protection and rigorous input validations
                                    for file uploads
                                </li>
                                <li>
                                    Compliance with industry standards, leveraging AWS's SOC 2 and ISO 27001
                                    certifications to maintain a secure cloud infrastructure
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-black font-montreal">Sharing & Third-Party Access</h4>
                        <div className="text-lg space-y-2">
                            <p className="text-lg">
                                EngageX<sup>®</sup> does not sell or share personal data with third parties except:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 mt-5">
                                <li>When legally required (e.g., government or law enforcement requests)</li>
                                <li>To comply with fraud prevention and security monitoring</li>
                            </ul>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-black font-montreal">Your Rights & Control</h4>
                        <div className="text-lg space-y-2">
                            <ul className="list-disc pl-5 space-y-2">
                                <li>
                                    <span className="font-medium">Access & Deletion:</span> You can request access to
                                    your stored personal data or its deletion
                                </li>
                                <li>
                                    <span className="font-medium">Session Recordings:</span> Once downloaded, EngageX
                                    <sup>®</sup> is not responsible for security breaches or misuse
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-black font-montreal">Updates to Privacy Policy</h4>
                        <p className="text-lg">
                            We may update this Privacy Policy from time to time. Continued use of EngageX<sup>®</sup>{" "}
                            signifies acceptance of any revisions
                        </p>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-black font-montreal">Contact Us</h4>
                        <p className="text-lg">
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

export default PrivacyPolicy;
