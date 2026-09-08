import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils/cn';
import { View, type ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type BottomAction = {
  accessibilityLabel?: string;
  disabled?: boolean;
  label: string;
  loading?: boolean;
  onPress: () => void;
};

type BottomActionBarProps = ViewProps & {
  primaryAction: BottomAction;
  secondaryAction?: BottomAction;
};

function ActionButton({ action, primary }: { action: BottomAction; primary: boolean }) {
  return (
    <Button
      accessibilityLabel={action.accessibilityLabel ?? action.label}
      className={primary ? 'flex-1' : undefined}
      disabled={action.disabled}
      loading={action.loading}
      onPress={action.onPress}
      size="cta"
      variant={primary ? 'default' : 'secondary'}>
      <Text>{action.label}</Text>
    </Button>
  );
}

function BottomActionBar({
  className,
  primaryAction,
  secondaryAction,
  ...props
}: BottomActionBarProps) {
  const stacked = Boolean(
    secondaryAction && (primaryAction.label.length > 14 || secondaryAction.label.length > 14)
  );

  return (
    <SafeAreaView edges={['bottom']} className="bg-background">
      <View
        className={cn(
          'bg-background px-screen gap-2 pt-3 pb-1',
          secondaryAction && !stacked && 'flex-row',
          className
        )}
        {...props}>
        {secondaryAction && !stacked ? (
          <View className="w-24">
            <ActionButton action={secondaryAction} primary={false} />
          </View>
        ) : null}
        <ActionButton action={primaryAction} primary />
        {secondaryAction && stacked ? (
          <Button
            accessibilityLabel={secondaryAction.accessibilityLabel ?? secondaryAction.label}
            disabled={secondaryAction.disabled}
            loading={secondaryAction.loading}
            onPress={secondaryAction.onPress}
            size="default"
            variant="text">
            <Text>{secondaryAction.label}</Text>
          </Button>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

export { BottomActionBar };
export type { BottomAction, BottomActionBarProps };
