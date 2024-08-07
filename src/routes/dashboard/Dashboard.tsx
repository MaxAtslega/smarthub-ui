import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const Dashboard: React.FC = () => {
    const currentUser = useSelector((state: RootState) => state.user.currentUser);
    const userName = currentUser?.username || 'User';

    const getGreeting = () => {
        const currentHour = new Date().getHours();
        if (currentHour < 12) {
            return 'Good morning';
        } else if (currentHour < 18) {
            return 'Good afternoon';
        } else {
            return 'Good evening';
        }
    };

    return (
        <div>
            <h1>{`${getGreeting()}, ${userName}`}</h1>
        </div>
    );
};

export default Dashboard;
