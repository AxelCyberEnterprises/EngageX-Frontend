import React from 'react'
import Modal from '..'
import SegmentedProgressBar from '@/components/dashboard/SegmentedProgressBar';
import { Card } from '@/components/ui/card';
import horse from '../../../assets/images/svgs/horse.svg';
import trophy from '../../../assets/images/svgs/trophy.svg';
import starAward from '../../../assets/images/svgs/star-award.svg';

interface RecentAchievementsModalProps {
  show: boolean;
  onClose: () => void;
  achievementData: any[];
}

const RecentAchievementsModal: React.FC<RecentAchievementsModalProps> = ({ show, onClose, achievementData }) => {
    const getProgressBarColor = (percentage: number) => {
      if (percentage >= 80 && percentage <= 100) return '#40B869';
      if (percentage >= 60 && percentage < 80) return '#F5B546';
      return '#DD524D';
    };
  
    const getPercentage = (portion: number, total: number) => {
      const decimal = portion / total;
      const percentage = decimal * 100;
      const fixedPercentage = percentage.toFixed(0)
      return Number(fixedPercentage);
    }
  
    const getLevelImage = (level: number) => {
      if (level === 1) return horse;
      if (level === 2) return trophy;
      if (level === 3) return starAward;
      return horse;
    };
  return (
    <>
      <Modal
        show={show}
        onClose={onClose}
        className='px-4 py-4 sm:w-[543px] w-[90%]'
      >
        <div className='gap-0 sm:px-4 sm:py-2 w-full'>
          <div className='flex justify-between gap-4 items-center'>
            <div>
              <h3 className='text-[#252A39] lg:text-lg text-base lg:mt-0 mt-2'>Recent Achievements</h3>
              <p className='sm:text-sm text-xs text-[#6F7C8E] py-2'>Here’s a list your of your earned achievements</p>
            </div>
          </div>
          {achievementData.map((item) => (
            <div className='flex gap-3 mb-6 px-2'>
              <div className={`flex flex-col items-center justify-between p-2 rounded-[6px] ${item.level === 1 && 'bg-[#64BA9F]'}  ${item.level === 2 && 'bg-[#ECB25E]'}  ${item.level === 3 && 'bg-[#C1C2B4]'} ${item.level === 4 && 'bg-[#C29C81]'} ${item.level === 5 && 'bg-[#253141]'} ${item.level === 6 && 'bg-[#64BA9F]'}`}>
                <div className='bg-[#FFFFFF33] rounded-full w-[50px] h-[50px] grid place-content-center'>
                  <img src={getLevelImage(item.level)} alt="level image" />
                </div>
                <p className='text-white text-xs whitespace-nowrap'>LEVEL {item.level}</p>
              </div>
              <Card className='border-none shadow-none py-2 gap-2 w-full'>
                <div className='flex justify-between items-center'>
                  <h4 className='lg:text-lg text-base text-[#333333]'>{item.title}</h4>
                  <p className='text-sm text-[#6F7C8E]'>{item.portion}/{item.total}</p>
                </div>
                <SegmentedProgressBar
                  percent={getPercentage(item.portion, item.total)}
                  color={getProgressBarColor(getPercentage(item.portion, item.total))}
                  divisions={10} />
                <p className='text-[#252A39D9] mt-1 sm:text-sm text-xs'>{item.note}</p>
              </Card>
            </div>

          ))}
        </div>
      </Modal>
    </>
  )
}

export default RecentAchievementsModal
