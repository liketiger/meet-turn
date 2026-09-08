import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils/cn';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BottomSheet = Dialog;
const BottomSheetClose = DialogClose;
const BottomSheetDescription = DialogDescription;
const BottomSheetTitle = DialogTitle;
const BottomSheetTrigger = DialogTrigger;

type BottomSheetContentProps = React.ComponentProps<typeof DialogContent>;

function BottomSheetContent({ children, className, ...props }: BottomSheetContentProps) {
  return (
    <DialogContent
      className={cn(
        'bg-background max-h-[85%] w-full max-w-none gap-0 rounded-t-3xl rounded-b-none border-0 p-0',
        className
      )}
      hideClose
      overlayClassName="items-end justify-end p-0"
      {...props}>
      <View className="h-8 items-center justify-center">
        <View className="bg-grey-200 h-1 w-12 rounded-full" />
      </View>
      <SafeAreaView edges={['bottom']} className="pb-3">
        {children}
      </SafeAreaView>
    </DialogContent>
  );
}

function BottomSheetHeader({ className, ...props }: React.ComponentProps<typeof View>) {
  return <View className={cn('px-screen gap-1 pb-5', className)} {...props} />;
}

function BottomSheetFooter({ className, ...props }: React.ComponentProps<typeof View>) {
  return <View className={cn('px-screen gap-2 pt-6', className)} {...props} />;
}

export {
  BottomSheet,
  BottomSheetClose,
  BottomSheetContent,
  BottomSheetDescription,
  BottomSheetFooter,
  BottomSheetHeader,
  BottomSheetTitle,
  BottomSheetTrigger,
};
export type { BottomSheetContentProps };
