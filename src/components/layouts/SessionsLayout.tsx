import { ReactNode } from 'react';
// import { Outlet } from 'react-router-dom';
import TopNav from '../session/TopNav';

const SessionsLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className='flex flex-col overflow-y-hidden h-screen w-screen'>
            <div className="h-auto">
                <TopNav />
            </div>
            <div className="flex-1 w-full overflow-y-auto">
                { children }
            </div>
        </div>
    );
};

export default SessionsLayout;