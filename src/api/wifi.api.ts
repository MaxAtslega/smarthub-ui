import { commonApi } from "@/store/common.api";
import {NetworkStatusResponse, ScanResult, WifiCredentials} from "@/models/Wifi";

export const wifiApi = commonApi.injectEndpoints({
    endpoints: builder => ({
        startWpaSupplicant: builder.mutation<void, void>({
            query: () => ({
                url: '/wifi/start',
                method: 'POST',
            }),
        }),
        stopWpaSupplicant: builder.mutation<void, void>({
            query: () => ({
                url: '/wifi/stop',
                method: 'POST',
            }),
        }),
        startScan: builder.mutation<void, void>({
            query: () => ({
                url: '/wifi/scan/start',
                method: 'POST',
            }),
        }),
        getScanResults: builder.query<ScanResult[], void>({
            query: () => '/wifi/scan/results',
        }),
        connectWifi: builder.mutation<void, WifiCredentials>({
            query: (credentials) => ({
                url: '/wifi/connect',
                method: 'POST',
                body: credentials,
            }),
        }),
        disconnectWifi: builder.mutation<void, void>({
            query: () => ({
                url: '/wifi/disconnect',
                method: 'POST',
            }),
        }),
        getCurrentNetworkStatus: builder.query<NetworkStatusResponse, void>({
            query: () => '/wifi/status',
        }),
    }),
});

export const {
    useStartWpaSupplicantMutation,
    useStopWpaSupplicantMutation,
    useStartScanMutation,
    useGetScanResultsQuery,
    useConnectWifiMutation,
    useDisconnectWifiMutation,
    useGetCurrentNetworkStatusQuery,
} = wifiApi;
