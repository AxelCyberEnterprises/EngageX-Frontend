import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

function PrivacyPolicy() {
  return (
    <main className="">
      <Navbar />
      <div className="space-y-20 py-36 font-montserrat px-10 lg:px-20">
        <h1 className="text-center font-montreal">Privacy policy</h1>
        <div className="space-y-16 text-[#475467]">
          <p className="big">Effective Date: 03/27/2025</p>
          <div className="space-y-6">
            <h4 className="text-black font-montreal">Introduction</h4>
            <p className="big">
              Welcome to EngageX™. Your privacy is important to us. This Privacy
              Policy explains how we collect, use, and protect your personal
              information when you use our AI-powered public speaking and
              presentation training platform.
            </p>
          </div>
          <div className="space-y-6">
            <h4 className="text-black font-montreal">Information we Collect</h4>
            <p className="big">
              <p>When using EngageX™, we may collect:</p>
              <p className="mt-5 font-medium">Personal Information:</p>
              <p className="big mt-1">
                Name, email address, and account details.
              </p>
              <p className="big font-medium mt-2">Session Data:</p>{" "}
              <p className="big mt-1">
                Audio analysis for AI-driven feedback (not stored beyond 24
                hours).
              </p>
              <p className="big font-medium mt-2">Usage Information: </p>
              <p className="big mt-1">
                Browser type, device information, and interaction data for
                improving user experience.
              </p>
            </p>
          </div>
          <div className="space-y-6">
            <h4 className="text-black font-montreal">
              How We Use Your Information
            </h4>
            <div className="big">
              <p className="big">EngageX™ processes collected data to:</p>
              <p className="mt-5 big">
                Provide AI-generated feedback on speech performance.
              </p>
              <p className="flex big items-center gap-x-3 pl-4 mt-3">
                <div className="h-2 w-2 rounded-full bg-gunmetal" />
                Improve platform accuracy and user experience.
              </p>{" "}
              <p className="flex big items-center gap-x-3 pl-4">
                <div className="h-2 w-2 rounded-full bg-gunmetal" />
                Enable users to download session recordings for personal review.
              </p>
              <p className="flex big items-center gap-x-3 pl-4">
                <div className="h-2 w-2 rounded-full bg-gunmetal" />
                Ensure compliance with security and legal obligations.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="text-black font-montreal">
              Data Storage & Security
            </h4>
            <div className="big">
              <p className="big">EngageX™ processes collected data to:</p>
              <p className="flex big items-center gap-x-3 pl-4 mt-3">
                <div className="h-2 w-2 rounded-full bg-gunmetal" />
                EngageX™ does not permanently store your session recordings.
              </p>
              <p className="flex big items-center gap-x-3 pl-4">
                <div className="h-2 w-2 rounded-full bg-gunmetal" />
                All session recordings are deleted after 24 hours unless
                downloaded.
              </p>
              <p className="flex big items-center gap-x-3 pl-4">
                <div className="h-2 w-2 rounded-full bg-gunmetal" />
                We use encryption and security measures to protect your data.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="text-black font-montreal">
              Sharing & Third-Party Access
            </h4>
            <div className="big">
              <p className="big">
                EngageX™ does not sell or share personal data with third parties
                except:
              </p>
              <p className="flex big items-center gap-x-3 pl-4 mt-3">
                <div className="h-2 w-2 rounded-full bg-gunmetal" />
                When legally required (e.g., government or law enforcement
                requests).
              </p>
              <p className="flex big items-center gap-x-3 pl-4">
                <div className="h-2 w-2 rounded-full bg-gunmetal" />
                To comply with fraud prevention and security monitoring
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="text-black font-montreal">Your Rights & Control</h4>
            <div className="big">
              <p className="font-medium">Access & Deletion:</p>
              <p>
                You can request access to your stored personal data or its
                deletion.
              </p>
              <p className="font-medium mt-2">Session Recordings:</p>
              <p>
                Once downloaded, EngageX™ is not responsible for security
                breaches or misuse.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="text-black font-montreal">
              Updates to Privacy Policy
            </h4>
            <p className="big">
              We may update this Privacy Policy from time to time. Continued use
              of EngageX™ signifies acceptance of any revisions.
            </p>
          </div>
          <div className="space-y-6">
            <h4 className="text-black font-montreal">Contact Us</h4>
            <p className="big">
              For any privacy-related concerns, please contact
              <span className="font-medium ml-2">support@engagex.com</span>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default PrivacyPolicy;
