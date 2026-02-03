import * as Network from "expo-network";
import { useEffect, useState } from "react";

export interface NetworkState {
	isConnected: boolean;
	isInternetReachable: boolean | null;
	type: Network.NetworkStateType | null;
}

/**
 * Hook to monitor network connectivity status
 */
export function useNetworkState() {
	const [networkState, setNetworkState] = useState<NetworkState>({
		isConnected: true,
		isInternetReachable: null,
		type: null,
	});

	useEffect(() => {
		let isMounted = true;

		const checkNetwork = async () => {
			try {
				const state = await Network.getNetworkStateAsync();
				if (isMounted) {
					setNetworkState({
						isConnected: state.isConnected ?? false,
						isInternetReachable: state.isInternetReachable ?? null,
						type: state.type ?? null,
					});
				}
			} catch {
				if (isMounted) {
					setNetworkState({
						isConnected: false,
						isInternetReachable: false,
						type: null,
					});
				}
			}
		};

		// Check immediately
		checkNetwork();

		// Set up polling interval (expo-network doesn't have subscription API)
		const interval = setInterval(checkNetwork, 3000);

		return () => {
			isMounted = false;
			clearInterval(interval);
		};
	}, []);

	return networkState;
}

/**
 * Get current network state (one-time check)
 */
export async function getNetworkState(): Promise<NetworkState> {
	try {
		const state = await Network.getNetworkStateAsync();
		return {
			isConnected: state.isConnected ?? false,
			isInternetReachable: state.isInternetReachable ?? null,
			type: state.type ?? null,
		};
	} catch {
		return {
			isConnected: false,
			isInternetReachable: false,
			type: null,
		};
	}
}

/**
 * Check if device is connected to the internet
 */
export async function isOnline(): Promise<boolean> {
	const state = await getNetworkState();
	return state.isConnected;
}

/**
 * Get IP address of the device
 */
export async function getIpAddress(): Promise<string | null> {
	try {
		const ip = await Network.getIpAddressAsync();
		return ip;
	} catch {
		return null;
	}
}

/**
 * Check if connected via WiFi
 */
export async function isWifi(): Promise<boolean> {
	const state = await getNetworkState();
	return state.type === Network.NetworkStateType.WIFI;
}

/**
 * Check if connected via Cellular
 */
export async function isCellular(): Promise<boolean> {
	const state = await getNetworkState();
	return state.type === Network.NetworkStateType.CELLULAR;
}
