import { Link } from "react-router-dom";

function PrivacyPolicy() {
    return (
        <main className="">
            <div className="space-y-20 py-36 font-montserrat px-10 lg:px-20">
                <h1 className="text-center font-montreal">Privacy policy</h1>
                <div className="space-y-16 text-[#475467]">
                    <p className="big">Effective Date: 05/20/2025</p>
                    <div className="space-y-6">
                        <h4 className="text-black font-montreal">Introduction</h4>
                        <p className="big">
                            Welcome to EngageX<sup>®</sup>. Your privacy is important to us. This Privacy Policy
                            explains how we collect, use, and protect your personal information when you use our
                            AI-powered public speaking and presentation training platform.
                        </p>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-black font-montreal">Information we Collect</h4>
                        <div className="big space-y-2">
                            <p className="big">
                                When using EngageX<sup>®</sup>, we may collect:
                            </p>
                            <p className="big mt-5 font-medium">Personal Information:</p>
                            <p className="big mt-1">Name, email address, and account details</p>
                            <p className="big font-medium mt-2">Session Data:</p>
                            <p className="big mt-1">
                                Audio analysis for AI-driven feedback (not stored beyond 24 hours)
                            </p>
                            <p className="big font-medium mt-2">Usage Information:</p>
                            <p className="big mt-1">
                                Browser type, device information, and interaction data for improving user experience
                            </p>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-black font-montreal">How We Use Your Information</h4>
                        <div className="big space-y-2">
                            <p className="big">
                                EngageX<sup>®</sup> processes collected data to:
                            </p>
                            <p className="mt-5 big">Provide AI-generated feedback on speech performance</p>
                            <p className="flex big items-center gap-x-3 pl-4 mt-3">
                                <div className="h-2 w-2 rounded-full bg-gunmetal" />
                                Improve platform accuracy and user experience
                            </p>
                            <p className="flex big items-center gap-x-3 pl-4">
                                <div className="h-2 w-2 rounded-full bg-gunmetal" />
                                Enable users to download session recordings for personal review
                            </p>
                            <p className="flex big items-center gap-x-3 pl-4">
                                <div className="h-2 w-2 rounded-full bg-gunmetal" />
                                Ensure compliance with security and legal obligations
                            </p>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-black font-montreal">Data Storage & Security</h4>
                        <div className="big space-y-2">
                            <p className="big">
                                At EngageX<sup>®</sup>, protecting your data is a top priority. We implement robust
                                security measures, including:
                            </p>
                            <p className="flex big items-center gap-x-3 pl-4 mt-3">
                                <div className="h-2 w-2 rounded-full bg-gunmetal" />
                                Encryption of session storage and media files using AES encryption standards
                            </p>
                            <p className="flex big items-center gap-x-3 pl-4">
                                <div className="h-2 w-2 rounded-full bg-gunmetal" />
                                Secure authentication using Django's built-in system with securely hashed passwords and
                                role-based access controls to restrict user permissions
                            </p>
                            <p className="flex big items-center gap-x-3 pl-4">
                                <div className="h-2 w-2 rounded-full bg-gunmetal" />
                                All data transmission protected by HTTPS/TLS encryption to safeguard data in transit
                            </p>
                            <p className="flex big items-center gap-x-3 pl-4">
                                <div className="h-2 w-2 rounded-full bg-gunmetal" />
                                Strict network security including private VPC subnet for databases and tightly
                                controlled AWS Security Groups
                            </p>
                            <p className="flex big items-center gap-x-3 pl-4">
                                <div className="h-2 w-2 rounded-full bg-gunmetal" />
                                Automated deletion of session recordings and related data 24 hours after creation,
                                unless downloaded by the user
                            </p>
                            <p className="flex big items-center gap-x-3 pl-4">
                                <div className="h-2 w-2 rounded-full bg-gunmetal" />
                                Use of pre-signed URLs for secure, temporary access to user-uploaded media stored in S3
                                buckets
                            </p>
                            <p className="flex big items-center gap-x-3 pl-4">
                                <div className="h-2 w-2 rounded-full bg-gunmetal" />
                                Continuous monitoring and logging via AWS CloudWatch, GuardDuty, and CloudTrail for
                                enhanced threat detection and audit capabilities
                            </p>
                            <p className="flex big items-center gap-x-3 pl-4">
                                <div className="h-2 w-2 rounded-full bg-gunmetal" />
                                Implementation of Django token-based CSRF protection and rigorous input validations for
                                file uploads
                            </p>
                            <p className="flex big items-center gap-x-3 pl-4">
                                <div className="h-2 w-2 rounded-full bg-gunmetal" />
                                Compliance with industry standards, leveraging AWS's SOC 2 and ISO 27001 certifications
                                to maintain a secure cloud infrastructure
                            </p>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-black font-montreal">Sharing & Third-Party Access</h4>
                        <div className="big space-y-2">
                            <p className="big">
                                EngageX<sup>®</sup> does not sell or share personal data with third parties except:
                            </p>
                            <p className="flex big items-center gap-x-3 pl-4 mt-3">
                                <div className="h-2 w-2 rounded-full bg-gunmetal" />
                                When legally required (e.g., government or law enforcement requests)
                            </p>
                            <p className="flex big items-center gap-x-3 pl-4">
                                <div className="h-2 w-2 rounded-full bg-gunmetal" />
                                To comply with fraud prevention and security monitoring
                            </p>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-black font-montreal">Your Rights & Control</h4>
                        <div className="big space-y-2">
                            <p className="font-medium big">Access & Deletion:</p>
                            <p className="big">You can request access to your stored personal data or its deletion</p>
                            <p className="font-medium mt-2 big">Session Recordings:</p>
                            <p className="big">
                                Once downloaded, EngageX<sup>®</sup> is not responsible for security breaches or misuse
                            </p>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-black font-montreal">Updates to Privacy Policy</h4>
                        <p className="big">
                            We may update this Privacy Policy from time to time. Continued use of EngageX<sup>®</sup>{" "}
                            signifies acceptance of any revisions
                        </p>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-black font-montreal">Contact Us</h4>
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

export default PrivacyPolicy;
