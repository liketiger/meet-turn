import { ThemeToggle } from '@/components/navigation/theme-toggle';
import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Meet Turn',
          headerRight: () => <ThemeToggle />,
        }}
      />
    </Stack>
  );
}
