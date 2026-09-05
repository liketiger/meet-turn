import '@/global.css';

import { OfflineBanner } from '@/components/feedback/offline-banner';
import { useAuthSessionStore } from '@/features/auth/state/auth-session-store';
import { NAV_THEME } from '@/lib/theme/navigation-theme';
import { QueryProvider } from '@/providers/query-provider';
import { PortalHost } from '@rn-primitives/portal';
import { Stack } from 'expo-router';
import { ThemeProvider } from 'expo-router/react-navigation';
import { StatusBar } from 'expo-status-bar';
import { useUniwind } from 'uniwind';

export { ErrorBoundary } from 'expo-router';

export default function RootLayout() {
  const { theme } = useUniwind();
  const isAuthenticated = useAuthSessionStore((state) => state.session !== null);

  return (
    <QueryProvider>
      <ThemeProvider value={NAV_THEME[theme ?? 'light']}>
        <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Protected guard={!isAuthenticated}>
            <Stack.Screen name="(auth)" />
          </Stack.Protected>
          <Stack.Protected guard={isAuthenticated}>
            <Stack.Screen name="(app)" />
          </Stack.Protected>
        </Stack>
        <OfflineBanner />
        <PortalHost />
      </ThemeProvider>
    </QueryProvider>
  );
}
