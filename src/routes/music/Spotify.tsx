import React, { useEffect, useState } from 'react';
import { useSpotify } from '@/contexts/SpotifyContext';
import QRCode from 'qrcode.react';
import { SPOTIFY_CLIENT_ID } from "@/constants/constants";
import { useSelector } from 'react-redux';
import { selectVolumeLevel } from "@/slices/volume.slice";
import { FaPause, FaPlay, FaSignOutAlt } from 'react-icons/fa';

const Spotify: React.FC = () => {
    const { isAuthenticated, currentTrack, play, pause, authenticateUser, logout, player, isPlaying } = useSpotify();
    const [authCode, setAuthCode] = useState<string>('');
    const volumeLevel = useSelector(selectVolumeLevel);
    const handleAuthCodeSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (authCode) {
            authenticateUser(authCode);
        }
    };

    useEffect(() => {
        if (player) {
            player.setVolume(volumeLevel);
        }
    }, [volumeLevel, player]);


    if (!isAuthenticated) {
        const authUrl = new URL('https://accounts.spotify.com/authorize');
        authUrl.searchParams.append('response_type', 'code');
        authUrl.searchParams.append('client_id', SPOTIFY_CLIENT_ID || '');
        authUrl.searchParams.append('scope', 'user-read-playback-state user-modify-playback-state user-read-currently-playing streaming');
        authUrl.searchParams.append('redirect_uri', 'https://smarthub.atslega.network/spotify/callback');

        return (
            <div className="bg-background-secondary h-full w-full rounded overflow-auto p-2">
                <h1>Spotify Authentication</h1>
                <div className={"pt-2 flex align-middle content-center justify-center"}>
                    <div>
                        <div className={"bg-white p-8 flex content-center justify-center"}>
                            <QRCode value={authUrl.toString()} />
                        </div>
                        <form onSubmit={handleAuthCodeSubmit}>
                            <input
                                type="text"
                                value={authCode}
                                onChange={(e) => setAuthCode(e.target.value)}
                                placeholder="Enter 8-digit code"
                                className="border mr-4 rounded px-4 bg-background-third p-4 mt-2"
                            />
                            <button type="submit" className="bg-primary-100 text-white p-2 rounded w-full">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full w-full rounded overflow-auto">
            {currentTrack ? (
                <div className={"flex w-full"}>
                    <div className={"w-full"}>
                        <div className={"flex mb-4 w-full"}>
                            <img className={"w-[200px]"} src={currentTrack.item.album.images[0].url}
                                 alt={currentTrack.item.name} />
                            <div className={"flex flex-col pl-4"}>
                                <span className={"font-black inline-block"}>{currentTrack.item.artists.map((artist: any) => artist.name).join(', ')}</span>
                                <span className={"font-black inline-block text-4xl"}>{currentTrack.item.name}</span>
                                <span className={"pt-1 inline-block text-xl font-semibold"}>Spotify</span>
                            </div>
                        </div>
                        <div className="flex mt-4 justify-between">
                            {isPlaying ? (
                                <button onClick={pause} className="text-white p-4 rounded mr-2 flex items-center">
                                    <FaPause />
                                </button>
                            ) : (
                                <button onClick={play} className="text-white p-4 rounded mr-2 flex items-center">
                                    <FaPlay />
                                </button>
                            )}
                            <button onClick={logout} className="bg-red-600 text-white p-4 rounded flex items-center">
                                <FaSignOutAlt />
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <p className={"font-black inline-block text-2xl"}>No track currently playing</p>
            )}
        </div>
    );
};

export default Spotify;
