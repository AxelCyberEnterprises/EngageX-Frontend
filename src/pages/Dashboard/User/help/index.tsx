import React from 'react';
import { Outlet } from 'react-router-dom';

const HelpPage: React.FC = () => {
    return (
        <div>
            
            <Outlet />
        </div>
    );
};

export default HelpPage;