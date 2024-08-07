interface V4Address {
    broadcast: string;
    ip: string;
    netmask: string;
}

interface V6Address {
    broadcast: null;
    ip: string;
    netmask: string;
}

interface NetworkAddress {
    V4?: V4Address;
    V6?: V6Address;
}

interface NetworkInterface {
    addr: NetworkAddress[];
    index: number;
    mac_addr: string;
    name: string;
}

export default NetworkInterface;