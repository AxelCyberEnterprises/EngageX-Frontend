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
  achievementData: Achievement[];
}

interface Achievement {
  id: number;
  title: string;
  score: number;
  total: number;
  note: string;
}

const RecentAchievementsModal: React.FC<RecentAchievementsModalProps> = ({ show, onClose, achievementData }) => {

  const getLevel = (score: number) => {
    if (score >= 1 && score <= 3) return 1;
    if (score >= 4 && score <= 7) return 2;
    if (score >= 8 && score <= 10) return 3;
    return 1; 
  };

  const getLevelColor = (score: number) => {
    if (score >= 1 && score <= 3) return 'bg-[#C1C2B4]'; // Light gray/beige for Level 1
    if (score >= 4 && score <= 7) return 'bg-[#ECB25E]'; // Gold/Yellow for Level 2
    if (score >= 8 && score <= 10) return 'bg-[#64BA9F]'; // Green for Level 3
    return 'bg-[#C1C2B4]';
  };

  const getLevelImage = (score: number) => {
    const level = getLevel(score);
    if (level === 1) return starAward;
    if (level === 2) return trophy;   
    if (level === 3) return horse;    
    return starAward;
  };


  const getProgressBarColor = (score: number) => {
    if (score >= 1 && score <= 3) return "#C1C2B4"; // Light gray/beige for Level 1
    if (score >= 4 && score <= 7) return "#ECB25E"; // Gold/Yellow for Level 2
    if (score >= 8 && score <= 10) return "#64BA9F"; // Green for Level 3
    return "#C1C2B4";
  };

  const getPercentage = (score: number, total: number) => {
    return (score / total) * 100;
  };

  console.log(achievementData)

  return (
    <>
      <Modal
        show={show}
        onClose={onClose}
        className='px-4 py-4 sm:w-[543px] w-[90%]'
      >
        <div className='gap-0 sm:px-2 sm:py-2 w-full'>
          <div className='flex justify-between gap-4 items-center'>
            <div>
              <h3 className='text-[#252A39] lg:text-lg text-base lg:mt-0 mt-2'>Recent Achievements</h3>
              <p className='sm:text-sm text-xs text-[#6F7C8E] py-2'>Here's a list your of your earned achievements</p>
            </div>
          </div>
          
          {achievementData.map((item) => (
            <div key={item.id} className='flex gap-3 mb-6'>
              <div className={`flex flex-col items-center justify-between p-2 rounded-[6px] ${getLevelColor(item.score)}`}>
                <div className='bg-[#FFFFFF33] rounded-full w-[50px] h-[50px] grid place-content-center'>
                  <img src={getLevelImage(item.score)} alt="level icon" />
                </div>
                <p className='text-white text-xs whitespace-nowrap'>LEVEL {getLevel(item.score)}</p>
              </div>
              
              <Card className='border-none shadow-none py-2 gap-2 w-full'>
                <div className='flex justify-between items-center'>
                  <h4 className='lg:text-lg text-base text-[#333333]'>{item.title}</h4>
                  <p className='text-sm text-[#6F7C8E]'>{item.score}/{item.total}</p>
                </div>
                <SegmentedProgressBar
                  percent={getPercentage(item.score, item.total)}
                  color={getProgressBarColor(item.score)}
                  divisions={10}
                  className='h-1.5'
                />
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