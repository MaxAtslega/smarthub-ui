import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TimerState {
    timer: string;
    currentDate: Date;
    isActive: boolean;
}

const initialState: TimerState = {
    timer: '00:10:00',
    currentDate: new Date(),
    isActive: false,
};

const padTime = (time: number) => time.toString().padStart(2, '0');

const decrementTime = (currentTime: string) => {
    const [hours, minutes, seconds] = currentTime.split(':').map(Number);
    let newSeconds = seconds - 1;
    let newMinutes = minutes;
    let newHours = hours;

    if (newSeconds < 0) {
        newSeconds = 59;
        newMinutes -= 1;
    }

    if (newMinutes < 0) {
        newMinutes = 59;
        newHours -= 1;
    }

    if (newHours < 0) {
        return '00:00:00';
    }

    return `${padTime(newHours)}:${padTime(newMinutes)}:${padTime(newSeconds)}`;
};

const timerSlice = createSlice({
    name: 'timer',
    initialState,
    reducers: {
        decrementTimer(state) {
            if (state.isActive) {
                state.timer = decrementTime(state.timer);
            }
        },
        updateCurrentDate(state) {
            state.currentDate = new Date();
        },
        resetTimer(state) {
            state.timer = '00:00:00';
        },
        setTimer(state, action: PayloadAction<string>) {
            state.timer = action.payload;
        },
        setActive(state, action: PayloadAction<boolean>) {
            state.isActive = action.payload;
        },
    },
});

export const { decrementTimer, setTimer, updateCurrentDate, resetTimer, setActive } = timerSlice.actions;

export default timerSlice.reducer;
