import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils/cn';
import { ChevronLeftIcon } from 'lucide-react-native';
import { View, type ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type AppHeaderProps = ViewProps & {
  left?: React.ReactNode;
  onBack?: () => void;
  right?: React.ReactNode;
  title?: string;
};

function AppHeader({ className, left, onBack, right, title, ...props }: AppHeaderProps) {
  const leftContent = onBack ? (
    <Button accessibilityLabel="뒤로 가기" onPress={onBack} size="icon" variant="ghost">
      <Icon as={ChevronLeftIcon} className="size-6" strokeWidth={2} />
    </Button>
  ) : (
    left
  );

  return (
    <SafeAreaView edges={['top']} className="bg-background">
      <View className={cn('h-14 flex-row items-center justify-between px-3', className)} {...props}>
        <View className="min-w-11 items-start">{leftContent}</View>
        {title ? (
          <Text variant="label" numberOfLines={1} className="mx-2 flex-1 text-center text-[17px]">
            {title}
          </Text>
        ) : (
          <View className="flex-1" />
        )}
        <View className="min-w-11 items-end">{right}</View>
      </View>
    </SafeAreaView>
  );
}

export { AppHeader };
export type { AppHeaderProps };
