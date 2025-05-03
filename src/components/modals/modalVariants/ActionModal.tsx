import React from 'react'
import Modal from '..'
import xIcon from '../../../assets/images/svgs/x-icon.svg';

interface PaymentPlanModalProps {
  show: boolean;
  onClose: () => void;
  icon: string;
  head: string;
  message: string;
  cta: string;
  ctaClassName: string;
}

const PaymentPlanModal: React.FC<PaymentPlanModalProps> = ({show, onClose, icon, head, message, cta, ctaClassName}) =>  {
  return (
    <>
      <Modal
        show={show} 
        onClose={onClose}
        className='px-6 py-4 sm:w-[350px] w-[90%]'
      >
        <div className='w-full flex justify-between items-center'>
          <img src={icon} alt='x icon' className='w-[50px] h-[50px]'/>
          <img src={xIcon} alt='x icon' className='w-[12px] h-[12px] mb-5 cursor-pointer' onClick={onClose}/>
        </div>
        <h3 className='text-[#181D27] text-lg my-3'>{head}</h3>
        <p className='text-[#535862] sm:text-base text-sm font-light'>{message}</p>

        <button onClick={onClose} className={`py-3 w-full rounded-[10px] mt-8 ${ctaClassName}`}>{cta}</button>
      </Modal>
    </>
  )
}

export default PaymentPlanModal
