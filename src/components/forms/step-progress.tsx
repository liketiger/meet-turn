import { Progress } from '@/components/ui/progress';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils/cn';
import { View, type ViewProps } from 'react-native';

type StepProgressProps = ViewProps & {
  current: number;
  total: number;
  variant?: 'bar' | 'steps';
};

function StepProgress({
  className,
  current,
  total,
  variant = 'steps',
  ...props
}: StepProgressProps) {
  const safeTotal = Math.max(1, total);
  const safeCurrent = Math.min(Math.max(1, current), safeTotal);

  if (variant === 'bar') {
    return (
      <Progress
        accessibilityLabel={`${safeTotal}단계 중 ${safeCurrent}단계`}
        className={className}
        max={safeTotal}
        value={safeCurrent}
        {...props}
      />
    );
  }

  return (
    <View
      accessibilityLabel={`${safeTotal}단계 중 ${safeCurrent}단계`}
      className={cn(
        'bg-secondary relative h-7 flex-row items-center justify-between rounded-full px-0.5',
        className
      )}
      {...props}>
      <View className="bg-border h-hairline absolute right-3 left-3" />
      {Array.from({ length: safeTotal }, (_, index) => {
        const step = index + 1;
        const active = step === safeCurrent;

        return (
          <View
            className={cn(
              'bg-background size-6 items-center justify-center rounded-full',
              active && 'bg-primary'
            )}
            key={step}>
            <Text
              variant="caption"
              className={cn('text-grey-500 text-[11px]', active && 'text-primary-foreground')}>
              {step}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

export { StepProgress };
export type { StepProgressProps };
