// src/contexts/AudioContext.tsx
import React, {createContext, useContext, useState, useRef, useEffect, ReactNode} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectVolumeLevel, setVolumeLevel } from '@/slices/volume.slice';
import { Station } from '@/models/Radio';

interface AudioContextProps {
    selectedStation: Station | null;
    setSelectedStation: (station: Station | null) => void;
    stopPlayback: () => void;
}

interface AudioProviderProps {
    children: ReactNode;
}

const AudioContext = createContext<AudioContextProps | undefined>(undefined);

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
    const volumeLevel = useSelector(selectVolumeLevel);
    const dispatch = useDispatch();
    const [selectedStation, setSelectedStation] = useState<Station | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (selectedStation) {
            if (!audioRef.current) {
                audioRef.current = new Audio(selectedStation.url);
                audioRef.current.volume = volumeLevel;
                audioRef.current.play().catch((error) => console.error("Audio play failed:", error));
            } else {
                audioRef.current.src = selectedStation.url;
                audioRef.current.play().catch((error) => console.error("Audio play failed:", error));
            }
        }
    }, [selectedStation]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volumeLevel;
        }
    }, [volumeLevel]);

    const stopPlayback = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.src = '';
            setSelectedStation(null);
        }
    };

    return (
        <AudioContext.Provider value={{ selectedStation, setSelectedStation, stopPlayback }}>
            {children}
        </AudioContext.Provider>
    );
};

export const useAudio = () => {
    const context = useContext(AudioContext);
    if (!context) {
        throw new Error('useAudio must be used within an AudioProvider');
    }
    return context;
};
