// src/utils/spotifyAuth.ts
import {SPOTIFY_CLIENT_ID, SPOTIFY_REDIRECT_URI} from "@/constants/constants";

const scopes = [
    'user-read-currently-playing',
    'user-read-playback-state',
];

const generateCodeChallenge = async (codeVerifier: string) => {
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(codeVerifier));
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
};

const generateRandomString = (length: number) => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

export const getSpotifyAuthUrl = async (userId: string) => {
    const codeVerifier = generateRandomString(128);
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    localStorage.setItem('spotify_code_verifier', codeVerifier);

    const url = new URL('https://accounts.spotify.com/authorize');
    url.searchParams.append('client_id', SPOTIFY_CLIENT_ID);
    url.searchParams.append('response_type', 'code');
    url.searchParams.append('redirect_uri', `${SPOTIFY_REDIRECT_URI}?userId=${userId}`);
    url.searchParams.append('code_challenge_method', 'S256');
    url.searchParams.append('code_challenge', codeChallenge);
    url.searchParams.append('scope', scopes.join(' '));

    return url.toString();
};

export const getTokens = async (code: string) => {
    const codeVerifier = localStorage.getItem('spotify_code_verifier');
    if (!codeVerifier) throw new Error('Code verifier not found.');

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            client_id: SPOTIFY_CLIENT_ID,
            grant_type: 'authorization_code',
            code,
            redirect_uri: SPOTIFY_REDIRECT_URI,
            code_verifier: codeVerifier,
        }),
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error_description);
    return { accessToken: data.access_token, refreshToken: data.refresh_token };
};
