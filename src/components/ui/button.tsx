import { TextClassContext } from '@/components/ui/text';
import { THEME } from '@/lib/theme/navigation-theme';
import { cn } from '@/lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { ActivityIndicator, Platform, Pressable } from 'react-native';
import { useUniwind } from 'uniwind';

const buttonVariants = cva(
  cn(
    'group h-control shrink-0 flex-row items-center justify-center gap-2 rounded-xl px-5 shadow-none',
    Platform.select({
      web: "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    })
  ),
  {
    variants: {
      variant: {
        default: cn(
          'bg-primary active:bg-primary/90',
          Platform.select({ web: 'hover:bg-primary/90' })
        ),
        destructive: cn(
          'bg-destructive active:bg-destructive/90 dark:bg-destructive/80',
          Platform.select({
            web: 'hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40',
          })
        ),
        outline: cn(
          'border-border bg-background active:bg-accent border',
          Platform.select({
            web: 'hover:bg-accent',
          })
        ),
        secondary: cn(
          'bg-secondary active:bg-secondary/80',
          Platform.select({ web: 'hover:bg-secondary/80' })
        ),
        tonal: cn(
          'bg-primary-soft active:bg-primary-soft/70',
          Platform.select({ web: 'hover:bg-primary-soft/70' })
        ),
        ghost: cn(
          'active:bg-accent dark:active:bg-accent/50',
          Platform.select({ web: 'hover:bg-accent dark:hover:bg-accent/50' })
        ),
        text: '',
        link: '',
      },
      size: {
        default: Platform.select({ web: 'has-[>svg]:px-4' }),
        sm: cn('h-9 gap-1.5 rounded-lg px-3', Platform.select({ web: 'has-[>svg]:px-2.5' })),
        lg: cn('h-14 rounded-xl px-6', Platform.select({ web: 'has-[>svg]:px-4' })),
        cta: 'h-cta w-full rounded-xl px-5',
        icon: 'size-11 rounded-full p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const buttonTextVariants = cva(
  cn(
    'text-foreground font-pretendard-semibold text-[17px] leading-[25.5px] font-semibold tracking-[-0.204px]',
    Platform.select({ web: 'pointer-events-none transition-colors' })
  ),
  {
    variants: {
      variant: {
        default: 'text-primary-foreground',
        destructive: 'text-white',
        outline: cn(
          'group-active:text-accent-foreground',
          Platform.select({ web: 'group-hover:text-accent-foreground' })
        ),
        secondary: 'text-secondary-foreground',
        tonal: 'text-primary-strong',
        ghost: 'group-active:text-accent-foreground',
        text: 'text-primary-strong group-active:opacity-70',
        link: cn(
          'text-primary group-active:underline',
          Platform.select({ web: 'underline-offset-4 group-hover:underline hover:underline' })
        ),
      },
      size: {
        default: '',
        sm: '',
        lg: '',
        cta: '',
        icon: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

type ButtonProps = React.ComponentProps<typeof Pressable> &
  React.RefAttributes<typeof Pressable> &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean;
  };

function Button({ className, loading = false, variant, size, ...props }: ButtonProps) {
  const { theme } = useUniwind();
  const disabled = Boolean(props.disabled || loading);
  const resolvedVariant = variant ?? 'default';
  const spinnerColor =
    resolvedVariant === 'default' || resolvedVariant === 'destructive'
      ? THEME[theme ?? 'light'].primaryForeground
      : THEME[theme ?? 'light'].primary;

  return (
    <TextClassContext.Provider value={buttonTextVariants({ variant, size })}>
      <Pressable
        {...props}
        accessibilityState={{ ...props.accessibilityState, busy: loading, disabled }}
        className={cn(
          buttonVariants({ variant, size }),
          props.disabled && resolvedVariant === 'default' && 'bg-disabled',
          props.disabled && resolvedVariant !== 'default' && 'opacity-50',
          className
        )}
        disabled={disabled}
        role="button">
        {loading ? (
          <ActivityIndicator accessibilityLabel="로딩 중" color={spinnerColor} />
        ) : (
          props.children
        )}
      </Pressable>
    </TextClassContext.Provider>
  );
}

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };
