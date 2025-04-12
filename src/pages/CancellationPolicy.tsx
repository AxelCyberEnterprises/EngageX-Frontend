import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

function CancellationPolicy() {
  return (
    <main className="">
      <Navbar />
      <div className="space-y-20 py-36 font-montserrat px-10 lg:px-20">
        <h1 className="text-center font-montreal">
          Our cancellation & refund Policy
        </h1>
        <div className="space-y-16 text-[#475467]">
          <div className="space-y-5">
            <p className="big">EngageX™ Cancellation & Refund Policy</p>
            <p className="big">Effective Date: 03/27/2025</p>
            <p className="big">
              Thank you for choosing EngageX™, a service provided by Career
              Doctor, LLC. Please review our cancellation and refund terms
              carefully. <br />
              All purchases made through EngageX™ are final and non-refundable.
              Due to the nature of our services, which include but are not
              limited to consultations, digital resources, personalized career
              strategy sessions, and proprietary content, we do not offer
              refunds or returns for any reason, including cancellation of
              services.
            </p>
          </div>
          <div className="space-y-6">
            <h4 className="text-black font-montreal">
              By purchasing our services, you acknowledge and agree to the
              following:
            </h4>
            <p className="big">
              All payments are non-refundable, and no credits or exchanges will
              be issued once a transaction has been completed.
            </p>
            <p className="big">
              Should you choose to discontinue services, any remaining sessions
              or offerings will be forfeited, and no partial refunds will be
              provided.
            </p>
            <p className="big">
              Career Doctor, LLC reserves the right, in its sole discretion, to
              consider exceptional circumstances; however, such consideration
              does not constitute a waiver of this policy.
            </p>
          </div>

          <div className="space-y-6">
            <p className="big">
              We appreciate your understanding of our policy, which enables us
              to deliver consistent and high-quality services to all clients.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default CancellationPolicy;
