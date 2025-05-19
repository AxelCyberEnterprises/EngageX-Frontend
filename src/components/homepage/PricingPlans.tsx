import CheckIcon from "@/assets/images/svgs/check";
import { useState, useEffect } from "react";
import axios from "axios";
import { usePaymentInfo } from "@/hooks/settings"; // Import your hook
import { Skeleton } from "@/components/ui/skeleton"; // Import shadcn Skeleton component
import { useSelector } from "react-redux";
import { RootState } from "@/store/rootReducer";

interface Plan {
  type: string;
  price: number;
  sessions: number;
  contents: string[];
  buttonText: string;
  highlight: boolean;
  sessionColor: string;
  tier: string;
  priceId: string;
}

const PricingCards = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { data: paymentInfo, isLoading: loadingPaymentInfo } = usePaymentInfo();
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [plans, setPlans] = useState<Plan[]>([
    {
      type: "STARTER PLAN",
      price: 180,
      sessions: 4,
      contents: ["Great for testing.", "Ideal for trials."],
      buttonText: "Select Starter Plan",
      highlight: false,
      sessionColor: "text-[#64BA9F]",
      tier: "starter",
      priceId: ""
    },
    {
      type: "GROWTH PLAN",
      price: 240,
      sessions: 6,
      contents: ["Perfect for specific goals.", "For mid-level professionals."],
      buttonText: "Choose Growth Plan",
      highlight: true,
      sessionColor: "text-amber-500",
      tier: "growth",
      priceId: ""
    },
    {
      type: "PRO PLAN",
      price: 288,
      sessions: 8,
      contents: ["Best for steady progress.", "Great for preparation."],
      buttonText: "Go Pro",
      highlight: false,
      sessionColor: "text-[#64BA9F]",
      tier: "pro",
      priceId: ""
    },
    {
      type: "ULTIMATE PLAN",
      price: 396,
      sessions: 12,
      contents: [
        "Best for long-term growth",
        "Ideal for professionals.",
        "Includes exclusive bonus.",
      ],
      buttonText: "Get the Ultimate Plan",
      highlight: false,
      sessionColor: "text-[#64BA9F]",
      tier: "ultimate",
      priceId: ""
    },
  ]);
  
  useEffect(() => {
    if (!loadingPaymentInfo && paymentInfo?.tiers) {
      if (!paymentInfo.is_configured || !paymentInfo.tiers) {
        setError('Payment system is not currently configured. Please try again later.');
        return;
      }
      setPlans(prevPlans => 
        prevPlans.map(plan => {
          const tierData = paymentInfo.tiers[plan.tier];
          if (tierData) {
            return {
              ...plan,
              priceId: tierData.priceId,
              sessions: tierData.credits
            };
          }
          return plan;
        })
      );
    }
  }, [paymentInfo, loadingPaymentInfo]);
  

  const handleCheckout = async (plan: Plan) => {
    if (processingId || !plan.priceId) return;
    
    // Check if Stripe is configured
    if (!paymentInfo?.is_configured) {
      setError('Payment system is not currently configured. Please try again later.');
      return;
    }
    
    setProcessingId(plan.tier);
    setError(null);
    
    try {      
      const response = await axios.post('https://api.engagexai.io/payments/checkout/', {
        priceId: plan.priceId,
        email: user?.email,
        tier: plan.tier,
        success_url: paymentInfo?.success_url,
        cancel_url: paymentInfo?.cancel_url
      });
      
      if (response.data && response.data.url) {
        window.location.href = response.data.url;
      } else {
        throw new Error('Invalid response from checkout API');
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
      const errorMessage = err.response?.data?.error || 'An error occurred during checkout. Please try again.';
      setError(errorMessage);
      setProcessingId(null);
    }
  };

  // Render loading state with skeletons
  if (loadingPaymentInfo) {
    return (
      <div className="font-montreal grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-x-6 gap-y-10 w-full max-w-6xl mx-auto font-normal rounded-[20px]">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="relative flex-1 rounded-3xl p-6 flex flex-col justify-between border border-[#BDBDBD]">
            <div className="space-y-8">
              <div className="space-y-4 border-b border-[#1A1A1A] pb-6">
                <div className="flex justify-between">
                  <Skeleton className="h-8 w-24 rounded-lg" />
                  <Skeleton className="h-6 w-28 rounded-md" />
                </div>
                <div className="flex flex-col gap-2 items-start mt-4">
                  <Skeleton className="h-10 w-36 rounded-md" />
                  <Skeleton className="h-4 w-32 rounded-md" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Skeleton className="h-5 w-5 rounded-full mr-3" />
                  <Skeleton className="h-4 w-48 rounded-md" />
                </div>
                <div className="flex items-center">
                  <Skeleton className="h-5 w-5 rounded-full mr-3" />
                  <Skeleton className="h-4 w-36 rounded-md" />
                </div>
                {index === 3 && (
                  <div className="flex items-center">
                    <Skeleton className="h-5 w-5 rounded-full mr-3" />
                    <Skeleton className="h-4 w-42 rounded-md" />
                  </div>
                )}
              </div>
            </div>
            
            <Skeleton className="h-10 w-full rounded-lg mt-10" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="font-montreal grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-x-6 gap-y-10 w-full max-w-6xl mx-auto font-normal rounded-[20px]">
      {error && (
        <div className="lg:col-span-4 sm:col-span-2 col-span-1">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        </div>
      )}

      {/* Display a message if payment system is not configured */}
      {!loadingPaymentInfo && (!paymentInfo?.is_configured || !paymentInfo?.tiers) && !error && (
        <div className="lg:col-span-4 sm:col-span-2 col-span-1">
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative">
            Payment system is currently unavailable. Please try again later or contact support.
          </div>
        </div>
      )}

      {plans.map((plan, index) => (
        <div
          key={index}
          className={`relative flex-1 rounded-3xl p-6 flex flex-col justify-between duration-700 hover:bg-[#262B3A] hover:stroke-white hover:border-none hover:text-[#EFF6FC] group
            ${plan.highlight
              ? "bg-[#262B3A] text-white z-10"
              : "lg:bg-transparent border border-[#BDBDBD]"
            }`}
        >
          {plan.highlight && (
            <div className="absolute -top-4 lg:right-0 sm:right-auto right-0 lg:ml-0 sm:ml-5 ml-0 lg:mr-0 sm:mr-0 mr-5 lg:left-0 flex justify-center">
              <div className="px-4 md:py-[5px] py-1 bg-[#EFF6FC] text-[#262B3A] rounded-full flex items-center text-sm">
                <span className="mr-1">🔥</span> Recommended
              </div>
            </div>
          )}
          
          {plan.tier === "tester" && (
            <div className="absolute -top-4 lg:right-0 sm:right-auto right-0 lg:ml-0 sm:ml-5 ml-0 lg:mr-0 sm:mr-0 mr-5 lg:left-0 flex justify-center">
              <div className="px-4 md:py-[5px] py-1 bg-blue-100 text-blue-800 rounded-full flex items-center text-sm">
                <span className="mr-1">🚀</span> Quick Start
              </div>
            </div>
          )}

          <div className="space-y-8">
            <div className="space-y-4 border-b border-[#1A1A1A] pb-6">
              <div className="flex justify-between text-xs">
                <div className="bg-opacity-20 bg-[#B5B5B529] rounded-lg px-4 py-2 inline-block">
                  {plan.type}
                </div>
                <div
                  className={`${plan.highlight ? "text-[#ECB25E]" : "text-[#64BA9F]"
                    } group-hover:text-[#ECB25E] my-auto`}
                >
                  {plan.sessions} SESSIONS
                </div>
              </div>
              <div>
                <div
                  className={`flex flex-col gap-2 items-start mt-2 ${plan.highlight && "text-[#EFF6FC]"
                    }`}
                >
                  <span className="md:text-5xl text-4xl font-bold">
                    ${plan.price}
                  </span>
                  <span className="ml-2 font-light"> Valid for 1 year</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {plan.contents.map((content, idx) => (
                <div
                  key={idx}
                  className="flex items-center font-light sm:text-base text-sm"
                >
                  <div
                    className={`mr-3 ${plan.highlight
                        ? ""
                        : "text-[#64BA9F] group-hover:text-white"
                      }`}
                  >
                    <CheckIcon
                      strokeColor={plan.highlight ? "#ECB25E" : "#64BA9F"}
                    />
                  </div>
                  <span>{content}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => handleCheckout(plan)}
            disabled={!!processingId || !plan.priceId || !paymentInfo?.is_configured}
            className={`text-center text-sm mt-10 w-full py-3 rounded-lg group-hover:bg-alice-blue group-hover:text-black
            ${plan.highlight
                ? "bg-white text-slate-800"
                : "bg-slate-400 text-white group-hover:bg-alice-blue group-hover:text-black"
              } ${(processingId === plan.tier || !plan.priceId || !paymentInfo?.is_configured) ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {processingId === plan.tier ? "Processing..." : plan.buttonText}
          </button>
        </div>
      ))}
    </div>
  );
};

export default PricingCards;