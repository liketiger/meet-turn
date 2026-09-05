import { FormField } from '@/components/forms/form-field';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { signInSchema, type SignInValues } from '@/features/auth/schemas/sign-in-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';

type SignInFormProps = {
  error?: string;
  isSubmitting: boolean;
  onSubmit: (values: SignInValues) => Promise<void>;
};

export function SignInForm({ error, isSubmitting, onSubmit }: SignInFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(signInSchema),
  });

  return (
    <View className="w-full gap-5">
      <Controller
        control={control}
        name="email"
        render={({ field: { onBlur, onChange, value } }) => (
          <FormField inputId="sign-in-email" label="이메일" error={errors.email?.message}>
            <Input
              nativeID="sign-in-email"
              aria-describedby={errors.email ? 'sign-in-email-error' : undefined}
              aria-invalid={Boolean(errors.email)}
              autoCapitalize="none"
              autoComplete="email"
              editable={!isSubmitting}
              inputMode="email"
              keyboardType="email-address"
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder="name@example.com"
              returnKeyType="next"
              textContentType="emailAddress"
              value={value}
            />
          </FormField>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onBlur, onChange, value } }) => (
          <FormField inputId="sign-in-password" label="비밀번호" error={errors.password?.message}>
            <Input
              nativeID="sign-in-password"
              aria-describedby={errors.password ? 'sign-in-password-error' : undefined}
              aria-invalid={Boolean(errors.password)}
              autoCapitalize="none"
              autoComplete="current-password"
              editable={!isSubmitting}
              onBlur={onBlur}
              onChangeText={onChange}
              onSubmitEditing={handleSubmit(onSubmit)}
              placeholder="8자 이상 입력해 주세요"
              returnKeyType="done"
              secureTextEntry
              textContentType="password"
              value={value}
            />
          </FormField>
        )}
      />

      {error ? (
        <Text accessibilityLiveRegion="polite" className="text-destructive text-sm">
          {error}
        </Text>
      ) : null}

      <Button disabled={isSubmitting} onPress={handleSubmit(onSubmit)}>
        <Text>{isSubmitting ? '로그인 중...' : '로그인'}</Text>
      </Button>
    </View>
  );
}
