interface NetworkInterface {
    name: string;
    addr: ({V4: { broadcast: string, ip: string, netmask: string }} | {V6: { broadcast: string, ip: string, netmask: string }})[]
    mac_addr: string;
    index: number,
}

export default NetworkInterface;