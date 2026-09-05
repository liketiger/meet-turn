import { Label } from '@/components/ui/label';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils/cn';
import * as React from 'react';
import { View, type ViewProps } from 'react-native';

type FormFieldProps = ViewProps & {
  children: React.ReactNode;
  error?: string;
  inputId: string;
  label: string;
};

export function FormField({
  children,
  className,
  error,
  inputId,
  label,
  ...props
}: FormFieldProps) {
  const errorId = `${inputId}-error`;

  return (
    <View className={cn('gap-2', className)} {...props}>
      <Label htmlFor={inputId}>{label}</Label>
      {children}
      {error ? (
        <Text
          nativeID={errorId}
          accessibilityLiveRegion="polite"
          className="text-destructive text-sm">
          {error}
        </Text>
      ) : null}
    </View>
  );
}
