import { DesignSystemScreen } from '@/screens/design-system-screen';
import { Redirect } from 'expo-router';

export default function DesignSystemRoute() {
  if (!__DEV__) {
    return <Redirect href="/" />;
  }

  return <DesignSystemScreen />;
}
