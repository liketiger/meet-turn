import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils/cn';
import type { LucideIcon } from 'lucide-react-native';
import { Pressable, View, type ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type AppTabBarItem = {
  accessibilityLabel?: string;
  badge?: boolean;
  icon: LucideIcon;
  key: string;
  label: string;
};

type AppTabBarProps = ViewProps & {
  items: AppTabBarItem[];
  onValueChange: (key: string) => void;
  value: string;
};

function AppTabBar({ className, items, onValueChange, value, ...props }: AppTabBarProps) {
  return (
    <SafeAreaView edges={['bottom']} className="bg-background">
      <View
        accessibilityRole="tablist"
        className={cn(
          'bg-card shadow-card mx-3 min-h-16 flex-row items-center rounded-3xl px-3 py-2',
          className
        )}
        {...props}>
        {items.map((item) => {
          const selected = item.key === value;

          return (
            <Pressable
              accessibilityLabel={item.accessibilityLabel ?? item.label}
              accessibilityRole="tab"
              accessibilityState={{ selected }}
              className="min-h-12 flex-1 items-center justify-center gap-0.5"
              key={item.key}
              onPress={() => onValueChange(item.key)}>
              <View>
                <Icon
                  as={item.icon}
                  className={cn('text-grey-400 size-6', selected && 'text-foreground')}
                />
                {item.badge ? (
                  <View className="bg-destructive absolute -top-0.5 -right-1 size-2 rounded-full" />
                ) : null}
              </View>
              <Text
                variant="caption"
                className={cn(
                  'text-grey-500 text-[11px] leading-[16.5px]',
                  selected && 'text-foreground'
                )}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

export { AppTabBar };
export type { AppTabBarItem, AppTabBarProps };
