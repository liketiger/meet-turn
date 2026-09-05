import { Text } from '@/components/ui/text';
import { useUiStore } from '@/stores/ui-store';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function OfflineBanner() {
  const isOffline = useUiStore((state) => state.isOffline);
  const insets = useSafeAreaInsets();

  if (!isOffline) {
    return null;
  }

  return (
    <View
      accessibilityLiveRegion="polite"
      pointerEvents="none"
      className="bg-destructive absolute inset-x-0 top-0 z-50"
      style={{ paddingTop: insets.top }}>
      <Text className="py-2 text-center text-sm font-medium text-white">
        인터넷 연결을 확인해 주세요.
      </Text>
    </View>
  );
}
