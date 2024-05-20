const checkInternetConnectivity = async (): Promise<boolean> => {
    try {
        const response = await fetch('https://atslega.dev', { mode: 'no-cors' });
        return response.ok || response.type === 'opaque';
    } catch (error) {
        console.error('Internet connectivity check failed:', error);
        return false;
    }
};

export default checkInternetConnectivity;