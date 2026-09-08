import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils/cn';
import { ChevronRightIcon } from 'lucide-react-native';
import { Pressable, View, type PressableProps } from 'react-native';

type ListRowProps = Omit<PressableProps, 'children'> & {
  description?: string;
  leading?: React.ReactNode;
  showChevron?: boolean;
  title: string;
  trailing?: React.ReactNode;
};

function ListRow({
  className,
  description,
  disabled,
  leading,
  onPress,
  showChevron = Boolean(onPress),
  title,
  trailing,
  ...props
}: ListRowProps) {
  return (
    <Pressable
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityState={{ disabled: Boolean(disabled) }}
      className={cn(
        'px-screen active:bg-grey-opacity-100 min-h-16 flex-row items-center gap-3 py-3',
        disabled && 'opacity-40',
        className
      )}
      disabled={disabled}
      onPress={onPress}
      {...props}>
      {leading ? <View className="shrink-0">{leading}</View> : null}
      <View className="min-w-0 flex-1 gap-0.5">
        <Text variant="headline" numberOfLines={1}>
          {title}
        </Text>
        {description ? (
          <Text variant="muted" numberOfLines={2} className="text-subtle-foreground">
            {description}
          </Text>
        ) : null}
      </View>
      {trailing ? <View className="shrink-0">{trailing}</View> : null}
      {showChevron ? (
        <Icon as={ChevronRightIcon} className="text-grey-400 size-5 shrink-0" />
      ) : null}
    </Pressable>
  );
}

export { ListRow };
export type { ListRowProps };
