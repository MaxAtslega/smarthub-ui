import {webSocketService} from "@/services/webSocketService";

export function startDiscovering() {
    webSocketService.sendMessage(JSON.stringify({
        t: "START_DISCOVERING",
        op: 2,
        d: {}
    }))
}

export function stopDiscovering() {
    webSocketService.sendMessage(JSON.stringify({
        t: "STOP_DISCOVERING",
        op: 2,
        d: {}
    }))
}

export function connect(address: string) {
    webSocketService.sendMessage(JSON.stringify({
        t: "CONNECT",
        op: 2,
        d: {
            address
        }
    }))
}

export function disconnect(address: string) {
    webSocketService.sendMessage(JSON.stringify({
        t: "DISCONNECT",
        op: 2,
        d: {
            address
        }
    }))
}

export function getDevices() {
    webSocketService.sendMessage(JSON.stringify({
        t: "DEVICES",
        op: 2,
        d: {
        }
    }))
}


export function trust(address: string) {
    webSocketService.sendMessage(JSON.stringify({
        t: "TRUST",
        op: 2,
        d: {
            address
        }
    }))
}

export function untrust(address: string) {
    webSocketService.sendMessage(JSON.stringify({
        t: "UNTRUST",
        op: 2,
        d: {
            address
        }
    }))
}