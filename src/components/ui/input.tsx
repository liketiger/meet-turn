import { cn } from '@/lib/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { Platform, TextInput } from 'react-native';

const inputVariants = cva(
  'text-foreground font-pretendard-regular w-full min-w-0 text-base leading-[23px] tracking-[-0.192px]',
  {
    variants: {
      variant: {
        boxed: 'border-input bg-background h-control rounded-xl border px-4 py-3',
        underline: 'border-input h-control rounded-none border-0 border-b bg-transparent px-4 py-3',
      },
    },
    defaultVariants: {
      variant: 'boxed',
    },
  }
);

function Input({
  className,
  placeholderTextColorClassName,
  variant,
  ...props
}: React.ComponentProps<typeof TextInput> &
  React.RefAttributes<TextInput> &
  VariantProps<typeof inputVariants>) {
  return (
    <TextInput
      className={cn(
        inputVariants({ variant }),
        props.editable === false &&
          cn(
            'opacity-50',
            Platform.select({ web: 'disabled:pointer-events-none disabled:cursor-not-allowed' })
          ),
        Platform.select({
          web: cn(
            'placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground transition-[color,box-shadow] outline-none md:text-sm',
            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
            'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive'
          ),
          native: 'placeholder:text-subtle-foreground',
        }),
        className
      )}
      {...props}
    />
  );
}

export { Input };
