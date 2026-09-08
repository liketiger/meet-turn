import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils/cn';
import { Pressable, type PressableProps } from 'react-native';

type SelectionChipProps = Omit<PressableProps, 'children'> & {
  children: string;
  selected?: boolean;
};

function SelectionChip({
  children,
  className,
  disabled,
  selected = false,
  ...props
}: SelectionChipProps) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected, disabled: Boolean(disabled) }}
      className={cn(
        'bg-secondary h-control min-w-24 items-center justify-center rounded-sm px-3 active:opacity-80',
        selected && 'bg-primary',
        disabled && 'opacity-40',
        className
      )}
      disabled={disabled}
      {...props}>
      <Text
        variant="headline"
        className={cn(
          'text-grey-600 font-pretendard-medium font-medium',
          selected && 'text-white'
        )}>
        {children}
      </Text>
    </Pressable>
  );
}

export { SelectionChip };
export type { SelectionChipProps };
