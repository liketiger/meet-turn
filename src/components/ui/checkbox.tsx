import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils/cn';
import * as CheckboxPrimitive from '@rn-primitives/checkbox';
import { CheckIcon } from 'lucide-react-native';

type CheckboxProps = React.ComponentProps<typeof CheckboxPrimitive.Root>;

function Checkbox({ checked, className, disabled, ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      checked={checked}
      className={cn(
        'border-grey-400 size-6 items-center justify-center rounded-md border',
        checked && 'border-primary bg-primary',
        disabled && 'opacity-40',
        className
      )}
      disabled={disabled}
      {...props}>
      <CheckboxPrimitive.Indicator>
        <Icon as={CheckIcon} className="text-primary-foreground size-4" strokeWidth={3} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
export type { CheckboxProps };
