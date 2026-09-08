import { cn } from '@/lib/utils/cn';
import * as ProgressPrimitive from '@rn-primitives/progress';

type ProgressProps = React.ComponentProps<typeof ProgressPrimitive.Root>;

function Progress({ className, max = 100, value = 0, ...props }: ProgressProps) {
  const safeMax = max > 0 ? max : 100;
  const safeValue = Math.min(Math.max(value ?? 0, 0), safeMax);
  const percentage = `${(safeValue / safeMax) * 100}%` as `${number}%`;

  return (
    <ProgressPrimitive.Root
      className={cn('bg-surface h-2 w-full overflow-hidden', className)}
      max={safeMax}
      value={safeValue}
      {...props}>
      <ProgressPrimitive.Indicator
        className="bg-primary h-full rounded-r-full"
        style={{ width: percentage }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
export type { ProgressProps };
