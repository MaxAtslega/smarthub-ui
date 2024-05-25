/**
 * Checks if the network is password-protected based on the capability string.
 * @param {string} flags - The flags of the network.
 * @return {boolean} - Returns true if the network is password-protected, false otherwise.
 */
function isPasswordProtected(flags: string): boolean {
    return flags.includes("WPA") || flags.includes("WEP");}

export default isPasswordProtected