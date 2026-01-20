"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { RootState } from "@/store";
import { hide, toggle } from "@/store/slices/floatingChatbotSlice";
import { Headset, Minus, PlusIcon, Search, X } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

interface FaqItem {
    question: string;
    answer: string;
}

const faqs: FaqItem[] = [
    {
        question: "My company's pilot program has ended. Can I keep using the application on my own?",
        answer: "Yes. If you wish to continue as an individual subscriber: 1. Contact info@engageXai.io to request an individual subscription. 2. Once your payment status is confirmed, we will update your profile. 3. You will immediately regain access to sessions, even if your company credit balance is zero.",
    },
    {
        question: "I am unable to log in and my account seems to be deactivated. What should I do?",
        answer: "Your account may have been temporarily paused by an administrator. To resolve this: 1. Reach out to your organization’s administrator or info@engageXai.io. 2. Request an account reactivation. 3. They can instantly toggle your status back to 'Active' to restore your login access.",
    },
    {
        question: "I have lost access to the email address registered to my account. How can I change it?",
        answer: "For your security, this requires a manual verification process. Please follow these steps: 1. Contact info@engageXai.io directly via phone or our helpdesk. 2. Be prepared to verify your identity (we may ask to speak with you briefly). 3. Once verified, an administrator will securely update your profile to your new email address so you can log in again.",
    },
    {
        question: "What is the Session Improvement area in EngageX<sup>®</sup>?",
        answer: "The Session Improvement area is your personal training zone designed to enhance your speaking performance using various improvement features. You begin by clicking Session Improvement in your dashboard, where you can access options to create or continue Performance Improvement Sequences.",
    },
    {
        question: "What is a New Performance Improvement Sequence?",
        answer: "It allows you to create a completely new Improvement Sequence from a previous session, independent of any sequences you may have started before.",
    },
    {
        question: "What does continuing an existing Performance Improvement Sequence do?",
        answer: "It lets you create a new Improvement Session within an existing Sequence, helping you improve how you deliver content you have already used.",
    },
    {
        question: "How do I create a new Improvement Sequence for a session I haven't improved before?",
        answer: "Select one of your previous sessions, name your new session, click Continue, and then begin your new Improvement Sequence to start improving.",
    },
    {
        question: "What does the Engage X personalized report summary include?",
        answer: "The personalized report summary provides feedback based on the goals you set, benchmarks aligned with industry standards and communication strategy, session duration, audience engagement metrics, vocal variety, structure, clarity, body language, filler word usage, grammar, and a comprehensive feedback summary including slides if uploaded.",
    },
    {
        question: "How long should my speaking session be for different verticals?",
        answer: "Recommended timeframes are: Public speaking - 3 to 5 minutes, Storytelling - 2 to 3 minutes, Pitch - 5 to 7 minutes, and Presentations - 10 to 15 minutes maximum to maintain audience attention.",
    },
    {
        question: "What happens when I download my full report and video?",
        answer: "After downloading, the video will no longer be available in the system for privacy reasons, but your report and session feedback will remain accessible.",
    },
    {
        question: "How can I get additional help reviewing my feedback?",
        answer: "You can use the “speak with a live coach” button to schedule a one-on-one session with a certified coach for detailed feedback review and expert guidance.",
    },
    {
        question: "What key metrics does the Engage X<sup>®</sup> report evaluate to measure my speaking performance?",
        answer: "The report evaluates overall captured impact through audience engagement, emotional triggers, vocal variety (volume, pitch, pace, pauses), structure, clarity, body language, brevity, filler word usage, proper grammar, and provides a feedback summary including slide review if applicable.",
    },
    {
        question: "How do I book a session with a live certified coach?",
        answer: "To book a session, you must first complete a session from any of the five featured vertical offerings. After your session is complete and your report appears, click the 'Speak with a Coach' button in the upper right-hand corner of the report, then select your appointment time from the available slots.",
    },
    {
        question: "Can I reschedule a missed coaching appointment?",
        answer: "No, missed appointments cannot be rescheduled. If you miss your session, you will need to book a new one.",
    },
    {
        question: "How many coaching sessions am I allowed per session completed?",
        answer: "You are granted only one coaching session per completed session.",
    },
    {
        question: "What should I do after booking a coaching session?",
        answer: "After booking, check your email to accept the meeting invitation and review your calendar in Google, Outlook, or iOS to ensure the session appears.",
    },
    {
        question: "What are the three main session types available on EngageX<sup>®</sup>?",
        answer: "The three main session types are public speaking, presentation practice, and pitch practice.",
    },
    {
        question: "Can I add a session name to my practice session on EngageX<sup>®</sup>?",
        answer: "Yes, you can add a session name of your choice to help you reference the session later.",
    },
    {
        question: "Is it possible to upload slides for presentation or pitch practice?",
        answer: "Yes, you can drag and drop or upload PowerPoint files for both presentation practice and pitch practice. Make sure to order the slides according to your speech before uploading.",
    },
    {
        question: "What is the purpose of enabling AI audience-generated session questions?",
        answer: "Enabling AI audience-generated session questions allows you to receive questions that fit your talk best, helping you practice answering audience questions during your session.",
    },
    {
        question: "How can speaker or slide notes be used during sessions?",
        answer: "For public speaking, you can add and segment speaker notes into phases to stay organized during delivery. For pitch practice, you can add slide notes below each slide to stay on message.",
    },
    {
        question: "What is the purpose of the EngageX<sup>®</sup> homepage?",
        answer: "The EngageX<sup>®</sup> homepage serves as a launchpad for dynamic engagement and enterprise-ready solutions.",
    },
    {
        question: "What can I find in the main navigation menu?",
        answer: "The main navigation menu includes Home, Features, Pricing, Contact, Login, and Get Started.",
    },
    {
        question: "What does the Features section provide?",
        answer: "The Features section gives a quick tour of what EngageX<sup>®</sup> can do.",
    },
    {
        question: "Where can I find pricing information?",
        answer: "Pricing shares options tailored to your personal needs or for a team.",
    },
    {
        question: "How do I get in touch with support or start using EngageX<sup>®</sup>?",
        answer: "You can contact support through the Contact section, and start your journey by clicking the Get Started button.",
    },
    {
        question: "What is the purpose of the Features page on EngageX<sup>®</sup>?",
        answer: "The Features page expands your awareness of the five distinct verticals EngageX<sup>®</sup> offers to support communication mastery across industries.",
    },
    {
        question: "How many verticals does EngageX<sup>®</sup> offer to support communication mastery?",
        answer: "EngageX<sup>®</sup> offers five distinct verticals to support communication mastery across industries.",
    },
    {
        question: "What additional information can I find on the Features page besides the five verticals?",
        answer: "You can discover new and upcoming offerings as well as exciting innovations that set EngageX<sup>®</sup> apart from anything else on the market.",
    },
    {
        question: "What makes EngageX<sup>®</sup> stand out from other communication tools?",
        answer: "EngageX<sup>®</sup> features exciting innovations that differentiate it from anything else available on the market.",
    },
    {
        question: "What pricing models does EngageX<sup>®</sup> offer?",
        answer: "EngageX<sup>®</sup> offers a range of pricing models designed for both individuals and enterprise teams of 10 or more.",
    },
    {
        question: "Which EngageX<sup>®</sup> plan is the most popular?",
        answer: "The growth plan is the most popular option, offering the best balance of value and features.",
    },
    {
        question: "Can I compare EngageX<sup>®</sup> pricing with competitors on this page?",
        answer: "Yes, this page shows how EngageX<sup>®</sup> stacks up against the competition so you can see why it leads in communication mastery.",
    },
    {
        question: "Is EngageX<sup>®</sup> suitable for enterprise teams?",
        answer: "Yes, EngageX<sup>®</sup> offers pricing models specifically designed for enterprise teams of 10 or more.",
    },
    {
        question: "What is highlighted as a key benefit of the EngageX<sup>®</sup> pricing page?",
        answer: "The page highlights the popular growth plan and provides a comparison against competitors to showcase EngageX<sup>®</sup>'s advantages.",
    },
    {
        question: "How do I sign up for EngageX<sup>®</sup>?",
        answer: "Click sign up, then enter your name, email, and a strong password with at least one unique character.",
    },
    {
        question: "What should I do after entering my sign-up details?",
        answer: "Hit get started, and you will receive a one-time verification code sent to your email.",
    },
    {
        question: "How do I verify my EngageX<sup>®</sup> account?",
        answer: "Enter the one-time verification code sent to the email you provided during sign-up.",
    },
    {
        question: "What happens after my email is verified?",
        answer: "You will be prompted to select your desired vertical and career level.",
    },
    {
        question: "What is the next step after selecting my vertical and career level?",
        answer: "You will be directed to a welcome video from the founder, officially starting your journey with EngageX<sup>®</sup>.",
    },
    {
        question: "How do I access the central hub of the EngageX<sup>®</sup> platform?",
        answer: "Click the word 'dashboard' in the menu to be guided directly to the central hub of the platform.",
    },
    {
        question: "What should I do if I experience issues or feel uncertain while using the dashboard?",
        answer: "Click the 'Need Help Navigating' button located in the upper right-hand corner of the page for assistance.",
    },
    {
        question: "What features can I access from my EngageX<sup>®</sup> dashboard?",
        answer: "You can buy additional session credits, select your communication vertical, view your session history, performance, and progress, and compare past sessions to see your growth over time.",
    },
    {
        question: "Can I track my goals and achievements on the dashboard?",
        answer: "Yes, the dashboard allows you to track your goals and achievement mastery to help you stay on top of your daily progress and personal development.",
    },
    {
        question: "What is the purpose of the EngageX<sup>®</sup> dashboard?",
        answer: "The dashboard serves as the central hub where your journey comes to life by providing access to various tools and progress tracking features.",
    },
];

function FloatingChatbot() {
    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch();
    const { isOpen } = useSelector((state: RootState) => state.floating_chatbot);

    const filteredFaqs = faqs.filter(
        ({ question, answer }) =>
            question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            answer.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    return (
        <>
            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => dispatch(hide())} />
                    <div className="fixed md:bottom-25 bottom-0 md:right-25 md:size-auto size-full z-60 md:max-w-3/5 flex flex-col gap-6 md:p-6 p-4 bg-alice-blue text-[#1F253F] md:rounded-xl">
                        <div className="md:hidden ml-auto size-6 grid place-content-center cursor-pointer hover:bg-[#6B7280]/20 rounded-full transition-colors">
                            <X className="text-[#6B7280] size-5" onClick={() => dispatch(hide())} />
                        </div>
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search FAQs..."
                                className="w-full h-11 rounded-lg pl-10 pr-4 py-2 text-sm border border-[#1F253F]/50 focus-visible:border-[#1F253F] transition-colors text-[#1F253F] placeholder:text-[#6B7280]"
                            />
                        </div>

                        <div className=" md:max-h-80 h-full flex flex-col md:flex-row md:gap-6 gap-4 overflow-hidden">
                            <div className="w-full md:w-1/2">
                                <video className="size-full md:min-h-80 object-cover rounded-xl" controls>
                                    <source
                                        src="https://EngageX-user-content-1234.s3.us-west-1.amazonaws.com/static-videos/Chatbot+greeting2.mp4"
                                        type="video/mp4"
                                    />
                                </video>
                            </div>

                            <div className="w-full md:w-1/2 md:h-auto h-full flex flex-col justify-between gap-3 overflow-hidden">
                                <Accordion
                                    type="single"
                                    collapsible
                                    className="flex flex-col gap-2 h-full rounded-xl overflow-auto scrollbar-thin [scrollbar-color:var(--color-branding-secondary)_transparent] scrollbar-track-transparent"
                                >
                                    {filteredFaqs.length === 0 ? (
                                        <div className="p-4 rounded-xl bg-white">
                                            <p>No results found.</p>
                                        </div>
                                    ) : (
                                        filteredFaqs.map(({ answer, question }, index) => (
                                            <AccordionItem
                                                key={question + index}
                                                value={"item-" + index}
                                                className="grid gap-1 p-4 border-b-0 rounded-xl bg-white"
                                            >
                                                <AccordionTrigger className="group py-0 bg-transparent font-normal *:data-[slot='accordion-chevron']:hidden justify-start items-center cursor-pointer hover:no-underline transition">
                                                    <PlusIcon className="size-4 text-[#6B7280] shrink-0 group-data-[state=open]:hidden" />
                                                    <Minus className="size-4 text-[#6B7280] shrink-0 group-data-[state=closed]:hidden" />
                                                    <h6 className="text-[#1F253F] text-base leading-normal">
                                                        <p dangerouslySetInnerHTML={{ __html: question }} />
                                                    </h6>
                                                </AccordionTrigger>
                                                <AccordionContent className="text-[15px] pb-0 pl-8">
                                                    <p dangerouslySetInnerHTML={{ __html: answer }} />
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))
                                    )}
                                </Accordion>

                                <p className="text-base [&>a]:underline [&>a]:underline-offset-2">
                                    To contact us directly:{" "}
                                    <Link to="mailto:info@EngageXai.io" className="text-primary">
                                        info@EngageXai.io
                                    </Link>{" "}
                                    or{" "}
                                    <Link to="mailto:support@EngageXai.io" className="text-primary">
                                        support@EngageXai.io
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            )}
            <Button
                className="size-16 shadow-xl rounded-full z-50 bg-branding-secondary hover:bg-branding-secondary fixed bottom-10 right-10"
                onClick={() => dispatch(toggle())}
            >
                <Headset className="size-6 text-white" />
            </Button>
        </>
    );
}

export default FloatingChatbot;
