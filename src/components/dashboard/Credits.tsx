import { useState } from 'react'
import PricingCards from '../homepage/PricingPlans'
import GetInTouch from '../help/GetInTouch';
import ActionModal from "@/components/modals/modalVariants/ActionModal";
import circleCheck from "../../assets/images/svgs/circle-check.svg";

const Credits = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <GetInTouch isOpen={isOpen} setIsOpen={setIsOpen} />
      <ActionModal
        show={false}
        onClose={() => {}}
        icon={circleCheck}
        head="Payment Successful"
        message="Your credit has been successfully processed! Thank you for your transaction."
        cta="Go to Home"
        ctaClassName="border border-[#D5D7DA] text-[#FFFFFF]"
      />
      <ActionModal
        show={false}
        onClose={() => {}}
        icon={circleCheck}
        head="Payment Successful"
        message="Your credit has been successfully processed! Thank you for your transaction."
        cta="Go to Home"
        ctaClassName="border border-[#D5D7DA] text-[#FFFFFF]"
      />
      <div>
        <div className='py-8'>
          <h2 className="text-xl font-medium">Session Credits</h2>
          <p className="text-sm text-[#6F7C8E] mb-6">Maintain your account through buying credits, simple pricing. No hidden fees.</p>
        </div>
        <PricingCards/>

        <div className="py-16 px-8 flex flex-col justify-center items-center">
          <h3 className='lg:text-xl text-lg'>Enterprise & Team Plans</h3>
          <p className='font-light pb-3 pt-2 text-center md:w-[37%] sm:w-[65%] w-full sm:text-base text-sm'>Request your own <span className='text-[#6F7C8E]'>custom price</span>  and get a <span className='text-[#6F7C8E]'>custom solution</span> for your organization</p>
          <button onClick={()=>{setIsOpen(true)}} className='bg-branding-primary rounded-[10px] md:w-[20%] sm:w-[35%] w-full py-2 text-sm font-light'>Send a Request</button>
        </div>
      </div>
    </>
  )
}

export default Credits
