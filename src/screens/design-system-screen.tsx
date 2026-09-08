import {
  BottomSheet,
  BottomSheetClose,
  BottomSheetContent,
  BottomSheetDescription,
  BottomSheetFooter,
  BottomSheetHeader,
  BottomSheetTitle,
  BottomSheetTrigger,
} from '@/components/feedback/bottom-sheet';
import { SelectionChip } from '@/components/forms/selection-chip';
import { StepProgress } from '@/components/forms/step-progress';
import { BottomActionBar } from '@/components/layout/bottom-action-bar';
import { ListRow } from '@/components/layout/list-row';
import { AppHeader } from '@/components/navigation/app-header';
import { AppTabBar, type AppTabBarItem } from '@/components/navigation/app-tab-bar';
import { ThemeToggle } from '@/components/navigation/theme-toggle';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { useRouter } from 'expo-router';
import {
  AtSignIcon,
  BellIcon,
  GemIcon,
  HeartIcon,
  HomeIcon,
  MessageCircleIcon,
  PhoneIcon,
  UserIcon,
} from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';

const COLORS = [
  ['Primary', '#3183F6'],
  ['Grey 100', '#F2F4F6'],
  ['Grey 200', '#E5E8EB'],
  ['Grey 400', '#B0B8C1'],
  ['Grey 600', '#6B7684'],
  ['Grey 700', '#4E5968'],
  ['Grey 900', '#191F28'],
] as const;

const TAB_ITEMS: AppTabBarItem[] = [
  { icon: HomeIcon, key: 'home', label: '홈' },
  { icon: GemIcon, key: 'meet', label: '모아보기' },
  { icon: HeartIcon, key: 'likes', label: '좋아요' },
  { badge: true, icon: MessageCircleIcon, key: 'messages', label: '메시지' },
  { icon: UserIcon, key: 'profile', label: '프로필' },
];

function Section({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <View className="gap-4">
      <Text variant="title">{title}</Text>
      {children}
    </View>
  );
}

export function DesignSystemScreen() {
  const router = useRouter();
  const [checked, setChecked] = useState(true);
  const [selectedChip, setSelectedChip] = useState('독서');
  const [selectedTab, setSelectedTab] = useState('home');

  return (
    <View className="bg-background flex-1">
      <AppHeader onBack={() => router.back()} right={<ThemeToggle />} title="디자인 시스템" />
      <ScrollView automaticallyAdjustKeyboardInsets keyboardShouldPersistTaps="handled">
        <View className="px-screen gap-10 pt-6 pb-12">
          <Section title="Colors">
            <View className="flex-row flex-wrap gap-3">
              {COLORS.map(([name, color]) => (
                <View className="w-[30%] min-w-24 gap-2" key={name}>
                  <View
                    className="border-border aspect-square rounded-xl border"
                    style={{ backgroundColor: color }}
                  />
                  <Text variant="caption">{name}</Text>
                  <Text variant="caption" className="text-subtle-foreground">
                    {color}
                  </Text>
                </View>
              ))}
            </View>
          </Section>

          <Section title="Typography">
            <View className="gap-3">
              <Text variant="display">Display 24</Text>
              <Text variant="title">Title 22</Text>
              <Text variant="headline">Headline 18</Text>
              <Text variant="body">Body 17 — 편안하게 읽는 본문입니다.</Text>
              <Text variant="label">Label 15</Text>
              <Text variant="caption">Caption 13</Text>
            </View>
          </Section>

          <Section title="Buttons">
            <View className="gap-3">
              <Button size="cta">
                <Text>확인</Text>
              </Button>
              <Button size="cta" variant="tonal">
                <Text>참여하기</Text>
              </Button>
              <Button size="cta" variant="secondary">
                <Text>다음에 하기</Text>
              </Button>
              <Button size="cta" variant="outline">
                <Text>건너뛰기</Text>
              </Button>
              <Button size="cta" loading>
                <Text>처리 중</Text>
              </Button>
              <Button size="cta" disabled>
                <Text>비활성화</Text>
              </Button>
              <Button variant="text">
                <Text>텍스트 버튼</Text>
              </Button>
            </View>
          </Section>

          <Section title="Inputs">
            <View className="gap-5">
              <Input placeholder="기본 입력 필드" />
              <View className="gap-1.5">
                <Text variant="muted" className="text-subtle-foreground">
                  이름
                </Text>
                <Input placeholder="이름을 입력해 주세요." variant="underline" />
              </View>
              <Input aria-invalid placeholder="오류 상태" variant="underline" />
              <Input editable={false} placeholder="비활성 상태" variant="underline" />
            </View>
          </Section>

          <Section title="Selection">
            <View className="flex-row flex-wrap gap-2.5">
              {['독서', '와인', '클라이밍', '여행', '공연/전시', '드라이브'].map((label) => (
                <SelectionChip
                  className="flex-1 basis-[30%]"
                  key={label}
                  onPress={() => setSelectedChip(label)}
                  selected={selectedChip === label}>
                  {label}
                </SelectionChip>
              ))}
            </View>
            <View className="flex-row items-center gap-3">
              <Checkbox checked={checked} onCheckedChange={setChecked} />
              <Text variant="body">필수 약관에 동의합니다.</Text>
            </View>
            <View className="flex-row gap-2">
              <Badge>
                <Text>대표 이미지</Text>
              </Badge>
              <Badge variant="secondary">
                <Text>선택</Text>
              </Badge>
              <Badge variant="outline">
                <Text>심사 중</Text>
              </Badge>
            </View>
          </Section>

          <Section title="Progress">
            <StepProgress current={1} total={5} />
            <StepProgress current={3} total={5} variant="bar" />
          </Section>

          <Section title="Cards & rows">
            <Card>
              <CardHeader>
                <CardTitle>{'{서울 소개팅}'}</CardTitle>
                <CardDescription>3/6명 참여 중</CardDescription>
              </CardHeader>
              <CardContent className="items-end">
                <Button size="sm" variant="tonal">
                  <Text>참여하기</Text>
                </Button>
              </CardContent>
            </Card>
            <View className="border-border overflow-hidden rounded-xl border">
              <ListRow
                description="{0}명 차단 중"
                leading={<Icon as={PhoneIcon} className="text-grey-500 size-10" />}
                onPress={() => undefined}
                title="연락처"
              />
              <ListRow
                description="@이메일 {0}곳 차단 중"
                leading={<Icon as={AtSignIcon} className="text-grey-500 size-10" />}
                onPress={() => undefined}
                title="같은 회사 소개 안받기"
              />
            </View>
          </Section>

          <Section title="Bottom sheet">
            <BottomSheet>
              <BottomSheetTrigger asChild>
                <Button size="cta" variant="secondary">
                  <Text>서비스 동의 바텀시트 열기</Text>
                </Button>
              </BottomSheetTrigger>
              <BottomSheetContent>
                <BottomSheetHeader>
                  <BottomSheetTitle>서비스 이용에 꼭 필요한 동의만 추렸어요</BottomSheetTitle>
                  <BottomSheetDescription>
                    필수 항목을 확인하고 계속 진행해 주세요.
                  </BottomSheetDescription>
                </BottomSheetHeader>
                <ListRow
                  title="고유식별정보 처리 동의"
                  trailing={<Checkbox checked onCheckedChange={() => undefined} />}
                />
                <ListRow
                  title="개인정보 수집 동의"
                  trailing={<Checkbox checked={checked} onCheckedChange={setChecked} />}
                />
                <BottomSheetFooter>
                  <BottomSheetClose asChild>
                    <Button size="cta">
                      <Text>필수 동의하기</Text>
                    </Button>
                  </BottomSheetClose>
                  <BottomSheetClose asChild>
                    <Button variant="text">
                      <Text>닫기</Text>
                    </Button>
                  </BottomSheetClose>
                </BottomSheetFooter>
              </BottomSheetContent>
            </BottomSheet>
          </Section>

          <Section title="Bottom action">
            <View className="border-border overflow-hidden rounded-xl border">
              <BottomActionBar
                primaryAction={{ label: '다음', onPress: () => undefined }}
                secondaryAction={{ label: '이전', onPress: () => undefined }}
              />
            </View>
          </Section>

          <Section title="Tab bar">
            <AppTabBar items={TAB_ITEMS} onValueChange={setSelectedTab} value={selectedTab} />
          </Section>

          <View className="bg-primary-soft flex-row items-center gap-3 rounded-xl p-4">
            <Icon as={BellIcon} className="text-primary size-6" />
            <Text variant="small" className="text-primary-strong flex-1">
              이 화면은 개발 빌드에서만 노출됩니다.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
