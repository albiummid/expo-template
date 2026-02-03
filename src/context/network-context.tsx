import * as Network from "expo-network";
import {
	type ReactNode,
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import Toast from "react-native-toast-message";

interface NetworkState {
	isConnected: boolean;
	isInternetReachable: boolean | null;
	type: Network.NetworkStateType | null;
}

interface NetworkContextValue extends NetworkState {
	checkConnection: () => Promise<void>;
}

const NetworkContext = createContext<NetworkContextValue | null>(null);

interface NetworkProviderProps {
	children: ReactNode;
	/**
	 * Interval in milliseconds to check network status
	 * @default 3000
	 */
	pollingInterval?: number;
	/**
	 * Show toast messages on network status changes
	 * @default true
	 */
	showToasts?: boolean;
}

export function NetworkProvider({
	children,
	pollingInterval = 3000,
	showToasts = true,
}: NetworkProviderProps) {
	const [networkState, setNetworkState] = useState<NetworkState>({
		isConnected: true,
		isInternetReachable: null,
		type: null,
	});

	const previousConnectedRef = useRef<boolean | null>(null);
	const isInitialCheckRef = useRef(true);

	const checkConnection = async () => {
		try {
			const state = await Network.getNetworkStateAsync();
			const isConnected = state.isConnected ?? false;

			setNetworkState({
				isConnected,
				isInternetReachable: state.isInternetReachable ?? null,
				type: state.type ?? null,
			});

			// Show toast only if connection status changed (not on initial check)
			if (showToasts && !isInitialCheckRef.current) {
				if (
					previousConnectedRef.current !== null &&
					previousConnectedRef.current !== isConnected
				) {
					if (isConnected) {
						Toast.show({
							type: "success",
							text1: "Back Online",
							text2: "Your internet connection has been restored",
							position: "top",
							visibilityTime: 3000,
							autoHide: true,
							topOffset: 60,
						});
					} else {
						Toast.show({
							type: "error",
							text1: "No Internet Connection",
							text2: "Please check your network settings",
							position: "top",
							visibilityTime: 4000,
							autoHide: true,
							topOffset: 60,
						});
					}
				}
			}

			previousConnectedRef.current = isConnected;
			isInitialCheckRef.current = false;
		} catch {
			setNetworkState({
				isConnected: false,
				isInternetReachable: false,
				type: null,
			});
		}
	};

	useEffect(() => {
		// Initial check
		checkConnection();

		// Set up polling interval
		const interval = setInterval(checkConnection, pollingInterval);

		return () => {
			clearInterval(interval);
		};
	}, [pollingInterval]);

	const value: NetworkContextValue = {
		...networkState,
		checkConnection,
	};

	return (
		<NetworkContext.Provider value={value}>{children}</NetworkContext.Provider>
	);
}

/**
 * Hook to access network state and utilities
 */
export function useNetwork(): NetworkContextValue {
	const context = useContext(NetworkContext);
	if (!context) {
		throw new Error("useNetwork must be used within a NetworkProvider");
	}
	return context;
}

/**
 * Hook to check if the device is online
 */
export function useIsOnline(): boolean {
	const { isConnected } = useNetwork();
	return isConnected;
}
