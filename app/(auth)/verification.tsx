import { Pressable, Text, TextInput, View } from 'react-native';

export default function Verify() {
  return (
    <View className="flex-1 bg-black px-6 pt-12">
      {/* Back Arrow */}
      <Pressable className="mb-6">
        <Text className="text-white text-2xl">‹</Text>
      </Pressable>

      {/* Title */}
      <Text className="text-[30px] font-bold text-white">
        Verify your number
      </Text>

      {/* Description */}
      <Text className="mt-3 text-[15px] leading-6 text-gray-400">
        We've sent a 4-digit code to{' '}
        <Text className="font-semibold text-green-500">
          09025828588
        </Text>{' '}
        via SMS. Enter the code below to verify your account.
      </Text>

      {/* OTP Label */}
      <Text className="mt-10 text-center text-[15px] font-semibold text-white">
        Enter OTP
      </Text>

      {/* OTP Boxes (Short & Square) */}
      <View className="mt-4 flex-row justify-between px-2">
        <TextInput
          keyboardType="number-pad"
          maxLength={1}
          className="h-[50px] w-[50px] rounded-lg border border-gray-600 bg-black text-center text-[24px] font-bold text-white"
        />

        <TextInput
          keyboardType="number-pad"
          maxLength={1}
          className="h-[50px] w-[50px] rounded-lg border border-gray-600 bg-black text-center text-[24px] font-bold text-white"
        />

        <TextInput
          keyboardType="number-pad"
          maxLength={1}
          className="h-[50px] w-[50px] rounded-lg border border-gray-600 bg-black text-center text-[24px] font-bold text-white"
        />

        <TextInput
          keyboardType="number-pad"
          maxLength={1}
          className="h-[50px] w-[50px] rounded-lg border border-gray-600 bg-black text-center text-[24px] font-bold text-white"
        />
      </View>

      {/* Send OTP */}
      <Pressable className="mt-5 self-center rounded-full bg-green-900 px-6 py-2">
        <Text className="text-[15px] font-semibold text-green-400">
          Send OTP
        </Text>
      </Pressable>

      {/* Spacer */}
      <View className="flex-1" />

      {/* Verify Button */}
      <Pressable className="mb-10 h-14 items-center justify-center rounded-full bg-green-700">
        <Text className="text-[16px] font-bold text-white">
          Verify
        </Text>
      </Pressable>
    </View>
  );
}