import React from "react";
import { useNavigate } from "react-router-dom";

const SafetyPrivacy: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <section className="w-full border-y flex flex-col items-start text-[#262b3a] px-7 py-2 gap-2 ">
        <button
          className="bg-transparent text-black flex gap-1  hover:bg-transparent p-0 justify-start text-sm items-center"
          onClick={() => navigate(-1)}
        >
          <svg
            width="17"
            height="18"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 12.8945L11 6.89453M5 12.8945L11 18.8945M5 12.8945H19"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="mt-0.5">Back</p>
        </button>

        <div>
          <p className=" text-xl font-[Neue Montreal]">Safety & Privacy</p>
          <p className="  text-[rgba(71,77,99,1)] text-sm">
            EngageX™ safety and privacy terms
          </p>
        </div>
      </section>
      <section className="px-7 py-5 max-sm:pt-10 leading-6">
        <article className="font-[montserrat]">
          <p className="font-semibold text-xl">Welcome to EngageX™!</p>
          <main className="font-medium">
            <p className="my-2.5">
              By using our platform, you acknowledge that you have read,
              understood, and agreed to this User-Level Agreement (ULA), which
              governs your access and use of our AI-powered public speaking and
              presentation practice environment.
            </p>
            <p className="my-1.5">
              By clicking “I Agree” and providing your initials, you confirm
              your acceptance of these terms.
            </p>
            <ol className="list-decimal">
              <li className="my-12">
                <span className="mb-2">Introduction</span>
                <p className="my-2">
                  Welcome to EngageX™! By using our platform, you acknowledge
                  that you have read, understood, and agreed to this User-Level
                  Agreement (ULA), which governs your access and use of our
                  AI-powered public speaking and presentation practice
                  environment.
                </p>
                <p className="my-2">
                  By clicking “I Agree” and providing your initials, you confirm
                  your acceptance of these terms.
                </p>
              </li>

              <li className="my-12">
                <span className="mb-2">Acceptable Use Policy</span>

                <p className="my-2">
                  EngageX™ is designed for public speaking, presentation
                  practice, and AI-generated feedback. You agree to:
                </p>
                <ul className="leading-8 list-disc">
                  <li> Use the platform only for its intended purpose.</li>
                  <li> Respect the integrity of AI-generated evaluations.</li>
                  <li>
                    {" "}
                    Maintain professionalism and avoid offensive or unlawful
                    content.
                  </li>
                  <li>
                    {" "}
                    Refrain from attempting to reverse-engineer, manipulate, or
                    misuse AI-generated insights.
                  </li>
                </ul>
                <p className="my-2">
                  We reserve the right to suspend or terminate accounts that
                  violate these policies.
                </p>
              </li>

              <li className="my-12">
                <span className="mb-2">AI-Generated Feedback Disclaimer</span>

                <p className="my-2">
                  EngageX™ utilizes AI-powered systems to analyze your speech
                  and provide feedback.
                </p>
                <ul className="leading-8 list-disc">
                  <li>
                    {" "}
                    AI-generated feedback is advisory only and does not
                    constitute professional coaching.
                  </li>
                  <li>
                    {" "}
                    AI does not store your session content for learning
                    purposes—only for generating feedback.
                  </li>
                  <li>
                    {" "}
                    While we analyze vocal patterns to improve evaluations, this
                    is strictly for enhancing session accuracy and not for
                    long-term AI model training.
                  </li>
                </ul>

                <p className="my-2">
                  EngageX™ is not responsible for any decisions made based on AI
                  feedback.
                </p>
              </li>

              <li className="my-12">
                <span className="mb-2">Confidentiality of Personal Data</span>

                <p className="my-2">Your privacy is our priority.</p>

                <ul className="leading-8 list-disc">
                  <li>
                    EngageX™ does not share personal information, session
                    recordings, or analytics with third parties, except where
                    required by law.
                  </li>
                  <li>
                    Data collected is used only to generate your session
                    feedback and is not stored for AI training.
                  </li>
                  <li>
                    After 24 hours, all session recordings are automatically
                    deleted from our systems.
                  </li>
                </ul>

                <p className="my-2">
                  Once a session recording is downloaded by you, EngageX™ is not
                  liable for its confidentiality, security, or misuse.
                </p>
              </li>

              <li className="my-12">
                <span className="mb-2">
                  Terms for Session Recording & Downloading
                </span>

                <p className="my-2">
                  EngageX™ offers session recording & download features for your
                  convenience.
                </p>
                <ul className="leading-8 list-disc">
                  <li>
                    Coaching & Evaluation: Your session recordings may be shared
                    with a coach of your choosing for feedback.
                  </li>
                  <li>
                    Limited Storage: EngageX™ stores session recordings for 24
                    hours only before permanent deletion.
                  </li>
                  <li>
                    User Responsibility: Once downloaded, EngageX™ is not
                    responsible for data security, loss, or compromise.
                  </li>
                </ul>
                <p className="my-2">
                  You accept full responsibility for the storage and usage of
                  downloaded session recordings.
                </p>
              </li>

              <li className="my-12">
                <span className="mb-2">Legal & Liability Protection</span>

                <p className="my-2">
                  EngageX™ is provided "as is" without warranties of any kind.
                </p>
                <p className="my-2">EngageX™ is not liable for any:</p>
                <ul className="leading-8 ml-2 list-disc">
                  <li>Misinterpretation of AI feedback.</li>
                  <li>Data loss due to expired session storage.</li>
                  <li>Third-party misuse of downloaded content.</li>
                  <li>
                    Performance outcomes based on our platform’s analysis.
                  </li>
                </ul>
                <p className="my-2">
                  By using EngageX™, you waive the right to frivolous lawsuits
                  or claims seeking damages beyond platform usage fees.
                </p>
              </li>
            </ol>
          </main>
        </article>
      </section>
      <section className="pt-4 sm:my-9 mt-3 mb-20 max-lg:pb-2 max-sm:pb-0 px-7 relative sm:border-t bottom-1 w-full">
        <button
          onClick={() => navigate(-1)}
          className="flex gap-1.5 text-white max-sm:w-full sm:absolute right-7 top-2 px-4 justify-center py-2.5 sm:py-1.5"
        >
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.5 11.8945H7.914L12.414 7.39447L11 5.98047L4.086 12.8945L11 19.8085L12.414 18.3945L7.914 13.8945H19.5V11.8945Z"
              fill="white"
            />
          </svg>
          Back
        </button>
      </section>
    </div>
  );
};

export default SafetyPrivacy;
