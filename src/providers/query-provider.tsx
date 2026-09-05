import { createQueryClient } from '@/lib/query/create-query-client';
import { useUiStore } from '@/stores/ui-store';
import NetInfo from '@react-native-community/netinfo';
import { focusManager, onlineManager, QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';
import { AppState, Platform, type AppStateStatus } from 'react-native';

function isNetworkAvailable(isConnected: boolean | null, isInternetReachable: boolean | null) {
  return isConnected !== false && isInternetReachable !== false;
}

function useQueryLifecycle() {
  React.useEffect(() => {
    return NetInfo.addEventListener(({ isConnected, isInternetReachable }) => {
      const isOnline = isNetworkAvailable(isConnected, isInternetReachable);

      onlineManager.setOnline(isOnline);
      useUiStore.getState().setOffline(!isOnline);
    });
  }, []);

  React.useEffect(() => {
    if (Platform.OS === 'web') {
      return;
    }

    function handleAppStateChange(status: AppStateStatus) {
      focusManager.setFocused(status === 'active');
    }

    handleAppStateChange(AppState.currentState);
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      subscription.remove();
      focusManager.setFocused(undefined);
    };
  }, []);
}

export function QueryProvider({ children }: React.PropsWithChildren) {
  const [queryClient] = React.useState(createQueryClient);

  useQueryLifecycle();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
