// src/contexts/SpotifyContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import {
    useDeleteConstantByUserIdAndNameMutation,
    useGetConstantsByUserIdQuery,
    usePostConstantMutation
} from '@/api/constants.api';
import axios from 'axios';
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from "@/constants/constants";

const spotifyApi = new SpotifyWebApi();

declare global {
    interface Window {
        Spotify: any;
        onSpotifyWebPlaybackSDKReady: () => void;
    }
}

interface SpotifyContextProps {
    isAuthenticated: boolean;
    currentTrack: any;
    play: () => void;
    pause: () => void;
    fetchCurrentTrack: () => void;
    authenticateUser: (code: string) => void;
    refreshAccessToken: () => void;
    logout: () => void;
    player: any | null;
    isPlaying: boolean;
}

interface SpotifyProviderProps {
    children: ReactNode;
}

const SpotifyContext = createContext<SpotifyContextProps | undefined>(undefined);

export const SpotifyProvider: React.FC<SpotifyProviderProps> = ({ children }) => {
    const currentUser = useSelector((state: RootState) => state.user.currentUser);
    const { data: constants } = useGetConstantsByUserIdQuery(currentUser?.id || 0);
    const [postConstant] = usePostConstantMutation();
    const [deleteConstant] = useDeleteConstantByUserIdAndNameMutation();

    const dispatch = useDispatch();

    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [currentTrack, setCurrentTrack] = useState<any>(null);
    const [player, setPlayer] = useState<any | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    useEffect(() => {
        if (constants) {
            const refreshTokenConstant = constants.find(c => c.name === 'SPOTIFY_REFRESH_TOKEN');
            if (refreshTokenConstant) {
                setRefreshToken(refreshTokenConstant.value);
                refreshAccessToken(refreshTokenConstant.value);
            }
        }
    }, [constants]);

    const refreshAccessToken = async (refreshToken?: string) => {
        try {
            const token = refreshToken || refreshToken;
            const client_id = SPOTIFY_CLIENT_ID!;
            const client_secret = SPOTIFY_CLIENT_SECRET!;
            const response = await axios.post('https://accounts.spotify.com/api/token', null, {
                params: {
                    grant_type: 'refresh_token',
                    refresh_token: token,
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + btoa(`${client_id}:${client_secret}`),
                },
            });

            const { access_token } = response.data;
            setAccessToken(access_token);
            localStorage.setItem('spotifyAccessToken', access_token); // Save the token to localStorage
            spotifyApi.setAccessToken(access_token);
            setIsAuthenticated(true);
            fetchCurrentTrack();
        } catch (error) {
            console.error('Failed to refresh access token', error);
        }
    };

    useEffect(() => {
        if (accessToken) {
            spotifyApi.setAccessToken(accessToken);
            setIsAuthenticated(true);
            fetchCurrentTrack();
        }
    }, [accessToken]);

    const fetchCurrentTrack = async () => {
        try {
            const track = await spotifyApi.getMyCurrentPlaybackState();
            setCurrentTrack(track);
        } catch (error) {
            console.error('Failed to fetch current track', error);
        }
    };

    const play = async () => {
        try {
            await spotifyApi.play();
            fetchCurrentTrack();
        } catch (error) {
            console.error('Failed to play', error);
        }
    };

    const pause = async () => {
        try {
            await spotifyApi.pause();
            fetchCurrentTrack();
        } catch (error) {
            console.error('Failed to pause', error);
        }
    };

    const authenticateUser = async (code: string) => {
        try {
            const response = await axios.get(`https://smarthub.atslega.network/spotify/token?code=${code}`);
            const { access_token, refresh_token } = response.data;
            setAccessToken(access_token);
            setRefreshToken(refresh_token);
            localStorage.setItem('spotifyAccessToken', access_token); // Save the token to localStorage
            spotifyApi.setAccessToken(access_token);

            // Save refresh token as a user constant
            const userId = currentUser?.id || 0;
            await postConstant({
                name: 'SPOTIFY_REFRESH_TOKEN',
                user_id: userId,
                value: refresh_token,
            }).unwrap();

            setIsAuthenticated(true);
        } catch (error) {
            console.error('Failed to authenticate user', error);
        }
    };

    const logout = () => {
        setAccessToken(null);
        setRefreshToken(null);
        setIsAuthenticated(false);
        setCurrentTrack(null);
        localStorage.removeItem('spotifyAccessToken');

        // Optionally remove the refresh token from the user constants
        if (currentUser && currentUser.id) {
            deleteConstant({ userId: currentUser.id, constantName: 'SPOTIFY_REFRESH_TOKEN' });
        }
    };

    // Initialize Spotify Web Playback SDK
    useEffect(() => {
        if (isAuthenticated && !player) {
            const script = document.createElement('script');
            script.src = "https://sdk.scdn.co/spotify-player.js";
            script.async = true;
            document.body.appendChild(script);

            window.onSpotifyWebPlaybackSDKReady = () => {
                const token = localStorage.getItem('spotifyAccessToken');
                const spotifyPlayer = new window.Spotify.Player({
                    name: 'SmartHub',
                    getOAuthToken: (cb: (token: string) => void) => { cb(token!); },
                    volume: 0.5
                });

                // Error handling
                spotifyPlayer.addListener('initialization_error', ({ message }: { message: string }) => { console.error(message); });
                spotifyPlayer.addListener('authentication_error', ({ message }: { message: string }) => { console.error(message); });
                spotifyPlayer.addListener('account_error', ({ message }: { message: string }) => { console.error(message); });
                spotifyPlayer.addListener('playback_error', ({ message }: { message: string }) => { console.error(message); });

                // Playback status updates
                spotifyPlayer.addListener('player_state_changed', (state: any) => {
                    fetchCurrentTrack();
                    setIsPlaying(!state.paused);
                });

                // Ready
                spotifyPlayer.addListener('ready', ({ device_id }: { device_id: string }) => {
                    setPlayer(spotifyPlayer);
                });

                // Not Ready
                spotifyPlayer.addListener('not_ready', ({ device_id }: { device_id: string }) => {
                    console.log('Device ID has gone offline', device_id);
                });

                // Connect to the player!
                spotifyPlayer.connect();

                setPlayer(spotifyPlayer);
            };
        }
    }, [isAuthenticated, player]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (player) {
                // @ts-ignore
                player.getCurrentState().then(state => {
                    if (state) {
                        setIsPlaying(!state.paused);
                    }
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [player]);

    return (
        <SpotifyContext.Provider value={{ isAuthenticated, currentTrack, play, pause, fetchCurrentTrack, authenticateUser, refreshAccessToken, logout, player, isPlaying }}>
            {children}
        </SpotifyContext.Provider>
    );
};

export const useSpotify = () => {
    const context = useContext(SpotifyContext);
    if (!context) {
        throw new Error('useSpotify must be used within a SpotifyProvider');
    }
    return context;
};
