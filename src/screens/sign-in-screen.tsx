import { Text } from '@/components/ui/text';
import { DEMO_CREDENTIALS } from '@/features/auth/api/mock-sign-in';
import { useSignInMutation } from '@/features/auth/api/use-sign-in-mutation';
import { SignInForm } from '@/features/auth/components/sign-in-form';
import type { SignInValues } from '@/features/auth/schemas/sign-in-schema';
import { useAuthSessionStore } from '@/features/auth/state/auth-session-store';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function SignInScreen() {
  const setSession = useAuthSessionStore((state) => state.setSession);
  const signInMutation = useSignInMutation();

  async function handleSignIn(values: SignInValues) {
    try {
      const session = await signInMutation.mutateAsync(values);
      setSession(session);
    } catch {
      // The mutation error is rendered below the fields.
    }
  }

  const submitError =
    signInMutation.error instanceof Error ? signInMutation.error.message : undefined;

  return (
    <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        className="bg-background flex-1">
        <ScrollView
          automaticallyAdjustKeyboardInsets
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled">
          <View className="flex-1 items-center justify-center px-6 py-10">
            <View className="w-full max-w-sm gap-8">
              <View className="gap-2">
                <Text variant="h1" className="text-left">
                  로그인
                </Text>
                <Text variant="muted">
                  데모 계정으로 Meet Turn의 인증 흐름을 확인할 수 있습니다.
                </Text>
              </View>

              <SignInForm
                error={submitError}
                isSubmitting={signInMutation.isPending}
                onSubmit={handleSignIn}
              />

              <View className="bg-muted gap-1 rounded-md p-4">
                <Text variant="small">데모 계정</Text>
                <Text variant="muted">이메일: {DEMO_CREDENTIALS.email}</Text>
                <Text variant="muted">비밀번호: {DEMO_CREDENTIALS.password}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
