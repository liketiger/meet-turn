import { TextClassContext } from '@/components/ui/text';
import { cn } from '@/lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { View } from 'react-native';

const badgeVariants = cva('flex-row items-center justify-center rounded-full', {
  variants: {
    variant: {
      default: 'bg-primary',
      secondary: 'bg-secondary',
      outline: 'border-border bg-background border',
      destructive: 'bg-destructive',
    },
    size: {
      sm: 'min-h-5 px-2 py-0.5',
      md: 'min-h-6 px-2.5 py-0.5',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

const badgeTextVariants = cva(
  'font-pretendard-bold text-[13px] leading-[19.5px] font-bold tracking-[-0.156px]',
  {
    variants: {
      variant: {
        default: 'text-primary-foreground',
        secondary: 'text-secondary-foreground',
        outline: 'text-foreground',
        destructive: 'text-white',
      },
      size: {
        sm: 'text-[11px] leading-[16.5px]',
        md: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

type BadgeProps = React.ComponentProps<typeof View> & VariantProps<typeof badgeVariants>;

function Badge({ className, size, variant, ...props }: BadgeProps) {
  return (
    <TextClassContext.Provider value={badgeTextVariants({ size, variant })}>
      <View className={cn(badgeVariants({ size, variant }), className)} {...props} />
    </TextClassContext.Provider>
  );
}

export { Badge, badgeTextVariants, badgeVariants };
export type { BadgeProps };
