import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface VolumeState {
  level: number;
}

const initialState: VolumeState = {
  level: 1, // Default volume level (0.0 to 1.0)
};

const volumeSlice = createSlice({
  name: 'volume',
  initialState,
  reducers: {
    setVolumeLevel: (state, action: PayloadAction<number>) => {
      state.level = action.payload;
    },
  },
});

export const { setVolumeLevel } = volumeSlice.actions;
export const selectVolumeLevel = (state: { volume: VolumeState }) => state.volume.level;

export default volumeSlice.reducer;
