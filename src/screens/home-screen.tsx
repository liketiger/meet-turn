import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useAuthSessionStore } from '@/features/auth/state/auth-session-store';
import { Link } from 'expo-router';
import { StarIcon } from 'lucide-react-native';
import { Image, type ImageStyle, View } from 'react-native';
import { useUniwind } from 'uniwind';

const LOGO = {
  light: require('@/assets/images/react-native-reusables-light.png'),
  dark: require('@/assets/images/react-native-reusables-dark.png'),
};

const IMAGE_STYLE: ImageStyle = {
  height: 76,
  width: 76,
};

export function HomeScreen() {
  const { theme } = useUniwind();
  const session = useAuthSessionStore((state) => state.session);
  const signOut = useAuthSessionStore((state) => state.signOut);

  return (
    <View className="flex-1 items-center justify-center gap-8 p-4">
      <Image source={LOGO[theme ?? 'light']} style={IMAGE_STYLE} resizeMode="contain" />

      <View className="items-center gap-2 p-4">
        <Text variant="h3">Meet Turn</Text>
        <Text variant="muted">{session?.user.email} 계정으로 로그인했습니다.</Text>
      </View>

      <View className="flex-row flex-wrap justify-center gap-2">
        {__DEV__ ? (
          <Link href="./design-system" asChild>
            <Button variant="tonal">
              <Text>디자인 시스템</Text>
            </Button>
          </Link>
        ) : null}
        <Link href="https://reactnativereusables.com" asChild>
          <Button>
            <Text>Browse the Docs</Text>
          </Button>
        </Link>
        <Link href="https://github.com/founded-labs/react-native-reusables" asChild>
          <Button variant="ghost">
            <Text>Star the Repo</Text>
            <Icon as={StarIcon} />
          </Button>
        </Link>
        <Button variant="outline" onPress={signOut}>
          <Text>로그아웃</Text>
        </Button>
      </View>
    </View>
  );
}
