/**
 * Checks if the network is password-protected based on the capability string.
 * @param {string} capabilityString - The capability string of the network.
 * @return {boolean} - Returns true if the network is password-protected, false otherwise.
 */
function isPasswordProtected(capabilityString: string): boolean {
    return capabilityString.includes("Privacy");
}

export default isPasswordProtected